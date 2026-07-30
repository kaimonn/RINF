// ui/sidebar/sidebar_index.js
// =============================================
// SIDEBAR INDEX
// Orchestration des modes SOL / Ligne / OP
// Délègue le rendu du panneau inférieur à bottom_index.js
// =============================================

import {
    saveSidebarState,
    restoreSidebarState,
    setSidebarMode,
    setupSidebarEventListeners,
} from './sidebar_state.js';

import { updateLegend }             from '../../map/legend.js';
import { lookupSOL }                from '../../../data/data_loader.js';
import { setupGraphicParametersPanel } from './graphic_parameters_panel.js';

import {
    renderBottomBarForSol,
    renderBottomBarForLine,
    renderBottomBarForOP,
    clearBottomBar,
} from '../bottomBar/bottom_index.js';


// =============================================
// 1. TRONÇON (SOL)
// =============================================
export function updateSidebar(properties, allFeatures = []) {
    saveSidebarState();
    setSidebarMode('SOL');

    if (!properties) {
        clearBottomBar(
            'Cliquez sur une ligne ou effectuez une recherche par code ' +
            'pour afficher les informations ici.'
        );
        _refreshPanels();
        return;
    }

    const fullProps = lookupSOL(properties);
    if (!fullProps) {
        clearBottomBar(
            `Données introuvables pour cette section ` +
            `(${properties.SOLOPStart ?? '?'} → ${properties.SOLOPEnd ?? '?'}).`
        );
        _refreshPanels();
        return;
    }

    renderBottomBarForSol(fullProps);

    const currentVoies = Array.isArray(fullProps.SOLTrack) ? fullProps.SOLTrack : [];
    restoreSidebarState(currentVoies);
    setupSidebarEventListeners();
    _refreshPanels();
}


// =============================================
// 2. LIGNE
// =============================================
export function updateSidebarForLine(lineCode, sectionLayers, allFeatures = []) {
    saveSidebarState();

    if (!sectionLayers || sectionLayers.length === 0) {
        clearBottomBar(`Aucune section trouvée pour le code ${lineCode}.`);
        _refreshPanels();
        return;
    }

    renderBottomBarForLine(lineCode, sectionLayers);

    restoreSidebarState();
    setupSidebarEventListeners();
    _refreshPanels();
}


// =============================================
// 3. POINT OPÉRATIONNEL (OP)
// =============================================
export function updateSidebarForOP(op) {
    saveSidebarState();
    setSidebarMode('OP');

    if (!op) {
        clearBottomBar('Point opérationnel introuvable dans le fichier XML.');
        _refreshPanels();
        return;
    }

    renderBottomBarForOP(op);

    restoreSidebarState();
    setupSidebarEventListeners();
    _refreshPanels();
}


// =============================================
// PRIVÉ – Mise à jour des panneaux communs
// =============================================
function _refreshPanels() {
    setupGraphicParametersPanel('SOL');
    setupGraphicParametersPanel('OP');
    updateLegend();
}