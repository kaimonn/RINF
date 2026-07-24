// map/layer_OP.js

import { lookupOP } from '../../data/xml_loader.js';
import { updateSidebarForOP } from '../ui/sidebar/sidebar_index.js';
import { refreshOpGraphicParametersPanel } from '../ui/sidebar/graphic_parameters_panel.js';
import { resetAllHighlights } from './layer_SOL.js';

import {
    getMap,
    setOPLayerVisible,
    setOpFeatures,
    isComparisonMode,
    addToComparisonBuffer,
    getComparisonBuffer,
    clearComparisonBuffer,
} from '../state.js';
import {
    getOpStyleForFeature,
    getOpSelectedStyle,
    isOpFeatureHidden,
} from './styles_OP.js';
import {
    renderAllComparisonTabsForOP,
    renderCrossOPComparison,
} from '../ui/comparison/comparison_panel.js';
import { updateComparisonBadge } from '../ui/comparison/comparison_toggle.js';

// ────────────────────────────────────────────────────────────────────────────
// GeoJSON URL 管理
// ────────────────────────────────────────────────────────────────────────────

let OP_GEOJSON_URL = null;

export function configureOpLayerUrl(url) {
    OP_GEOJSON_URL = url;
}

// ────────────────────────────────────────────────────────────────────────────

let _opLayer                = null;
let _selectedOPLayer        = null;
let _mapInteractionHandler  = null;

const _comparisonOPLayers = new Map(); // label → Leaflet layer

export function getOPLayer() { return _opLayer; }

// ── 比較スタイル適用／解除（CircleMarker 用） ────────────────────────────

/**
 * 比較選択時のスタイルを適用する。
 * - 色・fillColor は変えず、radius と weight を相対増加。
 * - マーカーの下に白いアウトライン CircleMarker を追加して縁取りを表現。
 */
function _applyComparisonStyleOP(layer) {
    const map = getMap();

    const baseRadius = layer.options.radius ?? 6;
    const baseWeight = layer.options.weight ?? 1;

    // ★ アウトライン（白縁取り）を本体の下に追加
    const outline = L.circleMarker(layer.getLatLng(), {
        radius:      baseRadius + 6,
        color:       '#ffffff',
        weight:      baseWeight + 6,
        fillOpacity: 0,
        interactive: false,
    }).addTo(map);
    outline.bringToBack();

    // ★ 本体：色そのまま、radius と weight だけ相対増加
    layer.setStyle({ radius: baseRadius + 3, weight: baseWeight + 2 });
    layer.bringToFront();

    layer._inComparison      = true;
    layer._comparisonOutline = outline;
}

/**
 * 比較スタイルを解除し、通常スタイルに戻す。
 * アウトライン CircleMarker も除去する。
 */
function _removeComparisonStyleOP(layer) {
    if (layer._comparisonOutline) {
        layer._comparisonOutline.remove();
        delete layer._comparisonOutline;
    }
    delete layer._inComparison;

    const style = getOpStyleForFeature(layer.feature);
    layer.setStyle(style);
    setLayerPointerEvents(layer, isOpFeatureHidden(style));
}

// ────────────────────────────────────────────────────────────────────────────

function enrichOPFeature(feature) {
    const uniqueOPID = feature?.properties?.UniqueOPID;
    if (!uniqueOPID) return feature;
    const opData = lookupOP(uniqueOPID);
    if (!opData) return feature;
    return {
        ...feature,
        properties: { UniqueOPID: uniqueOPID, ...opData },
    };
}

function setLayerPointerEvents(layer, hidden) {
    const el = layer.getElement?.();
    if (el) el.style.pointerEvents = hidden ? 'none' : '';
}

/**
 * 全 OP レイヤーのスタイルを更新。
 * 比較選択中のレイヤーはスキップする。
 */
export function refreshOpStyles() {
    if (!_opLayer) return;
    _opLayer.eachLayer(layer => {
        // ★ 比較選択中はスタイルを上書きしない
        if (layer._inComparison) return;

        if (layer === _selectedOPLayer) {
            layer.setStyle(getOpSelectedStyle());
            setLayerPointerEvents(layer, false);
            return;
        }
        const style = getOpStyleForFeature(layer.feature);
        layer.setStyle(style);
        setLayerPointerEvents(layer, isOpFeatureHidden(style));
    });
}

