// ui/sidebar/param_graphics/color_mode_select.js
import { COLOR_MODES } from '/js/config/colorModes.js';
import { getAllFeatures, getOpFeatures, isTunnelMode, getOpSubMode } from '/js/state.js';
import { PARAM_STRUCTURE }      from '../config_sidebar/sol_config.js';
import { OP_PARAM_STRUCTURE }   from '../config_sidebar/op_config.js';
import { TUNNEL_SOL_STRUCTURE } from '../config_sidebar/sol_tunnel_config.js';
import { OP_SIDING_STRUCTURE }  from '../config_sidebar/op_siding_config.js';
import { OP_PLATFORM_STRUCTURE } from '../config_sidebar/op_platform_config.js';
import { TUNNEL_OP_STRUCTURE }  from '../config_sidebar/op_tunnel_config.js';

// ── 定数 ─────────────────────────────────────────────────────────────────
// TODO: 後で sidebar_constants.js に移動する

const PINNED_MODE_IDS = ['ValidityDate', 'Track_ValidityDate', 'SOLIMCode', 'SOLLength', 'SOLNature'];
export const PARAM_ID_ALIASES = {
    'IPP_LineCat':        ['IPP_LineCat', 'IPP_LineCat_P', 'IPP_LineCat_F'],
    'EPA_StripMaterial':  ['EPA_StripMaterial', 'EPA_StripMaterial_MetalContent'],
    'EPA_NumRaisedSpeed': ['EPA_NumRaisedSpeed_Full', 'EPA_NumRaisedSpeed_Count', 'EPA_NumRaisedSpeed_MaxSpeed'],
};

const OP_PINNED_MODE_IDS = ['OP_ValidityDate', 'OP_Track_ValidityDate', 'OP_IMCode', 'OP_OPType', 'OP_OPTypeGaugeChangeover'];
export const OP_PARAM_ID_ALIASES = {
    'IPP_LineCat': ['IPP_LineCat', 'IPP_LineCat_P', 'IPP_LineCat_F'],
};

const OP_INJECT_AFTER_STI = {
    'ILR': { label: 'Platform (IPL)', paramIds: ['IPL_TENClass', 'IPL_Height'] },
};

export const OP_SUBMODE_CONFIG = {
    siding:   { structure: OP_SIDING_STRUCTURE,   prefix: 'OP_Siding_',   default: 'OP_Siding_IPP_Length' },
    platform: { structure: OP_PLATFORM_STRUCTURE, prefix: 'OP_Platform_', default: 'OP_Platform_IPL_Length' },
    tunnel:   { structure: TUNNEL_OP_STRUCTURE,   prefix: 'OP_Tunnel_',   default: 'OP_Tunnel_ITU_Length' },
};

// ── ヘルパー ──────────────────────────────────────────────────────────────

export function displayModeId(modeId) {
    return modeId?.startsWith('OP_') ? modeId.slice(3) : (modeId ?? '');
}

/**
 * 全フィーチャーでデータが欠損しているモードかどうか判定する。
 * @param {string} modeId
 * @returns {boolean}
 */
function isAllMissing(modeId) {
    const mode = COLOR_MODES[modeId];
    if (!mode || typeof mode.getLegendItems !== 'function') return false;
    const features = modeId.startsWith('OP_') ? getOpFeatures() : getAllFeatures();

    if (mode.kind === 'numerical' && typeof mode.extractValue === 'function') {
        if (features.length === 0) return false;
        return features.every(f => mode.extractValue(f.properties) == null);
    }

    const items = mode.getLegendItems(features) || [];
    return items.length > 0 && items.every(item => item.id === 'no-data');
}

/**
 * <option> タグ1行を返す共通ヘルパー。
 */
function optionHtml(mode, currentModeId, labelFn = (m) => `${m.id} — ${m.label}`) {
    const selected = mode.id === currentModeId ? 'selected' : '';
    const missing  = isAllMissing(mode.id) ? ' class="color-mode-option-missing"' : '';
    return `<option value="${mode.id}" ${selected}${missing}>${labelFn(mode)}</option>`;
}

function sectionHeaderHtml(label) {
    return `<option value="" disabled class="color-mode-section">── ${label} ──</option>`;
}

// ── SOL ドロップダウン ────────────────────────────────────────────────────

