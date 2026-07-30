// ui/search/opPointSearch.js

import { getOpFeatures } from '../../state.js';        
import { focusOPByUniqueId } from '../../map/layer_OP.js'; 
import { setLastOpSearch, prependOpHistoryItem } from './search_history.js';
import { normalizeForSearch } from './searchUtils.js';

import { showLoading, hideLoading } from '../loadingOverlay.js';

// ────────────────────────────────────────────────────────────────────────────
// インデックス管理
// ────────────────────────────────────────────────────────────────────────────

let _opIndex = [];

export function refreshOpSearchIndex() {
    const features = getOpFeatures();
    _opIndex = features
        .map(f => ({
            uniqueId:       String(f.properties?.UniqueOPID ?? ''),
            name:           String(f.properties?.OPName     ?? ''),
            nameNormalized: normalizeForSearch(String(f.properties?.OPName ?? '')),
            type:           String(f.properties?.OPType     ?? ''),
        }))
        .filter(op => op.uniqueId);
}

function ensureIndex() {
    if (_opIndex.length === 0) refreshOpSearchIndex();
}

// ────────────────────────────────────────────────────────────────────────────
// UniqueOPID 検索
// ────────────────────────────────────────────────────────────────────────────

const NAME_SEARCH_TYPES = new Set(['10', '30', '40', '60', '70', '130']);

function showUniqueOPIDSuggestions(prefix, fromFocus = false) {
    const box = document.getElementById('op-uniqueid-suggestions');
    if (!box) return;
    box.innerHTML = '';

    // 履歴表示
    prependOpHistoryItem(box, (label) => {
        const input = document.getElementById('op-uniqueid-input');
        if (input) input.value = label;
        searchByUniqueOPID();
    });

    ensureIndex();

    const value = prefix.trim();
    if (!value && !fromFocus) {
        box.style.display = 'none';
        return;
    }

    const lower = value.toLowerCase();
    const lowerNormalized = normalizeForSearch(value);  

    let matches;
    if (!value) {
        matches = _opIndex.slice(0, 20);
    } else {
        matches = _opIndex.filter(op => {
            const inId =
                op.uniqueId.toLowerCase().includes(lower);

            const inName =
                !!op.name &&
                op.nameNormalized.includes(lowerNormalized);

            return inId || inName;

        }).slice(0, 20);
    }

    if (matches.length === 0) {
        box.style.display = 'none';
        return;
    }

    matches.forEach(op => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        const label = op.name ? `${op.uniqueId} — ${op.name}` : op.uniqueId;
        item.textContent = label;

        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const input = document.getElementById('op-uniqueid-input');
            if (input) input.value = label; // ← IDではなく「ID — Nom」を表示
            box.style.display = 'none';
            searchByUniqueOPID(); 
        });

        box.appendChild(item);
    });

    box.style.display = 'block';
}

function searchByUniqueOPID() {
    const input = document.getElementById('op-uniqueid-input');
    if (!input) return;

    const raw = input.value.trim();
    if (!raw) {
        alert('Veuillez saisir un UniqueOPID.');
        return;
    }

    showLoading('Recherche du point opérationnel...');

    setTimeout(() => {
        try {
            // 「ID — Nom」から ID 部分だけ抽出
            const value = raw.split('—')[0].trim();

            const found = focusOPByUniqueId(value);

            ensureIndex();
            const entry = _opIndex.find(op => op.uniqueId === value);
            const name = entry?.name || '';
            setLastOpSearch(raw, value, name);

            if (!found) {
                alert(`Aucun point opérationnel trouvé pour l'ID « ${value} ».`);
            }
        } finally {
            hideLoading();
        }
    }, 0);
}

// ────────────────────────────────────────────────────────────────────────────
// 初期化
// ────────────────────────────────────────────────────────────────────────────

export function initUniqueOPIDSearch() {
    ensureIndex();

    const btn   = document.getElementById('op-uniqueid-search-button');
    const input = document.getElementById('op-uniqueid-input');

    if (btn) btn.addEventListener('click', searchByUniqueOPID);

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); searchByUniqueOPID(); }
        });
        input.addEventListener('input',  (e) => showUniqueOPIDSuggestions(e.target.value));
        input.addEventListener('focus', (e) => {
            e.target.value = '';             
            showUniqueOPIDSuggestions('', true); 
        });
        input.addEventListener('blur', () => {
            setTimeout(() => {
                const box = document.getElementById('op-uniqueid-suggestions');
                if (box) box.style.display = 'none';
            }, 200);
        });
    }
}