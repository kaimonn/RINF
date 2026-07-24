// ui/search/ligneSearch.js

import {
    getAllCodes,
    getGeojsonLayer,
    getSelectedLayers,
    setSelectedLayers,
    getMap
} from '../../state.js';                  // 1階層深くなったので ../ → ../../ に変更

import {
    findLayersByCode
} from '../../map/layer_SOL.js';        // refreshLayerStyles は使っていないので削除

import { getSelectedStyle } from '../../map/styles_SOL.js';
import { updateSidebarForLine } from '../sidebar/sidebar_index.js';

import { setLastLigneSearch, prependLigneHistoryItem } from './search_history.js';

import { showLoading, hideLoading } from '/js/ui/loadingOverlay.js';


// --- Ligneコードでの検索 ---
export function searchByCode() {
    const inputEl = document.getElementById('search-input');
    const raw = inputEl.value.trim();

    if (!raw) {
        alert('Veuillez saisir un code à rechercher.');
        return;
    }

    const geojsonLayer = getGeojsonLayer();
    if (!geojsonLayer) {
        alert("Le GeoJSON n'est pas encore chargé. Veuillez patienter puis réessayer.");
        return;
    }

    showLoading('Recherche de la ligne...');

    setTimeout(() => {
        try {
            // ① すでに選択されているレイヤーの強調を全部解除
            const prevSelected = getSelectedLayers();
            prevSelected.forEach(l => geojsonLayer.resetStyle(l));

            // ② コードに一致する全セクションを取得
            const foundlayers = findLayersByCode(raw);
            if (foundlayers.length === 0) {
                alert(`Aucune ligne trouvée pour le code « ${raw} ».`);
                return;
            }

            // ③ 新しい選択集合として登録し、すべてを強調
            setSelectedLayers(foundlayers);
            foundlayers.forEach(layer => {
                layer.setStyle(getSelectedStyle());
                layer.bringToFront();
            });

            setLastLigneSearch(raw, foundlayers);

            // ④ 全セクションを含むようにズーム
            const bounds = L.latLngBounds();
            foundlayers.forEach(layer => bounds.extend(layer.getBounds()));
            getMap().fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });

            // ⑤ サイドバーは「路線全体の概要」を表示
            updateSidebarForLine(raw, foundlayers);

            console.log(`Search: Found ${foundlayers.length} sections for code "${raw}"`);
        } finally {
            hideLoading();
        }
    }, 0);
}

// --- サジェスト表示 ---
export function showSuggestions(prefix, fromFocus = false) {
    const box = document.getElementById('suggestions');
    box.innerHTML = '';

    const allCodes = getAllCodes();
    const value = prefix.trim();

    if (!value && !fromFocus) {
        box.style.display = 'none';
        return;
    }

    prependLigneHistoryItem(box, (code) => {
        const input = document.getElementById('search-input');
        input.value = code;
        // 自動的に検索実行 or ユーザーがEnterを押すまで待つ
        searchByCode();  // ← 自動実行したければこれを有効化
    });

    const lower = value.toLowerCase();

    let matches = allCodes;
    if (value) {
        matches = allCodes.filter(code => code.toLowerCase().startsWith(lower));
    }

    matches = matches.slice(0, 20);

    if (matches.length === 0) {
        box.style.display = 'none';
        return;
    }

    matches.forEach(code => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = code;

        item.addEventListener('click', () => {
            const input = document.getElementById('search-input');
            input.value = code;
            box.style.display = 'none';
            searchByCode();        
        });

        box.appendChild(item);
    });

    box.style.display = 'block';
}

// --- イベント初期化 ---
export function initSearch() {
    const btn = document.getElementById('search-button');
    const input = document.getElementById('search-input');

    if (btn) {
        btn.addEventListener('click', searchByCode);
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchByCode();
            }
        });

        input.addEventListener('input', (e) => {
            showSuggestions(e.target.value);
        });

        input.addEventListener('focus', (e) => {
            e.target.value = '';            
            showSuggestions('', true);       
        });

        input.addEventListener('blur', () => {
            setTimeout(() => {
                const box = document.getElementById('suggestions');
                if (box) box.style.display = 'none';
            }, 200);
        });
    }
}