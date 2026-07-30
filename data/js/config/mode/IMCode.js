


// config/mode/IMCode.js

export function makeIMCodeModes({ solOverrideFn, opOverrideFn }) {

    // IM コードに対して一貫した色を返すハッシュ関数
    function defaultColorForCode(code) {
        if (!code) return '#cccccc';
        // 簡易ハッシュ：コードを数値にして色相を決める
        let hash = 0;
        for (const ch of String(code)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
        const hue = hash % 360;
        return `hsl(${hue}, 60%, 50%)`;
    }

    function make({ id, scope, label, extractCode }) {
        const overrideFn = scope === 'OP' ? opOverrideFn : solOverrideFn;

        // null/空の場合に使うセンチネル値
        const NO_DATA_ID    = 'no-data';
        const NO_DATA_COLOR = '#cccccc';

        return {
            id,
            scope,
            label,
            kind: 'custom',      
            supportsFiltering: true,

            getStyleCategoryId(feature) {
                const code = extractCode(feature.properties);
                // ★ null / undefined / '' はすべて 'no-data' カテゴリに分類
                return (code != null && code !== '') ? String(code) : NO_DATA_ID;
            },

            getColor(feature) {
                const code = extractCode(feature.properties);
                if (code == null || code === '') return NO_DATA_COLOR;
                return overrideFn(id, String(code)) || defaultColorForCode(code);
            },

            getLegendItems(features = []) {
                const codes = new Set();
                let hasNoData = false;

                features.forEach(f => {
                    const code = extractCode(f.properties);
                    if (code != null && code !== '') {
                        codes.add(String(code));
                    } else {
                        hasNoData = true;  // ★ null が1件でもあれば末尾に追加
                    }
                });

                const items = [...codes].sort().map(code => ({
                    id:    code,
                    label: `IM ${code}`,
                    color: overrideFn(id, code) || defaultColorForCode(code),
                }));

                // ★ 常に末尾に追加（hasNoData でなくても表示しておくと便利）
                items.push({
                    id:    NO_DATA_ID,
                    label: 'Données manquantes',
                    color: overrideFn(id, NO_DATA_ID) || NO_DATA_COLOR,
                });

                return items;
            },
        };
    }
    return {
        // ── SOL Section ──────────────────────────────────────────────────
        SOLIMCode: make({
            id:    'SOLIMCode',
            scope: 'SOL',
            label: 'Code IM',
            extractCode: (props) => props.SOLIMCode ?? null,
        }),

        // ── SOL Tunnel ───────────────────────────────────────────────────
        Tunnel_IMCode: make({
            id:    'Tunnel_IMCode',
            scope: 'SOL',
            label: 'Code IM (Tunnel SOL)',
            extractCode: (props) => {
                const tunnel = props.SOLTrack?.[0]?.SOLTunnel?.[0];
                return tunnel?.SOLTunnelIMCode ?? null;
            },
        }),

        // ── OP Track ─────────────────────────────────────────────────────
        OP_IMCode: make({
            id:    'OP_IMCode',
            scope: 'OP',
            label: 'Code IM (Voie OP)',
            extractCode: (props) => {
                const track = props.OPTrack?.[0];
                return track?.OPTrackIMCode ?? null;
            },
        }),

        // ── OP Siding ────────────────────────────────────────────────────
        OP_Siding_IMCode: make({
            id:    'OP_Siding_IMCode',
            scope: 'OP',
            label: 'Code IM (Siding OP)',
            extractCode: (props) => {
                const siding = props.OPSiding?.[0];
                return siding?.OPSidingIMCode ?? null;
            },
        }),

        // ── OP Siding Tunnel ─────────────────────────────────────────────
        OP_Siding_Tunnel_IMCode: make({
            id:    'OP_Siding_Tunnel_IMCode',
            scope: 'OP',
            label: 'Code IM (Tunnel Siding OP)',
            extractCode: (props) => {
                const siding = props.OPSiding?.[0];
                const tunnel = siding?.OPSidingTunnel?.[0];
                return tunnel?.OPSidingTunnelIMCode ?? null;
            },
        }),

        // ── OP Platform ──────────────────────────────────────────────────
        OP_Platform_IMCode: make({
            id:    'OP_Platform_IMCode',
            scope: 'OP',
            label: 'Code IM (Quai OP)',
            extractCode: (props) => {
                const platform = props.OPTrack?.[0]?.OPTrackPlatform?.[0];
                return platform?.OPTrackPlatformIMCode ?? null;
            },
        }),

        // ── OP Tunnel ────────────────────────────────────────────────────
        OP_Tunnel_IMCode: make({
            id:    'OP_Tunnel_IMCode',
            scope: 'OP',
            label: 'Code IM (Tunnel OP)',
            extractCode: (props) => {
                const tunnel = props.OPTrack?.[0]?.OPTrackTunnel?.[0];
                return tunnel?.OPTrackTunnelIMCode ?? null;
            },
        }),
    };
}
