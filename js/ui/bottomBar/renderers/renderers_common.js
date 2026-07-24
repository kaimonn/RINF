// ui/bottomBar/renderers/renderers_common.js

import { COLOR_MODES } from '/js/config/colorModes.js';
import { PARAM_ID_ALIASES, OP_PARAM_ID_ALIASES } from '../../sidebar/param_graphics/color_mode_select.js';
import { getParamLabel, formatParamValues } from '../../sidebar/sidebar_utils.js';

// ここに getPrimaryModeIdForParam（内部関数）
function getPrimaryModeIdForParam(scope, paramId) {
    if (!paramId) return null;

    if (scope === 'SOL') {
        const baseIds = PARAM_ID_ALIASES[paramId] ?? [paramId];

        for (const id of baseIds) {
            if (COLOR_MODES[id] && !String(id).startsWith('OP_')) return id;
        }
        for (const id of baseIds) {
            const tId = `Tunnel_${id}`;
            if (COLOR_MODES[tId]) return tId;
        }
        return null;
    }

    const baseIds = OP_PARAM_ID_ALIASES[paramId] ?? [paramId];
    const prefixes = ['OP_', 'OP_Siding_', 'OP_Platform_', 'OP_Tunnel_'];

    for (const prefix of prefixes) {
        for (const id of baseIds) {
            const candidate = `${prefix}${id}`;
            if (COLOR_MODES[candidate]) return candidate;
        }
    }
    return null;
}

// export するのはこれ
export function renderParamColorToggleButton(scope, paramId) {
    if (!paramId || !scope) return '';
    const modeId = getPrimaryModeIdForParam(scope, paramId);
    if (!modeId) return '';

    return `<button type="button"
                    class="param-color-toggle-btn"
                    data-scope="${scope}"
                    data-mode-id="${modeId}"
                    data-param-id="${paramId}"
                    title="Afficher la carte avec « ${modeId} »">🎨</button>`;
}


/**
 * ノード内のパラメータ総数と利用可能数を再帰的にカウント
 */
export function countParams(node, paramMap) {
    let total = 0;
    let available = 0;
    let notApplicable = 0; // IsApplicable="N" のカウント

    if (node.paramIds && node.paramIds.length > 0) {
        node.paramIds.forEach(id => {
            total++;
            const param = paramMap.get(id) || null;
            if (!param) {
                return;
            }

            // IsApplicable="N" の場合
            if (param.IsApplicable === 'N') {
                available++; // 利用可能扱い
                notApplicable++;
                return;
            }

            // 通常の利用可能チェック
            if (
                param.Value !== null &&
                param.Value !== undefined &&
                !(Array.isArray(param.Value) && param.Value.length === 0) &&
                !(typeof param.Value === 'string' && param.Value.trim() === '')
            ) {
                available++;
            }
        });
    }

    // 再帰処理（groups, sections）
    const processChildren = (children) => {
        if (!children) return { total: 0, available: 0, notApplicable: 0 };
        let t = 0, a = 0, na = 0;
        children.forEach(child => {
            const c = countParams(child, paramMap);
            t += c.total;
            a += c.available;
            na += c.notApplicable;
        });
        return { total: t, available: a, notApplicable: na };
    };

    const groupsCount = processChildren(node.groups);
    const sectionsCount = processChildren(node.sections);

    return {
        total: total + groupsCount.total + sectionsCount.total,
        available: available + groupsCount.available + sectionsCount.available,
        notApplicable: notApplicable + groupsCount.notApplicable + sectionsCount.notApplicable
    };
}

/**
 * 構造（STI 配列）全体のカウント
 */
export function countStructureParams(structure, paramMap) {
    let total = 0;
    let available = 0;
    let notApplicable = 0;

    if (!Array.isArray(structure)) {
        return { total, available, notApplicable };
    }

    structure.forEach(sti => {
        const c = countParams(sti, paramMap);
        total += c.total;
        available += c.available;
        notApplicable += c.notApplicable;
    });

    return { total, available, notApplicable };
}

/**
 * カウントバッジの HTML を生成
 */