function buildSOLColorModeSelect(currentModeId) {
    const usedModeIds       = new Set();
    const tunnelMode        = isTunnelMode();
    const solParamStructure = tunnelMode ? TUNNEL_SOL_STRUCTURE : PARAM_STRUCTURE;
    const solPinnedIds      = tunnelMode ? [] : PINNED_MODE_IDS;
    let html = '';

    // 先頭固定モード（通常モード時のみ）
    solPinnedIds.forEach(id => {
        const m = COLOR_MODES[id];
        if (!m || m.id?.startsWith('OP_')) return;
        html += optionHtml(m, currentModeId);
        usedModeIds.add(m.id);
    });

    // Tunnel モード専用: ValidityDate + IMCode を手動挿入
    if (tunnelMode) {
        const specials = [
            { id: 'Tunnel_ValidityDate', labelSection: 'Validité du tunnel' },
            { id: 'Tunnel_IMCode',       labelSection: 'Code IM (Tunnel)' },
        ];
        specials.forEach(({ id, labelSection }) => {
            const m = COLOR_MODES[id];
            if (!m || usedModeIds.has(m.id)) return;
            html += sectionHeaderHtml(labelSection);
            html += optionHtml(m, currentModeId);
            usedModeIds.add(m.id);
        });
    }

    // STI → section 順
    solParamStructure.forEach(sti => {
        sti.sections.forEach(section => {
            const sectionModes = [];
            section.paramIds.forEach(paramId => {
                const resolvedIds = tunnelMode
                    ? [`Tunnel_${paramId}`]
                    : (PARAM_ID_ALIASES[paramId] ?? [paramId]);

                resolvedIds.forEach(resolvedId => {
                    const m = COLOR_MODES[resolvedId];
                    if (!m || m.id?.startsWith('OP_') || usedModeIds.has(m.id)) return;
                    sectionModes.push(m);
                    usedModeIds.add(m.id);
                });
            });
            if (sectionModes.length === 0) return;
            html += sectionHeaderHtml(section.label);
            sectionModes.forEach(m => { html += optionHtml(m, currentModeId); });
        });
    });

    // Autres modes
    const remainingModes = Object.values(COLOR_MODES)
        .filter(m => !usedModeIds.has(m.id) && !m.id?.startsWith('OP_'))
        .sort((a, b) => String(a.id).localeCompare(String(b.id), 'fr'));

    if (remainingModes.length > 0) {
        html += sectionHeaderHtml('Autres modes');
        remainingModes.forEach(m => { html += optionHtml(m, currentModeId); });
    }

    return html;
}

// ── OP サブモード ドロップダウン ──────────────────────────────────────────

function buildOPSubModeColorModeSelect(currentModeId, subMode) {
    const subConf     = OP_SUBMODE_CONFIG[subMode];
    const usedModeIds = new Set();
    let html          = '';

    const opLabel = (m) => `${displayModeId(m.id)} — ${m.label}`;

    // Validity + IMCode を最上部に固定
    const specialIds = [
        { id: `${subConf.prefix}ValidityDate`, labelSection: 'Validité' },
        { id: `${subConf.prefix}IMCode`,       labelSection: 'Code IM' },
    ];
    specialIds.forEach(({ id, labelSection }) => {
        const m = COLOR_MODES[id];
        if (!m || usedModeIds.has(m.id)) return;
        html += sectionHeaderHtml(labelSection);
        html += optionHtml(m, currentModeId, opLabel);
        usedModeIds.add(m.id);
    });

    // メインセクション
    subConf.structure.forEach(sti => {
        sti.sections.forEach(section => {
            const sectionModes = [];
            section.paramIds.forEach(paramId => {
                const m = COLOR_MODES[`${subConf.prefix}${paramId}`];
                if (m && !usedModeIds.has(m.id)) { sectionModes.push(m); usedModeIds.add(m.id); }
            });
            if (sectionModes.length === 0) return;
            html += sectionHeaderHtml(section.label);
            sectionModes.forEach(m => { html += optionHtml(m, currentModeId, opLabel); });
        });
    });

    // Autres modes
    const isOPPointLevelMode = (m) =>
        m.id?.startsWith('OP_') &&
        !m.id.startsWith('OP_Siding_') &&
        !m.id.startsWith('OP_Platform_') &&
        !m.id.startsWith('OP_Tunnel_');

    let autresModes;
    if (subMode === 'siding') {
        // Siding: OP 点レベルのモードのみ
        autresModes = Object.values(COLOR_MODES)
            .filter(m => isOPPointLevelMode(m) && !usedModeIds.has(m.id));
    } else {
        // Platform / Tunnel: OP_PARAM_STRUCTURE + OP 点レベル（Siding/Platform/Tunnel プレフィックス除く）
        autresModes = Object.values(COLOR_MODES)
            .filter(m =>
                !usedModeIds.has(m.id) &&
                m.id?.startsWith('OP_') &&
                !m.id.startsWith('OP_Siding_') &&
                !m.id.startsWith('OP_Platform_') &&
                !m.id.startsWith('OP_Tunnel_')
            );
    }

    autresModes.sort((a, b) => String(a.id).localeCompare(String(b.id), 'fr'));
    if (autresModes.length > 0) {
        html += sectionHeaderHtml('Autres modes');
        autresModes.forEach(m => { html += optionHtml(m, currentModeId, opLabel); });
    }

    return html;
}

