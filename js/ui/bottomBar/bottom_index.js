// ui/bottomBar/bottom_index.js
// =============================================
// BOTTOM INDEX
// Point d'entrée pour le rendu du panneau inférieur
// Orchestre bottom_bar.js pour SOL / Ligne / OP
// =============================================

import { lookupOP } from '/data/xml_loader.js';
import { focusOPByUniqueId } from '/js/map/layer_OP.js';
import {
    renderSolBottomBar,
    renderOpBottomBar,
    renderLineBottomBar,
    clearBottomBar as _clearBottomBar,
} from './bottom_structure.js';
import { showLoading, hideLoading } from '../loadingOverlay.js';

// =============================================
// 1. ACCÈS AU DOM
// =============================================
function getDetailsContainer() {
    return document.querySelector('.bottom-details');
}


// =============================================
// 2. RENDU TRONÇON (SOL)
// =============================================
export function renderBottomBarForSol(fullProps) {
    renderSolBottomBar(fullProps);
}


// =============================================
// 3. RENDU LIGNE – Construction du résumé HTML
// =============================================

/** Récupère le PK d'un OP pour une ligne donnée */
function getKmForLine(opData, lineCode) {
    if (!opData || !lineCode) return null;
    const raw = opData.OPRailwayLocation;
    if (!raw) return null;
    const locs = Array.isArray(raw) ? raw : [raw];
    const loc = locs.find(l => String(l.NationalIdentNum ?? '') === String(lineCode));
    if (!loc) return null;
    const km = parseFloat(loc.Kilometer);
    return Number.isNaN(km) ? null : km;
}

/** Génère la cellule HTML d'un OP avec l'icône de lien 🔍 */
function formatOpCell({ opId, opData, km }) {
    let name = opData?.OPName;
    if (name && typeof name === 'object') name = name.Value ?? '';
    let label = opId;
    if (name) label += ` – ${name}`;
    if (km != null) label += ` (PK ${km})`;
    return `
        <span class="op-info">
            <span class="op-info-label">${label}</span>
            <button type="button" class="op-link-icon" data-focus-op="${opId}"
                title="Afficher ce point opérationnel sur la carte">🔍</button>
        </span>
    `;
}

/** Construit le HTML de résumé pour une ligne */
function buildLineSummaryHtml(lineCode, sectionLayers) {
    const opMap = new Map();
    let totalLength = 0;

    sectionLayers.forEach(layer => {
        const p = layer.feature?.properties || {};
        const len = Number(p.SOLLength);
        if (!Number.isNaN(len)) totalLength += len;

        ['SOLOPStart', 'SOLOPEnd'].forEach(key => {
            const opId = p[key];
            if (!opId || opMap.has(opId)) return;
            const opData = lookupOP(opId);
            const km = getKmForLine(opData, lineCode);
            if (km === null) return;
            opMap.set(opId, { opId, opData, km });
        });
    });

    let minOp = null;
    let maxOp = null;
    for (const entry of opMap.values()) {
        if (!minOp || entry.km < minOp.km) minOp = entry;
        if (!maxOp || entry.km > maxOp.km) maxOp = entry;
    }

    let html = `
        <div class="line-info">
            <h2 class="section-title">Informations sur la ligne</h2>
            <table class="line-info-table">
                <tr><td>Code ligne</td><td>${lineCode}</td></tr>
                <tr><td>Nombre de sections</td><td>${sectionLayers.length}</td></tr>
    `;
    if (minOp && maxOp) {
        html += `
                <tr><td>OP de début (min PK)</td><td>${formatOpCell(minOp)}</td></tr>
                <tr><td>OP de fin (max PK)</td><td>${formatOpCell(maxOp)}</td></tr>
        `;
    }
    if (totalLength > 0) {
        html += `<tr><td>Longueur totale (km)</td><td>${totalLength.toFixed(3)}</td></tr>`;
    }
    html += `
            </table>
            <p class="line-info-hint">
                Vue d'ensemble de la ligne. Cliquez sur une section pour voir les détails.
            </p>
        </div>
    `;
    return html;
}

export function renderBottomBarForLine(lineCode, sectionLayers) {
    const summaryHtml = buildLineSummaryHtml(lineCode, sectionLayers);

    // Panneau gauche : arbre de structure (summaryHtml stocké dans le nœud racine)
    renderLineBottomBar(lineCode, sectionLayers, summaryHtml);

    // Panneau droit : affichage initial du résumé
    const details = getDetailsContainer();
    if (details) details.innerHTML = summaryHtml;
}


// =============================================
// 4. RENDU OP (point opérationnel)
// =============================================
export function renderBottomBarForOP(op) {
    renderOpBottomBar(op);
}


// =============================================
// 5. ÉTAT VIDE
// =============================================
export function clearBottomBar(message = '') {
    _clearBottomBar(message);
}


// =============================================
// 6. INTERACTIONS – Clics sur les icônes 
//    (déplacé depuis sidebar_index.js)
// =============================================
function setupBottomBarInteractions() {
    const container = document.getElementById('bottom-info-content');
    if (!container) return;

    container.addEventListener('click', (e) => {
        // Clic sur une icône de lien OP → zoom carte
        const opBtn = e.target.closest('[data-focus-op]');
        if (opBtn) {
            const opId = opBtn.dataset.focusOp;
            if (!opId) return;
            showLoading('Localisation en cours...');
            setTimeout(() => {
                try { focusOPByUniqueId(opId); }
                finally { hideLoading(); }
            }, 0);
            return;
        }

        const lineBtn = e.target.closest('[data-focus-line]');
        if (lineBtn) {
            const lineCode = lineBtn.dataset.focusLine;
            if (!lineCode) return;
            showLoading('Chargement de la ligne...');
            setTimeout(() => {
                try {
                    const input = document.getElementById('search-input');
                    const btn   = document.getElementById('search-button');
                    if (input) input.value = lineCode;
                    if (btn)   btn.click();
                } finally { hideLoading(); }
            }, 0);
        }
    });
}

document.addEventListener('DOMContentLoaded', setupBottomBarInteractions);