export async function loadOPLayer() {
    const map = getMap();
    if (!map) return;

    if (!OP_GEOJSON_URL) {
        throw new Error(
            "OP_GEOJSON_URL n'est pas configurée. " +
            "Appelez configureOpLayerUrl() dans main.js avant loadOPLayer()."
        );
    }

    const res = await fetch(OP_GEOJSON_URL);
    if (!res.ok) throw new Error(`Impossible de charger ${OP_GEOJSON_URL} (HTTP ${res.status})`);

    const geojson           = await res.json();
    const enrichedFeatures  = geojson.features.map(enrichOPFeature);
    setOpFeatures(enrichedFeatures);

    const enrichedGeojson = { ...geojson, features: enrichedFeatures };

    _opLayer = L.geoJSON(enrichedGeojson, {
        pointToLayer: (feature, latlng) => {
            const style = getOpStyleForFeature(feature);
            return L.circleMarker(latlng, style);
        },
        onEachFeature: (feature, layer) => {
            const props  = feature.properties || {};
            const opName = props.OPName ?? props.UniqueOPID ?? '?';

            layer.bindTooltip(opName, {
                permanent:  false,
                direction:  'top',
                offset:     [0, -8],
            });

            layer.on('click', (e) => {
                L.DomEvent.stopPropagation(e);

                const op               = lookupOP(props.UniqueOPID);
                const detailsContainer = document.querySelector('.bottom-details');

                if (isComparisonMode() && op) {
                    // ★ タイプロック：SOL選択済みならOP追加不可
                    const buffer = getComparisonBuffer();
                    if (buffer.length > 0 && buffer[0].type !== 'OP') {
                        detailsContainer.innerHTML = `
                            <p class="placeholder comparison-type-mismatch">
                                ⚠ Des SOL sont déjà sélectionnés — videz la sélection avant de comparer des OP.
                            </p>`;
                        return;
                    }

                    const label = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP';
                    const count = addToComparisonBuffer({ type: 'OP', data: op, label });
                    updateComparisonBadge();

                    if (!_comparisonOPLayers.has(label)) {
                        _comparisonOPLayers.set(label, layer);
                        // ★ 新スタイル適用（色そのまま・相対増加・白縁取り）
                        _applyComparisonStyleOP(layer);
                    }

                    if (count >= 2) {
                        renderCrossOPComparison(
                            detailsContainer,
                            getComparisonBuffer().map(b => b.data),
                        );
                    } else {
                        detailsContainer.innerHTML =
                            `<p class="placeholder">Sélectionnez un 2ᵉ OP à comparer (${count}/2 sélectionné).</p>`;
                    }
                    return;
                }

                // ── 通常モード ──────────────────────────────────────────
                resetAllHighlights();
                clearOPSelection();
                layer.setStyle(getOpSelectedStyle());
                setLayerPointerEvents(layer, false);
                _selectedOPLayer = layer;

                updateSidebarForOP(op ?? null);

                if (op && detailsContainer) {
                    renderAllComparisonTabsForOP(detailsContainer, op);
                }
            });
        },
    });

    map.addLayer(_opLayer);
    setOPLayerVisible(true);
    refreshOpStyles();

    if (!_mapInteractionHandler) {
        _mapInteractionHandler = () => {
            if (!_opLayer) return;
            _opLayer.eachLayer(layer => {
                if (layer.closeTooltip) layer.closeTooltip();
            });
        };
        map.on('zoomstart', _mapInteractionHandler);
        map.on('movestart', _mapInteractionHandler);
    }

    refreshOpGraphicParametersPanel();
    return _opLayer;
}

export function removeOPLayer() {
    const map = getMap();

    if (_mapInteractionHandler && map) {
        map.off('zoomstart', _mapInteractionHandler);
        map.off('movestart', _mapInteractionHandler);
        _mapInteractionHandler = null;
    }

    if (_opLayer && map?.hasLayer(_opLayer)) map.removeLayer(_opLayer);
    _opLayer         = null;
    _selectedOPLayer = null;
}

export function toggleOPLayer(visible) {
    const map = getMap();
    if (!map || !_opLayer) return;

    if (visible) {
        if (!map.hasLayer(_opLayer)) {
            map.addLayer(_opLayer);
            refreshOpStyles();
        }
    } else {
        if (_mapInteractionHandler) _mapInteractionHandler();
        if (map.hasLayer(_opLayer)) map.removeLayer(_opLayer);
    }
    setOPLayerVisible(visible);
}

export function clearOPSelection() {
    if (_selectedOPLayer) {
        const style = getOpStyleForFeature(_selectedOPLayer.feature);
        _selectedOPLayer.setStyle(style);
        setLayerPointerEvents(_selectedOPLayer, isOpFeatureHidden(style));
        _selectedOPLayer = null;
    }
}

export function clearOPComparisonVisuals() {
    // ★ 各マーカーのアウトラインを除去し通常スタイルに戻す
    _comparisonOPLayers.forEach(bufferedLayer => {
        _removeComparisonStyleOP(bufferedLayer);
    });
    _comparisonOPLayers.clear();
    clearComparisonBuffer();
}

export function focusOPByUniqueId(uniqueId) {
    const map = getMap();
    if (!map || !_opLayer) return false;

    if (!map.hasLayer(_opLayer)) {
        map.addLayer(_opLayer);
        setOPLayerVisible(true);
        refreshOpStyles();
    }

    let targetLayer = null;
    _opLayer.eachLayer(layer => {
        if (layer.feature?.properties?.UniqueOPID === uniqueId) targetLayer = layer;
    });
    if (!targetLayer) return false;

    map.setView(targetLayer.getLatLng(), Math.max(map.getZoom(), 14));
    resetAllHighlights();
    clearOPSelection();
    targetLayer.setStyle(getOpSelectedStyle());
    setLayerPointerEvents(targetLayer, false);
    _selectedOPLayer = targetLayer;

    const op = lookupOP(uniqueId);
    updateSidebarForOP(op ?? null);

    if (op) {
        const detailsContainer = document.querySelector('.bottom-details');
        if (detailsContainer) renderAllComparisonTabsForOP(detailsContainer, op);
    }

    return true;
}