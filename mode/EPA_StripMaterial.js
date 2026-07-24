// config/mode/EPA_StripMaterial.js

import { buildConceptMode, extractConceptValues } from './conceptMode.js';
import { buildNumericalMode } from './numericalMode.js';

// ── 共通パーサー ──────────────────────────────────────────────────────
function parseStripMaterial(raw) {
    const parts = String(raw ?? '').trim().split(/\s+/);
    const code  = parts[0] || null;
    const pct   = parts.length > 1 ? parseFloat(parts[1]) : null;
    return { code, metalPct: Number.isFinite(pct) ? pct : null };
}

/**
 * EPA_StripMaterial 用の 2 つのモードを生成する factory。
 * @param {{ solOverrideFn: (modeId: string, categoryId: string) => string|null }} fns
 */
export function makeEPAStripMaterialModes({ solOverrideFn }) {
    // ベースとなる概念モード（ラベルと値抽出だけ担当）
    const baseCodeMode = buildConceptMode('EPA_StripMaterial', {
        labels: {
            '10': 'Copper',
            '20': 'Plaincarbon',
            '30': 'Copper steel',
            '40': 'Copper alloy',
            '50': 'Impregnated carbon',
            '60': 'Carbon with additive material',
            '70': 'Carbon with cladded copper',
            '80': 'Sintered copper',
        },
        // "50 35" → "50" だけを返す
        extractValues: (props, paramId) => {
            return extractConceptValues(props, paramId)
                .map(v => parseStripMaterial(v).code)
                .filter(Boolean);
        },
    });

    // オーバーライド関数を適用するラッパー
    const stripMaterialCodeMode = {
        ...baseCodeMode,
        id: 'EPA_StripMaterial', // 念のため明示
        getColor(feature) {
            const baseColor  = baseCodeMode.getColor(feature);
            const categoryId = baseCodeMode.getStyleCategoryId
                ? baseCodeMode.getStyleCategoryId(feature)
                : null;
            if (!categoryId) return baseColor;
            const override = solOverrideFn(this.id, categoryId);
            return override || baseColor;
        },
        getLegendItems(features) {
            const baseItems = typeof baseCodeMode.getLegendItems === 'function'
                ? (baseCodeMode.getLegendItems(features) || [])
                : [];
            return baseItems.map(item => ({
                ...item,
                color: solOverrideFn(this.id, item.id) || item.color,
            }));
        },
    };

    // 数値モード側（コード50の金属含有率）
    const baseMetalPctMode = buildNumericalMode({
        paramId:       'EPA_StripMaterial_MetalContent',
        label:         'Teneur en métal du frotteur',
        unit:          '%',
        defaultBreaks: [20, 35, 50],
        extractValue:  (props) => {
            for (const raw of extractConceptValues(props, 'EPA_StripMaterial')) {
                const { code, metalPct } = parseStripMaterial(raw);
                if (code === '50' && metalPct !== null) return metalPct;
            }
            return null;
        },
    });

    const stripMaterialMetalPctMode = {
        ...baseMetalPctMode,
        id: 'EPA_StripMaterial_MetalContent',
        getColor(feature) {
            const baseColor  = baseMetalPctMode.getColor(feature);
            const categoryId = baseMetalPctMode.getStyleCategoryId
                ? baseMetalPctMode.getStyleCategoryId(feature)
                : null;
            if (!categoryId) return baseColor;
            const override = solOverrideFn(this.id, categoryId);
            return override || baseColor;
        },
        getLegendItems(features) {
            const baseItems = typeof baseMetalPctMode.getLegendItems === 'function'
                ? (baseMetalPctMode.getLegendItems(features) || [])
                : [];
            return baseItems.map(item => ({
                ...item,
                color: solOverrideFn(this.id, item.id) || item.color,
            }));
        },
    };

    return { stripMaterialCodeMode, stripMaterialMetalPctMode };
}