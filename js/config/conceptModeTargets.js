// config/conceptModeTargets.js
import { buildConceptMode } from './mode/conceptMode.js';



// ─────────────────────────────────────────────────────────────────────────
// CONCEPT_MODE_TARGETS
//   buildConceptMode を自動適用するパラメータを明示的に列挙する。
//   ここに書かれていないパラメータには自動モードは生成されない。
//
//   各エントリの形式:
//     paramId: string          — rinfParams のキー（必須）
//     multiValue?: boolean     — 複数値を持つ場合 true（デフォルト: false）
//     hideUnchecked?: boolean  — チェックを外した項目を非表示にするか
//     colors?: { code: hex }   — 明示指定したい場合のみ記載
//     orderedCodes?: string[]  — 凡例の表示順序を指定したい場合
//
// ─────────────────────────────────────────────────────────────────────────
export const CONCEPT_MODE_TARGETS = [

    // ── Section of Line ───────────────────────────────────────────────
    { paramId: 'SOLNature'},
    
    { paramId: 'IDE_ECVerification'},
    { paramId: 'IDE_EIDemonstration'},

    // ── Infrastructure – Line Performance ────────────────────────────
    { paramId: 'IPP_TENClass'},
    { paramId: 'IPP_LineCat'},
    { paramId: 'IPP_FreightCorridor'},
    { paramId: 'IPP_TempRange'},
    { paramId: 'IPP_HSLMCompliant'},
    { paramId: 'IPP_SevereClimateCon'},  
    { paramId: 'IPP_NCLoadCap'},  
    { paramId: 'IPP_StructureCheckDocRef'}, 
    { paramId: 'IPP_LoadCap',
        multiValue: true,

        extractValues: (props) => {
            const trackParams = props?.SOLTrack?.[0]?.SOLTrackParameter;
            if (!Array.isArray(trackParams)) return [];

            const LOAD_CAP_CATEGORY_MAP = {
                '10':  'A',
                '20':  'B1',
                '30':  'B2',
                '40':  'C2',
                '50':  'C3',
                '60':  'C4',
                '70':  'D2',
                '80':  'D3',
                '90':  'D4',
                '100': 'D4xL',
                '110': 'E4',
                '120': 'E5',
                '130': 'RA1',
                '140': 'RA2',
                '150': 'RA3',
                '160': 'RA4',
                '170': 'RA5',
                '180': 'RA6',
                '190': 'RA7',
                '200': 'RA8',
                '210': 'RA9',
                '220': 'RA10',
            };

            const values = [];

            for (const p of trackParams) {
                if (p.ID !== 'IPP_LoadCap') continue;

                let raw = p.Value;
                if (Array.isArray(raw)) raw = raw[0];
                const s = String(raw ?? '').trim();
                if (!s) continue;

                // "[CCCC] [NNN]" 形式: "90 000" → code="90", speed="000"
                const parts = s.split(/\s+/);
                if (parts.length < 2) continue;

                const codeStr  = parts[0];  // "90"
                const speedStr = parts[1];  // "000"

                const category = LOAD_CAP_CATEGORY_MAP[codeStr];
                if (!category) {
                    console.warn(`[IPP_LoadCap] Code inconnu: "${codeStr}" (valeur brute: "${s}")`);
                    continue;
                }

                // 先頭ゼロを除去（"000" → 0、"120" → 120）
                const speed = parseInt(speedStr, 10);
                const speedLabel = isNaN(speed) ? speedStr : String(speed);

                values.push(`${category}/${speedLabel}`);
            }

            return [...new Set(values)];
        },
    },

    // ── Infrastructure – Loading ──────────────────────────────────────
    { paramId: 'ILL_Gauging'},
    { paramId: 'ILL_ProfileNumSwapBodies'},
    { paramId: 'ILL_ProfileNumSemiTrailers'},
    { paramId: 'ILL_ProfileNumContainers'},
    { paramId: 'ILL_ProfileNumRollerUnits'},
    { paramId: 'ILL_SpecificInfo'},
    { paramId: 'ILL_GaugeCheckDocRef'}, 


    // ── Infrastructure – Track Param ──────────────────────────────────
    { paramId: 'ITP_NomGauge'},
    { paramId: 'ITP_RailInclination'},
    { paramId: 'ITP_Ballast'},

    { paramId: 'ISC_TSISwitchCrossing'},
    { paramId: 'ISC_MinWheelDiaFixObtuseCrossings',
      labels: { '330': '330 mm (the default value of TSI)' },
    },

    // ── Infrastructure – Running ──────────────────────────────────────
    { paramId: 'ILR_EddyCurrentBrakes'},
    { paramId: 'ILR_MagneticBrakes'},
    { paramId: 'ILR_ECBDocRef'}, 
    { paramId: 'ILR_MBDocRef'}, 
    { paramId: 'ILR_MaxDeceleration',
        labels: { 
            '2.0': '2.0 m/s²',
            '2.5': '2.5 m/s² (the default value of TSI)',

        },
    },


    // ── Infrastructure – Hazards ──────────────────────────────────────
    { paramId: 'IHS_HABDDirection'},
    { paramId: 'IHS_FlangeLubeForbidden'},
    { paramId: 'IHS_LevelCrossing'},
    { paramId: 'IHS_HABDExist'},
    { paramId: 'IHS_TSIHABD'},
    { paramId: 'IHS_RedLights'},
    { paramId: 'IHS_QuietRoute'},
    { paramId: 'IHS_HABDID'},
    { paramId: 'IHS_HABDGen'},
    { paramId: 'IHS_AccelerationLevelCrossing'}, 

    { paramId: 'EDE_ECVerification'},
    { paramId: 'EDE_EIDemonstration'},



    // ── Energy – Contact Line ─────────────────────────────────────────
    { paramId: 'ECS_SystemType'},
    { paramId: 'ECS_VoltFreq'},
    { paramId: 'ECS_RegenerativeBraking'},
    { paramId: 'ECS_ConditionRegBraking'},
    { paramId: 'ECS_MaxStandstillCurrent',
        labels: { 
            '150': '150 A',
            '300': '300 A',

        },
    },
    { paramId: 'ECS_MaxWireHeight',
        labels: { 
            '5.08': '5.08 m',
            '6.20': '6.20 m',
            '6.30': '6.30 m',

        },
    },
    { paramId: 'ECS_MinWireHeight',
        labels: { 
            '4.47': '4.47 m',
            '4.59': '4.59 m',
            '5': '5.00 m',

        },
    },




    // ── Energy – Pantograph ───────────────────────────────────────────
    { paramId: 'EPA_TSIHeads'},
    { paramId: 'EPA_OtherHeads'},
    // autoColorModes.js の CONCEPT_MODE_TARGETS 配列を修正

    // 【変更前】の EPA_NumRaisedSpeed の定義を削除し、以下の2つを追加

    // ★ モード1: パンタグラフの数だけでグルーピング
    {
        paramId: 'EPA_NumRaisedSpeed_Count', // 新しいID
        label: 'Nombre de pantographes (EPA)', // サイドバーに表示されるラベル
        multiValue: true,
        extractValues: (props) => {
            const trackParams = props?.SOLTrack?.[0]?.SOLTrackParameter;
            if (!Array.isArray(trackParams)) return [];
            const values = new Set(); // Set を使って重複を自動的に排除

            for (const p of trackParams) {
                if (p.ID !== 'EPA_NumRaisedSpeed' || p.IsApplicable !== 'Y') continue;

                const raw = Array.isArray(p.Value) ? p.Value[0] : p.Value;
                const s = String(raw ?? '').trim();
                if (!s) continue;

                const parts = s.split(/\s+/);
                if (parts.length < 3) continue;

                const nPanto = parseInt(parts[0], 10);
                if (isNaN(nPanto)) continue;

                // 「N panto」という形式のカテゴリ名を追加
                values.add(`${nPanto} panto`);
            }
            return Array.from(values);
        },
    },

    // ★ モード3: 従来の完全な組み合わせ（IDとラベルを変更して残す）
    {
        paramId: 'EPA_NumRaisedSpeed_Full', // 新しいID
        label: 'Configuration complète (EPA)', // サイドバーに表示されるラベル
        multiValue: true,
        extractValues: (props) => {
            const trackParams = props?.SOLTrack?.[0]?.SOLTrackParameter;
            if (!Array.isArray(trackParams)) return [];
            const values = new Set();

            for (const p of trackParams) {
                if (p.ID !== 'EPA_NumRaisedSpeed' || p.IsApplicable !== 'Y') continue;
                
                const raw = Array.isArray(p.Value) ? p.Value[0] : p.Value;
                const s = String(raw ?? '').trim();
                if (!s) continue;

                const parts = s.split(/\s+/);
                if (parts.length < 3) continue;

                const nPanto = parseInt(parts[0], 10);
                const dist   = parseInt(parts[1], 10);
                const speed  = parseInt(parts[2], 10);

                if (isNaN(nPanto) || isNaN(dist) || isNaN(speed)) continue;

                values.add(`${nPanto} panto / ${dist} m / ${speed} km/h`);
            }
            return Array.from(values);
        },
    },



    { paramId: 'EOS_Phase'},
    { paramId: 'EOS_System'},
    { paramId: 'EOS_InfoPhase'},   
    { paramId: 'EOS_InfoSystem'},


    { paramId: 'ERS_PowerLimitOnBoard'},
    { paramId: 'ERS_AutoDropRequired'},
    { paramId: 'ERS_RestrictionPowerConsDoc'}, 
    { paramId: 'ERS_RestrictionMTDoc'}, 

    { paramId: 'CDE_ECVerification'},  

    // ── Control – ETCS ────────────────────────────────────────────────
    { paramId: 'CPE_Level'},
    { paramId: 'CPE_InfillLineSide'},
    { paramId: 'CPE_SystemCompatibility'},
    { paramId: 'CPE_MVersion'},
    { paramId: 'CPE_SafeLenghtInf'},
    { paramId: 'CPE_Baseline'},                    
    { paramId: 'CPE_Infill'}, 
    { paramId: 'CPE_NatApplication'}, 
    { paramId: 'CPE_RestrictionsConditions'}, 
    { paramId: 'CPE_IntegrityConfirmation'},   

    { paramId: 'CEN_BigMetalMass'}, 
    { paramId: 'CEN_PhoneNumbRBC'}, 


    // ── Control – GSM-R ───────────────────────────────────────────────
    { paramId: 'CRG_Version'},
    { paramId: 'CRG_NumActiveMob'},
    { paramId: 'CRG_OptionalFunctions'},
    { paramId: 'CRG_RoamingAgreement'},
    { paramId: 'CRG_RadioCompVoice'},
    { paramId: 'CRG_RadioCompData'},
    { paramId: 'CRG_GPRSForETCS'},
    { paramId: 'CRG_Needof555'},
    { paramId: 'CRG_RoamingPublic'},
    { paramId: 'CRG_GSMRNoCoverage'},
    { paramId: 'CRG_GPRSAreaOfImpl'},
    { paramId: 'CRG_RoamingPublicDetails'},
    { paramId: 'CRG_AdditionalnetworkInfo'}, 

    // ── Control – Detection ───────────────────────────────────────────
    { paramId: 'CCD_FreqBandDetec'},
    { paramId: 'CCD_TSITrainDetection'},
    { paramId: 'CCD_VehicleImpedance'},
    { paramId: 'CCD_MaxMagnField'},

    { paramId: 'CPO_LegacyTrainProtection'},

    { paramId: 'CRS_Installed'},

    { paramId: 'CTD_DetectionSystem'},
    { paramId: 'CTD_TCCheck'},
    { paramId: 'CTD_TCCheckDocRef'}, 
    { paramId: 'CTD_TCLimitation',
        // Functional property (unique value) なので multiValue: false
        extractValues: (props) => {
            const trackParams = props?.SOLTrack?.[0]?.SOLTrackParameter;
            if (!Array.isArray(trackParams)) return [];

            const LIMITATION_LABELS = {
                '1': '[1] Tonnage < 15 000 t/j/voie',
                '2': '[2] Enclenchement directionnel',
                '3': '[3] Délai 45 s (enclenchement directionnel)',
                '4': '[4] Installation avec annonce de circuit de voie',
                '5': '[5] Absence de pédale (double voie non réversible)',
                '6': '[6] Absence de pédale (voie unique / bidirectionnelle)',
                '7': "[7] Absence de mécanisme d'annonce de pédale",
                '8': '[8] Délai 45 s (dispositif de remise à zéro)',
            };

            for (const p of trackParams) {
                if (p.ID !== 'CTD_TCLimitation') continue;
                if (p.IsApplicable !== 'Y') continue;

                // ★ Set = 検知システム種別 (Wheeldetector, loop, ...)
                // ★ Value = "[Y/N]+[N]" 形式
                const s = String(p.Value ?? '').trim();
                if (!s) continue;

                // "Y+1", "Y+3", "N" のように + で分割
                const parts  = s.split('+');
                const exists = parts[0]; // "Y" or "N"

                if (exists === 'N') return ['Pas de limitation'];

                if (exists === 'Y') {
                    // parts[1], parts[2], ... に 1〜8 の数字が入る
                    const digits = parts.slice(1).flatMap(p => p.match(/[1-8]/g) ?? []);
                    if (digits.length === 0) return ['Limitation (type non spécifié)'];
                    return digits.map(d => LIMITATION_LABELS[d] ?? `Limitation [${d}]`);
                }

                console.warn(`[CTD_TCLimitation] Valeur inattendue: "${s}"`);
                return [s];
            }

            return [];
        },
    },


    { paramId: 'CTS_SwitchProtectControlWarn'},
    { paramId: 'CTS_SwitchRadioSystem'},
    { paramId: 'CTS_SwitchProtectControlWarnCondition'},
    { paramId: 'CTS_SwitchRadioSystemCondition'}, 
    { paramId: 'CTS_SwitchERTMSClassBCondition'}, 

    { paramId: 'CEI_TSIMagneticFields'},
    { paramId: 'CEI_TSITractionHarmonics'},


    // ── Control – Legacy / Degraded ───────────────────────────────────
    { paramId: 'CLD_ETCSSituation'},
    { paramId: 'CLD_OtherProtectControlWarn'},

    { paramId: 'CBP_AddInfoAvailable'},
    { paramId: 'CBP_BrakePerfDocRef'}, 
    { paramId: 'CBP_MaxBrakeDist',
      labels: { '00000': '0 m'},
    },

    // ── Control – ATO ─────────────────────────────────────────────────
    { paramId: 'CAO_ATOGradeAutomation'},
    { paramId: 'CAO_ATOSystemvers'},
    { paramId: 'CAO_ATOCommSystem'},

    { paramId: 'RUL_LocalRulesOrRestrictions'},
    { paramId: 'RUL_LocalRulesOrRestrictionsDocRef'},


];

