// config/mode/conceptMode.js
import { rinfParams } from '/../../../data/rinf_parameters_final.js';
import {
    // SOL 用
    getCategoryVisibility,
    getCategoryColorOverride,
    getCategoryWidthOverride,
    getCategoryOrderOverride,
    // OP 用
    getOpCategoryVisibility,
    getOpCategoryColorOverride,
    getOpCategoryWidthOverride,
    getOpCategoryOrderOverride,
} from '../../state.js';


const DEFAULT_PALETTE = [
    '#e31a1c', // 赤
    '#ff7f00', // オレンジ
    '#f9c74f', // 黄
    '#33a02c', // 緑
    '#1b9e77', // 青緑
    '#17becf', // シアン
    '#1f78b4', // 青
    '#5254a3', // インディゴ
    '#7b2d8b', // バイオレット
    '#e7298a', // マゼンタ
    '#d4526e', // 赤みのピンク
    '#a6761d', // 黄土色
    '#264653', // 暗い青灰
    '#8c564b', // 赤茶
    '#bcbd22', // オリーブ系
    '#666666', // ニュートラルグレー
];

const sharedColorCache = new Map();

export const CONCEPT_NO_DATA_COLOR = '#cccccc';

// ★ コード文字列から決定的なパレット色を返す簡易ハッシュ
function colorFromCode(code) {
    if (!code) return CONCEPT_NO_DATA_COLOR;
    let h = 0;
    for (let i = 0; i < code.length; i++) {
        h = ((h << 5) - h) + code.charCodeAt(i);
        h |= 0;
    }
    return DEFAULT_PALETTE[Math.abs(h) % DEFAULT_PALETTE.length];
}

// ─── 値抽出（SOL 用：既存ロジックそのまま）────────────────────────────

export function extractConceptValues(properties, paramId) {
    if (!properties) return [];
    if (Array.isArray(properties.SOLTrack)) {
        for (const track of properties.SOLTrack) {
            if (!Array.isArray(track?.SOLTrackParameter)) continue;
            const param = track.SOLTrackParameter.find(p => p.ID === paramId);
            if (param) {
                const raw = Array.isArray(param.Value)
                    ? param.Value
                    : param.Value != null ? [param.Value] : [];
                return raw.map(v => String(v).trim()).filter(Boolean);
            }
        }
    }
    const direct = properties[paramId];
    if (direct == null) return [];
    if (Array.isArray(direct)) return direct.map(v => String(v).trim()).filter(Boolean);
    return [String(direct).trim()].filter(Boolean);
}

export function extractConceptSingleValue(properties, paramId) {
    const vals = extractConceptValues(properties, paramId);
    return vals.length > 0 ? vals[0] : null;
}

// ─── 値抽出（Tunnel 用：OPTrackTunnelParameter を見る）─────────────────────

export function extractTunnelConceptValues(properties, paramId) {
    if (!properties) return [];

    // 1) まず OPTrackTunnelParameter を優先（OP 側からの ITU_*）
    let params = properties.OPTrackTunnelParameter;

    // 2) 無ければ SOL 側の SOLTunnelParameter をフォールバック
    if (!Array.isArray(params)) {
        if (Array.isArray(properties.SOLTrack)) {
            // 単純化: 1つ目の Track / 1つ目の Tunnel を見る
            const track  = properties.SOLTrack[0];
            const tunnels = Array.isArray(track?.SOLTunnel)
                ? track.SOLTunnel
                : track?.SOLTunnel ? [track.SOLTunnel] : [];
            const firstTunnel = tunnels[0];
            if (Array.isArray(firstTunnel?.SOLTunnelParameter)) {
                params = firstTunnel.SOLTunnelParameter;
            }
        }
    }

    if (!Array.isArray(params)) return [];

    const values = [];
    for (const p of params) {
        if (!p || p.ID !== paramId) continue;
        const raw = Array.isArray(p.Value)
            ? p.Value
            : p.Value != null ? [p.Value] : [];
        for (const v of raw) {
            const s = String(v).trim();
            if (s) values.push(s);
        }
    }
    return values;
}

