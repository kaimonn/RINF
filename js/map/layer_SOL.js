// map/layer_SOL.js

import {
    getMap,
    getGeojsonLayer,
    setGeojsonLayer,
    getSelectedLayers,
    setSelectedLayers,
    getSelectedLayer,
    setSelectedLayer,
    setAllCodes,
    getCategoryVisibility,
    getCurrentColorMode,
    getCategoryWidthOverride,
    isTunnelMode,
    setTunnelMode,
    setAllFeatures,
    isComparisonMode,
    addToComparisonBuffer,
    getComparisonBuffer,
    clearComparisonBuffer,
} from '../state.js';
import { getDefaultStyle, getHoverStyle, getSelectedStyle, getWeightForZoom } from './styles_SOL.js';
import { updateSidebar } from '../ui/sidebar/sidebar_index.js';
import { COLOR_MODES } from '../config/colorModes.js';
import { showStructureLabelsForTroncon, clearStructureLabels } from '../config/mode/pkLocationPointsOnClick.js';
import { lookupSOL, lookupTunnel } from '../../data/xml_loader.js';
import { clearOPSelection } from './layer_OP.js';
import {
    renderAllComparisonTabsForSOL,
    renderCrossSOLComparison,
} from '../ui/comparison/comparison_panel.js';
import { updateComparisonBadge } from '../ui/comparison/comparison_toggle.js';
import { renderFeatureFromGeoProps } from '../ui/bottomBar/renderers/renderers_sol.js';

// ────────────────────────────────────────────────────────────────────────────
// GeoJSON URLs
// ────────────────────────────────────────────────────────────────────────────

let SOL_GEOJSON_URL    = null;
let TUNNEL_GEOJSON_URL = null;

export function configureSolLayerUrls({ solUrl, tunnelUrl }) {
    SOL_GEOJSON_URL    = solUrl;
    TUNNEL_GEOJSON_URL = tunnelUrl;
}

// ────────────────────────────────────────────────────────────────────────────

let hoveredLayer = null;
let allFeatures  = [];

// 比較選択レイヤー管理
const _comparisonLayers = new Map(); // label → Leaflet layer

const NO_DATA_CATEGORY_ID = 'no-data';

// ── 比較スタイル適用／解除 ────────────────────────────────────────────────

/**
 * 比較選択時のスタイルを適用する。
 * - getDefaultStyle() でその地物本来の色を取得し、太さだけ相対増加する。
 * - 本線の下に白いアウトラインレイヤーを追加して縁取りを表現する。
 *
 * ★ クリック直前のホバースタイル（オレンジ）が残らないよう、
 *   必ず defaultStyle から色を取り直してから setStyle する。
 */
function _applyComparisonStyle(layer) {
    const map  = getMap();
    const zoom = map ? map.getZoom() : 10;

    const baseWeight   = getWeightForFeature(layer.feature, zoom);
    // ★ ホバー色の残留を防ぐため defaultStyle から色を取得
    const defaultStyle = getDefaultStyle(enrichFeature(layer.feature), allFeatures);

    // アウトライン（白縁取り）を本線の下に追加
    const outline = L.polyline(layer.getLatLngs(), {
        color:       '#ffffff',
        weight:      baseWeight + 8,
        opacity:     0.85,
        interactive: false,
    }).addTo(map);
    outline.bringToBack();

    // ★ defaultStyle（正しい色）を基準に、太さだけ増加して適用
    layer.setStyle({ ...defaultStyle, weight: baseWeight + 4 });
    layer.bringToFront();

    layer._inComparison         = true;
    layer._comparisonOutline    = outline;
    layer._comparisonBaseWeight = baseWeight;
}

/**
 * 比較スタイルを解除し、通常スタイルに戻す。
 * アウトラインレイヤーも除去する。
 */
function _removeComparisonStyle(layer) {
    if (layer._comparisonOutline) {
        layer._comparisonOutline.remove();
        delete layer._comparisonOutline;
    }
    delete layer._inComparison;
    delete layer._comparisonBaseWeight;

    const map  = getMap();
    const zoom = map ? map.getZoom() : 10;
    const s    = getDefaultStyle(enrichFeature(layer.feature), allFeatures);
    s.weight   = getWeightForFeature(layer.feature, zoom);
    layer.setStyle(s);
}

