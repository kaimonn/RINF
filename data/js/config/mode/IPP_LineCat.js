// config/mode/IPP_LineCat.js

import { rinfParams } from '../../../data/rinf_parameters_final.js';        // ★ 依存先を変更
import { extractConceptValues } from './conceptMode.js';

// ─────────────────────────────────────────────────────────────
// ラベルマップ: rinfParams.IPP_LineCat.values から { code: label } を構築
// ─────────────────────────────────────────────────────────────

function buildLabelsFromMeta(paramId) {
    const meta = rinfParams[paramId];
    if (!meta) return {};

    if (Array.isArray(meta.values)) {
        const map = {};
        for (const v of meta.values) {
            if (!v || v.code == null) continue;
            const code  = String(v.code).trim();
            const label = String(v.value ?? v.code).trim();
            map[code] = label;
        }
        return map;
    }

    if (meta.value_map && typeof meta.value_map === 'object') {
        return meta.value_map;
    }

    return {};
}

const IPP_LINE_CAT_LABELS = buildLabelsFromMeta('IPP_LineCat');

// 旅客用カラー（寒色系）
export const IPP_PASSENGER_COLORS = {
    '10': '#E3F2FD', '20': '#BBDEFB', '30': '#90CAF9',
    '40': '#64B5F6', '50': '#42A5F5', '60': '#1E88E5',
    '70': '#4FC3F7', '80': '#0288D1',
};

// 貨物用カラー（暖色系）
export const IPP_FREIGHT_COLORS = {
    '90':  '#FFF3E0', '100': '#FFE0B2', '110': '#FFCC80',
    '120': '#FFB74D', '130': '#FF9800', '140': '#F57C00',
};

export const LINE_CAT_NO_PASSENGER_COLOR = '#BDBDBD';
export const LINE_CAT_NO_FREIGHT_COLOR   = '#BDBDBD';
export const LINE_CAT_NO_DATA_COLOR      = '#EEEEEE';

// ─────────────────────────────────────────────────────────────
// 値の抽出（SOL / OP）
// ─────────────────────────────────────────────────────────────

function extractIPPLineCatValues(properties) {
    return extractConceptValues(properties, 'IPP_LineCat'); // SOL 側
}

function extractOPIPPLineCatValues(properties) {
    if (!properties || !Array.isArray(properties.OPTrack)) return [];

    let allValues = [];
    for (const track of properties.OPTrack) {
        if (!Array.isArray(track.OPTrackParameter)) continue;
        const param = track.OPTrackParameter.find(
            p => (p.ID || '').trim() === 'IPP_LineCat'
        );
        if (param && Array.isArray(param.Value) && param.Value.length > 0) {
            allValues = allValues.concat(param.Value);
        }
    }
    return allValues;
}

// ─────────────────────────────────────────────────────────────
// P系 / F系 判定（ラベル先頭が 'P' / 'F'）
// ─────────────────────────────────────────────────────────────

function isPassengerCode(code) {
    const label = IPP_LINE_CAT_LABELS[code];
    return typeof label === 'string' && label.startsWith('P');
}

function isFreightCode(code) {
    const label = IPP_LINE_CAT_LABELS[code];
    return typeof label === 'string' && label.startsWith('F');
}

// ─────────────────────────────────────────────────────────────
// SOL 用ヘルパー
// ─────────────────────────────────────────────────────────────

function getColorForPassenger(feature) {
    const props   = feature?.properties ?? {};
    const values  = extractIPPLineCatValues(props);
    if (!values.length) return LINE_CAT_NO_DATA_COLOR;
    const passengerCodes = values.filter(isPassengerCode);
    if (!passengerCodes.length) return LINE_CAT_NO_PASSENGER_COLOR;
    const selectedCode = passengerCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return IPP_PASSENGER_COLORS[selectedCode] || LINE_CAT_NO_DATA_COLOR;
}

