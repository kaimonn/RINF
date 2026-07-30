// ui/search/search_switcher.js

export function initSearchSwitcher() {
    const buttons = document.querySelectorAll('.search-mode-btn');
    const blocks = {
        ligne: document.getElementById('search-mode-ligne'),
        op:    document.getElementById('search-mode-op'),
        solpk: document.getElementById('search-mode-solpk'),
    };

    if (!buttons.length) return;

    const setMode = (mode) => {
        Object.entries(blocks).forEach(([key, el]) => {
            if (el) el.style.display = key === mode ? 'block' : 'none';
        });
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => setMode(btn.dataset.mode));
    });

    setMode('ligne'); // 初期表示
}