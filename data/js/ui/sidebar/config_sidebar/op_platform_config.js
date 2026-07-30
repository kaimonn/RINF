export const OP_PLATFORM_STRUCTURE = [
    {
        stiId: 'ipl-infra',
        stiLabel: 'Infrastructure',
        description: "Infrastructure – Paramètres techniques et opérationnels des lignes ferroviaires.",
        sections: [
            {
                id: 'ipl',
                label: 'IPL – Infrastructure Platform',
                description:`Paramètres techniques des quais (dimensions, accessibilité, courbure).`,
                paramIds: [
                    'IPL_TENClass',
                    'IPL_Length', 
                    'IPL_Height', 
                    'IPL_Curvature',
                    'IPL_AssistanceStartingTrain', 
                    'IPL_AreaBoardingAid'
                ],
            },
        ],
    },
];