// config/mode/IPP_StructureCheckLoc.js

// 点の数ごとのカテゴリ（必要なら閾値は調整してください）
export const STRUCTURE_CHECK_CATEGORIES = {
    '0':   '#cccccc', // 0個
    '1-2': '#ffffb2', // 1–2個
    '3-5': '#fecc5c', // 3–5個
    '6-10':'#fd8d3c', // 6–10個
    '11+': '#e31a1c', // 11個以上
};

export const STRUCTURE_CHECK_NO_DATA_COLOR = '#EEEEEE';

/**
 * properties.SOLTrack から IPP_StructureCheckLoc の values を取得
 */
export function extractStructureCheckLocValues(properties) {
    if (!properties || !Array.isArray(properties.SOLTrack)) return null;

    // ここでは「トロンソン内の全トラック合計」で数えるようにしています
    let allValues = [];

    for (const track of properties.SOLTrack) {
        if (!Array.isArray(track.SOLTrackParameter)) continue;

        const param = track.SOLTrackParameter.find(p => (p.ID || '').trim() === 'IPP_StructureCheckLoc');
        if (param && Array.isArray(param.Value) && param.Value.length > 0) {
            allValues = allValues.concat(param.Value);
        }
    }

    return allValues.length > 0 ? allValues : null;
}

/**
 * 構造物検査位置の数
 */
export function getStructureCheckLocCount(properties) {
    const values = extractStructureCheckLocValues(properties);
    return values ? values.length : 0;
}

/**
 * 件数からカテゴリIDへ
 */
export function getStructureCheckLocCategoryId(properties) {
    const count = getStructureCheckLocCount(properties);

    if (count === 0) return '0';
    if (count <= 2)  return '1-2';
    if (count <= 5)  return '3-5';
    if (count <= 10) return '6-10';
    return '11+';
}

/**
 * 色を取得
 */
export function getColorForStructureCheckLoc(properties) {
    const cat = getStructureCheckLocCategoryId(properties);
    return STRUCTURE_CHECK_CATEGORIES[cat] || STRUCTURE_CHECK_NO_DATA_COLOR;
}

/**
 * 凡例
 */
export function getStructureCheckLocLegendItems() {
    return [
        { id: '11+',  label: '11+ positions',        color: STRUCTURE_CHECK_CATEGORIES['11+'] },
        { id: '6-10', label: '6–10 positions',       color: STRUCTURE_CHECK_CATEGORIES['6-10'] },
        { id: '3-5',  label: '3–5 positions',        color: STRUCTURE_CHECK_CATEGORIES['3-5'] },
        { id: '1-2',  label: '1–2 positions',        color: STRUCTURE_CHECK_CATEGORIES['1-2'] },
        { id: '0',    label: 'Aucune position',      color: STRUCTURE_CHECK_CATEGORIES['0']   },
    ];
}

export function makeIPPStructureCheckLocMode({ overrideFn }) {
    return {
        id:    'IPP_StructureCheckLoc',
        scope: 'SOL',
        label: 'Structure Check Locations',
        kind:  'categorical',
        field: 'IPP_StructureCheckLoc',
        supportsFiltering: true,
        hideUnchecked:     false,
        showSelectAll:     true,

        categories:   STRUCTURE_CHECK_CATEGORIES,
        defaultColor: STRUCTURE_CHECK_NO_DATA_COLOR,

        getColor(feature) {
            const props      = feature?.properties ?? {};
            const baseColor  = getColorForStructureCheckLoc(props);
            const categoryId = getStructureCheckLocCategoryId(props);
            if (!categoryId) return baseColor;
            return overrideFn(this.id, categoryId) || baseColor;
        },

        getStyleCategoryId(feature) {
            const props = feature?.properties ?? {};
            return getStructureCheckLocCategoryId(props) || 'no-data';
        },

        getLegendItems() {
            return getStructureCheckLocLegendItems().map(item => ({
                ...item,
                color: overrideFn(this.id, item.id) || item.color,
            }));
        },

        getFilterIds(feature) {
            const props = feature?.properties ?? {};
            const id    = getStructureCheckLocCategoryId(props);
            return id ? [id] : [];
        },
    };
}
