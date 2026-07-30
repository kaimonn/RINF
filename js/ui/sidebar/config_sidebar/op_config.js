// ui/sidebar/op_config.js
// STIカテゴリ → セクション → サブカテゴリ（パラメータグループ） → 対応パラメータ
export const OP_PARAM_STRUCTURE = [
    {
        stiId: 'INFRA',
        stiLabel: 'Infrastructure',
        description: "Infrastructure – Paramètres techniques et opérationnels des lignes ferroviaires.",
        sections: [
            {
                id: 'IDE',
                label: 'IDE - Infrastructure Declaration',
                description:`
                    Déclaration des informations et vérifications techniques pour garantir la conformité et la sécurité de l’infrastructure ferroviaire.
                `,
                paramIds: [
                    'IDE_ECVerification',
                    'IDE_EIDemonstration',
                ],
                //additionalInfoHtml: `
                //`
            },
            {
                id: 'IPP',
                label: 'IPP - Infrastructure Performance Parameters',
                description: `
                    Indicateurs de performance pour mesurer et améliorer la qualité du service rendu aux entreprises ferroviaires. 
                `,
                paramIds: [
                    'IPP_TENClass',
                    'IPP_LineCat',
                    'IPP_FreightCorridor',
                ],
            },
            {
                id: 'ILL',
                label: 'ILL - Infrastructure Line Layout',
                description: `
                    Configuration géométrique des lignes ferroviaires.
                `,
                paramIds: [
                    'ILL_Gauging',
                    'ILL_GaugeCheckLoc',
                    'ILL_GaugeCheckDocRef',
                ]
            },
            {
                id: 'ITP',
                label: 'ITP - Infrastructure Track Parameters',
                description: `
                    Caractéristiques techniques des voies ferrées.
                `,
                paramIds: [
                    'ITP_NomGauge',
                ]
            },
            {
                id: 'ILR',
                label: 'ILR - Infrastructure Load Resistance',
                description: `
                    Capacité de l’infrastructure à résister aux charges dynamiques (latérales, freinage, etc.).
                `,
                paramIds: [
                    'ILR_EddyCurrentBrakes',
                    'ILR_MagneticBrakes',
                ]
            },
        ]
    },
    /*
    {
        stiId: 'ECS',
        stiLabel: 'Énergie',
        description: "Énergie – Systèmes d'alimentation électrique de la ligne.",
        sections: [
            {
                id: 'ECS',
                label: 'ECS - Energy Contact System',
                description: `
                    Caractéristiques techniques du système d’alimentation électrique (caténaires ou rails de contact). 
                `,
                paramIds: [
                    'ECS_MaxStandstillCurrent',
                ]
            },
        ]
    },
    */
    {
        stiId: 'CCM',
        stiLabel: 'Contrôle-Commande',
        description: "Contrôle-Commande – Systèmes de signalisation et de communication ferroviaires.",
        sections: [
            {
                id: 'CPE',
                label: 'CPE - Control-Command Protection ETCS',
                description: `
                    Paramètres de protection et de fonctionnement du système ETCS (European Train Control System). 
                `,
                paramIds: [
                    'CPE_Level',
                    'CPE_Infill',
                    'CPE_InfillLineSide',
                    'CPE_NatApplication',
                    'CPE_RestrictionsConditions',
                    'CPE_IntegrityConfirmation',
                    'CPE_SystemCompatibility',
                    'CPE_MVersion',
                    'CPE_SafeLenghtInf',
                    'CPE_Baseline'
                ]
            },
            {
                id: 'CEN',
                label: 'CEN - Control-Command Environnement/Network',
                description: `
                    Paramètres liés à l’environnement et au réseau ETCS. 
                `,
                paramIds: [
                    'CEN_IDRBC',
                    'CEN_PhoneNumbRBC',
                    'CEN_BigMetalMass'
                ]
            },
            {
                id: 'CRG',
                label: 'CRG - Control-Command Radio (GSM-R, FRMCS)',
                description: `
                    Paramètres des systèmes de communication radio (GSM-R et FRMCS). 
                `,
                paramIds: [
                    'CRG_Version',
                    'CRG_NumActiveMob',
                    'CRG_OptionalFunctions',
                    'CRG_AdditionalnetworkInfo',
                    'CRG_GPRSForETCS',
                    'CRG_GPRSAreaOfImpl',
                    'CRG_Needof555',
                    'CRG_RoamingAgreement',
                    'CRG_RoamingPublic',
                    'CRG_RoamingPublicDetails',
                    'CRG_GSMRNoCoverage',
                    'CRG_RadioCompVoice',
                    'CRG_RadioCompData'
                ]
            },
            {
                id: 'CCD',
                label: 'CCD - Control-Command Complaint Detection',
                description: `
                    Paramètres de détection des anomalies dans les systèmes de commande-contrôle. 
                `,
                paramIds: [
                    'CCD_TSITrainDetection',
                    'CCD_FreqBandDetec',
                    'CCD_MaxInterfCurrent',
                    'CCD_VehicleImpedance',
                    'CCD_MaxMagnField'
                ]
            },
            {
                id: 'CPO',
                label: 'CPO - Control-Command Protection Other',
                description: `
                    Paramètres des systèmes de protection legacy (non ETCS). 
                `,
                paramIds: [
                    'CPO_LegacyTrainProtection'
                ]
            },
            {
                id: 'CRS',
                label: 'CRS - Control-Command Radio System Other',
                description: `
                    Autres systèmes radio utilisés pour la commande-contrôle. 
                `,
                paramIds: [
                    'CRS_Installed'
                ]
            },
            {
                id: 'CTD',
                label: 'CTD - Control-Command Train Detection',
                description: `
                    Paramètres de détection des trains par les systèmes de commande-contrôle.
                `,
                paramIds: [
                    'CTD_DetectionSystem',
                    'CTD_TCCheck',
                    'CTD_TCCheckDocRef',
                    'CTD_TCLimitation'
                ]
            },
            {
                id: 'CTS',
                label: 'CTS - Control-Command Transition System',
                description: `
                    Paramètres de transition entre systèmes de commande-contrôle.
                `,
                paramIds: [
                    'CTS_SwitchProtectControlWarn',
                    'CTS_SwitchProtectControlWarnCondition',
                    'CTS_SwitchRadioSystem',
                    'CTS_SwitchRadioSystemCondition',
                    'CTS_SwitchERTMSClassBCondition'
                ]
            },
            {
                id: 'CEI',
                label: 'CEI - Control-Command Electromagnetic Interferences',
                description: `
                    Paramètres liés aux interférences électromagnétiques.
                `,
                paramIds: [
                    'CEI_TSIMagneticFields',
                    'CEI_TSITractionHarmonics'
                ]
            },
            {
                id: 'CLD',
                label: 'CLD - Control-Command Line-Side Degraded',
                description: `
                    Paramètres pour les installations côté voie en mode dégradé.
                `,
                paramIds: [
                    'CLD_ETCSSituation',
                    'CLD_OtherProtectControlWarn'
                ]
            },
            {
                id: 'CAO',
                label: 'CAO - Control-Command Automatic Operation',
                description: `
                    Paramètres pour l’exploitation automatique des trains.
                `,
                paramIds: [
                    'CAO_ATOGradeAutomation',
                    'CAO_ATOSystemvers',
                    'CAO_ATOCommSystem'
                ]
            },
        ]
    },
    {
        stiId: 'RUL',
        stiLabel: 'Rules and restrictions',
        description: "Règles et restrictions – Exigences réglementaires et restrictions locales.",
        sections: [
            {
                id: 'RUL',
                label: 'RUL - Rules',
                description: `
                    Règles et restrictions locales applicables aux systèmes de commande-contrôle. 
                `,
                paramIds: [
                    'RUL_LocalRulesOrRestrictions',
                    'RUL_LocalRulesOrRestrictionsDocRef'
                ]
            }
        ]
    },



];