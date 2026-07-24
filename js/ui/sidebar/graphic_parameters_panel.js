// ui/sidebar/graphic_parameters_panel.js

import { COLOR_MODES } from '/js/config/colorModes.js';
import {
    // SOL
    getCurrentColorMode, setCurrentColorMode,
    getAllFeatures, getCategoryVisibility, setCategoryVisibility,
    setCategoryColorOverride, getCategoryColorOverride,
    setCategoryWidthOverride, getCategoryWidthOverride,
    setCategoryOrderOverride, getCategoryOrderOverride,
    // OP
    getOpCurrentColorMode, setOpCurrentColorMode,
    getOpFeatures, getOpCategoryVisibility, setOpCategoryVisibility,
    setOpCategoryColorOverride, getOpCategoryColorOverride,
    setOpCategoryWidthOverride, getOpCategoryWidthOverride,
    setOpCategoryOrderOverride, getOpCategoryOrderOverride,
    // 共通
    isParamMultiValued,
} from '/js/state.js';

import { refreshLayerStyles } from '/js/map/layer_SOL.js';
import { refreshOpStyles } from '/js/map/layer_OP.js';
import { updateLegend } from '/js/map/legend.js';

import { getParamLabel } from './sidebar_utils.js';
import { PALETTES } from '/js/config/palettes.js';

import {
    getBreakValues, setBreakValues, resetBreakValues,
    setSpecialValues, resetSpecialValues,
} from '/js/config/breakValues.js';

import { buildColorModeSelect, displayModeId } from './param_graphics/color_mode_select.js';
import {
    renderBreaksEditor,
    renderSpecialValuesEditor,
} from './param_graphics/numerical_editors.js';

import {
    getCurrentPaletteId,
    isPaletteReversed,
    setPaletteReversed,
    getLinkedMode,
    syncColorToLinkedMode,
    applyPalette,
} from './param_graphics/palette_utils.js';

import { setupDragAndDrop } from './param_graphics/drag_drop.js';

import {
    renderTunnelModeToggle,
    attachTunnelModeToggleListeners,
    renderOpSubModeToggle,
    attachOpSubModeToggleListeners,
} from './param_graphics/mode_toggles.js';

import {
    isOpStrokeEnabled,
    getOpStrokeColor,
    getOpStrokeWidth,
} from '/js/state.js';

import { showLoading, hideLoading } from '/js/ui/loadingOverlay.js';

// ────────────────────────────────────────────────────────────────────────────
// scope 共通コンテキスト
// ────────────────────────────────────────────────────────────────────────────

function getScopeContext(scope) {
    const isOP = scope === 'OP';
    return {
        getCurrentMode:   isOP ? getOpCurrentColorMode      : getCurrentColorMode,
        setCurrentMode:   isOP ? setOpCurrentColorMode      : setCurrentColorMode,
        getFeatures:      isOP ? getOpFeatures              : getAllFeatures,
        getVisibility:    isOP ? getOpCategoryVisibility    : getCategoryVisibility,
        setVisibility:    isOP ? setOpCategoryVisibility    : setCategoryVisibility,
        setColorOverride: isOP ? setOpCategoryColorOverride : setCategoryColorOverride,
        getColorOverride: isOP ? getOpCategoryColorOverride : getCategoryColorOverride,
        setWidthOverride: isOP ? setOpCategoryWidthOverride : setCategoryWidthOverride,
        getWidthOverride: isOP ? getOpCategoryWidthOverride : getCategoryWidthOverride,
        setOrderOverride: isOP ? setOpCategoryOrderOverride : setCategoryOrderOverride,
        getOrderOverride: isOP ? getOpCategoryOrderOverride : getCategoryOrderOverride,
        refreshStyles:    isOP ? refreshOpStyles            : refreshLayerStyles,
    };
}

// ────────────────────────────────────────────────────────────────────────────
// ヘルパー：Select all の indeterminate 状態を同期
// ────────────────────────────────────────────────────────────────────────────

