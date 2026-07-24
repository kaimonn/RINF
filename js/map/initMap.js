// js/map/initMap.js

import { setMap } from '../state.js'; // state.js のパスに合わせて調整してください

export function initMap() {
    // --- Initialisation de la carte ---
    const map = L.map('map').setView([46.603354, 1.888334], 6);

    // Fond de carte (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    setMap(map); // 初期化したマップインスタンスを state.js に保存
    return map;  // 必要に応じてマップインスタンスを返す
}