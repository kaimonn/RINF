// js/config/breakValues.js

const _breaks   = new Map();
const _defaults = new Map();

export function registerDefaultBreaks(modeId, breaks) {
    if (!modeId) return;
    _defaults.set(modeId, [...breaks]);
}

export function getBreakValues(modeId) {
    if (_breaks.has(modeId))   return [..._breaks.get(modeId)];
    if (_defaults.has(modeId)) return [..._defaults.get(modeId)];
    return [];
}

export function setBreakValues(modeId, values) {
    const sorted = values
        .map(Number)
        .filter(v => Number.isFinite(v))
        .sort((a, b) => a - b);
    _breaks.set(modeId, sorted);
}

// ★ 追加：ユーザー指定ブレークを消してデフォルトに戻す
export function resetBreakValues(modeId) {
    _breaks.delete(modeId);
}

/**
 * [b1, b2, b3] → N+1 レンジ
 *   range-0: < b1
 *   range-i: b(i-1) – bi
 *   range-N: ≥ bN
 */
export function buildRanges(breaks, unit = '') {
    const u = unit ? ` ${unit}` : '';
    const s = [...breaks].sort((a, b) => a - b);
    if (s.length === 0) {
        return [{
            id: 'range-0',
            min: -Infinity,
            max: Infinity,
            label: `Toutes valeurs${u}`,
        }];
    }

    const ranges = [];
    ranges.push({
        id: 'range-0',
        min: -Infinity,
        max: s[0],
        label: `< ${s[0]}${u}`,
    });
    for (let i = 0; i < s.length - 1; i++) {
        ranges.push({
            id: `range-${i+1}`,
            min: s[i],
            max: s[i+1],
            label: `${s[i]} – ${s[i+1]}${u}`,
        });
    }
    ranges.push({
        id: `range-${s.length}`,
        min: s[s.length-1],
        max: Infinity,
        label: `≥ ${s[s.length-1]}${u}`,
    });
    return ranges;
}

export function findRangeForValue(ranges, value) {
    if (value == null || !Number.isFinite(value)) return null;
    for (let i = 0; i < ranges.length - 1; i++) {
        if (value >= ranges[i].min && value < ranges[i].max) return ranges[i];
    }
    const last = ranges[ranges.length - 1];
    return value >= last.min ? last : null;
}



// ── Special Values ────────────────────────────────────────────────
// { id: string, value: number, label: string }[] のユーザー上書き

const _specials = new Map(); // modeId → special[]

export function getSpecialValues(modeId) {
    return _specials.has(modeId) ? [..._specials.get(modeId)] : null; // null = 上書きなし
}

export function setSpecialValues(modeId, specials) {
    _specials.set(modeId, specials.map(sv => ({
        id:    sv.id    || `special_${sv.value}`,
        value: Number(sv.value),
        label: sv.label || String(sv.value),
    })).filter(sv => Number.isFinite(sv.value)));
}

export function resetSpecialValues(modeId) {
    _specials.delete(modeId);
}