// ── OP 通常モード ドロップダウン ──────────────────────────────────────────

function buildOPNormalColorModeSelect(currentModeId) {
    const usedModeIds = new Set();
    let html          = '';
    const opLabel     = (m) => `${displayModeId(m.id)} — ${m.label}`;

    // 先頭固定モード
    OP_PINNED_MODE_IDS.forEach(id => {
        const m = COLOR_MODES[id];
        if (!m || usedModeIds.has(m.id)) return;
        html += optionHtml(m, currentModeId, opLabel);
        usedModeIds.add(m.id);
    });

    // STI → section 順
    OP_PARAM_STRUCTURE.forEach(sti => {
        sti.sections.forEach(section => {
            const sectionModes = [];
            section.paramIds.forEach(paramId => {
                const resolvedIds = OP_PARAM_ID_ALIASES[paramId] ?? [paramId];
                resolvedIds.forEach(resolvedId => {
                    const m = COLOR_MODES[`OP_${resolvedId}`];
                    if (m && !usedModeIds.has(m.id)) { sectionModes.push(m); usedModeIds.add(m.id); }
                });
            });
            if (sectionModes.length === 0) return;
            html += sectionHeaderHtml(section.label);
            sectionModes.forEach(m => { html += optionHtml(m, currentModeId, opLabel); });
        });

        // STI 後に挿入するセクション（例: ILR 後に Platform）
        const inject = OP_INJECT_AFTER_STI[sti.stiId];
        if (inject) {
            const injectModes = [];
            inject.paramIds.forEach(paramId => {
                const m = COLOR_MODES[`OP_${paramId}`];
                if (m && !usedModeIds.has(m.id)) { injectModes.push(m); usedModeIds.add(m.id); }
            });
            if (injectModes.length > 0) {
                html += sectionHeaderHtml(inject.label);
                injectModes.forEach(m => { html += optionHtml(m, currentModeId, opLabel); });
            }
        }
    });

    // Autres modes（Siding/Platform/Tunnel プレフィックス除く）
    const remainingOpModes = Object.values(COLOR_MODES)
        .filter(m =>
            m.id?.startsWith('OP_') &&
            !usedModeIds.has(m.id) &&
            !m.id.startsWith('OP_Siding_') &&
            !m.id.startsWith('OP_Platform_') &&
            !m.id.startsWith('OP_Tunnel_')
        )
        .sort((a, b) => String(a.id).localeCompare(String(b.id), 'fr'));

    if (remainingOpModes.length > 0) {
        html += sectionHeaderHtml('Autres modes');
        remainingOpModes.forEach(m => { html += optionHtml(m, currentModeId, opLabel); });
    }

    return html;
}

// ── 公開エントリーポイント ────────────────────────────────────────────────

/**
 * スコープに応じたカラーモードの <select> 要素の HTML 文字列を返す。
 * @param {'SOL'|'OP'} scope
 * @param {string} currentModeId
 * @returns {string} HTML string
 */
export function buildColorModeSelect(scope, currentModeId) {
    let innerHtml;

    if (scope === 'SOL') {
        innerHtml = buildSOLColorModeSelect(currentModeId);
    } else {
        const subMode = getOpSubMode();
        innerHtml = OP_SUBMODE_CONFIG[subMode]
            ? buildOPSubModeColorModeSelect(currentModeId, subMode)
            : buildOPNormalColorModeSelect(currentModeId);
    }

    return `<select id="${scope}-color-mode-select" class="color-mode-dropdown">${innerHtml}</select>`;
}



