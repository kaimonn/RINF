export const OP_SIDING_STRUCTURE = [
    {
        stiId: 'siding-infra',
        stiLabel: 'Infrastructure',
        description: "Infrastructure – Paramètres techniques et opérationnels des lignes ferroviaires.",
        sections: [
            {
                id: 'ide-siding',
                label: 'IDE - Infrastructure Declaration',
                description:`
                    Déclaration des informations et vérifications techniques pour garantir la conformité et la sécurité de l’infrastructure ferroviaire.
                `,
                paramIds: ['IDE_ECVerification', 'IDE_EIDemonstration'],
            },
            {
                id: 'ipp-siding',
                label: 'IPP - Infrastructure Performance Parameters',
                description: `
                    Indicateurs de performance pour mesurer et améliorer la qualité du service rendu aux entreprises ferroviaires. 
                `,
                paramIds: ['IPP_TENClass',  'IPP_Length'],
            },
            {
                id: 'ill-siding',
                label: 'ILL - Infrastructure Line Layout',
                description: `
                    Configuration géométrique des lignes ferroviaires.
                `,
                paramIds: ['ILL_MinRadHorzCurve', 'ILL_Gradient', 'ILL_MinRadVertCurve'],
            },
            {
                id: 'its-siding',
                label: 'ITS – Infrastructure Train Servicing',
                description: `
                    Services et équipements pour la maintenance et l'approvisionnement des trains en gare.
                `,
                paramIds: [
                    'ITS_ToiletDischarge', 'ITS_ExternalCleaning', 'ITS_WaterRestocking',
                    'ITS_Refuelling', 'ITS_SandRestocking', 'ITS_ElectricShoreSupply',
                ],
            },
        ],
    },
    {
        stiId: 'siding-ecs',
        stiLabel: 'Énergie',
        description: "Énergie – Systèmes d'alimentation électrique de la ligne.",
        sections: [
            {
                id: 'ecs-siding',
                label: 'ECS - Energy Contact System',
                description: `
                    Caractéristiques techniques du système d’alimentation électrique (caténaires ou rails de contact). 
                `,
                paramIds: ['ECS_MaxStandstillCurrent'],
            },
        ],
    },
];




