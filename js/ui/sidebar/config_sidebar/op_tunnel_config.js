export const TUNNEL_OP_STRUCTURE = [
    {
        stiId: 'itu-infra',
        stiLabel: 'Infrastructure',
        description: "Infrastructure – Paramètres techniques et opérationnels des lignes ferroviaires.",
        sections: [
            {
                id: 'itu',
                label: 'ITU – Infrastructure Tunnel',
                description:`Paramètres techniques et de sécurité des tunnels ferroviaires.`,
                paramIds: [
                    'ITU_ECVerification',
                    'ITU_EIDemonstration',
                    'ITU_Length',
                    'ITU_EmergencyPlan',
                    'ITU_FireCatReq',
                    'ITU_NatFireCatReq',
                    'ITU_Walkways',
                    'ITU_EvacAndRescuePoints',
                    'ITU_DieselThermAllowed',
                ],
            },
        ],
    },
];