export const OP_CONCEPT_MODE_TARGETS = [
    // OPType は手動モードで定義（直下プロパティのため）
    { paramId: 'OPType'},
    {
        paramId: 'OPTypeGaugeChangeover',
        // IsApplicable は一切使わず、Value だけを見る
        extractValues: (props) => {
            const raw = props?.OPTypeGaugeChangeover;
            if (raw == null) return [];

            const items = Array.isArray(raw) ? raw : [raw];
            const values = [];

            for (const item of items) {
                let v = item;
                if (v && typeof v === 'object') {
                    v = v.Value ?? null;   // ★ IsApplicable は無視
                }
                if (v != null) {
                    const s = String(v).trim();
                    if (s) values.push(s);
                }
            }

            return values;
        },
    },

    // Infrastructure
    { paramId: 'IPP_TENClass' },
    { paramId: 'IPP_LineCat'},
    { paramId: 'IPP_FreightCorridor' },

    { paramId: 'ILL_Gauging',},
    { paramId: 'ILL_GaugeCheckDocRef'}, 

    { paramId: 'ITP_NomGauge' },

    { paramId: 'ILR_EddyCurrentBrakes' },
    { paramId: 'ILR_MagneticBrakes' },


    // Control
    { paramId: 'CPE_Level'},
    { paramId: 'CPE_InfillLineSide' },
    { paramId: 'CPE_SystemCompatibility'},
    { paramId: 'CPE_MVersion' },
    { paramId: 'CPE_SafeLenghtInf' },
    { paramId: 'CPE_Baseline' },
    { paramId: 'CPE_Infill'}, 
    { paramId: 'CPE_NatApplication'}, 
    { paramId: 'CPE_RestrictionsConditions'}, 
    { paramId: 'CPE_IntegrityConfirmation'},   

    { paramId: 'CEN_BigMetalMass'}, 
    { paramId: 'CEN_PhoneNumbRBC'}, 

    { paramId: 'CRG_Version' },
    { paramId: 'CRG_NumActiveMob' },
    { paramId: 'CRG_OptionalFunctions'},
    { paramId: 'CRG_RoamingAgreement'},
    { paramId: 'CRG_RadioCompVoice' },
    { paramId: 'CRG_RadioCompData' },
    { paramId: 'CRG_GPRSForETCS'},
    { paramId: 'CRG_Needof555'},
    { paramId: 'CRG_RoamingPublic'},
    { paramId: 'CRG_GSMRNoCoverage'},
    { paramId: 'CRG_GPRSAreaOfImpl'},
    { paramId: 'CRG_RoamingPublicDetails'},
    { paramId: 'CRG_AdditionalnetworkInfo'}, 

    { paramId: 'CCD_FreqBandDetec' }, 
    { paramId: 'CCD_TSITrainDetection'},
    { paramId: 'CCD_VehicleImpedance'},
    { paramId: 'CCD_MaxMagnField'},


    { paramId: 'CPO_LegacyTrainProtection'},

    { paramId: 'CRS_Installed' },

    { paramId: 'CTD_DetectionSystem'},
    { paramId: 'CTD_TCCheck' },
    { paramId: 'CTD_TCCheckDocRef'}, 

    { paramId: 'CTS_SwitchProtectControlWarn'},
    { paramId: 'CTS_SwitchRadioSystem'},
    { paramId: 'CTS_SwitchProtectControlWarnCondition'},
    { paramId: 'CTS_SwitchRadioSystemCondition'}, 
    { paramId: 'CTS_SwitchERTMSClassBCondition'}, 
    
    { paramId: 'CEI_TSIMagneticFields'},
    { paramId: 'CEI_TSITractionHarmonics'},

    { paramId: 'CLD_ETCSSituation' },
    { paramId: 'CLD_OtherProtectControlWarn' },

    { paramId: 'CAO_ATOGradeAutomation' },
    { paramId: 'CAO_ATOSystemvers' },
    { paramId: 'CAO_ATOCommSystem' },

    { paramId: 'RUL_LocalRulesOrRestrictions'},
    { paramId: 'RUL_LocalRulesOrRestrictionsDocRef'},

];





export function buildAutoConceptModes(manualModes = {}) {
    const modes = {};
    for (const entry of CONCEPT_MODE_TARGETS) {
        const { paramId, ...rest } = entry;
        if (manualModes[paramId]) continue;

        modes[paramId] = buildConceptMode(paramId, {
            scope:        'SOL',
            hideUnchecked: rest.hideUnchecked ?? true,
            ...rest,   // ★ ここで extractValues / multiValue / labels 等を全て渡す
        });
    }
    return modes;
}


export function buildAutoOpConceptModes(manualModes = {}) {
    const modes = {};
    for (const entry of OP_CONCEPT_MODE_TARGETS) {
        const { paramId, ...rest } = entry;
        const modeId = `OP_${paramId}`; // プレフィックスは付ける
        if (manualModes[modeId]) continue;
        modes[modeId] = buildConceptMode(paramId, {
            scope: 'OP',
            idOverride: modeId,
            hideUnchecked: rest.hideUnchecked ?? true,
            ...rest,   // ★ extractValues / labels / colors / orderedCodes を一括転送
        });
    }
    return modes;
}
