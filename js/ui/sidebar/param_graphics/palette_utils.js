// ui/sidebar/param_graphics/palette_utils.js
import { PALETTES, sampleGradient } from '/js/config/palettes.js';
import { COLOR_MODES } from '/js/config/colorModes.js';
import { refreshLayerStyles } from '/js/map/layer_SOL.js';
import { refreshOpStyles } from '/js/map/layer_OP.js';
import { updateLegend } from '/js/map/legend.js';
import {
    setCategoryColorOverride,
    setOpCategoryColorOverride,
} from '/js/state.js';



const modePaletteSelection = {};
const modePaletteReverse   = {};

export function getCurrentPaletteId(modeId) {
    return modePaletteSelection[modeId] || 'multicolor';
}

export function setCurrentPaletteId(modeId, paletteId) {
    modePaletteSelection[modeId] = paletteId;
}

export function isPaletteReversed(modeId) {
    return !!modePaletteReverse[modeId];
}

export function setPaletteReversed(modeId, flag) {
    modePaletteReverse[modeId] = !!flag;
}

// SOL ↔ OP の対応モードを解決
export function getLinkedMode(modeId) {
    if (!modeId) return null;
    const opModeId = `OP_${modeId}`;
    if (COLOR_MODES[opModeId]) return { modeId: opModeId, scope: 'OP' };
    if (modeId.startsWith('OP_')) {
        const solModeId = modeId.slice(3);
        if (COLOR_MODES[solModeId]) return { modeId: solModeId, scope: 'SOL' };
    }
    return null;
}

// 1カテゴリ分の色をリンク先モードにもコピー
export function syncColorToLinkedMode(modeId, categoryId, color) {
    const linked = getLinkedMode(modeId);
    if (!linked) return;
    if (linked.scope === 'OP') {
        setOpCategoryColorOverride(linked.modeId, categoryId, color);
    } else {
        setCategoryColorOverride(linked.modeId, categoryId, color);
    }
}

// ★ 元の applyPalette と同じロジック（ただし UI 再構築だけ呼び出し側で行う前提）
export function applyPalette(
    paletteId,
    legendItems,
    currentModeId,
    setColorOverride,
    refreshStyles,
    scope,
) {
    const palette = PALETTES[paletteId];
    if (!palette) return;

    // 自分側のパレット状態を保存
    setCurrentPaletteId(currentModeId, paletteId);
    const reversed = isPaletteReversed(currentModeId);

    // パレットから色列を生成
    let colors;
    if (palette.type === 'gradient') {
        colors = sampleGradient(palette.colors, legendItems.length);
    } else {
        colors = palette.colors;
    }

    // カテゴリごとに色を適用（SOL/OP 両方の override に書き込む）
    legendItems.forEach((item, index) => {
        if (!item.id) return;

        let color;
        if (palette.type === 'gradient') {
            const idx = reversed ? (colors.length - 1 - index) : index;
            color = colors[idx];
        } else {
            const baseIdx = index % colors.length;
            const idx = reversed ? (colors.length - 1 - baseIdx) : baseIdx;
            color = colors[idx];
        }

        setColorOverride(currentModeId, item.id, color);
        syncColorToLinkedMode(currentModeId, item.id, color);
    });

    // 1) 今のスコープのスタイル更新
    refreshStyles();
    updateLegend();

    // 2) リンク先モードにもパレット状態をコピー ＋ スタイル更新
    const linked = getLinkedMode(currentModeId);
    if (linked) {
        setCurrentPaletteId(linked.modeId, paletteId);
        setPaletteReversed(linked.modeId, reversed);

        if (linked.scope === 'OP') {
            refreshOpStyles();
        } else {
            refreshLayerStyles();
        }
    }

    // 3) パネルの再構築は UI 層（sidebar_index.js）で行う
}