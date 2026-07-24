// js/ui/comparison/comparison_toggle.js

import {
    isComparisonMode,
    setComparisonMode,
    getComparisonBuffer,
    getComparisonBufferSize,
    clearComparisonBuffer,
} from '/js/state.js';
import { resetAllHighlights, clearSOLComparisonVisuals } from '/js/map/layer_SOL.js';
import { clearOPSelection, clearOPComparisonVisuals }    from '/js/map/layer_OP.js';
// ── DOM参照 ──────────────────────────────────────────────────────────────────

let _btn        = null;   // トグルボタン本体
let _badge      = null;   // 選択数バッジ
let _clearBtn   = null;   // クリアボタン
let _onCompare  = null;   // 比較実行コールバック（外部注入）

// ── 公開 API ─────────────────────────────────────────────────────────────────

/**
 * 比較トグルUIを初期化・マウントする
 *
 * @param {object} options
 * @param {HTMLElement} options.mountTarget  - ボタンを挿入する親要素
 * @param {function}    options.onCompare    - バッファが2件以上になったとき呼ばれるcb
 *                                            (buffer: {type,data,label}[]) => void
 * @param {'beforeend'|'afterbegin'} [options.position='beforeend']
 */
export function initComparisonToggle({ mountTarget, onCompare, position = 'beforeend' }) {
    if (!mountTarget) return;
    _onCompare = onCompare ?? null;

    // ── ボタンHTML ──
    const wrapper = document.createElement('div');
    wrapper.className = 'cmp-toggle-wrapper';
    wrapper.innerHTML = `
        <button class="cmp-toggle-btn" id="cmp-toggle-btn" title="Activer le mode comparaison">
            <span class="cmp-toggle-icon">⇄</span>
            <span class="cmp-toggle-label">Comparer</span>
            <span class="cmp-toggle-badge" hidden>0</span>
        </button>
        <button class="cmp-clear-btn" id="cmp-clear-btn" title="Vider la sélection" hidden>
            ✕
        </button>
    `;
    mountTarget.insertAdjacentElement(position, wrapper);

    _btn      = wrapper.querySelector('#cmp-toggle-btn');
    _badge    = wrapper.querySelector('.cmp-toggle-badge');
    _clearBtn = wrapper.querySelector('#cmp-clear-btn');

    // ── イベント ──
    _btn.addEventListener('click', _handleToggle);
    _clearBtn.addEventListener('click', _handleClear);

    _syncUI();
}

/**
 * バッファに要素が追加されたときに外部から呼んでバッジを更新する
 */
export function updateComparisonBadge() {
    _syncUI();
}

// ── 内部 ─────────────────────────────────────────────────────────────────────

function _handleToggle() {
    const next = !isComparisonMode();
    setComparisonMode(next);

    // モードをOFFにしたらバッファ＋選択状態をクリア
    if (!next) {
        _clearAll();
    }

    _syncUI();
}

function _handleClear() {
    // ★ バッファをクリアしてから即座にUIへ反映（_syncUI より先）
    _clearAll();

    _badge.hidden        = true;
    _badge.textContent   = '0';
    _clearBtn.hidden     = true;

    _syncUI(); // 念のため全状態を同期

    const details = document.querySelector('.bottom-details');
    if (details) {
        details.innerHTML = `<p class="placeholder">Sélectionnez un élément sur la carte.</p>`;
    }
}

function _clearAll() {
    // 比較ビジュアル＋バッファをクリア（clearComparisonBuffer は各関数内で呼ばれる）
    clearSOLComparisonVisuals();
    clearOPComparisonVisuals();
    // 通常選択もリセット
    resetAllHighlights();
    clearOPSelection();
}

function _syncUI() {
    if (!_btn) return;

    const active = isComparisonMode();
    const count  = getComparisonBufferSize();

    // トグルボタンの状態
    _btn.classList.toggle('cmp-toggle-btn--active', active);
    _btn.setAttribute('aria-pressed', String(active));
    _btn.title = active ? 'Désactiver le mode comparaison' : 'Activer le mode comparaison';

    // バッジ（比較モードON時のみ表示）
    if (active && count > 0) {
        const lockedType = getComparisonBuffer()[0]?.type ?? null;
        const typeLabel  = lockedType === 'SOL' ? '🔒 SOL' : lockedType === 'OP' ? '🔒 OP' : '';
        _badge.textContent = `${count}  ${typeLabel}`;
        _badge.hidden = false;
    } else {
        _badge.hidden = true;
    }

    // クリアボタン（バッファに1件以上あれば表示）
    _clearBtn.hidden = count === 0;

    // ガイドメッセージをバッジに反映
    if (active && count === 1) {
        _badge.title = '1 entité sélectionnée — cliquez sur une 2ᵉ entité';
    } else if (active && count >= 2) {
        _badge.title = `${count} entités comparées`;
    }
}