// ────────────────────────────────────────────────────────────────────────────

function enrichFeature(feature) {
    if (!feature) return feature;
    const geoProps = feature.properties || {};

    const xmlSOL    = lookupSOL(geoProps);
    const baseProps = xmlSOL ? { ...geoProps, ...xmlSOL } : { ...geoProps };

    let finalProps = baseProps;

    if (isTunnelMode()) {
        const imCode   = geoProps.SOLIMCode;
        const tunnelId =
            geoProps.SOLTrack?.[0]?.SOLTunnel?.SOLTunnelIdentification
            ?? baseProps.SOLTrack?.[0]?.SOLTunnel?.[0]?.SOLTunnelIdentification;

        const tunnelData = lookupTunnel(imCode, tunnelId);
        if (tunnelData && Array.isArray(tunnelData.OPTrackTunnelParameter)) {
            finalProps = {
                ...finalProps,
                OPTrackTunnelParameter: tunnelData.OPTrackTunnelParameter,
            };
        }
    }

    if (!xmlSOL && !isTunnelMode()) return feature;

    return { ...feature, properties: finalProps };
}

function getWeightForFeature(feature, zoom) {
    const base   = getWeightForZoom(zoom);
    const modeId = getCurrentColorMode();
    const mode   = COLOR_MODES[modeId];

    if (typeof mode?.getWeightForFeature === 'function') {
        const w = mode.getWeightForFeature(enrichFeature(feature));
        return w != null ? w : base;
    }

    if (!mode?.supportsFiltering || typeof mode.getFilterIds !== 'function') return base;

    const enriched   = enrichFeature(feature);
    const ids        = mode.getFilterIds(enriched) || [];
    const categoryId = ids[0];
    if (!categoryId) return base;

    const override = getCategoryWidthOverride(modeId, categoryId);
    return override != null ? override : base;
}

function isLayerSelected(layer) {
    const selectedLayer  = getSelectedLayer();
    const selectedLayers = getSelectedLayers();
    return selectedLayer === layer || selectedLayers.includes(layer);
}

function isFeatureVisible(feature) {
    const modeId = getCurrentColorMode();
    const mode   = COLOR_MODES[modeId];

    if (!mode?.supportsFiltering)     return true;
    if (mode.hideUnchecked === false) return true;

    const visibilityMap = getCategoryVisibility();
    const enriched      = enrichFeature(feature);

    if (typeof mode.getFilterIds === 'function') {
        let ids = mode.getFilterIds(enriched) || [];
        if (!ids.length && NO_DATA_CATEGORY_ID in visibilityMap) ids = [NO_DATA_CATEGORY_ID];
        if (!ids.length) return true;
        const trackedIds = ids.filter(id => id in visibilityMap);
        if (trackedIds.length === 0) return true;
        return trackedIds.some(id => visibilityMap[id] !== false);
    }

    if (typeof mode.getStyleCategoryId === 'function') {
        const categoryId = mode.getStyleCategoryId(enriched);
        if (!categoryId || !(categoryId in visibilityMap)) return true;
        return visibilityMap[categoryId] !== false;
    }

    return true;
}

export function refreshLayerStyles() {
    console.log('[DEBUG] refreshLayerStyles called');
    const geojsonLayer = getGeojsonLayer();
    if (!geojsonLayer) return;

    const map  = getMap();
    const zoom = map ? map.getZoom() : 10;

    const currentFeatures = [];
    geojsonLayer.eachLayer(layer => {
        if (layer.feature) currentFeatures.push(enrichFeature(layer.feature));
    });

    geojsonLayer.eachLayer(layer => {
        if (!layer.feature) return;

        // ★ 比較選択中：defaultStyle の色を維持しながらズームに合わせて太さを更新
        if (layer._inComparison) {
            const newBase      = getWeightForFeature(layer.feature, zoom);
            const defaultStyle = getDefaultStyle(enrichFeature(layer.feature), currentFeatures);
            layer.setStyle({ ...defaultStyle, weight: newBase + 4 });
            if (layer._comparisonOutline) {
                layer._comparisonOutline.setStyle({ weight: newBase + 8 });
            }
            layer.bringToFront();
            return;
        }

        const visible = isFeatureVisible(layer.feature);

        if (!visible) {
            if (map && layer._map) map.removeLayer(layer);
            return;
        } else {
            if (map && !layer._map) map.addLayer(layer);
        }

        if (isLayerSelected(layer)) {
            const s          = getSelectedStyle();
            const baseWeight = getWeightForFeature(layer.feature, zoom);
            s.weight         = Math.max(baseWeight + 3, 5);
            layer.setStyle(s);
            return;
        }

        if (layer === hoveredLayer) {
            const s          = getHoverStyle();
            const baseWeight = getWeightForFeature(layer.feature, zoom);
            s.weight         = baseWeight + 2;
            layer.setStyle(s);
            return;
        }

        const style  = getDefaultStyle(enrichFeature(layer.feature), currentFeatures);
        style.weight = getWeightForFeature(layer.feature, zoom);
        layer.setStyle(style);
    });
}

