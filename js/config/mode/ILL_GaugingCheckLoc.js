// config/mode/ILL_GaugeCheckLoc.js

const GAUGE_CHECK_CATEGORIES = {
    '0':     '#cccccc', // 0個
    '1-2':   '#ffffb2', // 1–2個
    '3-5':   '#fecc5c', // 3–5個
    '6-10':  '#fd8d3c', // 6–10個
    '11+':   '#e31a1c', // 11個以上
};

const GAUGE_CHECK_NO_DATA_COLOR = '#EEEEEE';

/**
 * properties.SOLTrack から ILL_GaugeCheckLoc の values を取得
 */
function extractGaugeCheckValues(properties) {
    if (!properties || !Array.isArray(properties.SOLTrack)) return null;

    let allValues = [];

    for (const track of properties.SOLTrack) {
        if (!Array.isArray(track.SOLTrackParameter)) continue;

        const param = track.SOLTrackParameter.find(
            p => (p.ID || '').trim() === 'ILL_GaugeCheckLoc'
        );
        if (param && Array.isArray(param.Value) && param.Value.length > 0) {
            allValues = allValues.concat(param.Value);
        }
    }

    return allValues.length > 0 ? allValues : null;
}

/**
 * ゲージチェック位置の数
 */
function getGaugeCheckCount(properties) {
    const values = extractGaugeCheckValues(properties);
    return values ? values.length : 0;
}

/**
 * 件数からカテゴリIDへ
 */
function getGaugeCheckCategoryId(properties) {
    const count = getGaugeCheckCount(properties);

    if (count === 0)  return '0';
    if (count <= 2)   return '1-2';
    if (count <= 5)   return '3-5';
    if (count <= 10)  return '6-10';
    return '11+';
}

/**
 * 色を取得
 */
function getColorForGaugeCheck(properties) {
    const cat = getGaugeCheckCategoryId(properties);
    return GAUGE_CHECK_CATEGORIES[cat] || GAUGE_CHECK_NO_DATA_COLOR;
}

/**
 * 凡例
 */
function getGaugeCheckLegendItems() {
    return [
        { id: '11+',   label: '11+ positions',       color: GAUGE_CHECK_CATEGORIES['11+']   },
        { id: '6-10',  label: '6–10 positions',      color: GAUGE_CHECK_CATEGORIES['6-10']  },
        { id: '3-5',   label: '3–5 positions',       color: GAUGE_CHECK_CATEGORIES['3-5']   },
        { id: '1-2',   label: '1–2 positions',       color: GAUGE_CHECK_CATEGORIES['1-2']   },
        { id: '0',     label: 'Aucune position',     color: GAUGE_CHECK_CATEGORIES['0']     },
    ];
}


export function makeILLGaugeCheckLocMode(overrideFn) {
    return {
        id:    'ILL_GaugeCheckLoc',
        scope: 'SOL',
        label: 'Gabarit (ILL_GaugeCheckLoc)',
        kind:  'categorical',
        supportsFiltering: true,
        hideUnchecked:     false,
        showSelectAll:     true,
        categories:        GAUGE_CHECK_CATEGORIES,
        defaultColor:      GAUGE_CHECK_NO_DATA_COLOR,

        getColor(feature) {
            const props      = feature?.properties ?? {};
            const baseColor  = getColorForGaugeCheck(props);
            const categoryId = getGaugeCheckCategoryId(props);
            return overrideFn(this.id, categoryId) || baseColor;
        },
        getStyleCategoryId(feature) {
            return getGaugeCheckCategoryId(feature?.properties ?? {}) || 'no-data';
        },
        getLegendItems() {
            return (getGaugeCheckLegendItems() || []).map(item => ({
                ...item,
                color: overrideFn(this.id, item.id) || item.color,
            }));
        },
        getFilterIds(feature) {
            const id = getGaugeCheckCategoryId(feature?.properties ?? {});
            return id ? [id] : [];
        },
    };
}