function syncSidebarSelectAll(container) {
    const selectAllCb = container.querySelector('.sidebar-select-all-checkbox');
    if (!selectAllCb) return;

    const allCheckboxes = container.querySelectorAll('.mode-style-visible');
    const checkedCount  = Array.from(allCheckboxes).filter(cb => cb.checked).length;

    if (checkedCount === 0) {
        selectAllCb.checked       = false;
        selectAllCb.indeterminate = false;
    } else if (checkedCount === allCheckboxes.length) {
        selectAllCb.checked       = true;
        selectAllCb.indeterminate = false;
    } else {
        selectAllCb.checked       = false;
        selectAllCb.indeterminate = true;
    }
}

export function syncSidebarVisibilityFromState() {
    const solContainer = document.getElementById('sol-mode-style-panel');
    const opContainer  = document.getElementById('op-mode-style-panel');

    if (solContainer) {
        const visibility = getCategoryVisibility();
        solContainer.querySelectorAll('.mode-style-visible[data-category]').forEach(cb => {
            cb.checked = visibility[cb.getAttribute('data-category')] !== false;
        });
        syncSidebarSelectAll(solContainer.closest('.graphic-parameters-panel'));
    }

    if (opContainer) {
        const visibility = getOpCategoryVisibility();
        opContainer.querySelectorAll('.mode-style-visible[data-category]').forEach(cb => {
            cb.checked = visibility[cb.getAttribute('data-category')] !== false;
        });
        syncSidebarSelectAll(opContainer.closest('.graphic-parameters-panel'));
    }
}

export function refreshOpGraphicParametersPanel() {
    const container = document.getElementById('op-graphic-parameters-panel');
    if (!container) return;
    setupGraphicParametersPanel('OP');
    updateLegend();
}


// ────────────────────────────────────────────────────────────────────────────
// メイン：グラフィックパラメータパネルの構築
// ────────────────────────────────────────────────────────────────────────────

