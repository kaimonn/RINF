// ui/loadingOverlay.js

let _loadingCount = 0;

export function showLoading(message = 'Chargement en cours...') {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;

    const msgEl = overlay.querySelector('.loading-message');
    if (msgEl) msgEl.textContent = message;

    _loadingCount++;
    overlay.classList.add('visible');
}

export function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;

    _loadingCount = Math.max(0, _loadingCount - 1);
    if (_loadingCount === 0) {
        overlay.classList.remove('visible');
    }
}

// ★ カウンタはいじらず「メッセージだけ」変える関数
export function updateLoadingMessage(message) {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;

    const msgEl = overlay.querySelector('.loading-message');
    if (msgEl) msgEl.textContent = message;
}