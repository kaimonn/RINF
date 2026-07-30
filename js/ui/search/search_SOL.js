// ui/search/search_SOL.js

import { getGeojsonLayer, getMap, getSelectedLayers, setSelectedLayers, getAllCodes } from '../../state.js';         
import { getSelectedStyle } from '../../map/styles_SOL.js';                                                              
import { updateSidebar } from '../sidebar/sidebar_index.js';                                                          
import { lookupOP } from '../../../data/data_loader.js';
import { setLastSolSearch,  prependSolHistoryItem } from './search_history.js';   

import { showLoading, hideLoading } from '../loadingOverlay.js';

// ────────────────────────────────────────────────────────────────────────────
// ユーティリティ
// ────────────────────────────────────────────────────────────────────────────

function getKmForLine(opData, lineCode) {
    if (!opData) return null;
    const raw = opData.OPRailwayLocation;
    if (!raw) return null;
    const locations = Array.isArray(raw) ? raw : [raw];
    const loc = locations.find(l => String(l.NationalIdentNum ?? '') === lineCode);
    if (!loc) return null;
    const km = parseFloat(loc.Kilometer);
    return isNaN(km) ? null : km;
}

// ────────────────────────────────────────────────────────────────────────────
// 路線上の OP km リスト取得（サジェスト用）
// ────────────────────────────────────────────────────────────────────────────

function getKmListForLine(lineCode) {
    const geojsonLayer = getGeojsonLayer();
    if (!geojsonLayer || !lineCode) return [];

    const targetLine = String(lineCode);
    const opIds = new Set();

    geojsonLayer.eachLayer(layer => {
        const props = layer.feature?.properties;
        if (!props) return;
        if (String(props.SOLLineIdentification ?? '') !== targetLine) return;
        if (props.SOLOPStart) opIds.add(props.SOLOPStart);
        if (props.SOLOPEnd)   opIds.add(props.SOLOPEnd);
    });

    const result = [];
    opIds.forEach(opId => {
        const opData = lookupOP(opId);
        const km = getKmForLine(opData, targetLine);
        if (km !== null) {
            result.push({ opId, name: opData?.OPName ?? opId, km });
        }
    });

    return result.sort((a, b) => a.km - b.km);
}

// ────────────────────────────────────────────────────────────────────────────
// 検索ロジック
// ────────────────────────────────────────────────────────────────────────────

export function findSOLByLineAndKm(lineCode, targetKm) {
    const geojsonLayer = getGeojsonLayer();
    if (!geojsonLayer) return null;

    const targetLine = String(lineCode);
    const km = parseFloat(targetKm);
    if (isNaN(km)) return null;

    let bestLayer = null;
    let bestRange = Infinity;

    geojsonLayer.eachLayer(layer => {
        const props = layer.feature?.properties;
        if (!props) return;
        if (String(props.SOLLineIdentification ?? '') !== targetLine) return;

        const startOP = lookupOP(props.SOLOPStart);
        const endOP   = lookupOP(props.SOLOPEnd);

        const startKm = getKmForLine(startOP, targetLine);
        const endKm   = getKmForLine(endOP,   targetLine);
        if (startKm === null || endKm === null) return;

        const minKm = Math.min(startKm, endKm);
        const maxKm = Math.max(startKm, endKm);

        if (km >= minKm && km <= maxKm) {
            const range = maxKm - minKm;
            if (range < bestRange) {
                bestRange = range;
                bestLayer = layer;
            }
        }
    });

    return bestLayer;
}

// ────────────────────────────────────────────────────────────────────────────
// 検索実行
// ────────────────────────────────────────────────────────────────────────────

function searchByLineAndKm() {
    const lineCode = document.getElementById('sol-km-line-input')?.value.trim();
    const kmValue  = document.getElementById('sol-km-value-input')?.value.trim();

    if (!lineCode || !kmValue) {
        alert('Veuillez saisir le code de ligne et la valeur kilométrique.');
        return;
    }

    const geojsonLayer = getGeojsonLayer();
    if (!geojsonLayer) {
        alert("Le GeoJSON n'est pas encore chargé. Veuillez patienter puis réessayer.");
        return;
    }

    // ローディング表示
    showLoading('Recherche de la section SOL...');

    // ★ 次のイベントループで検索処理を実行（描画を先に走らせる）
    setTimeout(() => {
        try {
            getSelectedLayers().forEach(layer => geojsonLayer.resetStyle(layer));

            const foundLayer = findSOLByLineAndKm(lineCode, kmValue);
            if (!foundLayer) {
                alert(`Aucune section trouvée pour la ligne « ${lineCode} » au PK ${kmValue}.`);
                setSelectedLayers([]);
                return;
            }

            setSelectedLayers([foundLayer]);
            foundLayer.setStyle(getSelectedStyle());
            foundLayer.bringToFront();

            // 履歴用に、PKに最も近いOP名を計算
            let opName = null;
            if (foundLayer.feature?.properties) {
                const props = foundLayer.feature.properties;
                const targetLine = String(lineCode);
                const targetKm   = parseFloat(kmValue);

                const startOP = lookupOP(props.SOLOPStart);
                const endOP   = lookupOP(props.SOLOPEnd);

                const startKm = getKmForLine(startOP, targetLine);
                const endKm   = getKmForLine(endOP,   targetLine);

                if (startKm !== null && endKm !== null) {
                    const distStart = Math.abs(targetKm - startKm);
                    const distEnd   = Math.abs(targetKm - endKm);
                    const closerOP  = distStart <= distEnd ? startOP : endOP;
                    opName = closerOP?.OPName ?? null;
                }
            }

            setLastSolSearch(lineCode, parseFloat(kmValue), opName, foundLayer);
            getMap().fitBounds(foundLayer.getBounds(), { padding: [40, 40], maxZoom: 16 });

            if (foundLayer.feature?.properties) {
                updateSidebar(foundLayer.feature.properties);
            }
        } finally {
            hideLoading();
        }
    }, 0);
}
// ────────────────────────────────────────────────────────────────────────────
// サジェスト: 路線コード
// ────────────────────────────────────────────────────────────────────────────

