// state.js

import { COLOR_MODES,  DEFAULT_COLOR_MODE, DEFAULT_OP_COLOR_MODE  } from './config/colorModes.js';
import { clearStructureLabels } from './config/mode/pkLocationPointsOnClick.js';

// ─────────────────────────────────────────────────────────────────
// 1. MAP & LAYERS — 地図・レイヤー（共通）
// ─────────────────────────────────────────────────────────────────

let map           = null;
let geojsonLayer  = null;
let selectedLayer = null;
let selectedLayers = [];
let allCodes      = [];

export function getMap()              { return map; }
export function setMap(m)             { map = m; }

export function getGeojsonLayer()     { return geojsonLayer; }
export function setGeojsonLayer(l)    { geojsonLayer = l; }

export function getSelectedLayer()    { return selectedLayer; }
export function setSelectedLayer(layer) {
    selectedLayer  = layer;
    selectedLayers = layer ? [layer] : [];
}

export function getSelectedLayers()   { return selectedLayers; }
export function setSelectedLayers(layers) { selectedLayers = layers; }

export function getAllCodes()          { return allCodes; }
export function setAllCodes(codes)    { allCodes = codes; }

// ─────────────────────────────────────────────────────────────────
// 2. RINF DATA — 参照データ（共通）
// ─────────────────────────────────────────────────────────────────

let rinfByCompositeKey = new Map();
let rinfLoaded = false;

export function isRinfLoaded() { return rinfLoaded; }

export function setRinfData(dataByCompositeKey) {
    rinfByCompositeKey = dataByCompositeKey || {};
    rinfLoaded = true;
    console.log('[RINF] Data set. Keys:', Object.keys(rinfByCompositeKey).length);
}

function makeCompositeKey(lineId, opStart, opEnd) {
    return `${lineId}|${opStart}|${opEnd}`;
}

export function getRinfForFeature(properties) {
    if (!properties) return null;
    const { SOLLineIdentification: lineId, SOLOPStart: opStart, SOLOPEnd: opEnd } = properties;
    if (!lineId || !opStart || !opEnd) {
        console.log('[RINF] Missing keys:', { lineId, opStart, opEnd });
        return null;
    }
    const key    = makeCompositeKey(lineId, opStart, opEnd);
    const result = rinfByCompositeKey[key] || null;
    console.log('[RINF] Lookup key:', key, '→', result ? `${result.length} rows` : 'null');
    return result;
}

// ─────────────────────────────────────────────────────────────────
// 3. LAYER VISIBILITY TOGGLES — レイヤー表示切り替え
// ─────────────────────────────────────────────────────────────────

// SOL: トンネルモード
let tunnelMode = false;
export function isTunnelMode()          { return tunnelMode; }
export function setTunnelMode(value)    { tunnelMode = value; }

// OP: レイヤー表示フラグ
// was: _opLayerVisible
let opLayerVisible = false;
export function isOPLayerVisible()      { return opLayerVisible; }
export function setOPLayerVisible(v)    { opLayerVisible = v; }

// ─── OP サブモード（Siding / Platform / Tunnel）───────────────────────────
// 'normal' | 'siding' | 'platform' | 'tunnel'
let opSubMode = 'normal';
export function getOpSubMode()       { return opSubMode; }
export function setOpSubMode(mode)   { opSubMode = mode; }

// ─────────────────────────────────────────────────────────────────
// 4. SOL — グラフィックパラメーター
// ─────────────────────────────────────────────────────────────────

// was: allFeatures
let solFeatures = [];
export function getAllFeatures()            { return solFeatures; }          // 後方互換
export function getSolFeatures()            { return solFeatures; }
export function setAllFeatures(features)    { solFeatures = features; }     // 後方互換
export function setSolFeatures(features)    { solFeatures = features; }

// was: currentColorMode
let solCurrentColorMode = DEFAULT_COLOR_MODE;
export function getCurrentColorMode()       { return solCurrentColorMode; } // 後方互換
export function getSolCurrentColorMode()    { return solCurrentColorMode; }

