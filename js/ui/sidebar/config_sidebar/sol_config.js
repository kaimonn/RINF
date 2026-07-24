// ui/sidebar/config.js
// STIカテゴリ → セクション → サブカテゴリ（パラメータグループ） → 対応パラメータ
export const PARAM_STRUCTURE = [
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
                    'IPP_LoadCap',
                    'IPP_NCLoadCap',
                    'IPP_HSLMCompliant',
                    'IPP_StructureCheckLoc',
                    'IPP_StructureCheckDocRef',
                    'IPP_MaxSpeed',
                    'IPP_TempRange',
                    'IPP_MaxAltitude',
                    'IPP_SevereClimateCon',
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
                    'ILL_ProfileNumSwapBodies',
                    'ILL_ProfileNumSemiTrailers',
                    'ILL_SpecificInfo',
                    'ILL_GradProfile',
                    'ILL_MinRadHorzCurve',
                    'ILL_ProfileNumContainers',
                    'ILL_ProfileNumRollerUnits',
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
                    'ITP_CantDeficiency',
                    'ITP_RailInclination',
                    'ITP_Ballast'
                ]
            },
            {
                id: 'ISC',
                label: 'ISC - Infrastructure Switches and Crossings',
                description: `
                    Équipements permettant aux trains de changer de voie ou de franchir des intersections (aiguillages, traversées). 
                `,
                paramIds: [
                    'ISC_TSISwitchCrossing',
                    'ISC_MinWheelDiaFixObtuseCrossings'
                ]
            },
            {
                id: 'ILR',
                label: 'ILR - Infrastructure Load Resistance',
                description: `
                    Capacité de l’infrastructure à résister aux charges dynamiques (latérales, freinage, etc.).
                `,
                paramIds: [
                    'ILR_MaxDeceleration',
                    'ILR_EddyCurrentBrakes',
                    'ILR_MagneticBrakes',
                    'ILR_ECBDocRef',
                    'ILR_MBDocRef'
                ]
            },
            {
                id: 'IHS',
                label: 'IHS - Infrastructure Health and Safety',
                description: `
                    Paramètres garantissant la sécurité des circulations, des passagers et des agents.
                `,
                paramIds: [
                    'IHS_FlangeLubeForbidden',
                    'IHS_LevelCrossing',
                    'IHS_AccelerationLevelCrossing',
                    'IHS_HABDExist',
                    'IHS_TSIHABD',
                    'IHS_HABDID',
                    'IHS_HABDGen',
                    'IHS_HABDLoc',
                    'IHS_HABDDirection',
                    'IHS_RedLights',
                    'IHS_QuietRoute'
                ]
            },
        ]
    },
    {
        stiId: 'ENE',
        stiLabel: 'Énergie',
        description: "Énergie – Systèmes d'alimentation électrique de la ligne.",
        sections: [
            {
                id: 'EDE',
                label: 'EDE - Energy Declaration',
                description: `
                    Déclaration des informations et vérifications techniques pour garantir la conformité et la performance des systèmes énergétiques ferroviaires.
                `,
                paramIds: [
                    'EDE_ECVerification',
                    'EDE_EIDemonstration'
                ]
            },
            {
                id: 'ECS',
                label: 'ECS - Energy Contact System',
                description: `
                    Caractéristiques techniques du système d’alimentation électrique (caténaires ou rails de contact). 
                `,
                paramIds: [
                    'ECS_SystemType',
                    'ECS_VoltFreq',
                    'ECS_Umax2',
                    'ECS_MaxTrainCurrent',
                    'ECS_MaxStandstillCurrent',
                    'ECS_RegenerativeBraking',
                    'ECS_ConditionRegBraking',
                    'ECS_MaxWireHeight',
                    'ECS_MinWireHeight'
                ]
            },
            {
                id: 'EPA',
                label: 'EPA - Energy Pantograph',
                description: `
                    Paramètres des pantographes (dispositifs de captation d’énergie).
                `,
                paramIds: [
                    'EPA_TSIHeads',
                    'EPA_OtherHeads',
                    'EPA_NumRaisedSpeed',
                    'EPA_StripMaterial'
                ]
            },
            {
                id: 'EOS',
                label: 'EOS - Energy OCL Separation',
                description: `
                    Gestion des transitions entre sections de caténaires ou systèmes d’alimentation. 
                `,
                paramIds: [
                    'EOS_Phase',
                    'EOS_InfoPhase',
                    'EOS_System',
                    'EOS_InfoSystem',
                    'EOS_DistSignToPhaseEnd'
                ]
            },
            {
                id: 'ERS',
                label: 'ERS - Energy Rolling Stock',
                description: `
                    Paramètres liés à la consommation énergétique et à la gestion du matériel roulant. 
                `,
                paramIds: [
                    'ERS_PowerLimitOnBoard',
                    'ERS_ContactForce',
                    'ERS_AutoDropRequired',
                    'ERS_RestrictionPowerConsDoc',
                    'ERS_RestrictionMTDoc'
                ]
            }
        ]
    },
    {
        stiId: 'CCM',
        stiLabel: 'Contrôle-Commande',
        description: "Contrôle-Commande – Systèmes de signalisation et de communication ferroviaires.",
        sections: [
            {
                id: 'CDE',
                label: 'CDE - Control-Command Declaration',
                description: `
                    Déclaration des informations et vérifications techniques pour garantir la conformité et la sécurité des systèmes de commande-contrôle.
                `,
                paramIds: [
                    'CDE_ECVerification'
                ]
            },
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
                id: 'CBP',
                label: 'CBP - Control-Command Brake Parameters',
                description: `
                    Paramètres liés au freinage dans les systèmes de commande-contrôle. 
                `,
                paramIds: [
                    'CBP_MaxBrakeDist',
                    'CBP_AddInfoAvailable',
                    'CBP_BrakePerfDocRef'
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



/*
export const TUNNEL_PARAM_STRUCTURE = [
    {
        stiId: 'INF_TUNNEL',             // 名前は自由
        label: 'Tunnels',
        sections: [

            {
                id: 'ITU',
                label: 'Infrastructure Tunnel',
                paramIds: [
                'SOLTunnelIMCode ',
                "ITU_CrossSectionArea",
                "ITU_ECVerification",
                "ITU_EIDemonstration",
                "ITU_EmergencyPlan",
                "ITU_FireCatReq",
                "ITU_Length",
                "ITU_NatFireCatReq",
                "ITU_TSITunnel",
                "ITU_TunnelDocRef",
                ],
            },
        ],
    },
];
*/
