// config/colorModes.js
import { lookupSOL, lookupOP } from '../../data/data_loader.js';


// ★ オーバーライド色取得
import { getCategoryColorOverride,  getOpCategoryColorOverride } from '../state.js';

// 自動モードビルダー
import {
    buildAutoConceptModes,
    buildAutoOpConceptModes,
} from './conceptModeTargets.js';

import {
    buildAutoNumericalModes,
    buildAutoOpNumericalModes,
} from './numericalModeTargets.js';

import {
    buildConceptMode,
    extractTunnelConceptValues,
    extractTunnelSingleValue,      // ★ 追加
    extractSidingConceptValues,    // ★ 追加（OP Siding モードを使うなら）
    extractSidingSingleValue,      // ★ 追加
    extractPlatformConceptValues,  // ★ 追加（OP Platform モードを使うなら）
    extractPlatformSingleValue,    // ★ 追加
    extractOPTunnelConceptValues,  // ★ 追加（OP Tunnel モードを使うなら）
    extractOPTunnelSingleValue,    // ★ 追加
} from './mode/conceptMode.js';

import { buildNumericalMode } from './mode/numericalMode.js';

import { makeValidityDateModes } from './mode/ValidityDate.js';

import { makeIMCodeModes } from './mode/IMCode.js';

import { makeILLGaugeCheckLocMode } from './mode/ILL_GaugingCheckLoc.js';

import { makeILLGradProfileMode } from './mode/ILL_GradProfile.js';

import { makeIPPLineCatModes } from './mode/IPP_LineCat.js';

import { makeIPPStructureCheckLocMode } from './mode/IPP_StructureCheckLoc.js'; 


import { makeEPAStripMaterialModes } from './mode/EPA_StripMaterial.js';



const {
    ValidityDate,
    Track_ValidityDate,
    Tunnel_ValidityDate,
    OP_ValidityDate,
    OP_Track_ValidityDate,
    OP_Siding_ValidityDate,
    OP_Platform_ValidityDate,
    OP_Tunnel_ValidityDate,
} = makeValidityDateModes({
    solOverrideFn: getCategoryColorOverride,
    opOverrideFn:  getOpCategoryColorOverride,
    lookupSOLFn:   lookupSOL,
    lookupOPFn:    lookupOP,
});

const {
    SOLIMCode,
    Tunnel_IMCode,
    OP_IMCode,
    OP_Siding_IMCode,
    OP_Siding_Tunnel_IMCode,
    OP_Platform_IMCode,
    OP_Tunnel_IMCode,
} = makeIMCodeModes({
    solOverrideFn: getCategoryColorOverride,
    opOverrideFn:  getOpCategoryColorOverride,
    lookupSOL,   // ← 追加
    lookupOP,    // ← 追加
});


const ILL_GaugeCheckLoc = makeILLGaugeCheckLocMode(getCategoryColorOverride);

const ILL_GradProfile   = makeILLGradProfileMode({ overrideFn: getCategoryColorOverride }); // ★

const IPP_StructureCheckLoc  = makeIPPStructureCheckLocMode({ overrideFn: getCategoryColorOverride }); 

const {
    IPP_LineCat_P,
    IPP_LineCat_F,
    OP_IPP_LineCat_P,
    OP_IPP_LineCat_F,
} = makeIPPLineCatModes({
    solOverrideFn: getCategoryColorOverride,
    opOverrideFn:  getOpCategoryColorOverride,
});


const {
    stripMaterialCodeMode,
    stripMaterialMetalPctMode,
} = makeEPAStripMaterialModes({ solOverrideFn: getCategoryColorOverride });

// ... 必要なら OPSidingTunnelIMCode も同様に
/**
 * 塗分けモードの定義
 */
const MANUAL_SOL_MODES = {
    // 現在の複雑な日付ベースのロジック
    ValidityDate,
    Track_ValidityDate,   // ★ 追加
    Tunnel_ValidityDate,  // ★ 追加

    ILL_GaugeCheckLoc,   

    ILL_GradProfile,

    IPP_LineCat_P,
    IPP_LineCat_F,


    IPP_StructureCheckLoc,



    // Code IM (カテゴリカル)
    SOLIMCode,

    Tunnel_IMCode,      


};

const MANUAL_OP_MODES ={
    OP_ValidityDate,         // ★ 追加
    OP_Track_ValidityDate,    // ★ 追加
    OP_Siding_ValidityDate,   // ★ 追加
    OP_Platform_ValidityDate, // ★ 追加
    OP_Tunnel_ValidityDate,   

    OP_IMCode,               // OP 全体
    OP_Siding_IMCode,
    OP_Platform_IMCode,
    OP_Tunnel_IMCode,
    OP_Siding_Tunnel_IMCode,

    OP_IPP_LineCat_P,   // ★ 追加
    OP_IPP_LineCat_F, 

};

