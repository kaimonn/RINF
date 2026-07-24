// ui/search/search_history.js

/**
 * Historique de recherche pour chaque type.
 *
 * - Ligne : { code, layers, timestamp }
 * - SOL   : { lineCode, km, opName, layer, timestamp }
 * - OP    : { query, uniqueId, name, timestamp }
 */

const MAX_HISTORY = 5;

let _ligneHistory = [];
let _solHistory   = [];
let _opHistory    = [];

// ── Ligne ─────────────────────────────────────────────────────────────

export function setLastLigneSearch(code, layers) {
    const ts = Date.now();
    // même code → 先頭に入れ直し
    _ligneHistory = [
        { code, layers, timestamp: ts },
        ..._ligneHistory.filter(h => h.code !== code),
    ].slice(0, MAX_HISTORY);
}

export function getLastLigneSearch() {
    return _ligneHistory.length ? _ligneHistory[0] : null;
}

export function getLigneHistory() {
    return _ligneHistory;
}

// ── SOL (ligne + PK + nom d’OP) ──────────────────────────────────────

export function setLastSolSearch(lineCode, km, opName, layer) {
    const ts = Date.now();
    const key = `${lineCode}:${km}`;
    _solHistory = [
        { lineCode, km, opName, layer, key, timestamp: ts },
        ..._solHistory.filter(h => h.key !== key),
    ].slice(0, MAX_HISTORY);
}

export function getLastSolSearch() {
    return _solHistory.length ? _solHistory[0] : null;
}

export function getSolHistory() {
    return _solHistory;
}

// ── OP (ID + nom) ────────────────────────────────────────────────────

export function setLastOpSearch(query, uniqueId, name) {
    const ts = Date.now();
    const key = uniqueId || query;
    _opHistory = [
        { query, uniqueId, name, key, timestamp: ts },
        ..._opHistory.filter(h => h.key !== key),
    ].slice(0, MAX_HISTORY);
}

export function getLastOpSearch() {
    return _opHistory.length ? _opHistory[0] : null;
}

export function getOpHistory() {
    return _opHistory;
}

// ───────────────────────────────────────────────────────────────────────
// UI: intégration de l’historique dans les boîtes de suggestions
// ───────────────────────────────────────────────────────────────────────

export function prependLigneHistoryItem(suggestBox, onSelect) {
    const history = getLigneHistory();
    if (!history.length) return;

    const header = document.createElement('div');
    header.className = 'suggestion-item suggestion-history-header';
    header.textContent = 'Historique des recherches (lignes)';
    header.style.cssText = 'font-weight:bold; background:#f5f5f5;';
    suggestBox.appendChild(header);

    history.forEach(h => {
        const item = document.createElement('div');
        item.className = 'suggestion-item suggestion-history';
        item.textContent = `${h.code} (${h.layers.length} sections)`;
        item.style.cssText = 'background:#f5f5f5; font-size:0.9em; padding:6px;';
        item.addEventListener('click', () => onSelect(h.code));
        suggestBox.appendChild(item);
    });

    const sep = document.createElement('div');
    sep.style.cssText = 'height:1px; background:#ddd; margin:4px 0;';
    suggestBox.appendChild(sep);
}

export function prependSolHistoryItem(suggestBox, onRunSearch) {
    const history = getSolHistory();
    if (!history.length) return;

    const header = document.createElement('div');
    header.className = 'suggestion-item suggestion-history-header';
    header.textContent = 'Historique des recherches (sections SOL par PK)';
    header.style.cssText = 'font-weight:bold; background:#f5f5f5;';
    suggestBox.appendChild(header);

    history.forEach(h => {
        const label = h.opName
            ? `${h.lineCode} @ PK ${h.km} — ${h.opName}`
            : `${h.lineCode} @ PK ${h.km}`;
        const item = document.createElement('div');
        item.className = 'suggestion-item suggestion-history';
        item.textContent = label;
        item.style.cssText = 'background:#f5f5f5; font-size:0.9em; padding:6px;';
        item.addEventListener('click', () => {
            const lineInput = document.getElementById('sol-km-line-input');
            const kmInput   = document.getElementById('sol-km-value-input');
            if (lineInput) lineInput.value = h.lineCode;
            if (kmInput)   kmInput.value   = String(h.km);
            if (typeof onRunSearch === 'function') {
                onRunSearch();         // ← 両方復元したら即検索
            };
        });
        suggestBox.appendChild(item);
    });

    const sep = document.createElement('div');
    sep.style.cssText = 'height:1px; background:#ddd; margin:4px 0;';
    suggestBox.appendChild(sep);
}

export function prependOpHistoryItem(suggestBox, onSelect) {
    const history = getOpHistory();
    if (!history.length) return;

    const header = document.createElement('div');
    header.className = 'suggestion-item suggestion-history-header';
    header.textContent = 'Historique des recherches (OP)';
    header.style.cssText = 'font-weight:bold; background:#f5f5f5;';
    suggestBox.appendChild(header);

    history.forEach(h => {
        const label = h.name
            ? `${h.uniqueId} — ${h.name}`
            : (h.uniqueId || h.query);
        const item = document.createElement('div');
        item.className = 'suggestion-item suggestion-history';
        item.textContent = label;
        item.style.cssText = 'background:#f5f5f5; font-size:0.9em; padding:6px; cursor:pointer;';
        item.addEventListener('click', () => onSelect(label));
        suggestBox.appendChild(item);
    });

    const sep = document.createElement('div');
    sep.style.cssText = 'height:1px; background:#ddd; margin:4px 0;';
    suggestBox.appendChild(sep);
}