function onFeatureMouseOver(e) {
    const layer = e.target;

    // ★ 比較選択中はホバースタイルで上書きしない
    if (layer._inComparison) return;

    const selectedLayer = getSelectedLayer();

    if (hoveredLayer && hoveredLayer !== layer && !isLayerSelected(hoveredLayer) && !hoveredLayer._inComparison) {
        const style  = getDefaultStyle(enrichFeature(hoveredLayer.feature), allFeatures);
        const map    = getMap();
        style.weight = getWeightForFeature(hoveredLayer.feature, map.getZoom());
        hoveredLayer.setStyle(style);
    }

    if (layer !== selectedLayer && !isLayerSelected(layer)) {
        if (!isFeatureVisible(layer.feature)) return;

        const hoverStyle  = getHoverStyle();
        const map         = getMap();
        hoverStyle.weight = getWeightForFeature(layer.feature, map.getZoom()) + 2;
        layer.setStyle(hoverStyle);
        layer.bringToFront();
        hoveredLayer = layer;
    } else {
        hoveredLayer = null;
    }
}

function onFeatureMouseOut(e) {
    const layer = e.target;

    // ★ 比較選択中はマウスアウトで元に戻さない
    if (layer._inComparison) return;

    const selectedLayer = getSelectedLayer();

    if (layer !== selectedLayer && !isLayerSelected(layer)) {
        const style  = getDefaultStyle(enrichFeature(layer.feature), allFeatures);
        const map    = getMap();
        style.weight = getWeightForFeature(layer.feature, map.getZoom());
        layer.setStyle(style);
    }

    if (hoveredLayer === layer) {
        hoveredLayer = null;
        refreshLayerStyles();
    }
}

async function onFeatureClick(e) {
    const layer = e.target;
    if (!isFeatureVisible(layer.feature)) return;

    const map              = getMap();
    const zoom             = map.getZoom();
    const enrichedProps    = enrichFeature(layer.feature).properties;
    const detailsContainer = document.querySelector('.bottom-details');

    // ★ 比較モード
    if (isComparisonMode() && !isTunnelMode()) {
        const buffer = getComparisonBuffer();
        if (buffer.length > 0 && buffer[0].type !== 'SOL') {
            detailsContainer.innerHTML = `
                <p class="placeholder comparison-type-mismatch">
                    ⚠ Des OP sont déjà sélectionnés — videz la sélection avant de comparer des SOL.
                </p>`;
            return;
        }

        const label = `${enrichedProps.SOLOPStart} → ${enrichedProps.SOLOPEnd}`;
        const count = addToComparisonBuffer({ type: 'SOL', data: enrichedProps, label });
        updateComparisonBadge();

        if (!_comparisonLayers.has(label)) {
            _comparisonLayers.set(label, layer);
            _applyComparisonStyle(layer);
        }

        if (count >= 2) {
            renderCrossSOLComparison(
                detailsContainer,
                getComparisonBuffer().map(b => b.data),
            );
        } else {
            detailsContainer.innerHTML =
                `<p class="placeholder">Sélectionnez un 2ᵉ tronçon à comparer (${count}/2 sélectionné).</p>`;
        }
        return;
    }

    // ── 通常モード ────────────────────────────────────────────────────────
    clearOPSelection();

    const geojsonLayer    = getGeojsonLayer();
    const currentSelected = getSelectedLayers();

    currentSelected.forEach(l => {
        if (geojsonLayer && !isLayerSelected(l)) {
            const s  = getDefaultStyle(enrichFeature(l.feature), allFeatures);
            s.weight = getWeightForFeature(l.feature, zoom);
            l.setStyle(s);
        }
    });

    setSelectedLayer(layer);

    const selectedStyle  = getSelectedStyle();
    selectedStyle.weight = Math.max(getWeightForFeature(layer.feature, zoom) + 3, 5);
    layer.setStyle(selectedStyle);
    layer.bringToFront();

    if (layer.feature && layer.feature.properties) {
        updateSidebar(layer.feature.properties, allFeatures);
    } else {
        updateSidebar(null, allFeatures);
    }

    map.fitBounds(layer.getBounds());

    const currentMode = getCurrentColorMode();
    if (
        currentMode === 'IPP_StructureCheckLoc' ||
        currentMode === 'ILL_GradProfile'       ||
        currentMode === 'ILL_GaugeCheckLoc'
    ) {
        await showStructureLabelsForTroncon(
            map,
            enrichedProps,
            layer.feature.geometry ?? null,
            currentMode
        );
    } else {
        clearStructureLabels(map);
    }

    if (!isTunnelMode()) {
        renderAllComparisonTabsForSOL(detailsContainer, enrichedProps);
    } else {
        detailsContainer.innerHTML = renderFeatureFromGeoProps(enrichedProps, true);
    }
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: onFeatureMouseOver,
        mouseout:  onFeatureMouseOut,
        click:     onFeatureClick,
    });
}