// was: categoryVisibility
let solCategoryVisibility = {};
export function getCategoryVisibility()     { return solCategoryVisibility; }        // 後方互換
export function getSolCategoryVisibility()  { return solCategoryVisibility; }
export function setCategoryVisibility(categoryId, isVisible) {
    solCategoryVisibility[categoryId] = isVisible;
}
export function toggleCategoryVisibility(categoryId) {
    solCategoryVisibility[categoryId] = !solCategoryVisibility[categoryId];
}

// was: categoryColorOverrides
let solColorOverrides = {};
export function getCategoryColorOverride(modeId, categoryId) {
    return solColorOverrides[modeId]?.[categoryId] || null;
}
export function setCategoryColorOverride(modeId, categoryId, color) {
    if (!solColorOverrides[modeId]) solColorOverrides[modeId] = {};
    solColorOverrides[modeId][categoryId] = color;
}

// was: categoryWidthOverrides
let solWidthOverrides = {};
export function getCategoryWidthOverride(modeId, categoryId) {
    return solWidthOverrides[modeId]?.[categoryId] ?? null;
}
export function setCategoryWidthOverride(modeId, categoryId, width) {
    if (!solWidthOverrides[modeId]) solWidthOverrides[modeId] = {};
    solWidthOverrides[modeId][categoryId] = width;
}

// was: categoryOrderOverrides
let solOrderOverrides = {};
export function getCategoryOrderOverride(modeId) {
    return solOrderOverrides[modeId] || null;
}
export function setCategoryOrderOverride(modeId, order) {
    solOrderOverrides[modeId] = Array.isArray(order) ? [...order] : null;
}

// 複数値パラメーター（SOL 固有）
let multiValueParamIds = new Set();
export function setMultiValueParams(paramIds)  { multiValueParamIds = new Set(paramIds || []); }
export function markParamAsMultiValued(paramId) { if (paramId) multiValueParamIds.add(paramId); }
export function isParamMultiValued(paramId)    { return multiValueParamIds.has(paramId); }

// ─────────────────────────────────────────────────────────────────
// 5. SOL — モード変更・可視性初期化
// ─────────────────────────────────────────────────────────────────

/**
 * modeId に対応するデフォルト可視性マップを返す（SOL / OP 共通ロジック）
 */
export function getDefaultVisibilityForMode(modeId, features = []) {
    const mode = COLOR_MODES[modeId];
    if (!mode?.supportsFiltering) return {};
    if (typeof mode.getDefaultVisibility === 'function') {
        return mode.getDefaultVisibility(features);
    }
    const items = typeof mode.getLegendItems === 'function'
        ? (mode.getLegendItems(features) || [])
        : [];
    const visibility = {};
    items.forEach(item => {
        if (item.id && !item.isSelectAll && !item.isHeader) {
            visibility[item.id] = true;
        }
    });
    return visibility;
}

/**
 * SOL カラーモード変更 — 可視性マップを初期化する
 * was: setCurrentColorMode
 */
export function setCurrentColorMode(modeId) {
    solCurrentColorMode  = modeId;
    solCategoryVisibility = { ...getDefaultVisibilityForMode(modeId, solFeatures) };
    console.log(`[SOL] Mode → ${modeId}`, solCategoryVisibility);
    if (map && modeId !== 'IPP_StructureCheckLoc') clearStructureLabels(map);
}
// 新規 SOL 専用エイリアス
export const setSolCurrentColorMode = setCurrentColorMode;

// ─────────────────────────────────────────────────────────────────
// 6. OP — グラフィックパラメーター（SOL と対称）
// ─────────────────────────────────────────────────────────────────

let opFeatures = [];
export function getOpFeatures()          { return opFeatures; }
export function setOpFeatures(features) {
    opFeatures = features;
    // ← features ロード後に visibility を再計算
    if (opCurrentColorMode) {
        opCategoryVisibility = { ...getDefaultVisibilityForMode(opCurrentColorMode, opFeatures) };
        console.log(`[OP] visibility recalculated after setOpFeatures`, opCategoryVisibility);
    }
}