export function renderCountBadge(available, total, notApplicable) {
    if (total === 0) return '';

    let state;
    if (available === 0) {
        state = 'zero';
    } else if (available === total) {
        state = 'full';
    } else {
        state = 'partial';
    }

    // ツールチップ用の内訳テキスト
    let tooltip = `${available}/${total} paramètres disponibles`;
    if (notApplicable > 0) {
        tooltip += `\n(${notApplicable} non applicables)`;
    }

    return `
        <span class="param-count-badge ${state}"
              title="${tooltip}">
            ${available}/${total}
        </span>
    `;
}

/**
 * 汎用的な再帰的グループレンダリング関数
 * mode: 'SOL' or 'OP' を渡して、1.1 / 1.2 を切り替える
 */
export function renderNode(node, paramMap, nestLevel = 1, mode = 'SOL') {
    if (!node.id || !node.label) {
        console.warn('Node missing required fields (id or label):', node);
        return '';
    }

    const nodeId = `node-${node.id}`;

    // ノード内のカウントを取得（IDEレベルのバッジ）
    const { total, available } = countParams(node, paramMap);
    const badgeHtml = renderCountBadge(available, total);

    let html = `
        <details class="param-node nest-level-${nestLevel}" data-node-id="${nodeId}">
            <summary class="param-node-summary">
                <span class="summary-label">${node.label}</span>
                ${badgeHtml}
            </summary>
            <div class="param-node-content">
    `;

    if (node.description) {
        html += `<div class="param-node-description">${node.description}</div>`;
    }

    if (node.paramIds && node.paramIds.length > 0) {
        const nodeParams = node.paramIds.map(id => ({
            id,
            param: paramMap.get(id) || null
        }));

        html += `<table class="param-table">`;

        nodeParams.forEach(({ id, param }) => {
            const paramId = param ? param.ID : id;
            const { label, reference, url } = getParamLabel(paramId, mode);

            let valuesHtml;
            let isNotApplicable = false;

            if (!param) {
                valuesHtml = `<span class="param-empty">-</span>`;
            } else if (param.IsApplicable === 'N') {
                valuesHtml = `<span class="param-not-applicable">Non applicable</span>`;
                isNotApplicable = true;
            } else if (
                param.Value === null ||
                param.Value === undefined ||
                (Array.isArray(param.Value) && param.Value.length === 0) ||
                (typeof param.Value === 'string' && param.Value.trim() === '')
            ) {
                valuesHtml = `<span class="param-empty">-</span>`;
            } else {
                valuesHtml = formatParamValues(param.ID, param.Value);
            }

            const referenceHtml = reference
                ? url
                    ? `<div class="param-reference">[<a href="${url}" target="_blank" rel="noopener noreferrer">${reference} ${paramId}</a>]</div>`
                    : `<div class="param-reference">[${reference} ${paramId}]</div>`
                : '';

            const quickToggleHtml = renderParamColorToggleButton(mode, paramId);

            html += `
                <tr class="${isNotApplicable ? 'not-applicable' : ''}">
                    <td class="param-name">
                        <div class="param-label">${label}</div>
                        ${referenceHtml}
                        ${quickToggleHtml}
                    </td>
                    <td class="param-value">${valuesHtml}</td>
                </tr>
            `;
        });
        html += `</table>`;
    }

    if (node.groups && node.groups.length > 0) {
        node.groups.forEach(child => {
            html += renderNode(child, paramMap, nestLevel + 1, mode);
        });
    }

    if (node.sections && node.sections.length > 0) {
        node.sections.forEach(child => {
            html += renderNode(child, paramMap, nestLevel + 1, mode);
        });
    }

    if (node.additionalInfoHtml) {
        html += `
            <details class="additional-info nest-level-${nestLevel + 1}" data-node-id="${nodeId}-additional">
                <summary class="additional-info-summary">Informations complémentaires</summary>
                <div class="additional-info-body">
                    ${node.additionalInfoHtml}
                </div>
            </details>
        `;
    }

    html += `</div></details>`;
    return html;
}

