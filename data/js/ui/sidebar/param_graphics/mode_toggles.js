// ui/sidebar/param_graphics/mode_toggles.js
import { isTunnelMode } from '../../../state.js';
import { reloadGeojson, refreshLayerStyles } from '../../../map/layer_SOL.js';
import { updateLegend } from '../../../map/legend.js';
import { DEFAULT_COLOR_MODE } from '../../../config/colorModes.js';
import { setCurrentColorMode } from '../../../state.js';

import { getOpSubMode, setOpSubMode, setOpCurrentColorMode } from '../../../state.js';
import { refreshOpStyles } from '../../../map/layer_OP.js';

import { showLoading, hideLoading } from '../../../ui/loadingOverlay.js';

// ── SOL: トンネルモードトグル ─────────────────────────────────────────────

/**
 * SOL トンネルモードトグルの HTML を生成
 * @returns {string} HTML string
 */
export function renderTunnelModeToggle() {
    const tunnelChecked = isTunnelMode() ? 'checked' : '';
    return `
        <div class="tunnel-mode-toggle">
            <label class="tunnel-mode-label">
                <input type="checkbox" id="tunnel-mode-checkbox" ${tunnelChecked} />
                Mode Tunnel
            </label>
        </div>
    `;
}

/**
 * SOL トンネルモードトグルのイベントリスナーを設定
 * @param {HTMLElement} container - グラフィックパラメータパネルのコンテナ
 * @param {Function} setupGraphicParametersPanelFn - パネル再構築関数
 */
export function attachTunnelModeToggleListeners(container, setupGraphicParametersPanelFn) {
    const tunnelCheckbox = container.querySelector('#tunnel-mode-checkbox');
    if (!tunnelCheckbox) return;

    tunnelCheckbox.addEventListener('change', async (e) => {
        const on = e.target.checked;
        showLoading('Rechargement des sections SOL...');

        try {
            await reloadGeojson(on);
            setCurrentColorMode(on ? 'Tunnel_ITU_Length' : DEFAULT_COLOR_MODE);
            refreshLayerStyles();
            updateLegend();
            setupGraphicParametersPanelFn('SOL');
        } finally {
            hideLoading();
        }
    });
}

// ── OP: サブモードトグル ──────────────────────────────────────────────────

const OP_SUBMODE_DEFAULTS = {
    siding:   'OP_Siding_IPP_Length',
    platform: 'OP_Platform_IPL_Length',
    tunnel:   'OP_Tunnel_ITU_Length',
};

/**
 * OP サブモードトグル（Siding / Platform / Tunnel）の HTML を生成
 * @returns {string} HTML string
 */
export function renderOpSubModeToggle() {
    const sub = getOpSubMode();
    return `
        <div class="tunnel-mode-toggle">
            <label class="tunnel-mode-label">
                <input type="checkbox" id="op-siding-mode-checkbox"   ${sub === 'siding'   ? 'checked' : ''}> Mode Siding
            </label>
            <label class="tunnel-mode-label">
                <input type="checkbox" id="op-platform-mode-checkbox" ${sub === 'platform' ? 'checked' : ''}> Mode Platform
            </label>
            <label class="tunnel-mode-label">
                <input type="checkbox" id="op-tunnel-mode-checkbox"   ${sub === 'tunnel'   ? 'checked' : ''}> Mode Tunnel
            </label>
        </div>
    `;
}

/**
 * OP サブモードトグルのイベントリスナーを設定
 * @param {HTMLElement} container - グラフィックパラメータパネルのコンテナ
 * @param {Function} setupGraphicParametersPanelFn - パネル再構築関数
 */
export function attachOpSubModeToggleListeners(container, setupGraphicParametersPanelFn) {
    ['siding', 'platform', 'tunnel'].forEach(mode => {
        const cb = container.querySelector(`#op-${mode}-mode-checkbox`);
        if (!cb) return;

        cb.addEventListener('change', (e) => {
            const on = e.target.checked;
            showLoading("Mise à jour de l'affichage des OP..."); // ← ダブルクォートに修正

            setTimeout(() => {                                   // ← setTimeout(0) を追加
                try {
                    if (on) {
                        ['siding', 'platform', 'tunnel']
                            .filter(m => m !== mode)
                            .forEach(m => {
                                const other = container.querySelector(`#op-${m}-mode-checkbox`);
                                if (other) other.checked = false;
                            });

                        setOpSubMode(mode);
                        setOpCurrentColorMode(OP_SUBMODE_DEFAULTS[mode]);
                    } else {
                        setOpSubMode('normal');
                        setOpCurrentColorMode('OP_OPType');
                    }

                    refreshOpStyles();
                    updateLegend();
                    setupGraphicParametersPanelFn('OP');
                } finally {
                    hideLoading();
                }
            }, 0);
        });
    });
}