// map/styles.js
// 前提：この関数に渡される feature は必ず enrichFeature() 済みであること。
// GeoJSON に直接 RINF データが載っていた旧仕様の分岐は削除済み。

import { getCurrentColorMode, getCategoryWidthOverride } from '../state.js';
import { COLOR_MODES } from '../config/colorModes.js';

const DEFAULT_STYLE = {
    weight:  3,
    opacity: 0.8,
};

const HOVER_STYLE = {
    weight:  5,
    opacity: 1.0,
    color:   '#FF6B00',
};

const SELECTED_STYLE = {
    weight:  5,
    opacity: 1.0,
    color:   '#FF0000',
};

/**
 * ズームレベルに応じた SOL 線の太さを返す。
 * layer_SOL.js でも使用する。
 */
export function getWeightForZoom(zoom) {
    if (zoom < 8)  return 4;
    if (zoom < 10) return 5;
    if (zoom < 12) return 6;
    return 3;
}

/**
 * enrich 済み feature の色を、現在のカラーモードに応じて返す。
 * @param {object} feature  - enrichFeature() 済みの GeoJSON feature
 * @param {object[]} allFeatures - 統計計算用の全 feature リスト（numerical モード用）
 */
function getFeatureColor(feature, allFeatures = []) {
    const modeId = getCurrentColorMode();
    const mode   = COLOR_MODES[modeId];

    if (!mode) return '#808080';

    // custom モード
    if (mode.kind === 'custom') {
        return mode.getColor(feature, allFeatures);
    }

    // categorical モード
    if (mode.kind === 'categorical') {
        if (typeof mode.getColor === 'function') {
            return mode.getColor(feature, allFeatures);
        }
        const value = feature.properties[mode.field];
        return mode.categories?.[value] || mode.defaultColor;
    }

    // numerical モード
    if (mode.kind === 'numerical') {
        if (typeof mode.getColor === 'function') {
            const rawValue = mode.extractValue
                ? mode.extractValue(feature.properties)
                : feature.properties[mode.field];

            if (mode.getColor.length === 1) {
                return mode.getColor(rawValue);
            }

            if (typeof mode.calculateBreaks === 'function') {
                const breakValues = mode.calculateBreaks(allFeatures);
                return mode.getColor(rawValue, breakValues);
            }

            console.warn(`[styles.js] Mode "${modeId}" requires calculateBreaks method`);
            return mode.defaultColor || '#CCCCCC';
        }

        // getColor なし
        const rawValue = mode.extractValue
            ? mode.extractValue(feature.properties)
            : feature.properties[mode.field];

        if (rawValue === null || rawValue === undefined) {
            return mode.defaultColor || '#CCCCCC';
        }

        return mode.defaultColor || '#CCCCCC';
    }

    return '#808080';
}

/**
 * enrich 済み feature に対する Leaflet スタイルオブジェクトを返す。
 * @param {object} feature     - enrichFeature() 済みの GeoJSON feature
 * @param {object[]} allFeatures - 統計計算用の全 feature リスト
 */
function getFeatureStyle(feature, allFeatures = []) {
    const modeId = getCurrentColorMode();
    const mode   = COLOR_MODES[modeId];

    const color = getFeatureColor(feature, allFeatures);
    const style = { ...DEFAULT_STYLE, color };

    if (!mode) return style;

    if (typeof mode.getWeightForFeature === 'function') {
        const w = mode.getWeightForFeature(feature);
        if (w != null) style.weight = w;
        return style;
    }

    if (typeof mode.getStyleCategoryId === 'function') {
        const categoryId    = mode.getStyleCategoryId(feature);
        const widthOverride = getCategoryWidthOverride(modeId, categoryId);
        if (widthOverride != null) style.weight = widthOverride;
    }

    return style;
}

export function getDefaultStyle(feature, allFeatures = []) {
    return getFeatureStyle(feature, allFeatures);
}

export function getHoverStyle() {
    return { ...HOVER_STYLE };
}

export function getSelectedStyle() {
    return { ...SELECTED_STYLE };
}