function showKmLineSuggestions(prefix, fromFocus = false) {
    const box = document.getElementById('sol-km-line-suggestions');
    if (!box) return;
    box.innerHTML = '';

    // 履歴表示（クリックすると line / PK が復元）
    prependSolHistoryItem(box, () => {
        searchByLineAndKm();           // ← ライン＋PKが復元されたら検索
    });

    const allCodes = getAllCodes();
    const value = prefix.trim();

    if (!value && !fromFocus) { box.style.display = 'none'; return; }

    const lower = value.toLowerCase();
    let matches = value
        ? allCodes.filter(c => c.toLowerCase().startsWith(lower))
        : allCodes;
    matches = matches.slice(0, 20);

    if (matches.length === 0) { box.style.display = 'none'; return; }

    matches.forEach(code => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = code;

        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const lineInput = document.getElementById('sol-km-line-input');
            if (lineInput) lineInput.value = code;
            box.style.display = 'none';

            const kmInput = document.getElementById('sol-km-value-input');
            if (kmInput && kmInput.value.trim()) {
                // ラインもPKも埋まっている場合のみ検索
                searchByLineAndKm();
            }
        });

        box.appendChild(item);
    });
    box.style.display = 'block';
}

// ────────────────────────────────────────────────────────────────────────────
// サジェスト: キロメーター値
// ────────────────────────────────────────────────────────────────────────────

function showKmSuggestions(prefix, fromFocus = false) {
    const box = document.getElementById('sol-km-value-suggestions');
    if (!box) return;
    box.innerHTML = '';

    const lineCode = document.getElementById('sol-km-line-input')?.value.trim();
    const value    = prefix.trim();

    if (!value && !fromFocus) { box.style.display = 'none'; return; }

    if (!lineCode) {
        const w = document.createElement('div');
        w.className = 'suggestion-item';
        w.style.cssText = 'font-style:italic;color:#999';
        w.textContent = 'Veuillez d\'abord saisir le code de ligne';
        box.appendChild(w);
        box.style.display = 'block';
        return;
    }

    const kmList = getKmListForLine(lineCode);
    if (kmList.length === 0) { box.style.display = 'none'; return; }

    let matches = value
        ? kmList.filter(e =>
            String(e.km).startsWith(value) ||
            e.name.toLowerCase().includes(value.toLowerCase())
        )
        : kmList;
    matches = matches.slice(0, 30);

    if (matches.length === 0) { box.style.display = 'none'; return; }

    matches.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = `${entry.km} — ${entry.name}`;
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const kmInput = document.getElementById('sol-km-value-input');
            if (kmInput) kmInput.value = entry.km;
            box.style.display = 'none';

            const lineInput = document.getElementById('sol-km-line-input');
            if (lineInput && lineInput.value.trim()) {
                searchByLineAndKm();   // ← ラインが埋まっていれば検索
            }
        });
        box.appendChild(item);
    });
    box.style.display = 'block';
}

// ────────────────────────────────────────────────────────────────────────────
// 初期化
// ────────────────────────────────────────────────────────────────────────────

export function initSolKmSearch() {
    const btn       = document.getElementById('sol-km-search-button');
    const lineInput = document.getElementById('sol-km-line-input');
    const kmInput   = document.getElementById('sol-km-value-input');

    if (btn) btn.addEventListener('click', searchByLineAndKm);

    if (lineInput) {
        lineInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); searchByLineAndKm(); }
        });

        lineInput.addEventListener('input', (e) => {
            showKmLineSuggestions(e.target.value);
        });

        // ★ クリックして書き換えようとしたら、LigneとPKをクリア
        lineInput.addEventListener('focus', (e) => {
            // 以前の入力を消す
            e.target.value = '';
            // PK側にも値が入っていれば消す
            if (kmInput) kmInput.value = '';
            // 空文字を前提にサジェストを表示
            showKmLineSuggestions('', true);
        });

        lineInput.addEventListener('blur', () => {
            setTimeout(() => {
                const box = document.getElementById('sol-km-line-suggestions');
                if (box) box.style.display = 'none';
            }, 200);
        });
    }

    if (kmInput) {
        kmInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); searchByLineAndKm(); }
        });

        kmInput.addEventListener('input', (e) => {
            showKmSuggestions(e.target.value);
        });

        // ★ クリックして書き換えようとしたら、PKをクリア
        kmInput.addEventListener('focus', (e) => {
            e.target.value = '';
            showKmSuggestions('', true);
        });

        kmInput.addEventListener('blur', () => {
            setTimeout(() => {
                const box = document.getElementById('sol-km-value-suggestions');
                if (box) box.style.display = 'none';
            }, 200);
        });
    }

    console.log('SOL PK Search initialized');
}