const SOL_AUTO_MODES      = buildAutoConceptModes(MANUAL_SOL_MODES);
const OP_AUTO_MODES       = buildAutoOpConceptModes(MANUAL_OP_MODES);

// ★ 追加
const SOL_NUMERICAL_MODES = buildAutoNumericalModes(MANUAL_SOL_MODES);
const OP_NUMERICAL_MODES  = buildAutoOpNumericalModes(MANUAL_OP_MODES);




// ── Helpers ────────────────────────────────────────────────────────────────
const tunnelConcept = (paramId, extra = {}) => buildConceptMode(paramId, {
    idOverride:    `Tunnel_${paramId}`,
    scope:         'SOL',
    extractValues: (props) => extractTunnelConceptValues(props, paramId),
    ...extra,
});

// ── Concept modes (Y/N または列挙値）──────────────────────────────────────
const Tunnel_ITU_ECVerification     = tunnelConcept('ITU_ECVerification');
const Tunnel_ITU_EIDemonstration    = tunnelConcept('ITU_EIDemonstration');
const Tunnel_ITU_TSITunnel          = tunnelConcept('ITU_TSITunnel');
const Tunnel_ITU_TunnelDocRef       = tunnelConcept('ITU_TunnelDocRef');
const Tunnel_ITU_EmergencyPlan      = tunnelConcept('ITU_EmergencyPlan', {
    labels: { 'Y': 'Plan d\'urgence en place', 'N': 'Pas de plan d\'urgence' },
});
const Tunnel_ITU_FireCatReq         = tunnelConcept('ITU_FireCatReq');
const Tunnel_ITU_NatFireCatReq      = tunnelConcept('ITU_NatFireCatReq');
const Tunnel_ITU_Walkways           = tunnelConcept('ITU_Walkways');
const Tunnel_ITU_EvacAndRescuePoints = tunnelConcept('ITU_EvacAndRescuePoints');

// ── Numerical modes ────────────────────────────────────────────────────────
const Tunnel_ITU_Length = buildNumericalMode({
    paramId:       'Tunnel_ITU_Length',
    label:         'Longueur du tunnel',
    unit:          'm',
    defaultBreaks: [200, 500, 1000, 2000, 5000],
    noDataColor:   '#EEEEEE',
    extractValue:  (props) => {
        const num = parseFloat(extractTunnelSingleValue(props, 'ITU_Length'));
        return Number.isFinite(num) && num > 0 ? num : null;
    },
});

const Tunnel_ITU_CrossSectionArea = buildNumericalMode({
    paramId:       'Tunnel_ITU_CrossSectionArea',
    label:         'Section transversale',
    unit:          'm²',
    defaultBreaks: [10, 20, 40, 80],
    noDataColor:   '#EEEEEE',
    extractValue:  (props) => {
        const num = parseFloat(extractTunnelSingleValue(props, 'ITU_CrossSectionArea'));
        return Number.isFinite(num) && num > 0 ? num : null;
    },
});



// ── OP Siding helpers ──────────────────────────────────────────────────────
const sidingConcept = (paramId, extra = {}) => buildConceptMode(paramId, {
    idOverride:    `OP_Siding_${paramId}`,
    scope:         'OP',
    extractValues: (props) => extractSidingConceptValues(props, paramId),
    ...extra,
});
const sidingNumerical = (paramId, opts) => buildNumericalMode({
    paramId: `OP_Siding_${paramId}`,
    extractValue: (props) => {
        const num = parseFloat(extractSidingSingleValue(props, paramId));
        return Number.isFinite(num) && num > 0 ? num : null;
    },
    ...opts,
});

// OP_SIDING_STRUCTURE の全 paramIds を網羅
const OP_Siding_IDE_ECVerification    = sidingConcept('IDE_ECVerification');
const OP_Siding_IDE_EIDemonstration   = sidingConcept('IDE_EIDemonstration');
const OP_Siding_IPP_TENClass          = sidingConcept('IPP_TENClass');
const OP_Siding_IPP_Length            = sidingNumerical('IPP_Length', { label: 'Longueur (Siding)', unit: 'm', defaultBreaks: [100, 300, 500, 750, 1000] });
const OP_Siding_ILL_MinRadHorzCurve   = sidingNumerical('ILL_MinRadHorzCurve', { label: 'Rayon min. horizontal', unit: 'm', defaultBreaks: [150, 300, 500, 1000, 3000] });
const OP_Siding_ILL_Gradient          = sidingNumerical('ILL_Gradient', { label: 'Déclivité (Siding)', unit: '‰', defaultBreaks: [1, 2, 5, 10] });
const OP_Siding_ILL_MinRadVertCurve   = sidingNumerical('ILL_MinRadVertCurve', { label: 'Rayon min. vertical', unit: 'm', defaultBreaks: [500, 1000, 2000, 5000] });
const OP_Siding_ITS_ToiletDischarge   = sidingConcept('ITS_ToiletDischarge');
const OP_Siding_ITS_ExternalCleaning  = sidingConcept('ITS_ExternalCleaning');
const OP_Siding_ITS_WaterRestocking   = sidingConcept('ITS_WaterRestocking');
const OP_Siding_ITS_Refuelling        = sidingConcept('ITS_Refuelling');
const OP_Siding_ITS_SandRestocking    = sidingConcept('ITS_SandRestocking');
const OP_Siding_ITS_ElectricShoreSupply = sidingConcept('ITS_ElectricShoreSupply');
const OP_Siding_ECS_MaxStandstillCurrent = sidingNumerical('ECS_MaxStandstillCurrent', {labels: { '150': '150 A', '300': '300 A',},});