/**
 * STI 構造（PARAM_STRUCTURE など）をまとめて描画
 * - structure: [{ stiId, stiLabel, description?, sections: [node, ...] }, ...]
 * - baseNestLevel: renderNode に渡すネストレベル（通常 4）
 */
export function renderStiBlocks(structure, paramMap, mode, baseNestLevel = 4) {
    let html = '';
    if (!Array.isArray(structure)) return html;

    structure.forEach(sti => {
        const { total, available, notApplicable } = countParams(sti, paramMap);
        const stiBadgeHtml = renderCountBadge(available, total, notApplicable);

        let stiHtml = '';
        if (sti.description) {
            stiHtml += `<div class="sti-description">${sti.description}</div>`;
        }

        if (sti.sections && sti.sections.length > 0) {
            sti.sections.forEach(section => {
                stiHtml += renderNode(section, paramMap, baseNestLevel, mode);
            });
        }

        if (stiHtml) {
            html += `
                <details class="sti-block nest-level-${baseNestLevel - 1}" data-node-id="sti-${sti.stiId}">
                    <summary class="sti-summary">
                        <span class="summary-label">${sti.stiLabel}</span>
                        ${stiBadgeHtml}
                    </summary>
                    <div class="sti-content">
                        ${stiHtml}
                    </div>
                </details>
            `;
        }
    });

    return html;
}


/**
 * renderNode の<details>なし版（右カラム用）
 * ネストは <h4> などで表現する
 */
export function renderNodeFlat(node, paramMap, mode = 'SOL') {
    // STI オブジェクト (stiId/stiLabel) とセクションノード (id/label) 両方に対応
    const id = node.id ?? node.stiId;
    if (!id && !(node.paramIds?.length > 0)) return ''; // IDもパラメータもなければ空

    // ★★★ h4 のタイトル生成を削除 ★★★
    let html = '';

    if (node.description) {
        html += `<div class="param-node-description">${node.description}</div>`;
    }

    if (node.paramIds?.length > 0) {
        html += '<table class="param-table">';
        node.paramIds.forEach(paramId => {
            const param = paramMap.get(paramId) ?? null;
            const { label: pLabel, reference, url } = getParamLabel(paramId, mode);

            let valuesHtml;
            let isNotApplicable = false;

            if (!param) {
                valuesHtml = `<span class="param-empty">-</span>`;
            } else if (param.IsApplicable === 'N') {
                valuesHtml = `<span class="param-not-applicable">Non applicable</span>`;
                isNotApplicable = true;
            } else if (
                param.Value === null || param.Value === undefined ||
                (Array.isArray(param.Value) && param.Value.length === 0) ||
                (typeof param.Value === 'string' && param.Value.trim() === '')
            ) {
                valuesHtml = `<span class="param-empty">-</span>`;
            } else {
                valuesHtml = formatParamValues(param.ID, param.Value);
            }

            const referenceHtml = reference
                ? url
                    ? `<div class="param-reference">[<a href="${url}" target="_blank" rel="noopener noreferrer">${reference} ${paramId}</a>]</div>`
                    : `<div class="param-reference">[${reference} ${paramId}]</div>`
                : '';

            // ★ 追加
            const quickToggleHtml = renderParamColorToggleButton(mode, paramId);

            html += `
                <tr class="${isNotApplicable ? 'not-applicable' : ''}">
                    <td class="param-name">
                        <div class="param-label">${pLabel}</div>
                        ${referenceHtml}
                        ${quickToggleHtml}
                    </td>
                    <td class="param-value">${valuesHtml}</td>
                </tr>
            `;
        });
        html += '</table>';
    }

    (node.groups ?? []).forEach(child => {
        if (child.label) {
            html += `<h4 class="flat-section-title">${child.label}</h4>`;
        }
        html += renderNodeFlat(child, paramMap, mode);
    });
    (node.sections ?? []).forEach(child => {
        if (child.label) {
            html += `<h4 class="flat-section-title">${child.label}</h4>`;
        }
        html += renderNodeFlat(child, paramMap, mode);
    });

    return html;
}