// TODO: OP 用デフォルトモードは colorModes.js に OP_*** を追加後に確定させる
let opCurrentColorMode = DEFAULT_OP_COLOR_MODE; // デフォルトモードを設定
export function getOpCurrentColorMode()  { return opCurrentColorMode; }
export function setOpCurrentColorMode(modeId) {
    opCurrentColorMode    = modeId;
    // 初回ロード時も visibility が作られるように
    opCategoryVisibility  = { ...getDefaultVisibilityForMode(modeId, opFeatures) };
    console.log(`[OP] Mode → ${modeId}`, opCategoryVisibility);
}

let opCategoryVisibility = {};
export function getOpCategoryVisibility()                  { return opCategoryVisibility; }
export function setOpCategoryVisibility(categoryId, v)     { opCategoryVisibility[categoryId] = v; }
export function toggleOpCategoryVisibility(categoryId) {
    opCategoryVisibility[categoryId] = !opCategoryVisibility[categoryId];
}

let opColorOverrides = {};
export function getOpCategoryColorOverride(modeId, categoryId) {
    return opColorOverrides[modeId]?.[categoryId] || null;
}
export function setOpCategoryColorOverride(modeId, categoryId, color) {
    if (!opColorOverrides[modeId]) opColorOverrides[modeId] = {};
    opColorOverrides[modeId][categoryId] = color;
}

let opWidthOverrides = {};
export function getOpCategoryWidthOverride(modeId, categoryId) {
    return opWidthOverrides[modeId]?.[categoryId] ?? null;
}
export function setOpCategoryWidthOverride(modeId, categoryId, width) {
    if (!opWidthOverrides[modeId]) opWidthOverrides[modeId] = {};
    opWidthOverrides[modeId][categoryId] = width;
}

let opOrderOverrides = {};
export function getOpCategoryOrderOverride(modeId) {
    return opOrderOverrides[modeId] || null;
}
export function setOpCategoryOrderOverride(modeId, order) {
    opOrderOverrides[modeId] = Array.isArray(order) ? [...order] : null;
}

// ─────────────────────────────────────────────────────────────────
// 7. OP — ストローク（縁の塗）設定 ★ NEW
// ─────────────────────────────────────────────────────────────────

// デフォルト: ストロークなし、色は黒
let opStrokeEnabled = true;
let opStrokeColor   = '#000000';
let opStrokeWidth   = 1;

export function isOpStrokeEnabled()          { return opStrokeEnabled; }
export function setOpStrokeEnabled(enabled)  { opStrokeEnabled = !!enabled; }

export function getOpStrokeColor()           { return opStrokeColor; }
export function setOpStrokeColor(color)      { opStrokeColor = color; }

export function getOpStrokeWidth()           { return opStrokeWidth; }
export function setOpStrokeWidth(width)      { opStrokeWidth = Math.max(0.5, Math.min(5, Number(width) || 1)); }

// ─── SOL エイリアス（index_sidebar.js 向け） ──────────────────────
export const setSolCategoryVisibility    = setCategoryVisibility;
export const setSolCategoryColorOverride = setCategoryColorOverride;
export const getSolCategoryWidthOverride = getCategoryWidthOverride;
export const setSolCategoryWidthOverride = setCategoryWidthOverride;
export const setSolCategoryOrderOverride = setCategoryOrderOverride;


// ─────────────────────────────────────────────────────────────────
// 8. COMPARISON MODE — 複数地物間比較
// ─────────────────────────────────────────────────────────────────

let _comparisonMode   = false;
let _comparisonBuffer = [];  // { type: 'SOL'|'OP', data: object, label: string }[]

export function isComparisonMode()       { return _comparisonMode; }
export function setComparisonMode(v)     { _comparisonMode = !!v; }

export function getComparisonBuffer()    { return [..._comparisonBuffer]; }
export function getComparisonBufferSize(){ return _comparisonBuffer.length; }

export function addToComparisonBuffer(item) {
    // 同一地物の重複追加を防ぐ（labelで簡易チェック）
    const alreadyExists = _comparisonBuffer.some(
        b => b.type === item.type && b.label === item.label
    );
    if (!alreadyExists) _comparisonBuffer.push(item);
    return _comparisonBuffer.length;
}

export function removeFromComparisonBuffer(label) {
    _comparisonBuffer = _comparisonBuffer.filter(b => b.label !== label);
    return _comparisonBuffer.length;
}

export function clearComparisonBuffer()  { _comparisonBuffer = []; }