export function setupGraphicParametersPanel(scope) {
    const container = scope === 'OP'
        ? document.getElementById('op-graphic-parameters-panel')
        : document.getElementById('sol-graphic-parameters-panel');

    if (!container) return;

    const {
        getCurrentMode, setCurrentMode, getFeatures, getVisibility, setVisibility,
        setColorOverride, getColorOverride, setWidthOverride, getWidthOverride,
        setOrderOverride, getOrderOverride, refreshStyles,
    } = getScopeContext(scope);

    const currentModeId = getCurrentMode();
    const displayId     = displayModeId(currentModeId);

    const mode      = currentModeId ? COLOR_MODES[currentModeId] : null;
    const modeValid = mode && typeof mode.getLegendItems === 'function';

    // ── モード未選択 or 無効モード時 ────────────────────────────────────────
    if (!currentModeId || !modeValid) {
        const selectHtml = currentModeId ? buildColorModeSelect(scope, currentModeId) : '';

        container.innerHTML = `
            <details class="graphic-parameters-panel" open>
                <summary class="graphic-parameters-summary">
                    PARAMÈTRES GRAPHIQUES (${scope})
                </summary>
                <div class="graphic-parameters-content">
                    ${scope === 'SOL' ? renderTunnelModeToggle() : ''}
                    ${selectHtml ? `
                        <label class="color-mode-label">Mode de classification</label>
                        ${selectHtml}
                    ` : ''}
                    <p class="no-params">
                        ${scope === 'OP'
                            ? 'Aucun mode OP disponible. Vérifiez que les modes OP_ sont définis dans colorModes.js.'
                            : 'Aucun mode disponible.'}
                    </p>
                </div>
            </details>
        `;

        if (scope === 'SOL') {
            attachTunnelModeToggleListeners(container, setupGraphicParametersPanel);
        }

        if (selectHtml) {
            const select = container.querySelector(`#${scope}-color-mode-select`);
            if (select) {
                select.addEventListener('change', (e) => {
                    const modeId = e.target.value;
                    const msg = scope === 'SOL'
                        ? 'Mise à jour des couleurs SOL...'
                        : 'Mise à jour des couleurs des OP...';

                    showLoading(msg);

                    setTimeout(() => {
                        try {
                            setCurrentMode(modeId);
                            refreshStyles();
                            updateLegend();
                            setupGraphicParametersPanel(scope);
                        } finally {
                            hideLoading();
                        }
                    }, 0);
                });
            }
        }
        return;
    }

    // ── モード有効時：HTML構築 ─────────────────────────────────────────────

    const showIndicator = isParamMultiValued(displayId);
    const features      = getFeatures();
    const selectHtml    = buildColorModeSelect(scope, currentModeId);

    const { label: paramLabel, reference, url } = getParamLabel(displayId, scope);

    const referenceHtml = reference
        ? url
            ? `<div class="param-reference">[<a href="${url}" target="_blank" rel="noopener noreferrer">${reference} ${displayId}</a>]</div>`
            : `<div class="param-reference">[${reference} ${displayId}]</div>`
        : '';

    const currentParamHtml = `
        <div class="mode-style-current-param">
            <div class="param-label">
                ${paramLabel || mode.label || displayId}
                ${showIndicator ? `
                    <span class="multi-value-indicator"
                          title="Ce paramètre peut avoir plusieurs valeurs pour un même tronçon.">!</span>
                ` : ''}
            </div>
            ${referenceHtml}
        </div>
        <div class="multi-value-info" style="display:none;"></div>
    `;

    const opSubModeHtml = scope === 'OP' ? renderOpSubModeToggle() : '';

    const strokeHtml = scope === 'OP' ? `
        <div class="op-stroke-control">
            <label class="op-stroke-label">
                <input type="checkbox" id="op-stroke-enabled"
                    ${isOpStrokeEnabled() ? 'checked' : ''}>
                Afficher la bordure des points
            </label>
            <div class="op-stroke-options ${isOpStrokeEnabled() ? '' : 'op-stroke-options-hidden'}">
                <div class="op-stroke-row">
                    <label class="op-stroke-sublabel">Couleur</label>
                    <input type="color" id="op-stroke-color"
                        value="${getOpStrokeColor()}">
                </div>
                <div class="op-stroke-row">
                    <label class="op-stroke-sublabel">Épaisseur</label>
                    <input type="range" id="op-stroke-width"
                        min="0.5" max="5" step="0.5"
                        value="${getOpStrokeWidth()}">
                    <input type="number" id="op-stroke-width-num"
                        min="0.5" max="5" step="0.5"
                        value="${getOpStrokeWidth()}"
                        class="global-width-input">
                </div>
            </div>
        </div>
    ` : '';

    let legendItems = mode.getLegendItems(features) || [];
    legendItems = legendItems.filter(item => !item.isHeader && !item.isSelectAll);

    // ★ 保存済みの並び順を適用
    const savedOrder = getOrderOverride(currentModeId);
    if (savedOrder?.length > 0) {
        legendItems.sort((a, b) => {
            const ia = savedOrder.indexOf(a.id);
            const ib = savedOrder.indexOf(b.id);
            if (ia === -1 && ib === -1) return 0;
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
        });
    }

    let categoriesHtml = '';
    if (legendItems.length > 0) {
        const visibility       = getVisibility();
        const currentPaletteId = getCurrentPaletteId(currentModeId);
        const currentPalette   = PALETTES[currentPaletteId] || PALETTES.multicolor;
        const reversed         = isPaletteReversed(currentModeId);

        const palettePreviewHtml =
            currentPalette.type === 'gradient'
                ? `<span class="palette-btn-gradient"
                        style="background-image:linear-gradient(to right, ${currentPalette.preview.join(',')});"></span>`
                : currentPalette.preview
                    .map(c => `<span class="palette-btn-swatch" style="background:${c}"></span>`)
                    .join('');

        const paletteOptionsHtml = Object.entries(PALETTES).map(([id, pal]) => {
            const swatchesHtml = pal.type === 'gradient'
                ? `<div class="palette-option-gradient"
                        style="background-image:linear-gradient(to right, ${pal.preview.join(',')});"></div>`
                : `<div class="palette-option-swatches">
                    ${pal.preview.map(c => `<span class="palette-swatch" style="background:${c}"></span>`).join('')}
                </div>`;
            const isActive = id === currentPaletteId ? ' palette-option-active' : '';
            return `
                <div class="palette-option${isActive}" data-palette="${id}">
                    ${swatchesHtml}
                    <span class="palette-option-label">${pal.label}</span>
                </div>
            `;
        }).join('');

        categoriesHtml = `
            <div class="mode-style-row mode-style-select-all">
                <input type="checkbox" id="${scope}-sidebar-select-all" class="sidebar-select-all-checkbox">
                <label for="${scope}-sidebar-select-all" class="mode-style-label">
                    Tout sélectionner / désélectionner
                </label>
                <button class="palette-reverse-btn${reversed ? ' active' : ''}"
                        type="button" title="Inverser le sens du dégradé">⇄</button>
                <div class="palette-picker-wrapper">
                    <button class="palette-picker-btn" title="Appliquer une palette de couleurs">
                        ${palettePreviewHtml}
                    </button>
                    <div class="palette-picker-popover" style="display:none;">
                        ${paletteOptionsHtml}
                    </div>
                </div>
                <div class="width-control-group">
                    <input type="range" min="1" max="10" step="1"
                           id="${scope}-global-width-slider"
                           class="global-width-slider" value="4">
                    <input type="number" min="1" max="10" step="1"
                           id="${scope}-global-width-input"
                           class="global-width-input" value="4">
                </div>
            </div>
            <hr class="mode-style-divider">
        `;

        legendItems.forEach(item => {
            const categoryId   = item.id;
            const widthOverride = getWidthOverride(currentModeId, categoryId);
            const isChecked    = visibility[categoryId] !== false;

            categoriesHtml += `
                <div class="mode-style-row" data-category="${categoryId}" draggable="true">
                    <span class="drag-handle" title="Glisser pour réordonner">⠿</span>
                    <input type="checkbox" class="mode-style-visible"
                           data-category="${categoryId}" ${isChecked ? 'checked' : ''}>
                    <span class="mode-style-label" title="${item.label}">${item.label}</span>
                    <div class="mode-style-controls">
                        <input type="color" class="mode-style-color"
                               data-category="${categoryId}"
                               value="${item.color || '#cccccc'}">
                        <div class="width-control-group">
                            <input type="range" min="1" max="10" step="1"
                                   class="mode-style-width"
                                   data-category="${categoryId}"
                                   value="${widthOverride != null ? widthOverride : 4}">
                            <input type="number" min="1" max="10" step="1"
                                   class="mode-style-number"
                                   data-category="${categoryId}"
                                   value="${widthOverride != null ? widthOverride : 4}">
                        </div>
                    </div>
                </div>
            `;
        });
    }

    container.innerHTML = `
        <details class="graphic-parameters-panel" open>
            <summary class="graphic-parameters-summary">
                PARAMÈTRES GRAPHIQUES (${scope})
            </summary>
            <div class="graphic-parameters-content">
                ${scope === 'SOL' ? renderTunnelModeToggle() : ''}
                ${opSubModeHtml}
                <label for="${scope}-color-mode-select" class="color-mode-label">
                    Mode de classification
                </label>
                ${selectHtml}
                ${currentParamHtml}
                ${mode?.kind === 'numerical' ? renderBreaksEditor(scope, currentModeId) : ''}
                ${mode?.kind === 'numerical' ? renderSpecialValuesEditor(scope, currentModeId) : ''}
                ${strokeHtml}
                <div id="${scope.toLowerCase()}-mode-style-panel" class="categories-list">
                    ${categoriesHtml}
                </div>
            </div>
        </details>
    `;

    // ── イベントリスナー設定 ──────────────────────────────────────────────

    // カラーモード選択
    const select = container.querySelector(`#${scope}-color-mode-select`);
    if (select) {
        select.addEventListener('change', (e) => {
            const modeId = e.target.value;
            const msg = scope === 'SOL'
                ? 'Mise à jour des couleurs SOL...'
                : 'Mise à jour des couleurs des OP...';

            showLoading(msg);

            setTimeout(() => {
                try {
                    setCurrentMode(modeId);
                    refreshStyles();
                    updateLegend();
                    setupGraphicParametersPanel(scope);
                } finally {
                    hideLoading();
                }
            }, 0);
        });
    }

    // トンネル / OPサブモードトグル
    if (scope === 'SOL') {
        attachTunnelModeToggleListeners(container, setupGraphicParametersPanel);
    }
    if (scope === 'OP') {
        attachOpSubModeToggleListeners(container, setupGraphicParametersPanel);
    }

    // Tout sélectionner / désélectionner
    const selectAllCb = container.querySelector('.sidebar-select-all-checkbox');
    if (selectAllCb) {
        selectAllCb.addEventListener('change', (e) => {
            const checked = e.target.checked;
            container.querySelectorAll('.mode-style-visible').forEach(cb => {
                cb.checked = checked;
                setVisibility(cb.getAttribute('data-category'), checked);
            });
            refreshStyles();
            updateLegend();
        });
        syncSidebarSelectAll(container);
    }

    // 個別の表示 ON/OFF
    container.querySelectorAll('.mode-style-visible').forEach(input => {
        input.addEventListener('change', (e) => {
            setVisibility(input.getAttribute('data-category'), e.target.checked);
            refreshStyles();
            updateLegend();
            syncSidebarSelectAll(container);
        });
    });

    // 個別の色変更
    container.querySelectorAll('.mode-style-color').forEach(input => {
        input.addEventListener('input', (e) => {
            const categoryId = input.getAttribute('data-category');
            const color      = e.target.value;

            // 1) 現在のモードに適用
            setColorOverride(currentModeId, categoryId, color);

            // 2) リンク先モード（SOL↔OP）にも同じ色をコピー
            syncColorToLinkedMode(currentModeId, categoryId, color);

            // 3) 今のスコープのスタイル更新
            refreshStyles();

            // 4) リンク先スコープのスタイルも更新
            const linked = getLinkedMode(currentModeId);
            if (linked) {
                if (linked.scope === 'OP') {
                    refreshOpStyles();
                } else {
                    refreshLayerStyles();
                }
            }

            // 5) 凡例を更新（SOL 側の凡例）
            updateLegend();
        });
    });

    // 個別の太さ変更（スライダー）
    container.querySelectorAll('.mode-style-width').forEach(input => {
        input.addEventListener('input', (e) => {
            const width    = Number(e.target.value) || 1;
            const category = input.getAttribute('data-category');
            const numInput = container.querySelector(
                `.mode-style-number[data-category="${category}"]`
            );
            if (numInput && Number(numInput.value) !== width) {
                numInput.value = width;
            }
            setWidthOverride(currentModeId, category, width);
            refreshStyles();
        });
    });

    // 個別の太さ変更（数値入力）
    container.querySelectorAll('.mode-style-number').forEach(input => {
        input.addEventListener('input', (e) => {
            let width = Number(e.target.value);
            if (Number.isNaN(width)) return;
            width = Math.min(10, Math.max(1, width));
            e.target.value = width;

            const category = input.getAttribute('data-category');
            const slider   = container.querySelector(
                `.mode-style-width[data-category="${category}"]`
            );
            if (slider && Number(slider.value) !== width) {
                slider.value = width;
            }

            setWidthOverride(currentModeId, category, width);
            refreshStyles();
        });
    });

    // グローバル太さ
    const globalWidthSlider = container.querySelector(`#${scope}-global-width-slider`);
    const globalWidthInput  = container.querySelector(`#${scope}-global-width-input`);

    function updateAllCategoryWidths(width) {
        container.querySelectorAll('.mode-style-row[data-category]').forEach(row => {
            const categoryId = row.getAttribute('data-category');
            const slider     = row.querySelector('.mode-style-width');
            const numInput   = row.querySelector('.mode-style-number');
            if (slider)   slider.value   = width;
            if (numInput) numInput.value = width;
            setWidthOverride(currentModeId, categoryId, width);
        });
        refreshStyles();
        updateLegend();
    }

    if (globalWidthSlider && globalWidthInput) {
        globalWidthSlider.addEventListener('input', (e) => {
            const width = Number(e.target.value);
            globalWidthInput.value = width;
            updateAllCategoryWidths(width);
        });
        globalWidthInput.addEventListener('input', (e) => {
            let width = Number(e.target.value);
            if (Number.isNaN(width)) return;
            width = Math.min(10, Math.max(1, width));
            globalWidthInput.value  = width;
            globalWidthSlider.value = width;
            updateAllCategoryWidths(width);
        });
    }

    // multi-value インフォ
    const indicator = container.querySelector('.multi-value-indicator');
    const infoBox   = container.querySelector('.multi-value-info');
    if (indicator && infoBox && showIndicator) {
        indicator.addEventListener('click', () => {
            if (infoBox.style.display !== 'none') {
                infoBox.style.display = 'none';
                return;
            }
            infoBox.innerHTML = `
                <div class="multi-value-info-body">
                    Ce paramètre peut avoir plusieurs valeurs pour un même tronçon.<br><br>
                    La couleur sur la carte représente la valeur cochée la plus haute dans la liste.<br>
                    Vous pouvez modifier l'ordre en faisant glisser les éléments.
                </div>
            `;
            infoBox.style.display = 'block';
        });
    }

    // 並べ替え（ドラッグ＆ドロップ）
    const categoriesList = container.querySelector(`#${scope.toLowerCase()}-mode-style-panel`);
    if (categoriesList) {
        categoriesList._dndCleanup?.(); // ★ 旧リスナーを除去
        setupDragAndDrop(categoriesList, currentModeId, setOrderOverride, refreshStyles, scope, setupGraphicParametersPanel);
    }

    // パレット選択
    const paletteBtnEl   = container.querySelector('.palette-picker-btn');
    const palettePopover = container.querySelector('.palette-picker-popover');

    if (paletteBtnEl && palettePopover) {
        paletteBtnEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = palettePopover.style.display !== 'none';
            palettePopover.style.display = isOpen ? 'none' : 'block';
        });

        const closePalette = (e) => {
            if (!paletteBtnEl.contains(e.target) && !palettePopover.contains(e.target)) {
                palettePopover.style.display = 'none';
                document.removeEventListener('click', closePalette);
            }
        };
        document.addEventListener('click', closePalette);

        palettePopover.querySelectorAll('.palette-option').forEach(option => {
            option.addEventListener('click', () => {
                const paletteId = option.getAttribute('data-palette');
                const msg = scope === 'SOL'
                    ? 'Application de la palette de couleurs pour SOL...'
                    : 'Application de la palette de couleurs pour les OP...';

                showLoading(msg);

                setTimeout(() => {
                    try {
                        applyPalette(
                            paletteId,
                            legendItems,
                            currentModeId,
                            setColorOverride,
                            refreshStyles,
                            scope
                        );

                        // パネルを SOL/OP 両方再構築（UI側の色を同期）
                        setupGraphicParametersPanel('SOL');
                        setupGraphicParametersPanel('OP');
                    } finally {
                        hideLoading();
                        palettePopover.style.display = 'none';
                    }
                }, 0);
            });
        });
    }

    // パレット反転
    const reverseBtn = container.querySelector('.palette-reverse-btn');
    if (reverseBtn) {
        reverseBtn.addEventListener('click', () => {
            const msg = scope === 'SOL'
                ? 'Mise à jour du dégradé de couleurs (SOL)...'
                : 'Mise à jour du dégradé de couleurs (OP)...';

            showLoading(msg);

            setTimeout(() => {
                try {
                    const newFlag = !isPaletteReversed(currentModeId);
                    setPaletteReversed(currentModeId, newFlag);
                    applyPalette(
                        getCurrentPaletteId(currentModeId),
                        legendItems,
                        currentModeId,
                        setColorOverride,
                        refreshStyles,
                        scope
                    );

                    setupGraphicParametersPanel('SOL');
                    setupGraphicParametersPanel('OP');
                } finally {
                    hideLoading();
                }
            }, 0);
        });
    }

    // ── Breaks editor ────────────────────────────────────────────────
    const breaksEditor = container.querySelector('.breaks-editor');
    if (breaksEditor) {
        const bModeId = breaksEditor.getAttribute('data-mode');

        const applyAndRefresh = () => {
            refreshStyles();
            updateLegend();
            setupGraphicParametersPanel(scope);
        };

        breaksEditor.addEventListener('change', (e) => {
            if (!e.target.classList.contains('break-value-input')) return;
            const values = [...breaksEditor.querySelectorAll('.break-value-input')]
                .map(inp => parseFloat(inp.value))
                .filter(v => Number.isFinite(v));
            setBreakValues(bModeId, values);
            applyAndRefresh();
        });

        breaksEditor.addEventListener('click', (e) => {
            if (e.target.classList.contains('break-remove-btn')) {
                const idx  = Number(e.target.dataset.index);
                const next = (getBreakValues(bModeId) || []).filter((_, i) => i !== idx);
                setBreakValues(bModeId, next);
                applyAndRefresh();
                return;
            }
            if (e.target.classList.contains('break-add-btn')) {
                const current = getBreakValues(bModeId) || [];
                const last    = current.length ? current[current.length - 1] : 0;
                setBreakValues(bModeId, [...current, last + 10]);
                applyAndRefresh();
                return;
            }
            if (e.target.classList.contains('break-reset-btn')) {
                resetBreakValues(bModeId);
                applyAndRefresh();
            }
        });
    }

    // ── Specials editor ──────────────────────────────────────────────
    const specialsEditor = container.querySelector('.specials-editor');
    if (specialsEditor) {
        const sModeId = specialsEditor.getAttribute('data-mode');

        const readSpecials = () =>
            [...specialsEditor.querySelectorAll('.special-row')].map((row) => {
                const val   = parseFloat(row.querySelector('.special-value-input').value);
                const label = row.querySelector('.special-label-input').value.trim();
                return { id: `special_${val}`, value: val, label: label || String(val) };
            }).filter(sv => Number.isFinite(sv.value));

        const applyAndRefresh = () => {
            refreshStyles();
            updateLegend();
            setupGraphicParametersPanel(scope);
        };

        specialsEditor.addEventListener('change', (e) => {
            if (
                e.target.classList.contains('special-value-input') ||
                e.target.classList.contains('special-label-input')
            ) {
                setSpecialValues(sModeId, readSpecials());
                applyAndRefresh();
            }
        });

        specialsEditor.addEventListener('click', (e) => {
            if (e.target.classList.contains('special-remove-btn')) {
                const idx  = Number(e.target.dataset.index);
                const next = readSpecials().filter((_, i) => i !== idx);
                setSpecialValues(sModeId, next);
                applyAndRefresh();
                return;
            }
            if (e.target.classList.contains('special-add-btn')) {
                const current = readSpecials();
                setSpecialValues(sModeId, [
                    ...current,
                    { id: `special_new_${Date.now()}`, value: 0, label: '' },
                ]);
                applyAndRefresh();
                return;
            }
            if (e.target.classList.contains('special-reset-btn')) {
                resetSpecialValues(sModeId);
                applyAndRefresh();
            }
        });
    }
}