function setupZoomHandler() {
    const map          = getMap();
    const geojsonLayer = getGeojsonLayer();
    if (!map || !geojsonLayer) return;
    map.on('zoomend', () => refreshLayerStyles());
}

export function loadGeojson() {
    const map = getMap();

    map.on('mouseout', () => {
        const selectedLayer = getSelectedLayer();
        if (hoveredLayer && hoveredLayer !== selectedLayer && !isLayerSelected(hoveredLayer) && !hoveredLayer._inComparison) {
            const s  = getDefaultStyle(enrichFeature(hoveredLayer.feature), allFeatures);
            s.weight = getWeightForFeature(hoveredLayer.feature, map.getZoom());
            hoveredLayer.setStyle(s);
        }
        hoveredLayer = null;
    });

    let geojsonUrl;
    if (isTunnelMode()) {
        if (!TUNNEL_GEOJSON_URL) throw new Error('TUNNEL_GEOJSON_URL n\'est pas configurée.');
        geojsonUrl = TUNNEL_GEOJSON_URL;
    } else {
        if (!SOL_GEOJSON_URL) throw new Error('SOL_GEOJSON_URL n\'est pas configurée.');
        geojsonUrl = SOL_GEOJSON_URL;
    }

    return fetch(geojsonUrl)
        .then(response => {
            if (!response.ok) throw new Error(`Échec du chargement GeoJSON (statut ${response.status})`);
            return response.json();
        })
        .then(data => {
            allFeatures = (data.features || []).map(f => enrichFeature(f));

            const initialZoom  = map.getZoom();
            const geojsonLayer = L.geoJSON(data, {
                style: (feature) => {
                    const style  = getDefaultStyle(enrichFeature(feature), allFeatures);
                    style.weight = getWeightForFeature(feature, initialZoom);
                    return style;
                },
                onEachFeature,
            }).addTo(map);

            const enriched = [];
            geojsonLayer.eachLayer(layer => {
                if (layer.feature) enriched.push(enrichFeature(layer.feature));
            });
            setAllFeatures(enriched);

            setGeojsonLayer(geojsonLayer);
            setupZoomHandler();

            const codeSet = new Set();
            geojsonLayer.eachLayer(layer => {
                const props  = layer.feature?.properties;
                if (!props)  return;
                const lineId = props.SOLLineIdentification;
                if (lineId != null && lineId !== '') codeSet.add(String(lineId));
            });

            setAllCodes(Array.from(codeSet).sort());
            console.log('Nombre de codes disponibles :', codeSet.size);
            map.fitBounds(geojsonLayer.getBounds());
            updateSidebar(null, allFeatures);
        })
        .catch(error => {
            console.error('Erreur lors du chargement GeoJSON :', error);
            throw error;
        });
}

