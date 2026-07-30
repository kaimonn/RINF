// ui/search/searchUtils.js

/**
 * Normalise une chaîne pour la recherche approximative.
 * Gère les variantes typiques du français :
 *
 *   Diacritiques  : é/è/ê/ë→e  à/â→a  ô→o  î/ï→i  ù/û/ü→u  ç→c
 *   Ligatures     : œ→oe  æ→ae
 *   Séparateurs   : tirets, apostrophes, points → espace
 *   Abréviations  : Ste→Sainte  St→Saint
 */
export function normalizeForSearch(str) {
    if (!str) return '';

    return str
        .toLowerCase()

        // ── Ligatures (avant NFD : NFD ne les décompose pas toutes) ─────────
        .replace(/œ/g, 'oe')
        .replace(/æ/g, 'ae')

        // ── Diacritiques via NFD + suppression des combining marks ───────────
        // couvre é è ê ë → e, à â → a, ô → o, î ï → i, ù û ü → u, ç → c …
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

        // ── Séparateurs → espace ────────────────────────────────────────────
        // tirets (- –), apostrophes droites/typographiques (' ' ʼ ' '), points
        .replace(/[-–.\u2019\u2018\u02BC'']/g, ' ')

        // ── Abréviations courantes dans les noms de gares françaises ─────────
        // "Ste" avant "St" pour éviter de transformer "Ste" en "Sainte" puis
        // d'appliquer "St" à tort.
        .replace(/\bste\b/g, 'sainte')
        .replace(/\bst\b/g,  'saint')

        // ── Nettoyage final ──────────────────────────────────────────────────
        .replace(/\s+/g, ' ')
        .trim();
}