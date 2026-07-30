// ui/sidebar/sol_tunnel_config.js
// SOL: mode='SOL' → 1.1.*  /  OP: mode='OP' → 1.2.*
export const TUNNEL_SOL_STRUCTURE = [
    {
        stiId: 'itu-infra',
        stiLabel: 'Infrastructure',
        description: "Infrastructure – Paramètres techniques et opérationnels des lignes ferroviaires.",
        sections: [
            {
                id: 'itu',
                label: 'ITU – Infrastructure Tunnel',
                description:`
                    Paramètres techniques et de sécurité des tunnels ferroviaires.
                `,
                paramIds: [
                    'ITU_ECVerification',
                    'ITU_EIDemonstration',
                    'ITU_Length',
                    'ITU_CrossSectionArea',
                    'ITU_TSITunnel',
                    'ITU_TunnelDocRef',
                    'ITU_EmergencyPlan',
                    'ITU_FireCatReq',
                    'ITU_NatFireCatReq',
                    'ITU_Walkways',
                    'ITU_EvacAndRescuePoints',
                ],
            },
        ],
    },
];