export function findLayersByCode(code) {
    const geojsonLayer = getGeojsonLayer();
    if (!geojsonLayer) return [];

    const matches = [];
    const target  = String(code);
    geojsonLayer.eachLayer(layer => {
        const props  = layer.feature?.properties;
        if (!props)  return;
        const lineId = props.SOLLineIdentification;
        if (lineId !== undefined && lineId !== null && String(lineId) === target) matches.push(layer);
    });
    return matches;
}

export function findLayersByOP(opCode) {
    const geojsonLayer = getGeojsonLayer();
    if (!geojsonLayer) return [];

    const matches = [];
    const target  = String(opCode);
    geojsonLayer.eachLayer(layer => {
        const props   = layer.feature?.properties;
        if (!props)   return;
        const opStart = props.SOLOPStart;
        const opEnd   = props.SOLOPEnd;
        if (
            (opStart && String(opStart).includes(target)) ||
            (opEnd   && String(opEnd).includes(target))
        ) matches.push(layer);
    });
    return matches;
}

export function resetAllHighlights() {
    setSelectedLayers([]);
    setSelectedLayer(null);
    refreshLayerStyles();
}

export function clearSOLComparisonVisuals() {
    _comparisonLayers.forEach(bufferedLayer => {
        _removeComparisonStyle(bufferedLayer);
    });
    _comparisonLayers.clear();
    clearComparisonBuffer();
}

export function getAllFeatures() {
    return allFeatures;
}

export async function reloadGeojson(tunnelEnabled) {
    const map = getMap();
    if (!map) return;

    const currentLayer = getGeojsonLayer();
    if (currentLayer && map.hasLayer(currentLayer)) map.removeLayer(currentLayer);
    setGeojsonLayer(null);

    clearStructureLabels(map);
    setSelectedLayer(null);
    setSelectedLayers([]);
    setTunnelMode(tunnelEnabled);
    await loadGeojson();
}

export function zoomSolByOpPair(opStart, opEnd) {
    const geojsonLayer = getGeojsonLayer();
    const map          = getMap();
    if (!geojsonLayer || !map) return;

    const targetStart = String(opStart);
    const targetEnd   = String(opEnd);
    let targetLayer   = null;

    geojsonLayer.eachLayer(layer => {
        const p = layer.feature?.properties;
        if (!p) return;
        if (String(p.SOLOPStart) === targetStart && String(p.SOLOPEnd) === targetEnd) {
            targetLayer = layer;
        }
    });

    if (!targetLayer) return;
    map.fitBounds(targetLayer.getBounds());
}

export function highlightSolByOpPair(opStart, opEnd) {
    const geojsonLayer = getGeojsonLayer();
    const map          = getMap();
    if (!geojsonLayer || !map) return;

    const zoom = map.getZoom();
    resetAllHighlights();

    let target = null;
    geojsonLayer.eachLayer(layer => {
        const p = layer.feature?.properties;
        if (!p) return;
        if (p.SOLOPStart === opStart && p.SOLOPEnd === opEnd) target = layer;
    });
    if (!target) return;

    setSelectedLayer(target);
    const s  = getSelectedStyle();
    s.weight = Math.max(getWeightForFeature(target.feature, zoom) + 3, 5);
    target.setStyle(s);
    target.bringToFront();
}

export function highlightSolLine(lineCode) {
    const geojsonLayer = getGeojsonLayer();
    const map          = getMap();
    if (!geojsonLayer || !map) return;

    const zoom = map.getZoom();
    resetAllHighlights();

    const matched = [];
    geojsonLayer.eachLayer(layer => {
        const p = layer.feature?.properties;
        if (!p) return;
        if (String(p.SOLLineIdentification) === String(lineCode)) matched.push(layer);
    });
    if (!matched.length) return;

    setSelectedLayers(matched);
    matched.forEach(layer => {
        const s  = getSelectedStyle();
        s.weight = Math.max(getWeightForFeature(layer.feature, zoom) + 3, 5);
        layer.setStyle(s);
        layer.bringToFront();
    });

    const group = L.featureGroup(matched);
    map.fitBounds(group.getBounds());
}