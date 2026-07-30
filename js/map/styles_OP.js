// map/styles_OP.js
// OP（points opérationnels）専用のスタイルロジック

import { lookupOP } from '../../data/data_loader.js';
import {
    getOpCurrentColorMode,
    getOpCategoryVisibility,
    getOpCategoryWidthOverride,
    isOpStrokeEnabled,
    getOpStrokeColor,
    getOpStrokeWidth,
    getOpSubMode,
} from '../state.js';
import { COLOR_MODES } from '../config/colorModes.js';

// ベーススタイル（ストロークは getStrokeOptions() で動的に付与）
const OP_BASE_STYLE = {
    radius:      5,
    fillColor:   '#cccccc',
    fillOpacity: 0.85,
    opacity:     1,
};

// ── サブモード別：OP が対応する構造を持つか判定 ────────────────────────────
function hasSubModeStructure(opData, subMode) {
    switch (subMode) {
        case 'siding':
            return Array.isArray(opData?.OPSiding) && opData.OPSiding.length > 0;
        case 'platform':
            return Array.isArray(opData?.OPTrack) &&
                opData.OPTrack.some(t =>
                    Array.isArray(t?.OPTrackPlatform) && t.OPTrackPlatform.length > 0
                );
        case 'tunnel':
            return Array.isArray(opData?.OPTrack) &&
                opData.OPTrack.some(t =>
                    Array.isArray(t?.OPTrackTunnel) && t.OPTrackTunnel.length > 0
                );
        default:
            return true; // 通常モードは全表示
    }
}

// ストローク設定を state から読み取って返すヘルパー
function getStrokeOptions() {
    if (isOpStrokeEnabled()) {
        return {
            color:   getOpStrokeColor(),
            weight:  getOpStrokeWidth(),
            opacity: 1,
        };
    }
    return {
        color:   'transparent',
        weight:  0,
        opacity: 0,
    };
}

// 選択時スタイル — stroke 設定を考慮しつつ、常に識別できる縁を表示
export function getOpSelectedStyle() {
    const strokeEnabled = isOpStrokeEnabled();
    return {
        radius:      7,
        fillColor:   '#c0392b',
        fillOpacity: 1,
        color:       strokeEnabled ? getOpStrokeColor() : '#922a21',
        weight:      strokeEnabled ? Math.max(getOpStrokeWidth(), 2.5) : 2.5,
        opacity:     1,
    };
}

/**
 * 現在の OP カラーモード・可視性・ストローク設定に基づいてスタイルを返す
 */
export function getOpStyleForFeature(feature) {
    const modeId = getOpCurrentColorMode();
    const mode   = modeId ? COLOR_MODES[modeId] : null;

    if (!mode) return { ...OP_BASE_STYLE, ...getStrokeOptions() };

    const visibilityMap = getOpCategoryVisibility() || {};

    const uniqueOPID = feature.properties?.UniqueOPID;
    const opData     = uniqueOPID ? lookupOP(uniqueOPID) : null;

    if (!opData) return { ...OP_BASE_STYLE, ...getStrokeOptions() };

    // サブモードに対応する構造を持たない OP は非表示
    const subMode = getOpSubMode();
    if (!hasSubModeStructure(opData, subMode)) {
        return {
            radius:      0,
            weight:      0,
            opacity:     0,
            fillOpacity: 0,
            color:       'transparent',
        };
    }

    const xmlFeature = { properties: opData };

    const categoryId = typeof mode.getStyleCategoryId === 'function'
        ? mode.getStyleCategoryId(xmlFeature)
        : null;

    // 非表示カテゴリ — ヒットエリアを消す
    if (categoryId && visibilityMap[categoryId] === false) {
        return {
            radius:      0,
            weight:      0,
            opacity:     0,
            fillOpacity: 0,
            color:       'transparent',
        };
    }

    // 塗り色（数値モードと概念モードで getColor への渡し方を切り分け）
    let fillColor = OP_BASE_STYLE.fillColor;
    if (typeof mode.getColor === 'function') {
        try {
            if (mode.kind === 'numerical' && typeof mode.extractValue === 'function') {
                const rawValue = mode.extractValue(xmlFeature.properties);
                fillColor = mode.getColor(rawValue) || fillColor;
            } else {
                fillColor = mode.getColor(xmlFeature) || fillColor;
            }
        } catch (e) {
            console.warn('[styles_OP] getColor error for mode', modeId, e);
        }
    }

    // 半径（幅オーバーライド）
    let radius = OP_BASE_STYLE.radius;
    if (categoryId) {
        const widthOverride = getOpCategoryWidthOverride(modeId, categoryId);
        if (typeof widthOverride === 'number') radius = widthOverride;
    }

    return {
        ...OP_BASE_STYLE,
        ...getStrokeOptions(),
        fillColor,
        radius,
    };
}

/**
 * 「実質非表示」スタイルかどうか（pointer-events 制御に使用）
 */
export function isOpFeatureHidden(style) {
    return style.fillOpacity === 0 && style.radius === 0;
}