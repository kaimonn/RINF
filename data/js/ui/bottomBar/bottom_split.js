// js/ui/bottonBar/bottom_split.js

export function setupBottomSplit() {
    const container = document.getElementById('bottom-info-content'); // ← ここだけ変更
    const resizer   = document.getElementById('bottom-split-resizer');
    const left      = container?.querySelector('.bottom-structure');   // ← containerから取得に変更（より安全）
    if (!container || !resizer || !left) return;


    // 前回の幅を px で復元
    const saved = localStorage.getItem('bottomStructureWidthPx');
    if (saved) {
        left.style.flexBasis = saved;
    }

    let dragging   = false;
    let startX     = 0;
    let startWidth = 0;

    // ドラッグ開始
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        dragging   = true;
        startX     = e.clientX;
        startWidth = left.getBoundingClientRect().width;

        document.body.style.cursor     = 'col-resize';
        document.body.style.userSelect = 'none';
    });

    // ドラッグ中
    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;

        const containerRect  = container.getBoundingClientRect();
        const containerWidth = containerRect.width;

        // 左パネルの最小・最大幅（お好みで調整）
        const minLeft  = 200;                      // 左パネルがこれ以下にならない
        const minRight = 260;                      // 右パネルの最小幅
        const maxLeft  = containerWidth - minRight; // これ以上は右パネルが潰れるので禁止

        let newWidth = startWidth + (e.clientX - startX);

        // クランプ
        newWidth = Math.max(minLeft, Math.min(maxLeft, newWidth));

        left.style.flexBasis = `${newWidth}px`;
        localStorage.setItem('bottomStructureWidthPx', `${newWidth}px`);
    });

    // ドラッグ終了
    document.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        document.body.style.cursor     = '';
        document.body.style.userSelect = '';
    });
}