// config/mode/ValidityDate.js

// --- Classification des lignes selon ValidityDateStart ---
export const categories = [
    {
        id: 'date_19th',
        label: 'Avant 1977',
        color: '#8B4513',  // Marron
        dateRange: { start: new Date(1800, 0, 1), end: new Date(1976, 11, 31) }
    },
    {
        id: 'date_20th_2015',
        label: 'De 1977 à 2015',
        color: '#4169E1',  // Bleu royal
        dateRange: { start: new Date(1977, 0, 1), end: new Date(2015, 11, 31) }
    },
    {
        id: 'date_2016_plus',
        label: 'A partir de 2016',
        color: '#32CD32',  // Vert lime
        dateRange: { start: new Date(2016, 0, 1), end: new Date(9999, 11, 31) }
    },
    {
        id: 'date_expired',
        label: 'Non valide (ValidityDateEnd < 01/04/2026)',
        color: '#000000',  // Noir
        isExpired: true
    }
];

// Date de référence pour vérifier la validité
export const REFERENCE_DATE = new Date(2026, 3, 1); // 1er avril 2026 (mois 0-indexé)

/**
 * Classification commune: (ValidityDateStart, ValidityDateEnd) -> catégorie
 */
export function getCategoryByDate(validityDateStart, validityDateEnd) {
    // 1) Vérifier si la section est expirée
    if (validityDateEnd) {
        const endDate = parseDate(validityDateEnd);
        if (endDate && endDate < REFERENCE_DATE) {
            return categories.find(cat => cat.isExpired);
        }
    }

    // 2) Classifier selon ValidityDateStart
    if (!validityDateStart) {
        return null; // Pas de date de début, pas de classification
    }

    const startDate = parseDate(validityDateStart);
    if (!startDate) {
        return null; // Date invalide
    }

    // 3) Trouver la catégorie correspondante
    for (const category of categories) {
        if (category.isExpired) continue; // Ignorer la catégorie "expiré"

        if (startDate >= category.dateRange.start && startDate <= category.dateRange.end) {
            return category;
        }
    }

    return null; // Aucune catégorie trouvée
}

/**
 * Parse une date depuis différents formats
 * @param {string} dateString - Date au format ISO, DD/MM/YYYY, etc.
 * @returns {Date|null} - Objet Date ou null si invalide
 */
function parseDate(dateString) {
    if (!dateString || dateString === '-' || dateString === '') {
        return null;
    }

    let date;

    // ISO 8601 format: YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss
    if (dateString.includes('-')) {
        date = new Date(dateString);
    }
    // DD/MM/YYYY format
    else if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            date = new Date(year, month - 1, day);
        }
    }

    // Vérifier si la date est valide
    if (date && !isNaN(date.getTime())) {
        return date;
    }

    return null;
}

/**
 * (Section SOL のための) 既存ヘルパー — props.ValidityDateStart/End ベース
 * 他ファイルで使っていれば互換性維持のため残す
 */
export function getColorForSection(properties) {
    const category = getCategoryByDate(
        properties.ValidityDateStart,
        properties.ValidityDateEnd
    );

    return category ? category.color : '#808080'; // Gris par défaut
}

export function getCategoryIdForSection(properties) {
    const category = getCategoryByDate(
        properties.ValidityDateStart,
        properties.ValidityDateEnd
    );
    return category ? category.id : null;
}

/**
 * Crée une visibilité par défaut pour toutes les catégories
 * @returns {object} - Objet avec id de catégorie → booléen
 */
export function getDefaultVisibility() {
    const visibility = {};
    categories.forEach(cat => {
        visibility[cat.id] = true;
    });
    return visibility;
}

/**
 * Vérifie si une section est visible selon les filtres de catégorie actifs
 * @param {object} properties - Propriétés GeoJSON de la section
 * @param {object} visibilityMap - Map de visibilité {categoryId: boolean}
 * @returns {boolean} - true si visible
 */
export function isSectionVisible(properties, visibilityMap) {
    const category = getCategoryByDate(
        properties.ValidityDateStart,
        properties.ValidityDateEnd
    );

    if (!category) {
        return true; // Si pas de catégorie, afficher par défaut
    }

    return visibilityMap[category.id] !== false;
}

/**
 * 日付文字列2つからカテゴリIDを返す（colorModes 側ファクトリ用）
 */
export function getCategoryIdForDateStr(validityDateStart, validityDateEnd) {
    const category = getCategoryByDate(validityDateStart, validityDateEnd);
    return category ? category.id : null;
}

/**
 * 日付文字列2つから色を返す（colorModes 側ファクトリ用）
 */
export function getColorForDateStr(validityDateStart, validityDateEnd) {
    const category = getCategoryByDate(validityDateStart, validityDateEnd);
    return category ? category.color : '#808080';
}

/**
 * validityDate カラーモードの共通ファクトリ
 * colorModes.js から呼び出して、構造別の extractDates だけ差し替える。
 *
 * @param {object} opts
 * @param {string}   opts.id          - モードID
 * @param {'SOL'|'OP'} opts.scope     - レイヤスコープ
 * @param {string}   opts.label       - 表示ラベル
 * @param {function} opts.extractDates- (props) => { start: string|null, end: string|null }
 * @param {function} opts.overrideFn  - getCategoryColorOverride or getOpCategoryColorOverride
 */
