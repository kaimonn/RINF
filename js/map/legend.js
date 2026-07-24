// map/legend.js

import {
    // SOL
    getCategoryVisibility,
    setCategoryVisibility,
    getCurrentColorMode,
    getAllFeatures,
    // OP
    getOpCategoryVisibility,
    setOpCategoryVisibility,
    getOpCurrentColorMode,
    getOpFeatures,
} from '../state.js';

import { refreshLayerStyles } from './layer_SOL.js';
import { refreshOpStyles } from './layer_OP.js';
import { getMap } from '../state.js';
import { COLOR_MODES } from '../config/colorModes.js';
import { syncSidebarVisibilityFromState } from '../ui/sidebar/graphic_parameters_panel.js';

let legendControl = null;


export function addLegend() {
    const map = getMap();
    if (!map) return;

    if (legendControl) {
        map.removeControl(legendControl);
        legendControl = null;
    }

    const solModeId = getCurrentColorMode();
    const solMode   = COLOR_MODES[solModeId];

    const opModeId  = getOpCurrentColorMode();
    const opMode    = COLOR_MODES[opModeId];

    const solFeatures = getAllFeatures();
    const opFeatures  = getOpFeatures();

    const solLegendItems = solMode && typeof solMode.getLegendItems === 'function'
        ? (solMode.getLegendItems(solFeatures) || [])
        : [];

    const opLegendItems = opMode && typeof opMode.getLegendItems === 'function'
        ? (opMode.getLegendItems(opFeatures) || [])
        : [];

    const control = L.control({ position: 'topright' });

    control.onAdd = function () {
        const div = L.DomUtil.create('div', 'visibility-toggles');

        let html = '';

        // ── SOL トグル ─────────────────────────────────────────────
        if (solModeId && solLegendItems.length > 0) {
            html += `
                <div class="sol-visibility-toggle">
                    <label class="sol-toggle-label-wrapper">
                        <input type="checkbox"
                            id="sol-toggle-checkbox"
                            class="sol-toggle-checkbox"
                            checked>
                        <strong class="sol-toggle-mode-label">SOL – ${solModeId}</strong>
                    </label>
                </div>
            `;
        }

        // ── OP トグル ──────────────────────────────────────────────
        if (opModeId && opLegendItems.length > 0) {
            html += `
                <div class="op-visibility-toggle">
                    <label class="op-toggle-label-wrapper">
                        <input type="checkbox"
                            id="op-toggle-checkbox"
                            class="op-toggle-checkbox"
                            checked>
                        <strong class="op-toggle-mode-label">OP – ${opModeId}</strong>
                    </label>
                </div>
            `;
        }

        div.innerHTML = html;

        // ── SOL チェックボックスの初期状態とイベント ───────────────
        const solCheckbox = div.querySelector('#sol-toggle-checkbox');
        if (solCheckbox) {
            const visibility     = getCategoryVisibility();
            const solCategoryIds = solLegendItems
                .filter(item => !item.isHeader && !item.isSelectAll)
                .map(item => item.id);

            const checkedCount = solCategoryIds
                .filter(id => visibility[id] !== false).length;

            if (checkedCount === 0) {
                solCheckbox.checked       = false;
                solCheckbox.indeterminate = false;
            } else if (checkedCount === solCategoryIds.length) {
                solCheckbox.checked       = true;
                solCheckbox.indeterminate = false;
            } else {
                solCheckbox.checked       = false;
                solCheckbox.indeterminate = true;
            }

            solCheckbox.addEventListener('change', (e) => {
                const checked = e.target.checked;

                // ユーザー操作後は「全部 true／全部 false」なので indeterminate はクリアしてよい
                solCheckbox.indeterminate = false;

                solCategoryIds.forEach(id => setCategoryVisibility(id, checked));
                refreshLayerStyles();
                syncSidebarVisibilityFromState();
            });
        }

        // ── OP チェックボックスの初期状態とイベント ────────────────
        const opCheckbox = div.querySelector('#op-toggle-checkbox');
        if (opCheckbox) {
            const visibility    = getOpCategoryVisibility();
            const opCategoryIds = opLegendItems
                .filter(item => !item.isHeader && !item.isSelectAll)
                .map(item => item.id);

            const checkedCount = opCategoryIds
                .filter(id => visibility[id] !== false).length;

            if (checkedCount === 0) {
                opCheckbox.checked       = false;
                opCheckbox.indeterminate = false;
            } else if (checkedCount === opCategoryIds.length) {
                opCheckbox.checked       = true;
                opCheckbox.indeterminate = false;
            } else {
                opCheckbox.checked       = false;
                opCheckbox.indeterminate = true;
            }

            opCheckbox.addEventListener('change', (e) => {
                const checked = e.target.checked;
                opCheckbox.indeterminate = false;

                opCategoryIds.forEach(id => setOpCategoryVisibility(id, checked));
                refreshOpStyles();
                syncSidebarVisibilityFromState();
            });
        }

        L.DomEvent.disableScrollPropagation(div);
        return div;
    };

    control.addTo(map);
    legendControl = control;
}

export function updateLegend() {
    addLegend();
}