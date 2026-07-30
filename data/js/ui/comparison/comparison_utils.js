// js/ui/comparison/comparison_utils.js


// 先頭に import を追加
import { formatParamValues } from '../sidebar/sidebar_utils.js';


function buildParamOrderMap(structure) {

    const order = new Map();
    let index = 0;

    structure.forEach(sti => {

        (sti.sections ?? []).forEach(section => {

            (section.paramIds ?? []).forEach(paramId => {

                const key =
                    `${section.set ?? ''}|${paramId}`;

                if (!order.has(key)) {
                    order.set(key, index++);
                }
            });
        });
    });

    return order;
}

/**
 * Construit la matrice de comparaison à partir des SOLTrack.
 *
 * @param {object[]} tracks - tableau SOLTrack issu de enrichFeature().properties.SOLTrack
 * @returns {{
 *   headers: string[],
 *   rows: {
 *     paramId: string,
 *     values: (string|null)[],
 *     hasDiff: boolean,
 *     cellDiff: boolean[]
 *   }[]
 * }}
 */
export function buildComparisonMatrix(tracks, {
    identKey = 'SOLTrackIdentification',
    paramKey = 'SOLTrackParameter',
    structure = null,
} = {}) {
    if (!tracks || tracks.length === 0) return { headers: [], rows: [] };

    const headers = tracks.map((t, i) =>
        t[identKey] != null ? `Voie ${t[identKey]}` : `Voie ${i + 1}`
    );

    const seenKeys = new Set();
    const allParamKeys = [];

    for (const track of tracks) {
        for (const param of (track[paramKey] || [])) {
            if (!param.ID) continue;
            const compositeKey = `${param.Set ?? ''}|${param.ID}`;
            if (!seenKeys.has(compositeKey)) {
                seenKeys.add(compositeKey);
                allParamKeys.push({
                    id:        param.ID,
                    set:       param.Set ?? null,
                    compositeKey,
                    displayId: param.Set ? `${param.ID} (${param.Set})` : param.ID,
                });
            }
        }
    }

    if (structure) {

        const orderMap =
            buildParamOrderMap(structure);

        allParamKeys.sort((a, b) => {

            const oa =
                orderMap.get(a.compositeKey);

            const ob =
                orderMap.get(b.compositeKey);

            if (oa == null && ob == null)
                return a.displayId.localeCompare(b.displayId);

            if (oa == null)
                return 1;

            if (ob == null)
                return -1;

            return oa - ob;
        });
    }

    // rows 以降は既存コードのまま（id/set/displayId を使う部分は変更なし）
    const rows = allParamKeys.map(({ id, set, displayId }) => {
        const values = tracks.map(track => {
            const param = (track[paramKey] || []).find(
                p => p.ID === id && (p.Set ?? null) === set
            );
            if (!param) return null;
            if (!param.Value || param.Value.length === 0) {
                return param.IsApplicable === 'N' ? 'N/A' : '—';
            }
            // ↓ 変更：生の Value 配列 → 人間が読める文字列に変換
            return formatParamValues(id, param.Value);
        });

        const definedValues = values.filter(v => v !== null);
        const hasDiff = new Set(definedValues).size > 1;

        const valueCounts = new Map();
        for (const v of definedValues) valueCounts.set(v, (valueCounts.get(v) || 0) + 1);
        let majorityValue = null, maxCount = 0, isTie = false;
        for (const [v, count] of valueCounts.entries()) {
            if (count > maxCount) { maxCount = count; majorityValue = v; isTie = false; }
            else if (count === maxCount) { isTie = true; }
        }

        const cellDiff = values.map(v => {
            if (!hasDiff || v === null) return false;
            if (isTie) return true;
            return v !== majorityValue;
        });

        return { paramId: displayId, values, hasDiff, cellDiff };
    });

    return { headers, rows };
}

/**
 * Sérialise la matrice en CSV (UTF-8 avec BOM pour Excel).
 *
 * @param {string} solLabel - Libellé du SOL (ex: "420000-1 — Creil → Verberie")
 * @param {{ headers: string[], rows: object[] }} matrix
 * @returns {string}
 */
export function matrixToCsv(solLabel, matrix) {
    const { headers, rows } = matrix;
    const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;

    const lines = [
        `# Comparaison des voies — ${solLabel}`,
        ['Paramètre', 'Différence', ...headers].map(esc).join(','),
    ];

    for (const row of rows) {
        lines.push([
            row.paramId,
            row.hasDiff ? '⚠' : '',
            ...row.values.map(v => v ?? ''),
        ].map(esc).join(','));
    }

    return lines.join('\n');
}