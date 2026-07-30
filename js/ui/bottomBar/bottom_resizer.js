// ui/bottomBar/bottom_resizer.js
import { getMap } from '../../state.js'; // util から map インスタンスを取得

export function setupBottomResizer() {
    const mapArea    = document.getElementById('map-area');
    const resizer    = document.getElementById('bottom-resizer');
    const bottomInfo = document.getElementById('bottom-info');

    if (!mapArea || !resizer || !bottomInfo) return;

    let isDragging = false;
    let startY     = 0;
    let startHeight = 0;

    // 制約値
    const minHeight = 80;                     // px
    const maxHeight = window.innerHeight * 0.6; // 画面の 60% まで

    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging  = true;
        startY      = e.clientY;
        startHeight = bottomInfo.getBoundingClientRect().height;

        document.body.style.cursor = 'row-resize';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const dy     = e.clientY - startY;
        let newH     = startHeight - dy; // 上方向にドラッグすると高さが減る

        newH = Math.max(minHeight, Math.min(maxHeight, newH));

        // flex-basis を直接指定して高さを更新
        bottomInfo.style.flex = `0 0 ${newH}px`;

        // Leaflet マップがあればサイズを再計算
        try {
            const map = getMap && getMap();
            if (map && typeof map.invalidateSize === 'function') {
                map.invalidateSize();
            }
        } catch (err) {
            console.warn('Map resize error:', err);
        }
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.cursor = '';
    });
}