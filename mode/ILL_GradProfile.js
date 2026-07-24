// config/mode/ILL_GradProfile.js

export const GRAD_PROFILE_CATEGORIES = {
    '0':     '#cccccc', // 0個
    '1-10':  '#ffffb2', // 1–10個
    '11-30': '#fecc5c', // 11–30個
    '31-60': '#fd8d3c', // 31–60個
    '61+':   '#e31a1c', // 61個以上
};

export const GRAD_PROFILE_NO_DATA_COLOR = '#EEEEEE';

/**
 * properties.SOLTrack から ILL_GradProfile の values を取得
 */
export function extractGradProfileValues(properties) {
    if (!properties || !Array.isArray(properties.SOLTrack)) return null;

    let allValues = [];

    for (const track of properties.SOLTrack) {
        if (!Array.isArray(track.SOLTrackParameter)) continue;

        const param = track.SOLTrackParameter.find(
            p => (p.ID || '').trim() === 'ILL_GradProfile'
        );
        if (param && Array.isArray(param.Value) && param.Value.length > 0) {
            allValues = allValues.concat(param.Value);
        }
    }

    return allValues.length > 0 ? allValues : null;
}

/**
 * 勾配プロファイル位置の数
 */
export function getGradProfileCount(properties) {
    const values = extractGradProfileValues(properties);
    return values ? values.length : 0;
}

/**
 * 件数からカテゴリIDへ
 */
export function getGradProfileCategoryId(properties) {
    const count = getGradProfileCount(properties);

    if (count === 0)  return '0';
    if (count <= 10)  return '1-10';
    if (count <= 30)  return '11-30';
    if (count <= 60)  return '31-60';
    return '61+';
}

/**
 * 色を取得
 */
export function getColorForGradProfile(properties) {
    const cat = getGradProfileCategoryId(properties);
    return GRAD_PROFILE_CATEGORIES[cat] || GRAD_PROFILE_NO_DATA_COLOR;
}

/**
 * 凡例
 */
export function getGradProfileLegendItems() {
    return [
        { id: '61+',   label: '61+ positions',       color: GRAD_PROFILE_CATEGORIES['61+']   },
        { id: '31-60', label: '31–60 positions',     color: GRAD_PROFILE_CATEGORIES['31-60'] },
        { id: '11-30', label: '11–30 positions',     color: GRAD_PROFILE_CATEGORIES['11-30'] },
        { id: '1-10',  label: '1–10 positions',      color: GRAD_PROFILE_CATEGORIES['1-10']  },
        { id: '0',     label: 'Aucune position',     color: GRAD_PROFILE_CATEGORIES['0']     },
    ];
}

export function makeILLGradProfileMode({ overrideFn }) {
    return {
        id:    'ILL_GradProfile',
        scope: 'SOL',
        label: 'Profil en long (ILL_GradProfile)',
        kind:  'categorical',
        field: 'ILL_GradProfile',
        supportsFiltering: true,
        hideUnchecked:     false,
        showSelectAll:     true,

        categories:   GRAD_PROFILE_CATEGORIES,
        defaultColor: GRAD_PROFILE_NO_DATA_COLOR,

        getColor(feature) {
            const props      = feature?.properties ?? {};
            const baseColor  = getColorForGradProfile(props);
            const categoryId = getGradProfileCategoryId(props);
            if (!categoryId) return baseColor;
            return overrideFn(this.id, categoryId) || baseColor;
        },

        getStyleCategoryId(feature) {
            const props = feature?.properties ?? {};
            return getGradProfileCategoryId(props) || 'no-data';
        },

        getLegendItems() {
            return getGradProfileLegendItems().map(item => ({
                ...item,
                color: overrideFn(this.id, item.id) || item.color,
            }));
        },

        getFilterIds(feature) {
            const props = feature?.properties ?? {};
            const id    = getGradProfileCategoryId(props);
            return id ? [id] : [];
        },
    };
}