export function extractTunnelSingleValue(properties, paramId) {
    const vals = extractTunnelConceptValues(properties, paramId);
    return vals.length > 0 ? vals[0] : null;
}

// ─── 共通ヘルパー（サブモード extractor 用）────────────────────────────────
function collectParamValues(paramsList, paramId) {
    if (!Array.isArray(paramsList)) return [];
    const values = [];
    for (const p of paramsList) {
        if (!p || p.ID !== paramId) continue;
        const raw = Array.isArray(p.Value) ? p.Value : p.Value != null ? [p.Value] : [];
        for (const v of raw) { const s = String(v).trim(); if (s) values.push(s); }
    }
    return values;
}

// ─── OP Siding: OPSiding[].OPSidingParameter[] ────────────────────────────
export function extractSidingConceptValues(properties, paramId) {
    if (!Array.isArray(properties?.OPSiding)) return [];
    const values = [];
    for (const siding of properties.OPSiding) {
        collectParamValues(siding?.OPSidingParameter, paramId).forEach(v => values.push(v));
    }
    return [...new Set(values)];
}
export function extractSidingSingleValue(properties, paramId) {
    return extractSidingConceptValues(properties, paramId)[0] ?? null;
}

// ─── OP Platform: OPTrack[].OPTrackPlatform[].OPTrackPlatformParameter[] ──
export function extractPlatformConceptValues(properties, paramId) {
    if (!Array.isArray(properties?.OPTrack)) return [];
    const values = [];
    for (const track of properties.OPTrack) {
        for (const pf of (track?.OPTrackPlatform || [])) {
            collectParamValues(pf?.OPTrackPlatformParameter, paramId).forEach(v => values.push(v));
        }
    }
    return [...new Set(values)];
}
export function extractPlatformSingleValue(properties, paramId) {
    return extractPlatformConceptValues(properties, paramId)[0] ?? null;
}

// ─── OP Tunnel: OPTrack[].OPTrackTunnel[].OPTrackTunnelParameter[] ────────
export function extractOPTunnelConceptValues(properties, paramId) {
    if (!Array.isArray(properties?.OPTrack)) return [];
    const values = [];
    for (const track of properties.OPTrack) {
        for (const tu of (track?.OPTrackTunnel || [])) {
            collectParamValues(tu?.OPTrackTunnelParameter, paramId).forEach(v => values.push(v));
        }
    }
    return [...new Set(values)];
}
export function extractOPTunnelSingleValue(properties, paramId) {
    return extractOPTunnelConceptValues(properties, paramId)[0] ?? null;
}



// ─── 値抽出（OP 用：OPTrack / OPSiding 等を走査）────────────────────────

export function extractOpConceptValues(properties, paramId) {
    if (!properties) {
        return [];
    }

    const values = new Set();

    const addFromParams = (params) => {
        if (!Array.isArray(params)) {
            return;
        }
        for (const p of params) {
            if (!p || p.ID !== paramId) {
                continue;
            }
            const raw = Array.isArray(p.Value)
                ? p.Value
                : p.Value != null ? [p.Value] : [];
            for (const v of raw) {
                const s = String(v).trim();
                if (s) values.add(s);
            }
        }
    };

    // OPTrack / Platform / Tunnel
    if (Array.isArray(properties.OPTrack)) {
        for (const track of properties.OPTrack) {
            if (!track) continue;
            addFromParams(track.OPTrackParameter);
            if (Array.isArray(track.OPTrackPlatform)) {
                for (const pf of track.OPTrackPlatform) {
                    addFromParams(pf?.OPTrackPlatformParameter);
                }
            }
            if (Array.isArray(track.OPTrackTunnel)) {
                for (const tu of track.OPTrackTunnel) {
                    addFromParams(tu?.OPTrackTunnelParameter);
                }
            }
        }
    }

    // OPSiding
    if (Array.isArray(properties.OPSiding)) {
        for (const siding of properties.OPSiding) {
            addFromParams(siding?.OPSidingParameter);
        }
    }

    if (values.size > 0) {
        return [...values];
    }

    // フォールバック：直下プロパティ
    const direct = properties[paramId];
    if (direct == null) {
        return [];
    }
    if (Array.isArray(direct)) {
        return direct.map(v => String(v).trim()).filter(Boolean);
    }
    return [String(direct).trim()].filter(Boolean);
}