// ── OP Platform helpers ────────────────────────────────────────────────────
const platformConcept = (paramId, extra = {}) => buildConceptMode(paramId, {
    idOverride:    `OP_Platform_${paramId}`,
    scope:         'OP',
    extractValues: (props) => extractPlatformConceptValues(props, paramId),
    ...extra,
});
const platformNumerical = (paramId, opts) => buildNumericalMode({
    paramId: `OP_Platform_${paramId}`,
    extractValue: (props) => {
        const num = parseFloat(extractPlatformSingleValue(props, paramId));
        return Number.isFinite(num) && num > 0 ? num : null;
    },
    ...opts,
});

const OP_Platform_IPL_TENClass              = platformConcept('IPL_TENClass');
const OP_Platform_IPL_Length                = platformNumerical('IPL_Length', { label: 'Longueur du quai', unit: 'm', defaultBreaks: [100, 200, 300, 400, 500] });
const OP_Platform_IPL_Height                = platformConcept('IPL_Height');
const OP_Platform_IPL_Curvature             = platformConcept('IPL_Curvature');
const OP_Platform_IPL_AssistanceStartingTrain = platformConcept('IPL_AssistanceStartingTrain');
const OP_Platform_IPL_AreaBoardingAid       = platformConcept('IPL_AreaBoardingAid', {labels: { '0': 'not equipped with a platform boarding aid' },});

// ── OP Tunnel helpers ──────────────────────────────────────────────────────
const opTunnelConcept = (paramId, extra = {}) => buildConceptMode(paramId, {
    idOverride:    `OP_Tunnel_${paramId}`,
    scope:         'OP',
    extractValues: (props) => extractOPTunnelConceptValues(props, paramId),
    ...extra,
});
const opTunnelNumerical = (paramId, opts) => buildNumericalMode({
    paramId: `OP_Tunnel_${paramId}`,
    extractValue: (props) => {
        const num = parseFloat(extractOPTunnelSingleValue(props, paramId));
        return Number.isFinite(num) && num > 0 ? num : null;
    },
    ...opts,
});

const OP_Tunnel_ITU_ECVerification      = opTunnelConcept('ITU_ECVerification');
const OP_Tunnel_ITU_EIDemonstration     = opTunnelConcept('ITU_EIDemonstration');
const OP_Tunnel_ITU_Length              = opTunnelNumerical('ITU_Length', { label: 'Longueur du tunnel (OP)', unit: 'm', defaultBreaks: [200, 500, 1000, 2000] });
const OP_Tunnel_ITU_EmergencyPlan       = opTunnelConcept('ITU_EmergencyPlan', { labels: { 'Y': 'Plan d\'urgence', 'N': 'Sans plan' } });
const OP_Tunnel_ITU_FireCatReq          = opTunnelConcept('ITU_FireCatReq');
const OP_Tunnel_ITU_NatFireCatReq       = opTunnelConcept('ITU_NatFireCatReq');
const OP_Tunnel_ITU_Walkways            = opTunnelConcept('ITU_Walkways');
const OP_Tunnel_ITU_EvacAndRescuePoints = opTunnelConcept('ITU_EvacAndRescuePoints');
const OP_Tunnel_ITU_DieselThermAllowed  = opTunnelConcept('ITU_DieselThermAllowed');




