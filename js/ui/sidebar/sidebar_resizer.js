// ui/sidebar/sidebar_resizer.js

import { getMap } from '../../state.js'; // すでにある util に合わせて調整

export function setupSidebarResizer() {
    const container = document.getElementById('container');
    const sidebar   = document.getElementById('sidebar');
    const mapDiv    = document.getElementById('map');

    if (!container || !sidebar || !mapDiv) return;

    // resizer 要素をサイドバー内に追加
    const resizer = document.createElement('div');
    resizer.id = 'sidebar-resizer';
    sidebar.appendChild(resizer);

    let isDragging = false;

    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        document.body.style.cursor = 'col-resize';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();

        // サイドバーは右側にある前提:
        // コンテナ右端 - マウス位置 = 新しい幅
        let newWidth = containerRect.right - e.clientX;

        // 最小・最大幅を制約
        const minWidth = 260;
        const maxWidth = containerRect.width * 0.7; // 画面の 70% まで
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

        sidebar.style.width = `${newWidth}px`;
        // flex レイアウトなので map は自動的に残り幅にフィットする
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.cursor = '';

        // Leaflet マップがあればサイズを再計算
        try {
            const map = getMap && getMap();
            if (map && typeof map.invalidateSize === 'function') {
                map.invalidateSize();
            }
        } catch (e) {
            console.warn('Map resize error:', e);
        }
    });
}