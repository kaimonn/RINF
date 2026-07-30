// ui/sidebar/param_graphics/numerical_editors.js
import { COLOR_MODES } from '../../../config/colorModes.js';
import {
    getBreakValues,
    getSpecialValues,
} from '/js/config/breakValues.js';

// breaks エディタの HTML 生成だけ担当
export function renderBreaksEditor(scope, modeId) {
    const breaks = getBreakValues(modeId) || [];
    const rowsHtml = breaks.map((v, i) => `
        <div class="break-row" data-index="${i}">
            <input type="number"
                   class="break-value-input"
                   data-index="${i}"
                   step="any"
                   value="${v}">
            <button type="button"
                    class="break-remove-btn"
                    data-index="${i}"
                    title="Supprimer ce seuil">✕</button>
        </div>
    `).join('');

    return `
        <div class="breaks-editor" data-scope="${scope}" data-mode="${modeId}">
            <div class="breaks-editor-header">
                <span class="breaks-editor-title">Seuils de classification (breaks)</span>
                <button type="button" class="break-reset-btn" title="Revenir aux valeurs par défaut">
                    ↺ Défaut
                </button>
            </div>
            <div class="break-rows">
                ${rowsHtml}
            </div>
            <button type="button" class="break-add-btn">+ Ajouter un seuil</button>
        </div>
    `;
}

// specials エディタの HTML 生成だけ担当
export function renderSpecialValuesEditor(scope, modeId) {
    const mode = COLOR_MODES[modeId];
    const defaultSpecials = mode?._defaultSpecials ?? [];
    const specials = getSpecialValues(modeId) ?? defaultSpecials;

    const rowsHtml = specials.map((sv, i) => `
        <div class="special-row" data-index="${i}">
            <input type="number" class="special-value-input" data-index="${i}"
                   step="any" value="${sv.value}" placeholder="Valeur">
            <input type="text" class="special-label-input" data-index="${i}"
                   value="${sv.label ?? ''}" placeholder="Libellé">
            <button type="button" class="special-remove-btn" data-index="${i}" title="Supprimer">✕</button>
        </div>
    `).join('');

    return `
        <div class="specials-editor" data-scope="${scope}" data-mode="${modeId}">
            <div class="breaks-editor-header">
                <span class="breaks-editor-title">Valeurs spéciales</span>
                <button type="button" class="special-reset-btn">↺ Défaut</button>
            </div>
            <div class="special-rows">${rowsHtml}</div>
            <button type="button" class="special-add-btn">+ Ajouter une valeur spéciale</button>
        </div>
    `;
}