// ─── ラベル取得 ────────────────────────────────────────────────────────

function getLabelsFromMeta(paramId) {
    const meta = rinfParams[paramId];
    if (!meta) return {};

    if (Array.isArray(meta.values)) {
        const map = {};
        for (const v of meta.values) {
            if (!v) continue;
            const code  = v.code != null ? String(v.code).trim() : null;
            if (!code) continue;
            const label = (v.value != null ? String(v.value).trim() : code);
            map[code] = label;
        }
        if (Object.keys(map).length > 0) return map;
    }

    if (meta.value_map && typeof meta.value_map === 'object' && !Array.isArray(meta.value_map)) {
        return meta.value_map;
    }

    return {};
}

// ─── ファクトリ（SOL / OP 両対応）───────────────────────────────────────

/**
 * buildConceptMode(paramId, config)
 *
 * 追加オプション:
 *   - scope: 'SOL' | 'OP'（デフォルト 'SOL'）
 *   - idOverride: string
 *   - extractValues: (props, paramId, scope) => string[]
 *   - orderedCodes: string[]
 *   - labels: { code: label }  ※ rinf のラベルを上書き
 */
export function buildConceptMode(paramId, config = {}) {
    const meta          = rinfParams[paramId] || {};
    const modeLabel     = meta.title || paramId;
    const noDataColor   = config.noDataColor   ?? CONCEPT_NO_DATA_COLOR;
    const hideUnchecked = config.hideUnchecked ?? true;
    const scope         = config.scope || 'SOL';   // 'SOL' or 'OP'
    const modeId        = config.idOverride || paramId;

    // ★ rinf からラベルと「コード順」を取得
    const metaLabelMap     = getLabelsFromMeta(paramId);     // { code → label }
    const metaOrderedCodes = Object.keys(metaLabelMap);      // values / value_map の順

    // ★ config.labels は rinf ラベルを上書きするだけ（順序は metaOrderedCodes が基準）
    const labelsSource = { ...metaLabelMap, ...(config.labels || {}) };
    const getLabel     = (code) => labelsSource[code] || code;

    // 1. paramId に基づく共有カラーマップを取得または作成
    if (!sharedColorCache.has(paramId)) {
        sharedColorCache.set(paramId, new Map());
    }
    const sharedColors = sharedColorCache.get(paramId);

    // scope に応じて使う state アクセサを切り替え
    const getVisibility =
        scope === 'OP' ? getOpCategoryVisibility : getCategoryVisibility;
    const getColorOverrideFn =
        scope === 'OP' ? getOpCategoryColorOverride : getCategoryColorOverride;
    const getWidthOverrideFn =
        scope === 'OP' ? getOpCategoryWidthOverride : getCategoryWidthOverride;
    const getOrderOverrideFn =
        scope === 'OP' ? getOpCategoryOrderOverride : getCategoryOrderOverride;

    // 値抽出も scope で切り替え
    const extractValues =
        typeof config.extractValues === 'function'
            ? (props) => config.extractValues(props, paramId, scope)
            : (props) => (scope === 'OP'
                ? extractOpConceptValues(props, paramId)
                : extractConceptValues(props, paramId));


    function resolveColor(code) {
        if (!code) return noDataColor;
        if (sharedColors.has(code)) return sharedColors.get(code);
        const newColor = colorFromCode(code);
        sharedColors.set(code, newColor);
        return newColor;
    }

    function ensureColors(features = []) {
        if (!features.length) return;
        const usedCodes = new Set();
        for (const f of features) {
            extractValues(f?.properties).forEach(v => usedCodes.add(v));
        }
        for (const code of usedCodes) {
            resolveColor(code);
        }
    }

    // ★ 並び順決定ロジックに rinf の values 順を組み込む
    function getOrderForValues(values) {
        // ① ユーザーによるドラッグ順（modeId ごとの override）を最優先
        const override = getOrderOverrideFn(modeId);
        if (override && override.length) {
            const valueSet = new Set(values);
            const orderedFromOverride = override.filter(c => valueSet.has(c));
            const remaining           = values.filter(c => !override.includes(c));
            return orderedFromOverride.concat(remaining);
        }

        // ② 明示的に orderedCodes が指定されていればそれを使う
        if (config.orderedCodes?.length) {
            return config.orderedCodes;
        }

        // ③ rinfParams の values / value_map の順
        if (metaOrderedCodes.length) {
            const valueSet         = new Set(values);
            const orderedFromMeta  = metaOrderedCodes.filter(c => valueSet.has(c));
            const remaining        = values.filter(c => !metaOrderedCodes.includes(c));
            return orderedFromMeta.concat(remaining);
        }

        // ④ labelsSource のキー順（必要なら）
        const labelKeys = Object.keys(labelsSource);
        if (labelKeys.length) {
            const valueSet           = new Set(values);
            const orderedFromLabels  = labelKeys.filter(c => valueSet.has(c));
            const remaining          = values.filter(c => !labelKeys.includes(c));
            return orderedFromLabels.concat(remaining);
        }

        // ⑤ 何もなければ、実際に出現した値の順
        return values;
    }

    const mode = {
        id: modeId,
        label: modeLabel,
        kind:  'categorical',
        field: paramId,
        scope,
        supportsFiltering: true,
        hideUnchecked,
        showSelectAll: true,
        defaultColor: noDataColor,

        getColor(feature) {
            const values = extractValues(feature?.properties);
            if (!values.length) return noDataColor;

            const visibilityMap = getVisibility() || {};
            const order         = getOrderForValues(values);

            const visibleSelected = order.find(
                code => values.includes(code) && visibilityMap[code] !== false
            );

            const selected =
                visibleSelected ||
                order.find(code => values.includes(code)) ||
                values[0];

            const overrideColor = getColorOverrideFn(modeId, selected);
            return overrideColor || resolveColor(selected);
        },

        getStyleCategoryId(feature) {
            const values = extractValues(feature?.properties);
            if (!values.length) return 'no-data';

            const visibilityMap = getVisibility() || {};
            const order         = getOrderForValues(values);

            const visibleSelected = order.find(
                code => values.includes(code) && visibilityMap[code] !== false
            );
            return visibleSelected
                || order.find(code => values.includes(code))
                || values[0]
                || 'no-data';
        },

        getWeightForFeature(feature) {
            const values = extractValues(feature?.properties);
            if (!values.length) return null;

            const visibilityMap = getVisibility() || {};
            const order         = getOrderForValues(values);

            const visibleSelected = order.find(
                code => values.includes(code) && visibilityMap[code] !== false
            );
            if (!visibleSelected) return null;

            return getWidthOverrideFn(modeId, visibleSelected) ?? null;
        },

        getLegendItems(features = []) {
            ensureColors(features);

            const usedCodes = new Set();

            // 実データから出現コードを収集
            for (const f of (features || [])) {
                extractValues(f?.properties).forEach(v => usedCodes.add(v));
            }

            // ★ rinf の全コードも必ず凡例候補に含める
            //metaOrderedCodes.forEach(code => usedCodes.add(code));

            const order = getOrderForValues(Array.from(usedCodes));
            const items = [
                ...order.map(code => ({
                    id:    code,
                    label: getLabel(code),
                    color: resolveColor(code),
                })),
                { id: 'no-data', label: 'Données manquantes', color: noDataColor },
            ];

            return items.map(item => ({
                ...item,
                color: getColorOverrideFn(modeId, item.id) || item.color,
            }));
        },

        getFilterIds(feature) {
            return extractValues(feature?.properties);
        },
    };

    if (config.getDefaultVisibility) mode.getDefaultVisibility = config.getDefaultVisibility;
    return mode;
}