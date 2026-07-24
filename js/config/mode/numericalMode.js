// config/mode/numericalMode.js

import {
    getBreakValues,
    buildRanges,
    findRangeForValue,
    registerDefaultBreaks,
    getSpecialValues,
} from '../breakValues.js';
import {
    getCategoryColorOverride,
    getOpCategoryColorOverride,
} from '../.././state.js';


import { PALETTES, sampleGradient } from '../palettes.js';

// 数値モード共通のデフォルトグラデーション（青→赤）
const NUM_DEFAULT_PALETTE = PALETTES.heat.colors;

export function buildNumericalMode(target, isOP = false) {
    const {
        paramId,
        label,
        unit = '',
        defaultBreaks = [],
        extractValue,
        specialValues = [],
        hasNA       = false,
        naColor     = '#CCCCCC',
        noDataColor = '#EEEEEE',
    } = target;

    const modeId      = isOP ? `OP_${paramId}` : paramId;
    const getOverride = isOP ? getOpCategoryColorOverride : getCategoryColorOverride;

    registerDefaultBreaks(modeId, defaultBreaks);

    const _extract = extractValue ?? ((props) => {
        const raw = props?.[paramId];
        const num = parseFloat(raw);
        if (!Number.isFinite(num) || num <= 0) return null;
        return num;
    });

    // ── specials の正規化・ソート ──────────────────────────────────────
    // ✅ 代わりに追加
    function getSpecials() {
        return (getSpecialValues(modeId) ?? (specialValues || []))
            .map(sv => ({
                ...sv,
                num: typeof sv.value === 'number' ? sv.value : parseFloat(sv.value),
            }))
            .filter(sv => Number.isFinite(sv.num))
            .sort((a, b) => a.num - b.num);
    }


    const specialId = (sv) => `special_${sv.id ?? sv.value}`;
    const EPS = 1e-6;

    function findSpecialByValue(num) {
        return getSpecials().find(sv => sv.num === num) ?? null;
    }

    // specials の value を breaks に差し込んで区間を正しく分割する
    function getExtendedBreaks() {
        const base = (getBreakValues(modeId) || [])
            .map(v => (typeof v === 'number' ? v : parseFloat(v)))
            .filter(Number.isFinite)
            .slice()
            .sort((a, b) => a - b);

        getSpecials().forEach(sv => {
            if (!base.some(b => b === sv.num)) base.push(sv.num);
        });
        return base.sort((a, b) => a - b);
    }

    // special を挿入する「直後」のレンジインデックス（左側区間の末尾）
    function getSpecialInsertIndex(sv, ranges) {
        const leftRange = findRangeForValue(ranges, sv.num - EPS);
        if (!leftRange) return -1;
        return ranges.indexOf(leftRange);
    }

    // ── グラデーション割り当て ────────────────────────────────────────
    // ranges + specials を凡例の並び順に列挙し、
    // NUM_DEFAULT_PALETTE からサンプリングした色を均等に割り当てる。
    // specials も range と同じグラデーションに自然に馴染む。

    function buildColorMapAndOrder(ranges) {
        const currentSpecials = getSpecials(); // ← 毎回読む
        const specialsAfterIdx = Array.from({ length: ranges.length }, () => []);
        currentSpecials.forEach(sv => {        // ← specials → currentSpecials
            const idx = getSpecialInsertIndex(sv, ranges);
            specialsAfterIdx[Math.max(0, idx)].push(sv);
        });

        const orderedIds = [];
        ranges.forEach((r, i) => {
            orderedIds.push(r.id);
            specialsAfterIdx[i].forEach(sv => orderedIds.push(specialId(sv)));
        });

        const colors   = sampleGradient(NUM_DEFAULT_PALETTE, orderedIds.length);
        const colorMap = {};
        orderedIds.forEach((id, i) => { colorMap[id] = colors[i]; });

        return { colorMap, specialsAfterIdx };
    }

    return {
        id:    modeId,
        scope: isOP ? 'OP' : 'SOL',
        label: label || paramId,
        kind:  'numerical',
        unit,
        field: paramId,
        _defaultSpecials: specialValues ?? [],  

        supportsFiltering: true,
        hideUnchecked:     true,
        showSelectAll:     true,

        extractValue: _extract,

        _ranges() {
            return buildRanges(getExtendedBreaks(), unit);
        },

        getColor(value) {
            if (value == null) return getOverride(this.id, 'no-data') || noDataColor;
            if (hasNA && typeof value === 'string' && value.toUpperCase() === 'N/A')
                return getOverride(this.id, 'na') || naColor;

            const num = typeof value === 'number' ? value : parseFloat(value);
            if (!Number.isFinite(num)) return getOverride(this.id, 'no-data') || noDataColor;

            const ranges       = this._ranges();
            const { colorMap } = buildColorMapAndOrder(ranges);

            const special = findSpecialByValue(num);
            if (special) return getOverride(this.id, specialId(special)) || colorMap[specialId(special)] || noDataColor;

            const range = findRangeForValue(ranges, num);
            if (!range) return getOverride(this.id, hasNA ? 'na' : 'no-data') || (hasNA ? naColor : noDataColor);
            return getOverride(this.id, range.id) || colorMap[range.id] || noDataColor;
        },

        getStyleCategoryId(feature) {
            const raw = this.extractValue(feature.properties);
            if (raw == null) return 'no-data';
            if (hasNA && typeof raw === 'string' && raw.toUpperCase() === 'N/A') return 'na';

            const num = typeof raw === 'number' ? raw : parseFloat(raw);
            if (!Number.isFinite(num)) return 'no-data';

            const special = findSpecialByValue(num);
            if (special) return specialId(special);

            const range = findRangeForValue(this._ranges(), num);
            return range?.id ?? (hasNA ? 'na' : 'no-data');
        },

        getLegendItems() {
            const ranges                         = this._ranges();
            const { colorMap, specialsAfterIdx } = buildColorMapAndOrder(ranges);
            const items                          = [];

            ranges.forEach((r, idx) => {
                items.push({
                    id:    r.id,
                    label: r.label,
                    color: getOverride(this.id, r.id) || colorMap[r.id],
                });
                specialsAfterIdx[idx].forEach(sv => {
                    const id = specialId(sv);
                    items.push({
                        id,
                        label: sv.label ?? (unit ? `${sv.num} ${unit}` : String(sv.num)),
                        color: getOverride(this.id, id) || colorMap[id],
                    });
                });
            });

            if (hasNA) items.push({ id: 'na',     label: 'N/A',                color: getOverride(this.id, 'na')      || naColor });
            items.push(           { id: 'no-data', label: 'Données manquantes', color: getOverride(this.id, 'no-data') || noDataColor });
            return items;
        },

        getFilterIds(feature) {
            const raw = this.extractValue(feature.properties);
            if (raw == null) return ['no-data'];
            if (hasNA && typeof raw === 'string' && raw.toUpperCase() === 'N/A') return ['na'];

            const num = typeof raw === 'number' ? raw : parseFloat(raw);
            if (!Number.isFinite(num)) return ['no-data'];

            const special = findSpecialByValue(num);
            if (special) return [specialId(special)];

            const range = findRangeForValue(this._ranges(), num);
            return [range?.id ?? (hasNA ? 'na' : 'no-data')];
        },
    };
}