function getColorForFreight(feature) {
    const props   = feature?.properties ?? {};
    const values  = extractIPPLineCatValues(props);
    if (!values.length) return LINE_CAT_NO_DATA_COLOR;
    const freightCodes = values.filter(isFreightCode);
    if (!freightCodes.length) return LINE_CAT_NO_FREIGHT_COLOR;
    const selectedCode = freightCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return IPP_FREIGHT_COLORS[selectedCode] || LINE_CAT_NO_DATA_COLOR;
}

function getPassengerLegendItems() {
    const items = Object.entries(IPP_PASSENGER_COLORS).map(([code, color]) => ({
        id:    `P-${code}`,
        label: IPP_LINE_CAT_LABELS[code] || code,
        color,
    }));
    items.push({ id: 'no-passenger', label: 'Aucune catégorie voyageurs définie', color: LINE_CAT_NO_PASSENGER_COLOR });
    items.push({ id: 'no-data',      label: 'IPP_LineCat non défini',             color: LINE_CAT_NO_DATA_COLOR });
    return items;
}

function getFreightLegendItems() {
    const items = Object.entries(IPP_FREIGHT_COLORS).map(([code, color]) => ({
        id:    `F-${code}`,
        label: IPP_LINE_CAT_LABELS[code] || code,
        color,
    }));
    items.push({ id: 'no-freight', label: 'Aucune catégorie fret définie', color: LINE_CAT_NO_FREIGHT_COLOR });
    items.push({ id: 'no-data',    label: 'IPP_LineCat non défini',        color: LINE_CAT_NO_DATA_COLOR });
    return items;
}

function getPassengerCategoryId(feature) {
    const props  = feature?.properties ?? {};
    const values = extractIPPLineCatValues(props);
    if (!values.length) return 'no-data';
    const passengerCodes = values.filter(isPassengerCode);
    if (!passengerCodes.length) return 'no-passenger';
    const selectedCode = passengerCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return `P-${selectedCode}`;
}

function getFreightCategoryId(feature) {
    const props  = feature?.properties ?? {};
    const values = extractIPPLineCatValues(props);
    if (!values.length) return 'no-data';
    const freightCodes = values.filter(isFreightCode);
    if (!freightCodes.length) return 'no-freight';
    const selectedCode = freightCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return `F-${selectedCode}`;
}

// ─────────────────────────────────────────────────────────────
// OP 用ヘルパー
// ─────────────────────────────────────────────────────────────

function getColorForOPPassenger(feature) {
    const props   = feature?.properties ?? {};
    const values  = extractOPIPPLineCatValues(props);
    if (!values.length) return LINE_CAT_NO_DATA_COLOR;
    const passengerCodes = values.filter(isPassengerCode);
    if (!passengerCodes.length) return LINE_CAT_NO_PASSENGER_COLOR;
    const selectedCode = passengerCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return IPP_PASSENGER_COLORS[selectedCode] || LINE_CAT_NO_DATA_COLOR;
}

function getColorForOPFreight(feature) {
    const props   = feature?.properties ?? {};
    const values  = extractOPIPPLineCatValues(props);
    if (!values.length) return LINE_CAT_NO_DATA_COLOR;
    const freightCodes = values.filter(isFreightCode);
    if (!freightCodes.length) return LINE_CAT_NO_FREIGHT_COLOR;
    const selectedCode = freightCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return IPP_FREIGHT_COLORS[selectedCode] || LINE_CAT_NO_DATA_COLOR;
}

function getOPPassengerCategoryId(feature) {
    const props  = feature?.properties ?? {};
    const values = extractOPIPPLineCatValues(props);
    if (!values.length) return 'no-data';
    const passengerCodes = values.filter(isPassengerCode);
    if (!passengerCodes.length) return 'no-passenger';
    const selectedCode = passengerCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return `P-${selectedCode}`;
}

function getOPFreightCategoryId(feature) {
    const props  = feature?.properties ?? {};
    const values = extractOPIPPLineCatValues(props);
    if (!values.length) return 'no-data';
    const freightCodes = values.filter(isFreightCode);
    if (!freightCodes.length) return 'no-freight';
    const selectedCode = freightCodes.slice().sort((a, b) => Number(a) - Number(b))[0];
    return `F-${selectedCode}`;
}

// ─────────────────────────────────────────────────────────────
// モード生成ファクトリ（SOL / OP）
// ─────────────────────────────────────────────────────────────

