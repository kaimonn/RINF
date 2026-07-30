// js/config/numericalModeTargets.js
//削除した属性・'CCD_MaxInterfCurrent'
//
// 数値モードで使うターゲット定義。
// - SOL_NUMERICAL_MODE_TARGETS: 線路 (SectionOfLine) 用
// - OP_NUMERICAL_MODE_TARGETS : OP 用
//
// ポイント：
// - SOLLength だけは parseSOL() が properties 直下に入れているので extractValue 不要
// - それ以外は XML 構造をそのまま掘って取得する（SOLTrack / OPTrack / OPSiding）
// - GeoJSON 側の独自フィールドには依存しない


import { buildNumericalMode } from './mode/numericalMode.js';

// ───────────────────────────────────────────────
// SOL 用
// ───────────────────────────────────────────────

export const SOL_NUMERICAL_MODE_TARGETS = [

    // ── Section of Line ───────────────────────
    // parseSOL() が properties.SOLLength に数値で入れている
    {
        paramId:       'SOLLength',
        label:         'Longueur du tronçon',
        unit:          'km',
        defaultBreaks: [0.2, 0.5, 1, 5, 20],
        noDataColor:   '#EEEEEE',
        // extractValue なし → buildNumericalMode のデフォルト (props.SOLLength)
    },

    // ── Infrastructure – Performance ──────────
    // <SOLTrackParameter Value="160" IsApplicable="Y" ID="IPP_MaxSpeed"/>
    {
        paramId:       'IPP_MaxSpeed',
        label:         'Vitesse maximale',
        unit:          'km/h',
        defaultBreaks: [60, 120, 180, 240, 300],
        hasNA:         true,
        naColor:       '#CCCCCC',
        noDataColor:   '#EEEEEE',
        extractValue:  (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'IPP_MaxSpeed');
            const raw = p?.Value?.[0];
            const num = parseFloat(raw);
            return Number.isFinite(num) ? num : null;
        },
    },

    // <SOLTrackParameter Value="+0006" IsApplicable="Y" ID="IPP_MaxAltitude"/>
    {
        paramId:       'IPP_MaxAltitude',
        label:         'Altitude maximale',
        unit:          'm',
        defaultBreaks: [100, 300, 600, 1000, 1500],
        noDataColor:   '#EEEEEE',
        extractValue:  (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'IPP_MaxAltitude');
            const raw = p?.Value?.[0];
            const num = parseFloat(raw);
            return Number.isFinite(num) ? num : null;
        },
    },
    
    // ── Infrastructure – Layout ───────────────
    // <SOLTrackParameter Value="943" IsApplicable="Y" ID="ILL_MinRadHorzCurve"/>
    {
        paramId:       'ILL_MinRadHorzCurve',
        label:         'Rayon minimal de courbe horizontale',
        unit:          'm',
        defaultBreaks: [150, 300, 500, 1000, 3000],
        noDataColor:   '#EEEEEE',
        extractValue:  (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'ILL_MinRadHorzCurve');
            const raw = p?.Value?.[0];
            const num = parseFloat(raw);
            return Number.isFinite(num) ? num : null;
        },
    },

    // <SOLTrackParameter Value="+120" IsApplicable="Y" ID="ITP_CantDeficiency"/>
    {
        paramId:       'ITP_CantDeficiency', 
        label:         'Insuffisance de dévers',
        unit:          'mm',
        // 0 は含めない素のブレーク
        defaultBreaks: [-150, -80, 80, 130, 150, 180],
        specialValues: [
            {
                value: 0,
                id:    'zero',
                label: 'Dévers nul (= 0)', // 任意。未指定なら「0 mm」
                // color は指定しない → 近傍レンジ色を自動利用
            },
        ],
        noDataColor:   '#EEEEEE',
        extractValue:  (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'ITP_CantDeficiency');
            const raw = p?.Value?.[0];
            const num = parseFloat(raw);
            return Number.isFinite(num) ? num : null;
        },
    },  


    // ── Energy – Contact Line ─────────────────

    // <SOLTrackParameter Set="ElectrifiedOCL" Value="2000" IsApplicable="Y" ID="ECS_Umax2"/>
    {
        paramId:       'ECS_Umax2',
        label:         'Umax2 (réseau français)',
        unit:          'V',
        defaultBreaks: [],
        specialValues: [
            {
                value: 0,
                id:    '0',
                label: '0 V',
            },
            {
                value: 2000,
                id:    '2000',
                label: '2000 V',
            },
        ],
        noDataColor:   '#EEEEEE',
        extractValue:  (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'ECS_Umax2' && p.Set === 'ElectrifiedOCL');
            const raw = p?.Value?.[0];
            const num = parseFloat(raw);
            return Number.isFinite(num) ? num : null;
        },
    },

    // <SOLTrackParameter Set="ElectrifiedOCL" Value="320" IsApplicable="Y" ID="ECS_MaxTrainCurrent"/>
    {
        paramId:       'ECS_MaxTrainCurrent',
        label:         'Courant maximal du train',
        unit:          'A',
        defaultBreaks: [2000,4000],
        specialValues: [
            {
                value: 240,
                id:    '240',
                label: '240 A',
            },
            {
                value: 320,
                id:    '320',
                label: '320 A',
            },
            {
                value: 850,
                id:    '850',
                label: '850 A',
            },
        ],
        noDataColor:   '#EEEEEE',
        extractValue:  (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'ECS_MaxTrainCurrent' && p.Set === 'ElectrifiedOCL');
            const raw = p?.Value?.[0];
            const num = parseFloat(raw);
            return Number.isFinite(num) ? num : null;
        },
    },

    // ── Energy – Pantograph ───────────────────

    // numericalModeTargets.js の SOL_NUMERICAL_MODE_TARGETS 配列に追加

    // ★ モード2: 許可される最高速度でグラデーション表示
    {
        paramId: 'EPA_NumRaisedSpeed_MaxSpeed', // 新しいID
        label: 'Vitesse maximale (EPA)', // サイドバーに表示されるラベル
        unit: 'km/h',
         defaultBreaks: [60, 120, 180, 240, 300],
        extractValue: (props) => {
            const trackParams = props?.SOLTrack?.[0]?.SOLTrackParameter;
            if (!Array.isArray(trackParams)) return null;

            const speeds = [];
            for (const p of trackParams) {
                if (p.ID !== 'EPA_NumRaisedSpeed' || p.IsApplicable !== 'Y') continue;

                const raw = Array.isArray(p.Value) ? p.Value[0] : p.Value;
                const s = String(raw ?? '').trim();
                if (!s) continue;

                const parts = s.split(/\s+/);
                if (parts.length < 3) continue;

                const speed = parseInt(parts[2], 10);
                if (!isNaN(speed)) {
                    speeds.push(speed);
                }
            }

            // その区間に複数の速度ルールがある場合、最も高い速度を返す
            return speeds.length > 0 ? Math.max(...speeds) : null;
        },
    },

    // ── Energy – Separation ───────────────────
    // <SOLTrackParameter Value="507" IsApplicable="Y" ID="EOS_DistSignToPhaseEnd"/>
    {
        paramId:       'EOS_DistSignToPhaseEnd',
        label:         'Distance panneau → fin de séparation de phases',
        unit:          'm',
        defaultBreaks: [200, 300, 400, 500],
        noDataColor:   '#EEEEEE',
        extractValue:  (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'EOS_DistSignToPhaseEnd');
            const raw = p?.Value?.[0];
            const num = parseFloat(raw);
            return Number.isFinite(num) ? num : null;
        },
    },

    // <SOLTrackParameter Value="120" IsApplicable="Y" ID="ERS_ContactForce"/>
    {
        paramId:       'ERS_ContactForce',
        label:         'Contact force permitted DP',
        unit:          'N',
        defaultBreaks: [80, 100, 120, 150, 200],
        noDataColor:   '#EEEEEE',
        extractValue: (props) => {
            const p = props?.SOLTrack?.[0]?.SOLTrackParameter
                ?.find(p => p.ID === 'ERS_ContactForce');

            // IsApplicable = Y のみ（OCL がある区間だけ）
            if (!p || p.IsApplicable !== 'Y') return null;

            const raw = p?.Value?.[0];
            if (raw == null) return null;

            const s = String(raw).trim();21

            // 式（文字を含む）は no-data
            if (/[a-zA-Z]/.test(s)) return null;

            // "85/120" のような静的値 / 最大値ペア → 最大値を採用
            const nums = (s.match(/[+-]?\d+(?:[.,]\d+)?/g) ?? [])
                .map(x => parseFloat(x.replace(',', '.')))
                .filter(n => !isNaN(n));

            return nums.length ? Math.max(...nums) : null;
        },
    },
];


// ───────────────────────────────────────────────
// OP 用
// ───────────────────────────────────────────────

export const OP_NUMERICAL_MODE_TARGETS = [
];


export function buildAutoNumericalModes(manualModes = {}) {
    const result = {};
    SOL_NUMERICAL_MODE_TARGETS.forEach(target => {  // ← 変更
        if (manualModes[target.paramId]) return;
        const mode = buildNumericalMode(target, false);
        result[mode.id] = mode;
    });
    return result;
}

export function buildAutoOpNumericalModes(manualModes = {}) {
    const result = {};
    OP_NUMERICAL_MODE_TARGETS.forEach(target => {  // ← 変更
        const opId = `OP_${target.paramId}`;
        if (manualModes[opId]) return;
        const mode = buildNumericalMode(target, true);
        result[mode.id] = mode;
    });
    return result;
}