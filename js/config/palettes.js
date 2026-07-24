//config/palettes.js
export const PALETTES = {
    multicolor: {
        type: 'categorical',
        label: 'Multicolore',
        preview: ['#e31a1c', '#33a02c', '#1f78b4', '#f9c74f', '#7b2d8b'],
        colors: [
            '#e31a1c', '#ff7f00', '#f9c74f', '#bcbd22', '#33a02c',
            '#1b9e77', '#17becf', '#1f78b4', '#5254a3', '#7b2d8b',
            '#e7298a', '#d4526e', '#a6761d', '#264653', '#8c564b', '#666666',
        ],
    },
    pastel: {
        type: 'categorical',
        label: 'Pastel',
        preview: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6'],
        colors: [
            '#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6',
            '#ffffcc', '#e5d8bd', '#fddaec', '#b3e2cd', '#fdcdac', '#cbd5e8', '#f2f2f2',
        ],
    },
    highcontrast: {
        type: 'categorical',
        label: 'Contraste élevé',
        preview: ['#e6194b', '#3cb44b', '#4363d8', '#ffe119', '#911eb4'],
        colors: [
            '#000000', '#e6194b', '#3cb44b', '#ffe119', '#4363d8',
            '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990',
        ],
    },
    spectral: {
        type: 'gradient',
        label: 'Spectral',
        preview: ['#9e0142', '#f46d43', '#ffffbf', '#66c2a5', '#3288bd'],
        colors: [
            '#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b',
            '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2',
        ],
    },
    viridis: {
        type: 'gradient',
        label: 'Viridis',
        preview: ['#440154', '#3e4989', '#1f9e89', '#6ece58', '#fde725'],
        colors: [
            '#440154', '#482878', '#3e4989', '#31688e', '#26828e',
            '#1f9e89', '#35b779', '#6ece58', '#b5de2b', '#fde725',
        ],
    },

    // 熱感：弱（黄）→ 強（深紅）
    heat: {
        type: 'gradient',
        label: 'Chaleur',
        preview: ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'],
        colors: [
            '#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026',
        ],
    },
    
    // 信号機：低速／良好（緑）→ 高速／危険（赤）
    rdylgn: {
        type: 'gradient',
        label: 'Vert → Rouge',
        preview: ['#1a9641', '#a6d96a', '#ffffbf', '#fdae61', '#d7191c'],
        colors: [
            '#1a9641', '#a6d96a', '#ffffbf', '#fdae61', '#d7191c',
        ],
    },



    // 発散：基準以下（青）→ 基準（白）→ 基準超過（赤）
    coolwarm: {
        type: 'gradient',
        label: 'Froid → Chaud',
        preview: ['#2166ac', '#92c5de', '#f7f7f7', '#f4a582', '#b2182b'],
        colors: [
            '#2166ac', '#4393c3', '#92c5de', '#d1e5f0',
            '#f7f7f7',
            '#fddbc7', '#f4a582', '#d6604d', '#b2182b',
        ],
    },


    // ════════════════════════════════════════
    //  GRADIENTS — MONOCHROMATIQUES
    //  （単色→白、密度・強度の単純表現向け）
    // ════════════════════════════════════════

    blue_white: {
        type: 'gradient',
        label: 'Bleu → Blanc',
        preview: ['#084594', '#2171b5', '#6baed6', '#c6dbef', '#f7fbff'],
        colors: [
            '#084594', '#2171b5', '#4292c6', '#6baed6',
            '#9ecae1', '#c6dbef', '#deebf7', '#f7fbff',
        ],
    },

    red_white: {
        type: 'gradient',
        label: 'Rouge → Blanc',
        preview: ['#99000d', '#ef3b2c', '#fc9272', '#fee0d2', '#fff5f0'],
        colors: [
            '#99000d', '#cb181d', '#ef3b2c', '#fc9272',
            '#fcbba1', '#fee0d2', '#fff5f0',
        ],
    },

    green_white: {
        type: 'gradient',
        label: 'Vert → Blanc',
        preview: ['#005a32', '#41ab5d', '#a1d99b', '#e5f5e0', '#f7fcf5'],
        colors: [
            '#005a32', '#238b45', '#41ab5d', '#74c476',
            '#a1d99b', '#c7e9c0', '#e5f5e0', '#f7fcf5',
        ],
    },

    orange_white: {
        type: 'gradient',
        label: 'Orange → Blanc',
        preview: ['#7f2704', '#f16913', '#fd8d3c', '#fdd0a2', '#fff5eb'],
        colors: [
            '#7f2704', '#d94801', '#f16913', '#fd8d3c',
            '#fdae6b', '#fdd0a2', '#fee6ce', '#fff5eb',
        ],
    },

    purple_white: {
        type: 'gradient',
        label: 'Violet → Blanc',
        preview: ['#3f007d', '#6a51a3', '#9e9ac8', '#dadaeb', '#fcfbfd'],
        colors: [
            '#3f007d', '#54278f', '#6a51a3', '#807dba',
            '#9e9ac8', '#bcbddc', '#dadaeb', '#efedf5', '#fcfbfd',
        ],
    },
};


// ── 共通ユーティリティ ──────────────────────────
function hexToRgb(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b]
        .map(v => Math.round(Math.min(255, Math.max(0, v)))
            .toString(16).padStart(2, '0'))
        .join('');
}

/**
 * stops: グラデーションのストップ色配列（2色でも11色でも可）
 * count: 必要な色数
 * → stops 全体を均等に使って count 色を返す
 */
export function sampleGradient(stops, count) {
    if (count <= 0)             return [];
    if (count === 1)            return [stops[0]];
    if (stops.length === 1)     return Array(count).fill(stops[0]);

    const segments = stops.length - 1;
    const result   = [];

    for (let i = 0; i < count; i++) {
        const t        = i / (count - 1);          // 0.0 〜 1.0
        const scaled   = t * segments;
        const seg      = Math.min(Math.floor(scaled), segments - 1);
        const localT   = scaled - seg;             // 区間内の位置

        const [r1, g1, b1] = hexToRgb(stops[seg]);
        const [r2, g2, b2] = hexToRgb(stops[seg + 1]);

        result.push(rgbToHex(
            r1 + (r2 - r1) * localT,
            g1 + (g2 - g1) * localT,
            b1 + (b2 - b1) * localT,
        ));
    }
    return result;
}