// 最終的な COLOR_MODES オブジェクト
export const COLOR_MODES = {
    ...MANUAL_SOL_MODES,
    ...MANUAL_OP_MODES,
    ...SOL_AUTO_MODES,
    ...OP_AUTO_MODES,
    ...SOL_NUMERICAL_MODES,   // ★ 追加
    ...OP_NUMERICAL_MODES,    // ★ 追加
    [stripMaterialCodeMode.id]:      stripMaterialCodeMode,
    [stripMaterialMetalPctMode.id]:  stripMaterialMetalPctMode,

    [Tunnel_ITU_ECVerification.id]:      Tunnel_ITU_ECVerification,
    [Tunnel_ITU_EIDemonstration.id]:     Tunnel_ITU_EIDemonstration,
    [Tunnel_ITU_Length.id]:              Tunnel_ITU_Length,
    [Tunnel_ITU_CrossSectionArea.id]:    Tunnel_ITU_CrossSectionArea,
    [Tunnel_ITU_TSITunnel.id]:           Tunnel_ITU_TSITunnel,
    [Tunnel_ITU_TunnelDocRef.id]:        Tunnel_ITU_TunnelDocRef,
    [Tunnel_ITU_EmergencyPlan.id]:       Tunnel_ITU_EmergencyPlan,
    [Tunnel_ITU_FireCatReq.id]:          Tunnel_ITU_FireCatReq,
    [Tunnel_ITU_NatFireCatReq.id]:       Tunnel_ITU_NatFireCatReq,
    [Tunnel_ITU_Walkways.id]:            Tunnel_ITU_Walkways,
    [Tunnel_ITU_EvacAndRescuePoints.id]: Tunnel_ITU_EvacAndRescuePoints,

    // OP Siding
    [OP_Siding_IDE_ECVerification.id]:       OP_Siding_IDE_ECVerification,
    [OP_Siding_IDE_EIDemonstration.id]:      OP_Siding_IDE_EIDemonstration,
    [OP_Siding_IPP_TENClass.id]:             OP_Siding_IPP_TENClass,
    [OP_Siding_IPP_Length.id]:               OP_Siding_IPP_Length,
    [OP_Siding_ILL_MinRadHorzCurve.id]:      OP_Siding_ILL_MinRadHorzCurve,
    [OP_Siding_ILL_Gradient.id]:             OP_Siding_ILL_Gradient,
    [OP_Siding_ILL_MinRadVertCurve.id]:      OP_Siding_ILL_MinRadVertCurve,
    [OP_Siding_ITS_ToiletDischarge.id]:      OP_Siding_ITS_ToiletDischarge,
    [OP_Siding_ITS_ExternalCleaning.id]:     OP_Siding_ITS_ExternalCleaning,
    [OP_Siding_ITS_WaterRestocking.id]:      OP_Siding_ITS_WaterRestocking,
    [OP_Siding_ITS_Refuelling.id]:           OP_Siding_ITS_Refuelling,
    [OP_Siding_ITS_SandRestocking.id]:       OP_Siding_ITS_SandRestocking,
    [OP_Siding_ITS_ElectricShoreSupply.id]:  OP_Siding_ITS_ElectricShoreSupply,
    [OP_Siding_ECS_MaxStandstillCurrent.id]: OP_Siding_ECS_MaxStandstillCurrent,

    // OP Platform
    [OP_Platform_IPL_TENClass.id]:               OP_Platform_IPL_TENClass,
    [OP_Platform_IPL_Length.id]:                 OP_Platform_IPL_Length,
    [OP_Platform_IPL_Height.id]:                 OP_Platform_IPL_Height,
    [OP_Platform_IPL_Curvature.id]:              OP_Platform_IPL_Curvature,
    [OP_Platform_IPL_AssistanceStartingTrain.id]:OP_Platform_IPL_AssistanceStartingTrain,
    [OP_Platform_IPL_AreaBoardingAid.id]:        OP_Platform_IPL_AreaBoardingAid,

    // OP Tunnel
    [OP_Tunnel_ITU_ECVerification.id]:       OP_Tunnel_ITU_ECVerification,
    [OP_Tunnel_ITU_EIDemonstration.id]:      OP_Tunnel_ITU_EIDemonstration,
    [OP_Tunnel_ITU_Length.id]:               OP_Tunnel_ITU_Length,
    [OP_Tunnel_ITU_EmergencyPlan.id]:        OP_Tunnel_ITU_EmergencyPlan,
    [OP_Tunnel_ITU_FireCatReq.id]:           OP_Tunnel_ITU_FireCatReq,
    [OP_Tunnel_ITU_NatFireCatReq.id]:        OP_Tunnel_ITU_NatFireCatReq,
    [OP_Tunnel_ITU_Walkways.id]:             OP_Tunnel_ITU_Walkways,
    [OP_Tunnel_ITU_EvacAndRescuePoints.id]:  OP_Tunnel_ITU_EvacAndRescuePoints,
    [OP_Tunnel_ITU_DieselThermAllowed.id]:   OP_Tunnel_ITU_DieselThermAllowed,
};

// デフォルト
export const DEFAULT_COLOR_MODE     = 'ILL_Gauging';
export const DEFAULT_OP_COLOR_MODE  = 'OP_ILL_Gauging'; 