/**
 * SOL / OP 両方の IPP_LineCat モードを生成する。
 * @param {{ solOverrideFn: function, opOverrideFn: function }} fns
 */
export function makeIPPLineCatModes({ solOverrideFn, opOverrideFn }) {
    const IPP_LineCat_P = {
        id:    'IPP_LineCat_P',
        scope: 'SOL',
        label: 'Catégorie voyageurs (IPP_LineCat P*)',
        kind:  'custom',
        supportsFiltering: true,
        hideUnchecked:     true,
        showSelectAll:     true,

        getColor(feature) {
            const baseColor  = getColorForPassenger(feature);
            const categoryId = getPassengerCategoryId(feature);
            return solOverrideFn(this.id, categoryId) || baseColor;
        },
        getStyleCategoryId: (feature) => getPassengerCategoryId(feature) || 'no-data',
        getLegendItems() {
            return (getPassengerLegendItems() || []).map(item => ({
                ...item,
                color: solOverrideFn(this.id, item.id) || item.color,
            }));
        },
        getFilterIds(feature) {
            const id = getPassengerCategoryId(feature);
            return id ? [id] : [];
        },
    };

    const IPP_LineCat_F = {
        id:    'IPP_LineCat_F',
        scope: 'SOL',
        label: 'Catégorie fret (IPP_LineCat F*)',
        kind:  'custom',
        supportsFiltering: true,
        hideUnchecked:     true,
        showSelectAll:     true,

        getColor(feature) {
            const baseColor  = getColorForFreight(feature);
            const categoryId = getFreightCategoryId(feature);
            return solOverrideFn(this.id, categoryId) || baseColor;
        },
        getStyleCategoryId: (feature) => getFreightCategoryId(feature) || 'no-data',
        getLegendItems() {
            return (getFreightLegendItems() || []).map(item => ({
                ...item,
                color: solOverrideFn(this.id, item.id) || item.color,
            }));
        },
        getFilterIds(feature) {
            const id = getFreightCategoryId(feature);
            return id ? [id] : [];
        },
    };

    const OP_IPP_LineCat_P = {
        id:    'OP_IPP_LineCat_P',
        scope: 'OP',
        label: 'Catégorie voyageurs (IPP_LineCat P*)',
        kind:  'custom',
        supportsFiltering: true,
        hideUnchecked:     true,
        showSelectAll:     true,

        getColor(feature) {
            const baseColor  = getColorForOPPassenger(feature);
            const categoryId = getOPPassengerCategoryId(feature);
            return opOverrideFn(this.id, categoryId) || baseColor;
        },
        getStyleCategoryId: (feature) => getOPPassengerCategoryId(feature) || 'no-data',
        getLegendItems() {
            return (getPassengerLegendItems() || []).map(item => ({
                ...item,
                color: opOverrideFn(this.id, item.id) || item.color,
            }));
        },
        getFilterIds(feature) {
            const id = getOPPassengerCategoryId(feature);
            return id ? [id] : [];
        },
    };

    const OP_IPP_LineCat_F = {
        id:    'OP_IPP_LineCat_F',
        scope: 'OP',
        label: 'Catégorie fret (IPP_LineCat F*)',
        kind:  'custom',
        supportsFiltering: true,
        hideUnchecked:     true,
        showSelectAll:     true,

        getColor(feature) {
            const baseColor  = getColorForOPFreight(feature);
            const categoryId = getOPFreightCategoryId(feature);
            return opOverrideFn(this.id, categoryId) || baseColor;
        },
        getStyleCategoryId: (feature) => getOPFreightCategoryId(feature) || 'no-data',
        getLegendItems() {
            return (getFreightLegendItems() || []).map(item => ({
                ...item,
                color: opOverrideFn(this.id, item.id) || item.color,
            }));
        },
        getFilterIds(feature) {
            const id = getOPFreightCategoryId(feature);
            return id ? [id] : [];
        },
    };

    return { IPP_LineCat_P, IPP_LineCat_F, OP_IPP_LineCat_P, OP_IPP_LineCat_F };
}