function makeValidityDateMode({ id, scope, label, extractDates, overrideFn }) {
    return {
        id,
        scope,
        label,
        kind: 'custom',
        supportsFiltering: true,
        hideUnchecked: true,
        showSelectAll: true,

        getColor(feature) {
            const props = feature?.properties ?? {};
            const { start, end } = extractDates(props);
            const baseColor  = getColorForDateStr(start, end);
            const categoryId = getCategoryIdForDateStr(start, end);
            if (!categoryId) return baseColor;
            const override = overrideFn(this.id, categoryId);
            return override || baseColor;
        },

        getStyleCategoryId(feature) {
            const props = feature?.properties ?? {};
            const { start, end } = extractDates(props);
            return getCategoryIdForDateStr(start, end) || 'no-data';
        },

        getLegendItems() {
            return categories.map(cat => ({
                id:    cat.id,
                label: cat.label,
                color: overrideFn(this.id, cat.id) || cat.color,
            }));
        },

        getFilterIds(feature) {
            const props = feature?.properties ?? {};
            const { start, end } = extractDates(props);
            const id = getCategoryIdForDateStr(start, end);
            return id ? [id] : [];
        },
    };
}

export function makeValidityDateModes({
    solOverrideFn, // getCategoryColorOverride
    opOverrideFn,  // getOpCategoryColorOverride
    lookupSOLFn = lookupSOL,
    lookupOPFn  = lookupOP,
}) {
    // scope に応じて overrideFn を自動振り分け
    const make = ({ id, scope, label, extractDates }) =>
        makeValidityDateMode({
            id,
            scope,
            label,
            extractDates,
            overrideFn: scope === 'OP' ? opOverrideFn : solOverrideFn,
        });

    return {
        // ── SOL 全体 ───────────────────────────────────────────────
        ValidityDate: make({
            id:    'ValidityDate',
            scope: 'SOL',
            label: 'Début de validité',
            extractDates: (props) => {
                const sol = lookupSOLFn(props);
                return {
                    start: sol?.ValidityDateStart ?? null,
                    end:   sol?.ValidityDateEnd   ?? null,
                };
            },
        }),

        // ── SOL Track ─────────────────────────────────────────────
        Track_ValidityDate: make({
            id:    'Track_ValidityDate',
            scope: 'SOL',
            label: 'Début de validité (Voie SOL)',
            extractDates: (props) => {
                const track = lookupSOLFn(props)?.SOLTrack?.[0];
                return {
                    start: track?.ValidityDateStart ?? null,
                    end:   track?.ValidityDateEnd   ?? null,
                };
            },
        }),

        // ── SOL Tunnel ───────────────────────────────────────────
        Tunnel_ValidityDate: make({
            id:    'Tunnel_ValidityDate',
            scope: 'SOL',
            label: 'Début de validité (Tunnel SOL)',
            extractDates: (props) => {
                const tunnel = lookupSOLFn(props)?.SOLTrack?.[0]?.SOLTunnel?.[0];
                return {
                    start: tunnel?.ValidityDateStart ?? null,
                    end:   tunnel?.ValidityDateEnd   ?? null,
                };
            },
        }),

        // ── OP 全体 ───────────────────────────────────────────────
        OP_ValidityDate: make({
            id:    'OP_ValidityDate',
            scope: 'OP',
            label: 'Début de validité (OP)',
            extractDates: (props) => {
                const op = lookupOPFn(props.UniqueOPID);
                return {
                    start: op?.ValidityDateStart ?? null,
                    end:   op?.ValidityDateEnd   ?? null,
                };
            },
        }),

        // ── OP Track ──────────────────────────────────────────────
        OP_Track_ValidityDate: make({
            id:    'OP_Track_ValidityDate',
            scope: 'OP',
            label: 'Début de validité (Voie OP)',
            extractDates: (props) => {
                const track = lookupOPFn(props.UniqueOPID)?.OPTrack?.[0];
                return {
                    start: track?.ValidityDateStart ?? null,
                    end:   track?.ValidityDateEnd   ?? null,
                };
            },
        }),

        // ── OP Siding ─────────────────────────────────────────────
        OP_Siding_ValidityDate: make({
            id:    'OP_Siding_ValidityDate',
            scope: 'OP',
            label: 'Début de validité (Siding OP)',
            extractDates: (props) => {
                const siding = lookupOPFn(props.UniqueOPID)?.OPSiding?.[0];
                return {
                    start: siding?.ValidityDateStart ?? null,
                    end:   siding?.ValidityDateEnd   ?? null,
                };
            },
        }),

        // ── OP Platform ───────────────────────────────────────────
        OP_Platform_ValidityDate: make({
            id:    'OP_Platform_ValidityDate',
            scope: 'OP',
            label: 'Début de validité (Quai OP)',
            extractDates: (props) => {
                const platform = lookupOPFn(props.UniqueOPID)?.OPTrack?.[0]?.OPTrackPlatform?.[0];
                return {
                    start: platform?.ValidityDateStart ?? null,
                    end:   platform?.ValidityDateEnd   ?? null,
                };
            },
        }),

        // ── OP Tunnel ─────────────────────────────────────────────
        OP_Tunnel_ValidityDate: make({
            id:    'OP_Tunnel_ValidityDate',
            scope: 'OP',
            label: 'Début de validité (Tunnel OP)',
            extractDates: (props) => {
                const tunnel = lookupOPFn(props.UniqueOPID)?.OPTrack?.[0]?.OPTrackTunnel?.[0];
                return {
                    start: tunnel?.ValidityDateStart ?? null,
                    end:   tunnel?.ValidityDateEnd   ?? null,
                };
            },
        }),
    };
}