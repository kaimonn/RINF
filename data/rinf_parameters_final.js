//data/rinf_parameters_final.js
export const rinfParams = {
    "SOLIMCode": {
        "group": "DP",
        "title": "Organisation code",
        "description": "Four alpha-numeric code allocated by ERA to a body. It represents the Infrastructure Manager (IM) code in RINF.Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2))",
        "iri": "http://data.europa.eu/949/organisationCode",
        "parameter_of": [
            "Body"
        ],
        "numbers": [
            "1.1.0.0.0.1",
            "1.1.1.1.8.1",
            "1.2.1.0.0.1",
            "1.2.1.0.5.1",
            "1.2.1.0.6.1",
            "1.2.2.0.0.1",
            "1.2.2.0.5.1"
        ],
        "xml_names": [
            "SOLIMCode",
            "OPTrackPlatformIMCode",
            "OPSidingIMCode",
            "OPTrackTunnelIMCode",
            "OPSidingTunnelIMCode",
            "SOLTunnelIMCode",
            "OPTrackIMCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "Concept",
        "values": [
            {
                "code": "0087",
                "value": "SNCF Réseau (0087)"
            },
        ],
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Four alpha-numeric code allocated by ERA to a body. It represent's the Infrastructure Manager (IM) code in RINF. Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command and signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2)).",
                "message": "organisationCode (1.2.1.0.6.1, 1.1.0.0.0.1, 1.1.1.1.8.1, 1.2.1.0.0.1, 1.2.1.0.5.1, 1.2.2.0.0.1, 1.2.2.0.5.1): A Body must have exactly one value of organisationCode. This error may be due to not having a value, having more than one value, having a value that is not a string or having a value that is not a four character code"
            }
        ],
        "general_explanation": "The Code is a unique identifier for the Infrastructure Manager and it shall be verified on national level. - If the IM is subject to TAF/TAP TSIs, it corresponds to the code used in TAF/TAP TSIs. - In other cases, it corresponds to the \"organisation code\" assigned by the Agency for the specific needs of the RINF.Each Section of Line shall concern only one IM.To be able to follow the \"only once\" principle, the infrastructure manager code is a property of the organisation having the role of infrastructuer manager. For data provision, a subset of elements with common characteristics should be created with the era:infrastructureManager property having as value the instance of the infrastructure mananger role.",
        "example": "Simplified example::ABCD_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager ;  era:roleOf :ABCD .:ABCD rdf:type era:Body, org:Organization  ;\t  era:organisationCode \"ABCD\" ;    era:role :ABCD_IM .:0000_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager.\tera:roleOf :0000_ORG.:0000_ORG rdf:type era:Body, org:Organization;     era:organisationCode \"0000\".#IM Code parameter - directly attached to a track:track2 rdf:type era:RunningTrack;\tera:infrastructureManager :0000_IM.",
        "see_also": "https://eur-lex.europa.eu/eli/dir/2012/34/oj#d1e885-32-1",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/dir/2012/34/oj ; http://data.europa.eu/eli/dec_impl/2018/1614",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#organisationCode"
    },
    "OPTrackPlatformIMCode": {
        "group": "DP",
        "title": "Organisation code",
        "description": "Four alpha-numeric code allocated by ERA to a body. It represents the Infrastructure Manager (IM) code in RINF.Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2))",
        "iri": "http://data.europa.eu/949/organisationCode",
        "parameter_of": [
            "Body"
        ],
        "numbers": [
            "1.1.0.0.0.1",
            "1.1.1.1.8.1",
            "1.2.1.0.0.1",
            "1.2.1.0.5.1",
            "1.2.1.0.6.1",
            "1.2.2.0.0.1",
            "1.2.2.0.5.1"
        ],
        "xml_names": [
            "SOLIMCode",
            "OPTrackPlatformIMCode",
            "OPSidingIMCode",
            "OPTrackTunnelIMCode",
            "OPSidingTunnelIMCode",
            "SOLTunnelIMCode",
            "OPTrackIMCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Four alpha-numeric code allocated by ERA to a body. It represent's the Infrastructure Manager (IM) code in RINF. Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command and signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2)).",
                "message": "organisationCode (1.2.1.0.6.1, 1.1.0.0.0.1, 1.1.1.1.8.1, 1.2.1.0.0.1, 1.2.1.0.5.1, 1.2.2.0.0.1, 1.2.2.0.5.1): A Body must have exactly one value of organisationCode. This error may be due to not having a value, having more than one value, having a value that is not a string or having a value that is not a four character code"
            }
        ],
        "general_explanation": "The Code is a unique identifier for the Infrastructure Manager and it shall be verified on national level. - If the IM is subject to TAF/TAP TSIs, it corresponds to the code used in TAF/TAP TSIs. - In other cases, it corresponds to the \"organisation code\" assigned by the Agency for the specific needs of the RINF.Each Section of Line shall concern only one IM.To be able to follow the \"only once\" principle, the infrastructure manager code is a property of the organisation having the role of infrastructuer manager. For data provision, a subset of elements with common characteristics should be created with the era:infrastructureManager property having as value the instance of the infrastructure mananger role.",
        "example": "Simplified example::ABCD_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager ;  era:roleOf :ABCD .:ABCD rdf:type era:Body, org:Organization  ;\t  era:organisationCode \"ABCD\" ;    era:role :ABCD_IM .:0000_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager.\tera:roleOf :0000_ORG.:0000_ORG rdf:type era:Body, org:Organization;     era:organisationCode \"0000\".#IM Code parameter - directly attached to a track:track2 rdf:type era:RunningTrack;\tera:infrastructureManager :0000_IM.",
        "see_also": "https://eur-lex.europa.eu/eli/dir/2012/34/oj#d1e885-32-1",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/dir/2012/34/oj ; http://data.europa.eu/eli/dec_impl/2018/1614",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#organisationCode"
    },
    "OPSidingIMCode": {
        "group": "DP",
        "title": "Organisation code",
        "description": "Four alpha-numeric code allocated by ERA to a body. It represents the Infrastructure Manager (IM) code in RINF.Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2))",
        "iri": "http://data.europa.eu/949/organisationCode",
        "parameter_of": [
            "Body"
        ],
        "numbers": [
            "1.1.0.0.0.1",
            "1.1.1.1.8.1",
            "1.2.1.0.0.1",
            "1.2.1.0.5.1",
            "1.2.1.0.6.1",
            "1.2.2.0.0.1",
            "1.2.2.0.5.1"
        ],
        "xml_names": [
            "SOLIMCode",
            "OPTrackPlatformIMCode",
            "OPSidingIMCode",
            "OPTrackTunnelIMCode",
            "OPSidingTunnelIMCode",
            "SOLTunnelIMCode",
            "OPTrackIMCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Four alpha-numeric code allocated by ERA to a body. It represent's the Infrastructure Manager (IM) code in RINF. Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command and signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2)).",
                "message": "organisationCode (1.2.1.0.6.1, 1.1.0.0.0.1, 1.1.1.1.8.1, 1.2.1.0.0.1, 1.2.1.0.5.1, 1.2.2.0.0.1, 1.2.2.0.5.1): A Body must have exactly one value of organisationCode. This error may be due to not having a value, having more than one value, having a value that is not a string or having a value that is not a four character code"
            }
        ],
        "general_explanation": "The Code is a unique identifier for the Infrastructure Manager and it shall be verified on national level. - If the IM is subject to TAF/TAP TSIs, it corresponds to the code used in TAF/TAP TSIs. - In other cases, it corresponds to the \"organisation code\" assigned by the Agency for the specific needs of the RINF.Each Section of Line shall concern only one IM.To be able to follow the \"only once\" principle, the infrastructure manager code is a property of the organisation having the role of infrastructuer manager. For data provision, a subset of elements with common characteristics should be created with the era:infrastructureManager property having as value the instance of the infrastructure mananger role.",
        "example": "Simplified example::ABCD_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager ;  era:roleOf :ABCD .:ABCD rdf:type era:Body, org:Organization  ;\t  era:organisationCode \"ABCD\" ;    era:role :ABCD_IM .:0000_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager.\tera:roleOf :0000_ORG.:0000_ORG rdf:type era:Body, org:Organization;     era:organisationCode \"0000\".#IM Code parameter - directly attached to a track:track2 rdf:type era:RunningTrack;\tera:infrastructureManager :0000_IM.",
        "see_also": "https://eur-lex.europa.eu/eli/dir/2012/34/oj#d1e885-32-1",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/dir/2012/34/oj ; http://data.europa.eu/eli/dec_impl/2018/1614",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#organisationCode"
    },
    "OPTrackTunnelIMCode": {
        "group": "DP",
        "title": "Organisation code",
        "description": "Four alpha-numeric code allocated by ERA to a body. It represents the Infrastructure Manager (IM) code in RINF.Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2))",
        "iri": "http://data.europa.eu/949/organisationCode",
        "parameter_of": [
            "Body"
        ],
        "numbers": [
            "1.1.0.0.0.1",
            "1.1.1.1.8.1",
            "1.2.1.0.0.1",
            "1.2.1.0.5.1",
            "1.2.1.0.6.1",
            "1.2.2.0.0.1",
            "1.2.2.0.5.1"
        ],
        "xml_names": [
            "SOLIMCode",
            "OPTrackPlatformIMCode",
            "OPSidingIMCode",
            "OPTrackTunnelIMCode",
            "OPSidingTunnelIMCode",
            "SOLTunnelIMCode",
            "OPTrackIMCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Four alpha-numeric code allocated by ERA to a body. It represent's the Infrastructure Manager (IM) code in RINF. Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command and signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2)).",
                "message": "organisationCode (1.2.1.0.6.1, 1.1.0.0.0.1, 1.1.1.1.8.1, 1.2.1.0.0.1, 1.2.1.0.5.1, 1.2.2.0.0.1, 1.2.2.0.5.1): A Body must have exactly one value of organisationCode. This error may be due to not having a value, having more than one value, having a value that is not a string or having a value that is not a four character code"
            }
        ],
        "general_explanation": "The Code is a unique identifier for the Infrastructure Manager and it shall be verified on national level. - If the IM is subject to TAF/TAP TSIs, it corresponds to the code used in TAF/TAP TSIs. - In other cases, it corresponds to the \"organisation code\" assigned by the Agency for the specific needs of the RINF.Each Section of Line shall concern only one IM.To be able to follow the \"only once\" principle, the infrastructure manager code is a property of the organisation having the role of infrastructuer manager. For data provision, a subset of elements with common characteristics should be created with the era:infrastructureManager property having as value the instance of the infrastructure mananger role.",
        "example": "Simplified example::ABCD_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager ;  era:roleOf :ABCD .:ABCD rdf:type era:Body, org:Organization  ;\t  era:organisationCode \"ABCD\" ;    era:role :ABCD_IM .:0000_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager.\tera:roleOf :0000_ORG.:0000_ORG rdf:type era:Body, org:Organization;     era:organisationCode \"0000\".#IM Code parameter - directly attached to a track:track2 rdf:type era:RunningTrack;\tera:infrastructureManager :0000_IM.",
        "see_also": "https://eur-lex.europa.eu/eli/dir/2012/34/oj#d1e885-32-1",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/dir/2012/34/oj ; http://data.europa.eu/eli/dec_impl/2018/1614",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#organisationCode"
    },
    "OPSidingTunnelIMCode": {
        "group": "DP",
        "title": "Organisation code",
        "description": "Four alpha-numeric code allocated by ERA to a body. It represents the Infrastructure Manager (IM) code in RINF.Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2))",
        "iri": "http://data.europa.eu/949/organisationCode",
        "parameter_of": [
            "Body"
        ],
        "numbers": [
            "1.1.0.0.0.1",
            "1.1.1.1.8.1",
            "1.2.1.0.0.1",
            "1.2.1.0.5.1",
            "1.2.1.0.6.1",
            "1.2.2.0.0.1",
            "1.2.2.0.5.1"
        ],
        "xml_names": [
            "SOLIMCode",
            "OPTrackPlatformIMCode",
            "OPSidingIMCode",
            "OPTrackTunnelIMCode",
            "OPSidingTunnelIMCode",
            "SOLTunnelIMCode",
            "OPTrackIMCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Four alpha-numeric code allocated by ERA to a body. It represent's the Infrastructure Manager (IM) code in RINF. Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command and signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2)).",
                "message": "organisationCode (1.2.1.0.6.1, 1.1.0.0.0.1, 1.1.1.1.8.1, 1.2.1.0.0.1, 1.2.1.0.5.1, 1.2.2.0.0.1, 1.2.2.0.5.1): A Body must have exactly one value of organisationCode. This error may be due to not having a value, having more than one value, having a value that is not a string or having a value that is not a four character code"
            }
        ],
        "general_explanation": "The Code is a unique identifier for the Infrastructure Manager and it shall be verified on national level. - If the IM is subject to TAF/TAP TSIs, it corresponds to the code used in TAF/TAP TSIs. - In other cases, it corresponds to the \"organisation code\" assigned by the Agency for the specific needs of the RINF.Each Section of Line shall concern only one IM.To be able to follow the \"only once\" principle, the infrastructure manager code is a property of the organisation having the role of infrastructuer manager. For data provision, a subset of elements with common characteristics should be created with the era:infrastructureManager property having as value the instance of the infrastructure mananger role.",
        "example": "Simplified example::ABCD_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager ;  era:roleOf :ABCD .:ABCD rdf:type era:Body, org:Organization  ;\t  era:organisationCode \"ABCD\" ;    era:role :ABCD_IM .:0000_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager.\tera:roleOf :0000_ORG.:0000_ORG rdf:type era:Body, org:Organization;     era:organisationCode \"0000\".#IM Code parameter - directly attached to a track:track2 rdf:type era:RunningTrack;\tera:infrastructureManager :0000_IM.",
        "see_also": "https://eur-lex.europa.eu/eli/dir/2012/34/oj#d1e885-32-1",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/dir/2012/34/oj ; http://data.europa.eu/eli/dec_impl/2018/1614",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#organisationCode"
    },
    "SOLTunnelIMCode": {
        "group": "DP",
        "title": "Organisation code",
        "description": "Four alpha-numeric code allocated by ERA to a body. It represents the Infrastructure Manager (IM) code in RINF.Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2))",
        "iri": "http://data.europa.eu/949/organisationCode",
        "parameter_of": [
            "Body"
        ],
        "numbers": [
            "1.1.0.0.0.1",
            "1.1.1.1.8.1",
            "1.2.1.0.0.1",
            "1.2.1.0.5.1",
            "1.2.1.0.6.1",
            "1.2.2.0.0.1",
            "1.2.2.0.5.1"
        ],
        "xml_names": [
            "SOLIMCode",
            "OPTrackPlatformIMCode",
            "OPSidingIMCode",
            "OPTrackTunnelIMCode",
            "OPSidingTunnelIMCode",
            "SOLTunnelIMCode",
            "OPTrackIMCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Four alpha-numeric code allocated by ERA to a body. It represent's the Infrastructure Manager (IM) code in RINF. Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command and signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2)).",
                "message": "organisationCode (1.2.1.0.6.1, 1.1.0.0.0.1, 1.1.1.1.8.1, 1.2.1.0.0.1, 1.2.1.0.5.1, 1.2.2.0.0.1, 1.2.2.0.5.1): A Body must have exactly one value of organisationCode. This error may be due to not having a value, having more than one value, having a value that is not a string or having a value that is not a four character code"
            }
        ],
        "general_explanation": "The Code is a unique identifier for the Infrastructure Manager and it shall be verified on national level. - If the IM is subject to TAF/TAP TSIs, it corresponds to the code used in TAF/TAP TSIs. - In other cases, it corresponds to the \"organisation code\" assigned by the Agency for the specific needs of the RINF.Each Section of Line shall concern only one IM.To be able to follow the \"only once\" principle, the infrastructure manager code is a property of the organisation having the role of infrastructuer manager. For data provision, a subset of elements with common characteristics should be created with the era:infrastructureManager property having as value the instance of the infrastructure mananger role.",
        "example": "Simplified example::ABCD_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager ;  era:roleOf :ABCD .:ABCD rdf:type era:Body, org:Organization  ;\t  era:organisationCode \"ABCD\" ;    era:role :ABCD_IM .:0000_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager.\tera:roleOf :0000_ORG.:0000_ORG rdf:type era:Body, org:Organization;     era:organisationCode \"0000\".#IM Code parameter - directly attached to a track:track2 rdf:type era:RunningTrack;\tera:infrastructureManager :0000_IM.",
        "see_also": "https://eur-lex.europa.eu/eli/dir/2012/34/oj#d1e885-32-1",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/dir/2012/34/oj ; http://data.europa.eu/eli/dec_impl/2018/1614",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#organisationCode"
    },
    "OPTrackIMCode": {
        "group": "DP",
        "title": "Organisation code",
        "description": "Four alpha-numeric code allocated by ERA to a body. It represents the Infrastructure Manager (IM) code in RINF.Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2))",
        "iri": "http://data.europa.eu/949/organisationCode",
        "parameter_of": [
            "Body"
        ],
        "numbers": [
            "1.1.0.0.0.1",
            "1.1.1.1.8.1",
            "1.2.1.0.0.1",
            "1.2.1.0.5.1",
            "1.2.1.0.6.1",
            "1.2.2.0.0.1",
            "1.2.2.0.5.1"
        ],
        "xml_names": [
            "SOLIMCode",
            "OPTrackPlatformIMCode",
            "OPSidingIMCode",
            "OPTrackTunnelIMCode",
            "OPSidingTunnelIMCode",
            "SOLTunnelIMCode",
            "OPTrackIMCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Four alpha-numeric code allocated by ERA to a body. It represent's the Infrastructure Manager (IM) code in RINF. Infrastructure manager means any body or firm responsible in particular for establishing, managing and maintaining railway infrastructure, including traffic management and control-command and signalling; the functions of the infrastructure manager on a network or part of a network may be allocated to different bodies or firms. Definition in (Article 3(2)).",
                "message": "organisationCode (1.2.1.0.6.1, 1.1.0.0.0.1, 1.1.1.1.8.1, 1.2.1.0.0.1, 1.2.1.0.5.1, 1.2.2.0.0.1, 1.2.2.0.5.1): A Body must have exactly one value of organisationCode. This error may be due to not having a value, having more than one value, having a value that is not a string or having a value that is not a four character code"
            }
        ],
        "general_explanation": "The Code is a unique identifier for the Infrastructure Manager and it shall be verified on national level. - If the IM is subject to TAF/TAP TSIs, it corresponds to the code used in TAF/TAP TSIs. - In other cases, it corresponds to the \"organisation code\" assigned by the Agency for the specific needs of the RINF.Each Section of Line shall concern only one IM.To be able to follow the \"only once\" principle, the infrastructure manager code is a property of the organisation having the role of infrastructuer manager. For data provision, a subset of elements with common characteristics should be created with the era:infrastructureManager property having as value the instance of the infrastructure mananger role.",
        "example": "Simplified example::ABCD_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager ;  era:roleOf :ABCD .:ABCD rdf:type era:Body, org:Organization  ;\t  era:organisationCode \"ABCD\" ;    era:role :ABCD_IM .:0000_IM rdf:type era:OrganisationRole;\tera:hasOrganisationRole era-skos:InfrastructureManager.\tera:roleOf :0000_ORG.:0000_ORG rdf:type era:Body, org:Organization;     era:organisationCode \"0000\".#IM Code parameter - directly attached to a track:track2 rdf:type era:RunningTrack;\tera:infrastructureManager :0000_IM.",
        "see_also": "https://eur-lex.europa.eu/eli/dir/2012/34/oj#d1e885-32-1",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/dir/2012/34/oj ; http://data.europa.eu/eli/dec_impl/2018/1614",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#organisationCode"
    },
    "SOLLineIdentification": {
        "group": "OP",
        "title": "National line identification",
        "description": "Indicates a relationship with a national railway line at a specific kilometer point.For a Section of Line: unique line identification or unique line number within Member State.",
        "iri": "http://data.europa.eu/949/nationalLine",
        "parameter_of": [
            "Section Of Line"
        ],
        "numbers": [
            "1.1.0.0.0.2"
        ],
        "xml_names": [
            "SOLLineIdentification"
        ],
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 )",
        "data_presentation": "Linear Positioning System",
        "validation_rules": [
            {
                "comment": "Indicates the national railway line that a Section of Line belongs to, via a linear positioning system.",
                "message": "nationalLine (1.1.0.0.0.2): Each Section of Line must indicate exactly one national railway line via a linear positioning system. This error is due to not having a value, having more than one value, or having a value that is not an instance of LinearPositioningSystem."
            }
        ],
        "general_explanation": "Each SoL can belong to only one national line.In case when SoL is the track connecting between OPs within big node (resulting from division of big station into several smaller) the line can be identified using the name of this track.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#nationalLine"
    },
    "SOLOPStart": {
        "group": "OP",
        "title": "Operational point at start of section of line",
        "description": "Operational point at the start of section of line (kilometres increasing from start OP to the end OP).",
        "iri": "http://data.europa.eu/949/opStart",
        "parameter_of": [
            "Section Of Line"
        ],
        "numbers": [
            "1.1.0.0.0.3"
        ],
        "xml_names": [
            "SOLOPStart"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 )",
        "data_presentation": "Operational Point",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Each SoL may have only one start OP, and each OP has unique OP ID within the MS. The “uniqueOPID” is defined in parameter 1.2.0.0.0.2. Each SoL has the principal direction of the traffic defined by increasing kilometres running from the start OP to the end OP. That is why the start OP is always located at lowest kilometre of the line within the SoL. Data collected in the UK in miles will be transformed to km for uploading to the RINF application. The OP ID must exist in the MS file of RINF. The value of this parameter must be different from 1.1.0.0.0.4. No validation will be performed by RINF application regarding which is the start and which the end OP. This requires national verification.",
                "message": "opStart (1.1.0.0.0.3): There must be exactly one OP start for this section of line and it must be different from the OP end."
            }
        ],
        "general_explanation": "Each SoL may have only one start OP, and each OP has unique OP ID within the MS. The “uniqueOPID” is defined in parameter 1.2.0.0.0.2.Each SoL has the principal direction of the traffic defined by increasing kilometres running from the start OP to the end OP.That is why the start OP is always located at lowest kilometre of the line within the SoL.No validation will be performed by RINF application regarding which is the start and which the end OP. This requires IM's verification.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#opStart"
    },
    "SOLOPEnd": {
        "group": "OP",
        "title": "Operational point at end of section of line",
        "description": "Operational point at the end of section of line (kilometres increasing from start OP to the end OP).",
        "iri": "http://data.europa.eu/949/opEnd",
        "parameter_of": [
            "Section Of Line"
        ],
        "numbers": [
            "1.1.0.0.0.4"
        ],
        "xml_names": [
            "SOLOPEnd"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 )",
        "data_presentation": "Operational Point",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Each SoL may have only one end OP, and each OP has unique OP ID within the MS. The “uniqueOPID” is defined in parameter 1.2.0.0.0.2. Each SoL has the principal direction of the traffic defined by increasing kilometres running from the start OP to the end OP. That is why the start OP is always located at lowest kilometre of the line within the SoL. Data collected in the UK in miles will be transformed to km for uploading to the RINF application. The OP ID must exist in the MS file of RINF. The value of this parameter must be different from 1.1.0.0.0.3. No validation will be performed by RINF application regarding which is the start and which the end OP. This requires national verification.",
                "message": "opEnd (1.1.0.0.0.4): There must be exactly one OP end for this section of line and it must be different from the OP start."
            }
        ],
        "general_explanation": "Each SoL may have only one end OP, and each OP has unique OP ID within the MS. The “uniqueOPID” is defined in parameter 1.2.0.0.0.2.Each SoL has the principal direction of the traffic defined by increasing kilometres running from the start OP to the end OP.That is why the end OP is always located at highest kilometre of the line within the SoL.No validation will be performed by RINF application regarding which is the start and which the end OP. This requires IM's verification.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#opEnd"
    },
    "SOLLength": {
        "group": "DP",
        "title": "Length of section of line",
        "description": "Length between operational points at start and end of section of line.",
        "iri": "http://data.europa.eu/949/lengthOfSectionOfLine",
        "parameter_of": [
            "Section Of Line"
        ],
        "numbers": [
            "1.1.0.0.0.5"
        ],
        "xml_names": [
            "SOLLength"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 ) Length",
        "data_presentation": "Double",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "General description: The length of SoL is theoretical distance between centre points of Ops which are selected in such a way to represent the average value for all tracks within the SoL. It is advised to include distances applied by IM for commercial purposes.  Validation: No validation will be performed by RINF application regarding the length of SoL. This requires national verification.",
                "message": "lengthOfSectionOfLine (1.1.0.0.0.5): Each SoL has exactly one length. This error is due to that either there is no length for the specified SoL, more than one length has been defined, or the datatype cannot be converted into an xsd:double."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#lengthOfSectionOfLine"
    },
    "SOLNature": {
        "group": "OP",
        "title": "Nature of Section of Line",
        "description": "Kind of section of line expressing size of presented data which depends on fact whether it connects OPs generated by division of a big node into several OPs or not.",
        "iri": "http://data.europa.eu/949/solNature",
        "parameter_of": [
            "Section Of Line"
        ],
        "numbers": [
            "1.1.0.0.0.6"
        ],
        "xml_names": [
            "SOLNature"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Section of line generic information\n                \n                (\n                \n                1.1.0.0.0 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Section of Line Natures",
        "values": [
            {
                "code": "10",
                "value": "Regular SoL"
            },
            {
                "code": "20",
                "value": "Link"
            }
        ],
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication of the SOL nature.",
                "message": "SoL nature (1.1.0.0.0.6): The SOL {$this} with label {?label} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/sol-natures/SoLNatures."
            },
            {
                "comment": "If the value of this parameter is “Link”, then for all tracks belonging to this SoL, all the parameters of the following groups of parameters are not applicable: 1.1.1.1 Infrastructure subsystem; 1.1.1.2 Energy subsystem; 1.1.1.3 Control-command and signalling subsystem.",
                "message": "SoL nature (1.1.0.0.0.6): The SoL {$this} ({?solLabel}), with opStart {?opStartID} and opEnd {?opEndID}, has a SOLnature of type Link, and at least one of its tracks has values for at least one of the groups of parameters 1.1.1.1, 1.1.1.2 or 1.1.1.3. This happens at least with the track {?track} ({?trackLabel}), with property {?p} (RINF index {?index})."
            },
            {
                "comment": "General description: Validation: If the value of this parameter is 'Link', then for all tracks belonging to this SoL, all the parameters of the following groups of parameters are not applicable: 1.1.1.1 Infrastructure subsystem, 1.1.1.2 Energy subsystem, 1.1.1.3 Control-command and signalling subsystem.",
                "message": "SoL nature (1.1.0.0.0.6): Either no SOL nature is specified for this SoL, or more than one SoL nature has been specified."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#solNature"
    },
    "RBS_IndRisks": {
        "group": "DP",
        "title": "Industrial risks — locations where it is dangerous for the driver to step out",
        "description": "Indication that the full section of line (or a part of it) it is identified by the Infrastructure Managers (and communicated to the RU) where drivers are not supposed to get off the locomotive.",
        "iri": "http://data.europa.eu/949/existenceOfIndustrialRisk",
        "parameter_of": [
            "Section Of Line",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.0.0.1.1"
        ],
        "xml_names": [
            "RBS_IndRisks"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Route book specific parameters\n                \n                (\n                \n                1.1.0.0.1 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/NYA",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication that the full section of line (or a part of it) is identified by the Infrastructure Managers where drivers are not supposed to get off the locomotive.",
                "message": "existenceOfIndustrialRisk (1.1.0.0.1.1): Each section of line or common characteristics subset may have at most one value for existence of industrial risk. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "Although it is just an indication of existence of an industrial risk, the area covering the industrial risk should be references on the topological network.For the route book purpose, the industrial risks should be defined as linear references instead of area. SpecialArea of type \"industrial risk\" should be used",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#existenceOfIndustrialRisk"
    },
    "RBS_OpeLang": {
        "group": "OP",
        "title": "Operating language",
        "description": "The language or languages used in daily operation by infrastructure manager and published in its Network Statement, for the communication of operational or safety related messages between the staff of the infrastructure manager and the railway undertaking.",
        "iri": "http://data.europa.eu/949/operatingLanguage",
        "parameter_of": [
            "Infrastructure element"
        ],
        "numbers": [
            "1.1.0.0.1.2",
            "1.2.0.0.0.8"
        ],
        "xml_names": [
            "RBS_OpeLang"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Route book specific parameters\n                \n                (\n                \n                1.1.0.0.1 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Language",
        "values": [
            {
                "code": "BUL",
                "value": "Bulgarian"
            },
            {
                "code": "CES",
                "value": "Czech"
            },
            {
                "code": "DAN",
                "value": "Danish"
            },
            {
                "code": "DEU",
                "value": "German"
            },
            {
                "code": "ELL",
                "value": "Greek"
            },
            {
                "code": "ENG",
                "value": "English"
            },
            {
                "code": "EST",
                "value": "Estonian"
            },
            {
                "code": "FIN",
                "value": "Finnish"
            },
            {
                "code": "FRA",
                "value": "French"
            },
            {
                "code": "GLE",
                "value": "Irish"
            },
            {
                "code": "HRV",
                "value": "Croatian"
            },
            {
                "code": "HUN",
                "value": "Hungarian"
            },
            {
                "code": "ITA",
                "value": "Italian"
            },
            {
                "code": "LAV",
                "value": "Latvian"
            },
            {
                "code": "LIT",
                "value": "Lithuanian"
            },
            {
                "code": "MLT",
                "value": "Maltese"
            },
            {
                "code": "NLD",
                "value": "Dutch"
            },
            {
                "code": "NOR",
                "value": "Norwegian"
            },
            {
                "code": "POL",
                "value": "Polish"
            },
            {
                "code": "POR",
                "value": "Portuguese"
            },
            {
                "code": "RON",
                "value": "Romanian"
            },
            {
                "code": "RUS",
                "value": "Russian"
            },
            {
                "code": "SLK",
                "value": "Slovak"
            },
            {
                "code": "SLV",
                "value": "Slovenian"
            },
            {
                "code": "SPA",
                "value": "Spanish"
            },
            {
                "code": "SWE",
                "value": "Swedish"
            }
        ],
        "applicability_flags": "Y/NYA",
        "validation_rules": [
            {
                "comment": "Relates to the operating language used for an infastructure element",
                "message": "operating language (1.1.0.0.1.2 , 1.2.0.0.0.8): The operating language thatthat is an IRI. This error is due to having a value that is not an IRI"
            }
        ],
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#operatingLanguage"
    },
    "RBS_OpeReg": {
        "group": "OP",
        "title": "Operational regime",
        "description": "Double track type.",
        "iri": "http://data.europa.eu/949/operationalRegimeType",
        "parameter_of": [
            "Section Of Line"
        ],
        "numbers": [
            "1.1.0.0.1.3"
        ],
        "xml_names": [
            "RBS_OpeReg"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Route book specific parameters\n                \n                (\n                \n                1.1.0.0.1 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Operational regime types",
        "values": [
            {
                "code": "10",
                "value": "Mono-directional single track line"
            },
            {
                "code": "20",
                "value": "Bi-directional single track line"
            },
            {
                "code": "30",
                "value": "Reversible multiple track line"
            },
            {
                "code": "40",
                "value": "Double or multiple track line"
            }
        ],
        "applicability_flags": "Y/NYA",
        "validation_rules": [
            {
                "comment": "Double track type.",
                "message": "operationalRegimeType: Each SectionOfLine may have at most one value for operational regime which must be an IRI. This error is due to having more than one values, or a value that is not an IRI."
            },
            {
                "comment": "Double track type.",
                "message": "operationalRegimeType: The SectionOfLine {$this} with label {?thisLabel} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/operational-regime-types/OperationalRegimeTypes."
            }
        ],
        "see_also": "https://www.securite-ferroviaire.fr/sites/default/files/reglementations/pdf/2023-03/document-pedagogique-signaux-regimes-exploitation-v1.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#operationalRegimeType"
    },
    "SOLTrackIdentification": {
        "group": "DP",
        "title": "Identification of track",
        "description": "Unique track identification or unique track number within operational point or section of line",
        "iri": "http://data.europa.eu/949/trackId",
        "parameter_of": [
            "Running track"
        ],
        "numbers": [
            "1.1.1.0.0.1",
            "1.2.1.0.0.2"
        ],
        "xml_names": [
            "SOLTrackIdentification",
            "OPTrackIdentification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Each track shall have unique identification or number within the SoL. This number cannot be used for naming any other track in the same SoL.",
                "message": "trackId (1.1.1.0.0.1): Each track shall have unique identification or number within the SoL. This number cannot be used for naming any other track in the same SoL. There is a problem with SoL {$this} ({?solLabel}) and tracks {?track1} ({?track1Label}) and {?track2} ({?track2Label}), since they have the same identifier: {?value}."
            },
            {
                "comment": "Unique track identification or unique track number within an OP or a section of line.",
                "message": "trackId (1.1.1.3.3.3.3, 1.2.1.1.2.3.3): The identification of a track must be a string. This error may be due to having a track with no identification or with more than one value as identification, or having a value that is not a string."
            },
            {
                "comment": "Each track shall have unique identification or number within the OP. This number cannot be used for naming any other track in the same OP.",
                "message": "trackId (1.2.1.0.0.2):: Each track shall have unique identification or number within the OP. This number cannot be used for naming any other track in the same OP. There is a problem with OP {$this} ({?opLabel}) and tracks {?track1} ({?track1Label}) and {?track2} ({?track2Label}), since they have the same identifier: {?value}."
            }
        ],
        "general_explanation": "Each track shall have unique identification or number within the SoL. This number cannot be used for naming any other track in the same SoL.The check regarding the uniqueness of the ID within the SoL has to be done on national level (preferably by IM).",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trackId"
    },
    "OPTrackIdentification": {
        "group": "DP",
        "title": "Identification of track",
        "description": "Unique track identification or unique track number within operational point or section of line",
        "iri": "http://data.europa.eu/949/trackId",
        "parameter_of": [
            "Running track"
        ],
        "numbers": [
            "1.1.1.0.0.1",
            "1.2.1.0.0.2"
        ],
        "xml_names": [
            "SOLTrackIdentification",
            "OPTrackIdentification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Running track generic information\n                \n                (\n                \n                1.1.1.0.0 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Each track shall have unique identification or number within the SoL. This number cannot be used for naming any other track in the same SoL.",
                "message": "trackId (1.1.1.0.0.1): Each track shall have unique identification or number within the SoL. This number cannot be used for naming any other track in the same SoL. There is a problem with SoL {$this} ({?solLabel}) and tracks {?track1} ({?track1Label}) and {?track2} ({?track2Label}), since they have the same identifier: {?value}."
            },
            {
                "comment": "Unique track identification or unique track number within an OP or a section of line.",
                "message": "trackId (1.1.1.3.3.3.3, 1.2.1.1.2.3.3): The identification of a track must be a string. This error may be due to having a track with no identification or with more than one value as identification, or having a value that is not a string."
            },
            {
                "comment": "Each track shall have unique identification or number within the OP. This number cannot be used for naming any other track in the same OP.",
                "message": "trackId (1.2.1.0.0.2):: Each track shall have unique identification or number within the OP. This number cannot be used for naming any other track in the same OP. There is a problem with OP {$this} ({?opLabel}) and tracks {?track1} ({?track1Label}) and {?track2} ({?track2Label}), since they have the same identifier: {?value}."
            }
        ],
        "general_explanation": "Each track shall have unique identification or number within the SoL. This number cannot be used for naming any other track in the same SoL.The check regarding the uniqueness of the ID within the SoL has to be done on national level (preferably by IM).",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trackId"
    },
    "SOLTrackDirection": {
        "group": "OP",
        "title": "Normal running direction",
        "description": "The normal running direction is:- the same as the direction defined by the start and end of the SoL: (N)- the opposite to the direction defined by the start and end of the SoL: (O)- both directions: (B)",
        "iri": "http://data.europa.eu/949/trackDirection",
        "parameter_of": [
            "Running track"
        ],
        "numbers": [
            "1.1.1.0.0.2"
        ],
        "xml_names": [
            "SOLTrackDirection"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Running track generic information\n                \n                (\n                \n                1.1.1.0.0 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Track Running Directions",
        "values": [
            {
                "code": "10",
                "value": "N | The normal running direction is the same as the direction defined by the start and end of the Section of Line."
            },
            {
                "code": "20",
                "value": "O | The normal running direction is the opposite/reverse as the direction defined by the start and end of the Section of Line."
            },
            {
                "code": "30",
                "value": "B | The normal running direction is both directions defined by the Section of Line."
            }
        ],
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "The normal running direction is: 1) the same as the direction defined by the start and end of the SoL 2) the opposite to the direction defined by the start and end of the SoL 3) both directions defined for SoL.",
                "message": "There should be at most one Track Direction. There is a problem with SoL {$this} ({?solLabel}) and its track {?track} ({?trackLabel}). This track has at least two different values for this property: {?value1} and {?value2}"
            },
            {
                "comment": "The normal running direction is: 1) the same as the direction defined by the start and end of the SoL 2) the opposite to the direction defined by the start and end of the SoL 3) both directions defined for SoL.",
                "message": "There should be at least one Track Direction. There is a problem with SoL {$this} ({?solLabel}) and its track {?track} ({?trackLabel}). This track has no values for this property"
            },
            {
                "comment": "The normal running direction is: 1) the same as the direction defined by the start and end of the SoL 2) the opposite to the direction defined by the start and end of the SoL 3) both directions defined for SoL.",
                "message": "Indication of the trackDirection (1.1.1.0.0.2):): The track {?track} in the Section of Line {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/track-running-directions/TrackRunningDirections."
            },
            {
                "comment": "The normal running direction of the track.",
                "message": "trackDirection (1.1.1.0.0.2): The track must have at most one running direction value and it must be an IRI. This error may be due to having more than one value or having a value that is not an IRI."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trackDirection"
    },
    "SOL_LineDistIndication": {
        "group": "OP",
        "title": "Lineside distance indication",
        "description": "Indication of types of appearance of track lineside distance indications.",
        "iri": "http://data.europa.eu/949/linesideDistanceIndication",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.0.0.3"
        ],
        "xml_names": [
            "SOL_LineDistIndication"
        ],
        "belongs_to_group": "Running track generic information\n                \n                (\n                \n                1.1.1.0.0 )",
        "data_presentation": "Lineside indications of distance",
        "validation_rules": [
            {
                "comment": "Indication of types of appearance of track lineside distance indications.",
                "message": "linesideDistanceIndication (1.1.1.0.0.3) : The common characteristics subset may have at most one value of a lineside distance indication that must be an instance of LinesideDistanceIndication. This error may be due to the subset having more than one value or having a value that is not an instance of the class LinesideDistanceIndication."
            },
            {
                "comment": "Indication of types of appearance of track lineside distance indications.",
                "message": "linesideDistanceIndication (1.1.1.0.0.3) : The track must have exactly one value of a lineside distance indication that must be an instance of LinesideDistanceIndication. This error may be due to the track having no value, having more than one value or having a value that is not an instance of the class LinesideDistanceIndication."
            },
            {
                "comment": "Indication of types of appearance of track lineside distance indications.",
                "message": "linesideDistanceIndication (1.1.1.0.0.3) : The track must have exactly one value of a lineside distance indication that must be an instance of LinesideDistanceIndication. This error may be due to the track having no value, having more than one value or having a value that is not an instance of the class LinesideDistanceIndication."
            }
        ],
        "general_explanation": "Frequency, appearance and positioning of a sign indicating distance as reference post. Two types of sign are normally available: kilometer post and hectometer post.- A kilometer post is a lineside sign indicating the distance from a specific point, usually being the strarting point of the railway line.- An hectometer post is a lineside sign indicating a relative distance.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#linesideDistanceIndication"
    },
    "IDE_ECVerification": {
        "group": "DP",
        "title": "EC declaration of verification for infrastructure element relating to compliance with the requirements from TSIs applicable to infrastructure subsystem",
        "description": "Unique number for EC declarations in accordance with Commission Implementing Regulation (EU) 2019/250.",
        "iri": "http://data.europa.eu/949/verificationINF",
        "parameter_of": [
            "Running track",
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.1.1",
            "1.2.1.0.1.1",
            "1.2.2.0.1.1"
        ],
        "xml_names": [
            "IDE_ECVerification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Declarations of verification for track\n                \n                (\n                \n                1.1.1.1.1 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Unique number for EC declarations following format requirements specified in the 'Document about practical arrangements for transmitting interoperability documents'.",
                "message": "verificationINF (1.1.1.1.1.1, 1.2.1.0.1.1, 1.2.2.0.1.1): The verificationINF must be a string following the format 'XX/XXXXXXXXXXXXXX/YYYY/DDDDDD' where XX is the country code, XXXXXXXXXXXXXX is the unique number for EC declarations, YYYY is the year of the declaration (1900-2100) and DDDDDD is the sequential number of the declaration. This error is due to the value not following the pattern."
            }
        ],
        "general_explanation": "The parameter may be repeated only when several EC declarations were issued related to the INF subsystem.With the extension of scope according to the IOD, geographical scope of the INF TSI now includes all the networks (TEN and off-TEN) with the following nominal track gauges: 1435, 1520, 1524, 1600 and 1668 mm",
        "references": "http://data.europa.eu/eli/reg_impl/2019/777/oj ; http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#verificationINF"
    },
    "IDE_EIDemonstration": {
        "group": "DP",
        "title": "EI declaration of demonstration (as defined in Commission 2014/881/EU (2)) relating to compliance with the requirements from TSIs applicable to infrastructure subsystem",
        "description": "Unique number for EI declarations following the same format requirements as specified for EC declarations in Annex VII of Commission Implementing Regulation (EU) 2019/250.",
        "iri": "http://data.europa.eu/949/demonstrationINF",
        "parameter_of": [
            "Running track",
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.1.2",
            "1.2.1.0.1.2",
            "1.2.2.0.1.2"
        ],
        "xml_names": [
            "IDE_EIDemonstration"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Declarations of verification for track\n                \n                (\n                \n                1.1.1.1.1 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Unique number for EI declarations following format requirements specified in the 'Document about practical arrangements for transmitting interoperability documents'.",
                "message": "demonstrationINF (1.1.1.1.1.2, 1.2.1.0.1.2, 1.2.2.0.1.2): The demonstrationINF must be a string following the format 'XX/XXXXXXXXXXXXXX/YYYY/DDDDDD' where XX is the country code, XXXXXXXXXXXXXX is the unique number for EI declarations, YYYY is the year of the declaration (1900-2100) and DDDDDD is the sequential number of the declaration. This error is due to the value not following the pattern."
            }
        ],
        "general_explanation": "It may happen that several EI declarations were issued - then parameter has to be repeated as many times as many declarations were issued.The procedure for demonstration that existing network fits to requirements of the TSIs is executed on voluntary basis, so when EI declaration do not exist then the parameter is optional. If EI declaration was not issued, then field shall be left empty. EI declaration of demonstration (as defined Commission 2014/881/EU) for track relating to compliance with the requirements from TSIs applicable to infrastructure subsystem.It may happen that several EI declarations were issued - then parameter has to be repeated as many times as many declarations were issued.The procedure for demonstration that existing network fits to requirements of the TSIs is executed on voluntary basis, so when EI declaration do not exist then the parameter is optional. If EI declaration was not issued, then field shall be left empty.",
        "references": "http://data.europa.eu/eli/reco/2014/881/oj ; http://data.europa.eu/eli/reg_impl/2019/777/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#demonstrationINF"
    },
    "IPP_TENClass": {
        "group": "OP",
        "title": "TEN classification of track",
        "description": "Indication of the part of the trans-European network the infrastructure element belongs to.",
        "iri": "http://data.europa.eu/949/tenClassification",
        "parameter_of": [
            "Platform edge",
            "Running track",
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.1",
            "1.2.1.0.2.1",
            "1.2.1.0.6.3",
            "1.2.2.0.0.3"
        ],
        "xml_names": [
            "IPP_TENClass",
            "IPL_TENClass"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "TEN Classifications",
        "values": [
            {
                "code": "10",
                "value": "Part of the TEN-T Comprehensive Network"
            },
            {
                "code": "20",
                "value": "Part of the TEN-T Core Freight Network"
            },
            {
                "code": "30",
                "value": "Part of the TEN-T Core Passenger Network"
            },
            {
                "code": "40",
                "value": "Off TEN"
            },
            {
                "code": "50",
                "value": "Part of the TEN-T Extended Core Freight Network"
            },
            {
                "code": "60",
                "value": "Part of the TEN-T Extended Core Passenger Network"
            }
        ],
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Indication of the TEN classification of track.",
                "message": "TEN classification (1.1.1.1.2.1, 1.2.1.0.2.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ten-classifications/TENClassifications."
            },
            {
                "comment": "Indicates the part of the trans-European network the platform belongs to.",
                "message": "TEN classification (1.1.1.1.2.1, 1.2.1.0.2.1, 1.2.1.0.6.3, 1.2.2.0.0.3): This error may be due to having a Platform with a TEN classification that is not an URI."
            },
            {
                "comment": "Indicates the part of the trans-European network the platform belongs to.",
                "message": "TEN classification (1.2.1.0.6.3): This error may be due to having a Platform with a TEN classification that is not an URI."
            },
            {
                "comment": "Indication of the part of the trans-European network the line belongs to.",
                "message": "tenClassification (1.1.1.1.2.1, 1.2.1.0.2.1): The track has a TEN classificaion value (Indication of the part of the trans-European network the line belongs to) that must be an IRI."
            },
            {
                "comment": "Warning that tentNetworkLevel is to be preferred over the tenClassification.",
                "message": "tenClassification (Warning): The track {$this} uses the property 'tenClassification'. Please use 'tentNetworkLevel' and 'typeOfTraffic' with the respective SKOS concepts instead."
            },
            {
                "comment": "Indication of the part of the trans-European network the line belongs to.",
                "message": "TEN classification (1.1.1.1.2.1, 1.2.1.0.2.1, 1.2.1.0.6.3, 1.2.2.0.0.3): The siding {$this} with label {?sidingLabel} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ten-classifications/TENClassifications."
            },
            {
                "comment": "Indicates the part of the trans-European network the platform belongs to.",
                "message": "TEN classification (1.2.1.0.6.3): The platform {$this} with label {?label} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ten-classifications/TENClassifications."
            }
        ],
        "general_explanation": "Article 39 2. freight lines of the core network as indicated in Annex I: at least 22,5 t axle load, 100 km/h line speed and the possibility of running trains with a length of 740 m.",
        "references": "http://data.europa.eu/eli/reg/2013/1315/2024-03-18",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tenClassification"
    },
    "IPL_TENClass": {
        "group": "OP",
        "title": "TEN classification of track",
        "description": "Indication of the part of the trans-European network the infrastructure element belongs to.",
        "iri": "http://data.europa.eu/949/tenClassification",
        "parameter_of": [
            "Platform edge",
            "Running track",
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.1",
            "1.2.1.0.2.1",
            "1.2.1.0.6.3",
            "1.2.2.0.0.3"
        ],
        "xml_names": [
            "IPP_TENClass",
            "IPL_TENClass"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 ) Platform\n                \n                (\n                \n                1.2.1.0.6 ) Siding\n                \n                (\n                \n                1.2.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "TEN Classifications",
        "values": [
            {
                "code": "10",
                "value": "Part of the TEN-T Comprehensive Network"
            },
            {
                "code": "20",
                "value": "Part of the TEN-T Core Freight Network"
            },
            {
                "code": "30",
                "value": "Part of the TEN-T Core Passenger Network"
            },
            {
                "code": "40",
                "value": "Off TEN"
            },
            {
                "code": "50",
                "value": "Part of the TEN-T Extended Core Freight Network"
            },
            {
                "code": "60",
                "value": "Part of the TEN-T Extended Core Passenger Network"
            }
        ],
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Indication of the TEN classification of track.",
                "message": "TEN classification (1.1.1.1.2.1, 1.2.1.0.2.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ten-classifications/TENClassifications."
            },
            {
                "comment": "Indicates the part of the trans-European network the platform belongs to.",
                "message": "TEN classification (1.1.1.1.2.1, 1.2.1.0.2.1, 1.2.1.0.6.3, 1.2.2.0.0.3): This error may be due to having a Platform with a TEN classification that is not an URI."
            },
            {
                "comment": "Indicates the part of the trans-European network the platform belongs to.",
                "message": "TEN classification (1.2.1.0.6.3): This error may be due to having a Platform with a TEN classification that is not an URI."
            },
            {
                "comment": "Indication of the part of the trans-European network the line belongs to.",
                "message": "tenClassification (1.1.1.1.2.1, 1.2.1.0.2.1): The track has a TEN classificaion value (Indication of the part of the trans-European network the line belongs to) that must be an IRI."
            },
            {
                "comment": "Warning that tentNetworkLevel is to be preferred over the tenClassification.",
                "message": "tenClassification (Warning): The track {$this} uses the property 'tenClassification'. Please use 'tentNetworkLevel' and 'typeOfTraffic' with the respective SKOS concepts instead."
            },
            {
                "comment": "Indication of the part of the trans-European network the line belongs to.",
                "message": "TEN classification (1.1.1.1.2.1, 1.2.1.0.2.1, 1.2.1.0.6.3, 1.2.2.0.0.3): The siding {$this} with label {?sidingLabel} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ten-classifications/TENClassifications."
            },
            {
                "comment": "Indicates the part of the trans-European network the platform belongs to.",
                "message": "TEN classification (1.2.1.0.6.3): The platform {$this} with label {?label} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ten-classifications/TENClassifications."
            }
        ],
        "general_explanation": "Article 39 2. freight lines of the core network as indicated in Annex I: at least 22,5 t axle load, 100 km/h line speed and the possibility of running trains with a length of 740 m.",
        "references": "http://data.europa.eu/eli/reg/2013/1315/2024-03-18",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tenClassification"
    },
    "IPP_LineCat": {
        "group": "OP",
        "title": "Category of line",
        "description": "Classification of a line according to the TSI INF",
        "iri": "http://data.europa.eu/949/lineCategory",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.2",
            "1.2.1.0.2.2"
        ],
        "xml_names": [
            "IPP_LineCat"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Line Categories",
        "values": [
            {
                "code": "10",
                "value": "P1"
            },
            {
                "code": "20",
                "value": "P2"
            },
            {
                "code": "30",
                "value": "P3"
            },
            {
                "code": "40",
                "value": "P4"
            },
            {
                "code": "50",
                "value": "P5"
            },
            {
                "code": "60",
                "value": "P6"
            },
            {
                "code": "70",
                "value": "P1520"
            },
            {
                "code": "80",
                "value": "P1600"
            },
            {
                "code": "90",
                "value": "F1"
            },
            {
                "code": "100",
                "value": "F2"
            },
            {
                "code": "110",
                "value": "F3"
            },
            {
                "code": "120",
                "value": "F4"
            },
            {
                "code": "130",
                "value": "F1520"
            },
            {
                "code": "140",
                "value": "F1600"
            }
        ],
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Classification of a line according to the TSI INF.",
                "message": "lineCategory (1.1.1.1.2.2, 1.2.1.0.2.2): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/line-category/LineCategories."
            },
            {
                "comment": "Classification of a line according to the TSI INF.",
                "message": "lineCategory (1.1.1.1.2.2, 1.2.1.0.2.2): The track must have a classification of a line value that is an IRI."
            }
        ],
        "general_explanation": "For RINF: INF TSI (4.2.1) classifies lines based on the type of traffic (traffic code).TSI categories of line shall be used for the classification of existing lines to define a target system so that the relevant performance parameters will be met.The TSI category of line is a combination of traffic codes. For lines where only one type of traffic is carried (for example a freight only line), a single code can be used to describe the requirements; where mixed traffic runs the category will be described by one or more codes for passenger and freight in case of two types of traffic. Then the parameter is repeated if relevant. The combined traffic codes describe the envelope within which the desired mix of traffic can be accommodated.Technical scope of the INF TSI includes all the networks (TEN and off-TEN) for nominal track gauges 1435, 1520, 1524, 1600 and 1668 mm.It is not applicable when track is not included in technical scope of the TSI. When more than one value of the parameter has to be published, then parameter has to be repeated as many times as many values of the parameter will be published.",
        "example": "If a line is operated by passenger trains with speed of 250 km/h, local commuter trains with speed of 120 km/h and heavy freight trains in the night, then the best combination of traffic codes seems to be P2, P5 and F1. Then, the TSI category of line for this case would simply be P2-P5-F1.",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#lineCategory"
    },
    "IPP_FreightCorridor": {
        "group": "OP",
        "title": "Part of a Railway Freight Corridor",
        "description": "Indication whether the line is designated to a Railway Freight Corridor.",
        "iri": "http://data.europa.eu/949/freightCorridor",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.3",
            "1.2.1.0.2.3"
        ],
        "xml_names": [
            "IPP_FreightCorridor"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Freight Corridors",
        "values": [
            {
                "code": "10",
                "value": "Rhine-Alpine RFC | Rhine-Alpine RFC (RFC 1)"
            },
            {
                "code": "20",
                "value": "North Sea-Mediterranean RFC | North Sea-Mediterranean RFC (RFC 2)"
            },
            {
                "code": "30",
                "value": "Scandinavian – Mediterranean RFC | Scandinavian – Mediterranean RFC (RFC 3)"
            },
            {
                "code": "40",
                "value": "Atlantic RFC | Atlantic RFC (RFC 4)"
            },
            {
                "code": "50",
                "value": "Baltic-Adriatic RFC | Baltic-Adriatic RFC (RFC 5)"
            },
            {
                "code": "60",
                "value": "Mediterranean RFC | Mediterranean RFC (RFC 6)"
            },
            {
                "code": "70",
                "value": "Orient-EastMed RFC | Orient-EastMed RFC (RFC 7)"
            },
            {
                "code": "80",
                "value": "North Sea-Baltic RFC | North Sea-Baltic RFC (RFC 8)"
            },
            {
                "code": "90",
                "value": "Rhine – Danube RFC | Rhine – Danube RFC  (RFC 9)"
            },
            {
                "code": "100",
                "value": "Alpine-Western Balkan RFC | Alpine-Western Balkan RFC (RFC 10)"
            },
            {
                "code": "110",
                "value": "Amber RFC | Amber RFC (RFC 11)"
            }
        ],
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Indication whether the line is designated to a Railway Freight Corridor",
                "message": "freightCorridor (1.1.1.1.2.3, 1.2.1.0.2.3): Each track may have an indication whether the line is designated to a Railway Freight Corridor that is an IRI. This error is due to having a value that is not an IRI."
            },
            {
                "comment": "Indication whether the line is designated to a Railway Freight Corridor",
                "message": "freightCorridor (1.1.1.1.2.3, 1.2.1.0.2.3): Each track may have an indication whether the line is designated to a Railway Freight Corridor that is an IRI. This error is due to having a value that is not an IRI."
            },
            {
                "comment": "Warning that europeanTransportCorridor is to be preferred over the freightCorridor.",
                "message": "freightCorridor (Warning): The track {$this} uses the property 'freightCorridor'. Please use 'europeanTransportCorridor' with the respective SKOS concepts instead."
            },
            {
                "comment": "Indication whether the line is designated to a Railway Freight Corridor",
                "message": "Indication whether the line is designated to a Railway Freight Corridor (1.1.1.1.2.3, 1.2.1.0.2.3): The National Line {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/freight-corridor/FreightCorridors."
            }
        ],
        "general_explanation": "It is recommended to use the property era:europeanTransportCorridor with the respective SKOS concepts instead of this property. Not applicable if the line is not part of an RFC. If a line belongs to several corridors, repeat the parameter.",
        "see_also": "Reg 913/2010/EC",
        "references": "http://data.europa.eu/eli/reg/2010/913/2024-07-18",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#freightCorridor"
    },
    "IPP_LoadCap": {
        "group": "OP",
        "title": "Load capability",
        "description": "Relates the track with the class LoadCapability. A combination of the line category and speed at the weakest point of the track.",
        "iri": "http://data.europa.eu/949/trackLoadCapability",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.4"
        ],
        "xml_names": [
            "IPP_LoadCap"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Load capability",
        "values": [
            { "code": "10",  "value": "A" },
            { "code": "20",  "value": "B1" },
            { "code": "30",  "value": "B2" },
            { "code": "40",  "value": "C2" },
            { "code": "50",  "value": "C3" },
            { "code": "60",  "value": "C4" },
            { "code": "70",  "value": "D2" },
            { "code": "80",  "value": "D3" },
            { "code": "90",  "value": "D4" },
            { "code": "100", "value": "D4xL" },
            { "code": "110", "value": "E4" },
            { "code": "120", "value": "E5" },
            { "code": "130", "value": "RA1" },
            { "code": "140", "value": "RA2" },
            { "code": "150", "value": "RA3" },
            { "code": "160", "value": "RA4" },
            { "code": "170", "value": "RA5" },
            { "code": "180", "value": "RA6" },
            { "code": "190", "value": "RA7" },
            { "code": "200", "value": "RA8" },
            { "code": "210", "value": "RA9" },
            { "code": "220", "value": "RA10" }
        ],

        "applicability_flags": "Y",
        "validation_rules": [
            {
                "comment": "Relates the track with the class LoadCapability. A combination of the line category and speed at the weakest point of the track.",
                "message": "trackLoadCapability (1.1.1.1.2.4): The track defines a load capability value that must be an instance of LoadCapability."
            }
        ],
        "general_explanation": "At this step, RINF does not allow to enter additional data referred to additional speed regulations and operating requirements relating to locomotives (e.g., locomotive classes and associated maximum speed) or traffic types (e.g., maximum speed of freight traffic or passenger traffic).The load capability describes the weakest point of this track within this section of line (which is normally a bridge or other sub-track structure). It is expressed as a combination of the line category and speed permitted for trains exerting loads defined for this line category.The result of the classification process is set out in EN 15528:2021 (Annex A) and referred to in that standard as Line Category. The Load capability for UK in respect of Northern Ireland consists of RA and speed in miles per hour. RA shall be applied according to UK Railway Group Standard GE/RT8006, Issue Two, September 2010.More than one combination may be published for the same track if applicable, but it has to be done by repetition of the parameter with one value selected only  that is why Y is given in line Can be repeated.For the following cases, it is not possible to use EN 15528:2021 categories of line classification:- TSI categories of line P1520 and F1520 (passenger traffic or freight traffic at any speed)- TSI categories of line P1600 and F1600 (passenger traffic or freight traffic at any speed)When more than one value of the parameter has to be published, then parameter has to be repeated as many times as many values of the parameter will be published.",
        "example": "The set of selected data may include: B2-160, D4-120 and E5-100When classifying infrastructure lines into line categories, the following options shall be used by the infrastructure manager to optimize freight traffic:Option 1: determination of the line category at maximum freight traffic speed (maximum 120 Km/h)Option 2: determination of a line category at an associated lower speed (less than the maximum freight traffic speed)Example of option 1 (Annex F of EN 15528:2021): In a given track, if the traffic is mixed, the local speed of the line is 90 Km/h and the determined line category is D4 at a maximum of 90 Km/h, the information displayed should be: D4/90.Example of option 2 (Annex F of EN 15528:2021): In a given track, if the traffic is mixed, the local speed of the line is 120 Km/h and the determined line category is C4 at a maximum of 120 Km/h and D4 at maximum of 90 Km/h, the information displayed should be: C4/120 and D4/90.",
        "see_also": "INF TSI: 4.2.1, 4.2.7.1, 4.2.7.2, 4.2.7.4Annex D1 OPE TSI",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trackLoadCapability"
    },
    "IPP_NCLoadCap": {
        "group": "DP",
        "title": "National classification for load capability",
        "description": "National classification for load capability",
        "iri": "http://data.europa.eu/949/nationalLoadCapability",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.4.1"
        ],
        "xml_names": [
            "IPP_NCLoadCap"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "National classification for load capability",
                "message": "nationalLoadCapability (1.1.1.1.2.4.1): The track has a national load capability value that must be  a string. This error may be due to the track having a value of national load capability that is not a character string."
            }
        ],
        "general_explanation": "Some Networks are using National classification for load capability (instead of parameter 1.1.1.1.2.4 Load capability that provide load capability in accordance with EN 15528)",
        "example": "The French IM SNCF reseau is using the concept of 'groupe Demeaux' with the following definition is 'Groupe de classification de la voie tenant compte de la resistance de son armement en flexion verticale'.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#nationalLoadCapability"
    },
    "IPP_HSLMCompliant": {
        "group": "DP",
        "title": "Compliance of structures with the High Speed Load Model (HSLM)",
        "description": "For sections of line with a maximum permitted speed of 200 km/h or more. Information regarding the procedure to be used to perform the dynamic compatibility check.",
        "iri": "http://data.europa.eu/949/highSpeedLoadModelCompliance",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.4.2"
        ],
        "xml_names": [
            "IPP_HSLMCompliant"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "For sections of line with a maximum permitted speed of 200km/h or more information regarding the procedure to be used to perform the dynamic compatibility check",
                "message": "highSpeedLoadModelCompliance (1.1.1.1.2.4.2): The track must have at most one high speed load model compliance value that must be Y/N (boolean). This error may be due to the track having more than one value or having a value of high speed load model compliance that is not Y/N."
            }
        ],
        "general_explanation": "(TSI INF 4.2.7.1.2(2)) Applicable if the maximum permitted speed of the running track is more than 200km/h and the structures within the section of line are all compatible with the High Speed Load Model (HSLM); information regarding the procedure to be used to perform the dynamic compatibility check shall be provided as well.",
        "see_also": "Annex D1 OPE TSIINF TSI: 4.2.7.1.2(2)",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28#tocId30 ; http://data.europa.eu/eli/reg/2014/1299/2023-09-28#tocId3",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#highSpeedLoadModelCompliance"
    },
    "IPP_StructureCheckLoc": {
        "group": "DP",
        "title": "Railway location of structures requiring specific checks",
        "description": "Localisation of structures requiring specific checks",
        "iri": "http://data.europa.eu/949/structureCheckLocation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.4.3"
        ],
        "xml_names": [
            "IPP_StructureCheckLoc"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "dependencies": "This information is to be linked with parameter 1.1.1.1.2.4.4",
        "validation_rules": [
            {
                "comment": "Localisation of structures requiring specific checks.",
                "message": "structureCheckLocation (1.1.1.1.2.4.3): The track has a location of the structure check value that must be a double (real) number and follow the format [±NNNN.NNN]. This error may be due to the track having a value that does not follow the pattern or is not a double (real) number."
            }
        ],
        "general_explanation": "The railway location identifies the location of the structure in the system of reference of the line to which the track belongs.",
        "example": "The IM A knows that its bridge X might have problems with combination of speed and load above a certain limit values Z, and for that the IM A has a specific procedure W for the check to be done; if the vehicle operation is intended to be within this case (above the limit Z), then RU shall proceed in accordance to the procedure W; therefore the bridge X shall be referred to in the parameter of the RINF:  1.1.1.1.2.4.3 / Railway location of structures requiring specific checks.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#structureCheckLocation"
    },
    "IPP_StructureCheckDocRef": {
        "group": "OP",
        "title": "Document with the procedure(s) for static and dynamic route compatibility checks",
        "description": "Electronic document available in two EU languages from the IM stored by the Agency with:  - precise procedures for the static and dynamic route compatibility checks;Or- relevant information for carrying out the checks for specific structures.",
        "iri": "http://data.europa.eu/949/compatibilityProcedureDocument",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.4.4"
        ],
        "xml_names": [
            "IPP_StructureCheckDocRef"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Document with the procedure for static and dynamic compatibility checks.",
                "message": "compatibilityProcedureDocument (1.1.1.1.2.4.4): The track has a name of the compatibility procedure document that must be a Document."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#compatibilityProcedureDocument"
    },
    "IPP_MaxSpeed": {
        "group": "DP",
        "title": "Maximum permitted speed",
        "description": "Nominal maximum operational speed on the line as a result of infrastructure, energy and control, command signalling subsystem characteristics expressed in kilometres/hour.",
        "iri": "http://data.europa.eu/949/maximumPermittedSpeed",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.5"
        ],
        "xml_names": [
            "IPP_MaxSpeed"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Maximum permitted speed.",
                "message": "maximumPermittedSpeed (1.1.1.1.2.5): The track must have at most one value of maximum permitted speed that is  an integer that lies within the range 0 to 500. This error may be due to the track having more than one value of maximum permitted speed, that the value does not lie within the range, or that the value is not an integer."
            }
        ],
        "general_explanation": "\"Speed on the line\" shall be understood as speed on the track of the section of line in question.",
        "example": "In case INF, ENE and/or CCS allow different speeds, the max permitted speed on this track of this section of line shall be the lowest one.In case the maximum permitted speed for freight and passenger trains operation are different, the max permitted speed on this track of this section of line shall be the highest one.",
        "see_also": "INF TSI, ENE TSI, CCS TSI",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maximumPermittedSpeed"
    },
    "IPP_TempRange": {
        "group": "OP",
        "title": "Temperature range",
        "description": "Temperature range for unrestricted access to the line.",
        "iri": "http://data.europa.eu/949/temperatureRange",
        "parameter_of": [
            "Restriction",
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.1.2.6"
        ],
        "xml_names": [
            "IPP_TempRange"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Temperature ranges",
        "values": [
            {
                "code": "10",
                "value": "T1 | T1 (-25 to +40)"
            },
            {
                "code": "20",
                "value": "T2 | T2 (-40 to +35)"
            },
            {
                "code": "30",
                "value": "T3 | T3 (-25 to +45)"
            },
            {
                "code": "40",
                "value": "Tx | Tx (-40 to +50)"
            }
        ],
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication of the temperature range of track.",
                "message": "Indication of the temperature range (1.1.1.1.2.6):): The track {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/temperature-ranges/TemperatureRanges."
            },
            {
                "comment": "Indication of the temperature range of track.",
                "message": "temperatureRange (1.1.1.1.2.6): Each track may have exactly one temperature range value that must be an IRI. This error may be due to the track not having a temperature range, or having more than one temperature range."
            }
        ],
        "general_explanation": "T1 (-25 to +40) - 3.1.1T2 (-40 to +35) - 3.1.2T3 (-25 to +45) - 3.1.3Tx (-40 to +50) - 3.1.4",
        "see_also": "https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf Loc&Pas TSI: 4.2.6.1.14.2.5 Wag TSI",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#temperatureRange"
    },
    "IPP_MaxAltitude": {
        "group": "DP",
        "title": "Maximum altitude",
        "description": "Highest point of the section of line above sea level in reference to Normal Amsterdam's Peil (NAP).",
        "iri": "http://data.europa.eu/949/maximumAltitude",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.7"
        ],
        "xml_names": [
            "IPP_MaxAltitude"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Highest point of the section of line above sea level in reference to Normal Amsterdam's Peil (NAP).",
                "message": "maximumAltitude (1.1.1.1.2.7): The track must define at most one maximum altitude value that must be a double (real) number with format[±NNNN]. This error may be due to the track having more than one value of maximum altitude or that the value is not a double (real) number."
            }
        ],
        "general_explanation": "Normaal Amsterdams Peil (NAP), called also Amsterdam Ordnance Datum, it is a vertical datum commonly in use in Europe as reference level for the description of the height of objects in relation to the sea level.The value of the parameter shall be given in metres, with tolerance of +/-100m.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maximumAltitude"
    },
    "IPP_SevereClimateCon": {
        "group": "DP",
        "title": "Existence of severe climatic conditions",
        "description": "Climatic conditions on the line are severe according to European standard.",
        "iri": "http://data.europa.eu/949/hasSevereWeatherConditions",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.2.8"
        ],
        "xml_names": [
            "IPP_SevereClimateCon"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Performance parameter\n                \n                (\n                \n                1.1.1.1.2 | 1.2.1.0.2 | 1.2.2.0.2 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Climatic conditions on the line are severe according to European standard.",
                "message": "hasSevereWeatherConditions (1.1.1.1.2.8): The track must have at most one existence of severe weather conditions value that must be Y/N (boolean). This error may be due to the track having more than one value of has severe weather conditions or that the value is not Y/N (boolean)."
            }
        ],
        "general_explanation": "Value 'true' shall be selected in case there are possible severe climatic conditions to be expected, i.e. a significant amount of snow or ice is to be expected during winter and vehicle should be designed accordingly to be able to run in such conditions. (compliance to 4.2.6.1.2(3),(4) of TSI Loc&Pas required). 'False' to be selected otherwise.Nominal and severe conditions are defined at TSI Loc&Pas level, section 4.2.6.1.2, which requires that the applicant declares to which snow conditions a vehicle complies with : either \"nominal\" or \"severe\" conditions. This technical aspect is reflected in the parameter 4.3.3 \"Snow, ice and hail conditions\" of ERATV , which will provide the two possible values:- Nominal conditions correspond to compliance with clause 4.7 of EN 50125 as referred in the §4.2.6.1.2 (1) of TSI Loc&Pas.To be noted: It is not required to precise the categorisation S1, S2 or S3 as mentioned in the EN 50125.- Severe conditions correspond to compliance with §4.2.6.1.2 (3) and (4) : the applicant designs and tests its vehicle according to the different scenarios mentioned in the TSI §4.2.6.1.2 (3) (snowdrift, powder snow, temperature gradient, etc.) and set the related provisions to achieve this as required by §4.2.6.1.2 (4) (obstacle deflector of sufficient size, effect of ice and snow on running gear and brake function, etc.).",
        "see_also": "EN 50125-1 (2014): 4.7LOC&PAS TSI:4.2.6.1.2",
        "references": "http://data.europa.eu/eli/reg/2014/1302/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasSevereWeatherConditions"
    },
    "ILL_Gauging": {
        "group": "OP",
        "title": "Gauging",
        "description": "Gauges as defined in European standard or other local gauges, including lower or upper part.",
        "iri": "http://data.europa.eu/949/gaugingProfile",
        "parameter_of": [
            "Restriction",
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.1.3.1.1",
            "1.2.1.0.3.4"
        ],
        "xml_names": [
            "ILL_Gauging"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Gauging Profiles",
        "values": [
            {
                "code": "10",
                "value": "GA"
            },
            {
                "code": "20",
                "value": "GB"
            },
            {
                "code": "30",
                "value": "GC"
            },
            {
                "code": "40",
                "value": "G1"
            },
            {
                "code": "50",
                "value": "DE3 | DE3 (German network)"
            },
            {
                "code": "60",
                "value": "G2"
            },
            {
                "code": "70",
                "value": "GB1"
            },
            {
                "code": "80",
                "value": "GB2"
            },
            {
                "code": "90",
                "value": "BE1 | BE1 (Belgian network)"
            },
            {
                "code": "100",
                "value": "BE2 | BE2 (Belgian network)"
            },
            {
                "code": "110",
                "value": "BE3"
            },
            {
                "code": "120",
                "value": "FR-3.3 | 3.3 (French network), Gauge 3.3"
            },
            {
                "code": "130",
                "value": "PTb"
            },
            {
                "code": "140",
                "value": "PTb+"
            },
            {
                "code": "150",
                "value": "PTc"
            },
            {
                "code": "160",
                "value": "FIN1 | FIN1 (Specific case Finland)"
            },
            {
                "code": "170",
                "value": "SEa | Sea, SEa (Swedish network), SEa (Specific case Sweden)"
            },
            {
                "code": "180",
                "value": "SEc | Sec"
            },
            {
                "code": "190",
                "value": "DE1"
            },
            {
                "code": "200",
                "value": "DE2 | DE2 (German network)"
            },
            {
                "code": "210",
                "value": "Z-GCD"
            },
            {
                "code": "220",
                "value": "UK1 | UK1 (UK network)"
            },
            {
                "code": "230",
                "value": "UK1[D]"
            },
            {
                "code": "240",
                "value": "W6"
            },
            {
                "code": "250",
                "value": "FS"
            },
            {
                "code": "260",
                "value": "S"
            },
            {
                "code": "270",
                "value": "GHE16 | GHE16 (Specific case Spain – upper parts)"
            },
            {
                "code": "280",
                "value": "GEA16"
            },
            {
                "code": "290",
                "value": "GEB16"
            },
            {
                "code": "300",
                "value": "GEC16"
            },
            {
                "code": "310",
                "value": "IRL1"
            },
            {
                "code": "320",
                "value": "IRL2"
            },
            {
                "code": "330",
                "value": "IRL3"
            },
            {
                "code": "340",
                "value": "GI1 | GI1 (Specific case Spain – lower parts)"
            },
            {
                "code": "341",
                "value": "FR-3.4.1"
            },
            {
                "code": "342",
                "value": "FR-3.4.2"
            },
            {
                "code": "350",
                "value": "GI2 | GI2 - lower parts, GI2 (Specific case Spain – lower parts), GI2 (lower part), GI2 according EN 15273-2"
            },
            {
                "code": "360",
                "value": "GI3"
            },
            {
                "code": "370",
                "value": "GEE10 | GEE10 (Specific case Spain - METRIC - lower parts)"
            },
            {
                "code": "380",
                "value": "GED10 | GED10 (Specific case Spain - METRIC - upper parts)"
            },
            {
                "code": "389",
                "value": "AFG"
            },
            {
                "code": "390",
                "value": "AFM 423"
            },
            {
                "code": "400",
                "value": "NL1 | NL1 (Dutch  network), NL1 (Specific case the Netherlands)"
            },
            {
                "code": "410",
                "value": "NL2"
            },
            {
                "code": "411",
                "value": "M30"
            },
            {
                "code": "412",
                "value": "M80"
            },
            {
                "code": "413",
                "value": "Tram-train 2.40"
            },
            {
                "code": "414",
                "value": "Tram-train 2.65"
            },
            {
                "code": "415",
                "value": "Métrique BA"
            },
            {
                "code": "416",
                "value": "Métrique SGV"
            },
            {
                "code": "417",
                "value": "Métrique Cerd."
            },
            {
                "code": "418",
                "value": "GB:GČD"
            },
            {
                "code": "419",
                "value": "GCZ3"
            },
            {
                "code": "420",
                "value": "GČD"
            },
            {
                "code": "421",
                "value": "GEI1"
            },
            {
                "code": "422",
                "value": "GEI2"
            },
            {
                "code": "423",
                "value": "GEI3"
            },
            {
                "code": "424",
                "value": "GEI14"
            },
            {
                "code": "425",
                "value": "AFM 425"
            },
            {
                "code": "426",
                "value": "EBV2_reduziert"
            },
            {
                "code": "427",
                "value": "AFM 427"
            },
            {
                "code": "428",
                "value": "EBV3_reduziert"
            },
            {
                "code": "429",
                "value": "EBV3"
            },
            {
                "code": "430",
                "value": "EBV4"
            },
            {
                "code": "431",
                "value": "EBV1"
            },
            {
                "code": "432",
                "value": "EBV2"
            },
            {
                "code": "433",
                "value": "AF4.0 – EP"
            },
            {
                "code": "434",
                "value": "AF4.1 – EP"
            },
            {
                "code": "435",
                "value": "AF4.2 – EP"
            },
            {
                "code": "436",
                "value": "AF4.0 – IP"
            },
            {
                "code": "437",
                "value": "AF4.1 – IP"
            },
            {
                "code": "438",
                "value": "AF4.2 – IP"
            },
            {
                "code": "510",
                "value": "AI4.0-E"
            },
            {
                "code": "520",
                "value": "AI4.0-I"
            },
            {
                "code": "530",
                "value": "GE14"
            },
            {
                "code": "540",
                "value": "GEC14"
            }
        ],
        "applicability_flags": "Y",
        "validation_rules": [
            {
                "comment": "Indication of the gauging profile of track.",
                "message": "Gauging profile (1.1.1.1.3.1.1, 1.2.1.0.3.4): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/gaugings/GaugingProfiles."
            },
            {
                "comment": "Gauges as defined in European standard or other local gauges, including lower or upper part.",
                "message": "gaugingProfile (1.1.1.1.3.1.1, 1.2.1.0.3.4): The track must define a value that is an IRI. The error is due to having a value that is not an IRI."
            }
        ],
        "general_explanation": "[ERATV] It is possible to include other values than the already identified and included in the concept scheme. They will be introduced by the Agency on request via a process of change request                   EN15273-3: (2013)+A1:2016:  Annex C and Annex DINF TSI: 4.2.3.1 It is possible to include additional values than the already identified and included in the concept scheme. They will be introduced by the Agency on request via a process of change request.                   UK in respect of the Northern Ireland have a reference profile, but defined based on national rule:7.3.2.2 Specific case Ireland and UK for Northern Ireland ('P')It is permissible for the reference profile of the upper and the lower part of the unit to be established in accordance with the national technical rules notified for this purpose.                   See also: - Annex D1 OPE TSI- INF TSI: 4.2.3.1, 4.2.3.2",
        "see_also": "https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf",
        "references": "https://data.europa.eu/eli/reg/2014/1299/2023-09-28 ; https://data.europa.eu/eli/reg/2014/1302/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gaugingProfile"
    },
    "ILL_GaugeCheckLoc": {
        "group": "DP",
        "title": "Railway location of particular points requiring specific checks",
        "description": "Location of particular points requiring specific checks due to deviations from gauging referred to in parameter \"Gauging\"",
        "iri": "http://data.europa.eu/949/gaugingCheckLocation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.1.2",
            "1.2.1.0.3.5"
        ],
        "xml_names": [
            "ILL_GaugeCheckLoc"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Location of particular points requiring specific checks due to deviations from gauging referred to in 1.1.1.1.3.1.1.",
                "message": "gaugingCheckLocation (1.1.1.1.3.1.2, 1.2.1.0.3.5): The track has a location of the gauging check that must be a string and follow the format [±NNNN.NNN]. The error is due to the value not following the pattern."
            }
        ],
        "general_explanation": "This parameter is applicable when the IM wants to highlight a particular point requiring checks and provide info via parameter 'Document with the transversal section of the particular points requiring specific checks'.The railway location identifies the location of the structure in the system of reference of the line to which the track belongs.The location (generally the distance from the origin of the line to the point of interest for the specific check) on a line is given in kilometres with decimals (precision of 0.001).",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gaugingCheckLocation"
    },
    "ILL_GaugeCheckDocRef": {
        "group": "OP",
        "title": "Document with the transversal section of the particular points requiring specific checks",
        "description": "Electronic document available from the IM stored by the Agency with the transversal section of the particular points requiring specific checks due to deviations from gauging referred to in parameter \"Gauging\". Where relevant, guidance for the check with the particular point may be attached to the document with the transversal section.",
        "iri": "http://data.europa.eu/949/gaugingTransversalDocument",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.1.3",
            "1.2.1.0.3.6"
        ],
        "xml_names": [
            "ILL_GaugeCheckDocRef"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Document with the transversal section of the particular points requiring specific checks.",
                "message": "gaugingTransversalDocument (1.1.1.1.3.1.3, 1.2.1.0.3.6): The track has a transversal document of the gauging check value that must be a Document."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gaugingTransversalDocument"
    },
    "ILL_ProfileNumSwapBodies": {
        "group": "OP",
        "title": "Standard combined transport profile number for swap bodies",
        "description": "Coding for combined transport with swap bodies (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B]",
        "iri": "http://data.europa.eu/949/profileNumberSwapBodies",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.4"
        ],
        "xml_names": [
            "ILL_ProfileNumSwapBodies"
        ],
        "deadline": "by 16 March 2019 at the latest for lines belonging to the TEN (1.1.1.1.2.1)",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Profile Numbers for Swap Bodies",
        "values": [
            {
                "code": "10",
                "value": "C 22"
            },
            {
                "code": "15",
                "value": "C 25"
            },
            {
                "code": "18",
                "value": "C 30"
            },
            {
                "code": "20",
                "value": "C 32"
            },
            {
                "code": "30",
                "value": "C 38"
            },
            {
                "code": "40",
                "value": "C 45"
            },
            {
                "code": "50",
                "value": "C 50"
            },
            {
                "code": "60",
                "value": "C 55"
            },
            {
                "code": "70",
                "value": "C 60"
            },
            {
                "code": "80",
                "value": "C 65"
            },
            {
                "code": "90",
                "value": "C 70"
            },
            {
                "code": "100",
                "value": "C 80"
            },
            {
                "code": "110",
                "value": "C 90"
            },
            {
                "code": "120",
                "value": "C 341"
            },
            {
                "code": "130",
                "value": "C 349"
            },
            {
                "code": "140",
                "value": "C 351"
            },
            {
                "code": "150",
                "value": "C 357 | C357"
            },
            {
                "code": "160",
                "value": "C 364"
            },
            {
                "code": "161",
                "value": "C 365"
            },
            {
                "code": "162",
                "value": "C 371"
            },
            {
                "code": "165",
                "value": "C 375"
            },
            {
                "code": "170",
                "value": "C 380"
            },
            {
                "code": "174",
                "value": "C 384"
            },
            {
                "code": "180",
                "value": "C 385"
            },
            {
                "code": "189",
                "value": "C 389"
            },
            {
                "code": "190",
                "value": "C 390"
            },
            {
                "code": "200",
                "value": "C 395"
            },
            {
                "code": "210",
                "value": "C 400"
            },
            {
                "code": "220",
                "value": "C 405"
            },
            {
                "code": "230",
                "value": "C 410"
            },
            {
                "code": "240",
                "value": "C 420"
            },
            {
                "code": "242",
                "value": "C 422"
            },
            {
                "code": "245",
                "value": "C 450"
            },
            {
                "code": "260",
                "value": "C S55"
            },
            {
                "code": "270",
                "value": "C S385"
            }
        ],
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Coding for combined transport with swap bodies as defined in UIC Code.",
                "message": "profileNumberSwapBodies (1.1.1.1.3.4): The track must have values for profile number swap bodies that are IRIs. This error may be due to having a value that is not an IRI."
            },
            {
                "comment": "Coding for combined transport with swap bodies as defined in UIC Code.",
                "message": "Indication of the profileNumberSwapBodies(1.1.1.1.3.4):): The track {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/profile-num-swap-bodies/ProfileNumbersSwapBodies."
            }
        ],
        "general_explanation": "The technical number is made up of the wagon compatibility code (1 letter) and the standard combined transport profile number (2 digits when width <= 2550 mm or 3 digits when, 2550 < width <= 2600 mm).",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#profileNumberSwapBodies"
    },
    "ILL_ProfileNumSemiTrailers": {
        "group": "OP",
        "title": "Standard combined transport profile number for semi-trailers",
        "description": "Coding for combined transport for semi-trailers (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B].",
        "iri": "http://data.europa.eu/949/profileNumberSemiTrailers",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.5"
        ],
        "xml_names": [
            "ILL_ProfileNumSemiTrailers"
        ],
        "deadline": "by 16 March 2019 at the latest for lines belonging to the TEN (1.1.1.1.2.1)",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Profile Numbers for Semi-Trailers",
        "values": [
            {
                "code": "10",
                "value": "P 22"
            },
            {
                "code": "15",
                "value": "P 25"
            },
            {
                "code": "18",
                "value": "P 30"
            },
            {
                "code": "20",
                "value": "P 32"
            },
            {
                "code": "30",
                "value": "P 38"
            },
            {
                "code": "40",
                "value": "P 45"
            },
            {
                "code": "50",
                "value": "P 50"
            },
            {
                "code": "60",
                "value": "P 55"
            },
            {
                "code": "69",
                "value": "P 59"
            },
            {
                "code": "70",
                "value": "P 60"
            },
            {
                "code": "80",
                "value": "P 65"
            },
            {
                "code": "90",
                "value": "P 70"
            },
            {
                "code": "100",
                "value": "P 80"
            },
            {
                "code": "110",
                "value": "P 90"
            },
            {
                "code": "120",
                "value": "P 341"
            },
            {
                "code": "130",
                "value": "P 349"
            },
            {
                "code": "140",
                "value": "P 351"
            },
            {
                "code": "150",
                "value": "P 357"
            },
            {
                "code": "160",
                "value": "P 364"
            },
            {
                "code": "161",
                "value": "P 365"
            },
            {
                "code": "162",
                "value": "P 371"
            },
            {
                "code": "165",
                "value": "P 375"
            },
            {
                "code": "170",
                "value": "P 380"
            },
            {
                "code": "174",
                "value": "P 384"
            },
            {
                "code": "180",
                "value": "P 385"
            },
            {
                "code": "190",
                "value": "P 390"
            },
            {
                "code": "200",
                "value": "P 395"
            },
            {
                "code": "210",
                "value": "P 400"
            },
            {
                "code": "220",
                "value": "P 405"
            },
            {
                "code": "230",
                "value": "P 410"
            },
            {
                "code": "240",
                "value": "P 420"
            },
            {
                "code": "242",
                "value": "P 422"
            },
            {
                "code": "245",
                "value": "P 450"
            },
            {
                "code": "260",
                "value": "P S55"
            },
            {
                "code": "270",
                "value": "P S385"
            }
        ],
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Coding for combined transport with semi-trailers as defined in UIC Code.",
                "message": "Indication of the profileNumberSemiTrailers(1.1.1.1.3.5):): The track {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/profile-num-semi-trailers/ProfileNumbersSemiTrailers."
            },
            {
                "comment": "Coding for combined transport with semi-trailers as defined in UIC Code.",
                "message": "profileNumberSemiTrailers (1.1.1.1.3.5): The track must have values for profile number semi-trailers that are IRIs. This error may be due to having a value that is not an IRI."
            }
        ],
        "general_explanation": "The technical number is made up of the wagon compatibility code (1 letter) and the standard combined transport profile number (2 digits when width <= 2500 mm or 3 digits when 2500 < width <= 2600 mm).Additional values than the already identified in the list above are possible. They will be introduced by the Agency on request via a process of change request.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#profileNumberSemiTrailers"
    },
    "ILL_SpecificInfo": {
        "group": "DP",
        "title": "Specific information",
        "description": "Any relevant information from the IM relating to the line layout",
        "iri": "http://data.europa.eu/949/specificInformation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.5.1"
        ],
        "xml_names": [
            "ILL_SpecificInfo"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Any specific information from the IM.",
                "message": "specificInformation (1.1.1.1.3.5.1): The track has a specific information value that must be a  string. This error may be due to having a value of specific information from the IM that is not a character string."
            }
        ],
        "general_explanation": "This parameter allows the IM to provide plain text with specific information about the track",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#specificInformation"
    },
    "ILL_GradProfile": {
        "group": "DP",
        "title": "Gradient profile",
        "description": "Sequence of gradient values and locations of change in gradient",
        "iri": "http://data.europa.eu/949/gradientProfile",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.6"
        ],
        "xml_names": [
            "ILL_GradProfile"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "validation_rules": [
            {
                "comment": "Sequence of gradient values and locations of change in gradient.",
                "message": "gradientProfile (1.1.1.1.3.6): The track has a gradient profile value that must be a string with a sequence of comma-separated values in the format [+/-][NN.N]([+/-][NNNN.NNN]). This error may be due to having a sequence of values that are not a string or that do not follow the pattern."
            }
        ],
        "general_explanation": "Data on the values of gradient along a SoL is given as a chain of information:Gradient (location) The first location corresponding to the start of the first value of the gradient is the centre point of start OP. If there are different values of the gradient, the parameter will be repeated. The last location will correspond to the point where the last value of the gradient starts. This value will be available until the centre point of the end OP. If there is only one value for the gradient along the track, then the location is not required, only the +/-NN.N value is expected.Gradient is expressed in mm/m; location is expressed in km of the line.Positive gradient (uphill) is marked with \"+\" and negative gradient (downhill) is marked by \"-\".The sequence shall follow the increasing kilometres of the line, and this does not take into consideration the running direction of the specific track. This will make the profile easier to read.Changes in gradient shall be registered only as far as necessary for train running calculations (minimum length of constant gradient shall be 500 m, the minimum change of gradient value shall be 0,5 mm/m).The required precision for gradient value is 0,5 mm/m, the required precision of location of the points of change of gradient is 10 m. The points of change of gradient are the points of vertical intersection of each vertical curve.",
        "see_also": "INF TSI: 4.2.3.3",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gradientProfile"
    },
    "ILL_MinRadHorzCurve": {
        "group": "DP",
        "title": "Minimum radius of horizontal curve",
        "description": "Radius of the smallest horizontal curve of the track in metres.",
        "iri": "http://data.europa.eu/949/minimumHorizontalRadius",
        "parameter_of": [
            "Restriction",
            "Running track",
            "Siding",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.1.3.7",
            "1.2.2.0.3.2"
        ],
        "xml_names": [
            "ILL_MinRadHorzCurve"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 ) Siding\n                \n                (\n                \n                1.2.2 ) Vehicle type technical characteristic",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Radius of the smallest horizontal curve of The track in metres.",
                "message": "minimumHorizontalRadius (1.1.1.1.3.7, 1.2.2.0.3.2): The track defines a minimum radius of horizontal curve. This error is due to having more than one value, having a value that is not an integer or having an integer that does not follow the pattern [NNNNNN]."
            }
        ],
        "general_explanation": "To describe a straight section of line value \" 99999\" shall be used.",
        "see_also": "INF TSI: 4.2.3.4EN 13803:2017, Tables N.A and N.2 https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#minimumHorizontalRadius"
    },
    "ILL_ProfileNumContainers": {
        "group": "OP",
        "title": "Standard combined transport profile number for containers",
        "description": "Coding for combined transport for containers (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B]",
        "iri": "http://data.europa.eu/949/standardCombinedTransportContainers",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.8"
        ],
        "xml_names": [
            "ILL_ProfileNumContainers"
        ],
        "deadline": "12 months after the adoption of the Article 7 Guide for lines belonging to the TEN (1.1.1.1.2.1)",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Standard combined transport containers",
        "values": [
            {
                "code": "00",
                "value": "ISO 00"
            },
            {
                "code": "01",
                "value": "ISO 01"
            },
            {
                "code": "02",
                "value": "ISO 02"
            },
            {
                "code": "03",
                "value": "ISO 03"
            },
            {
                "code": "04",
                "value": "ISO 04"
            },
            {
                "code": "05",
                "value": "ISO 05"
            },
            {
                "code": "06",
                "value": "ISO 06"
            },
            {
                "code": "07",
                "value": "ISO 07"
            },
            {
                "code": "08",
                "value": "ISO 08"
            },
            {
                "code": "09",
                "value": "ISO 09"
            },
            {
                "code": "10",
                "value": "ISO 10"
            },
            {
                "code": "11",
                "value": "ISO 11"
            },
            {
                "code": "12",
                "value": "ISO 12"
            },
            {
                "code": "13",
                "value": "ISO 13"
            },
            {
                "code": "14",
                "value": "ISO 14"
            },
            {
                "code": "15",
                "value": "ISO 15"
            },
            {
                "code": "16",
                "value": "ISO 16"
            },
            {
                "code": "17",
                "value": "ISO 17"
            },
            {
                "code": "18",
                "value": "ISO 18"
            },
            {
                "code": "19",
                "value": "ISO 19"
            },
            {
                "code": "20",
                "value": "ISO 20"
            },
            {
                "code": "21",
                "value": "ISO 21"
            },
            {
                "code": "22",
                "value": "ISO 22"
            },
            {
                "code": "23",
                "value": "ISO 23"
            },
            {
                "code": "24",
                "value": "ISO 24"
            },
            {
                "code": "25",
                "value": "ISO 25"
            },
            {
                "code": "26",
                "value": "ISO 26"
            },
            {
                "code": "27",
                "value": "ISO 27"
            },
            {
                "code": "28",
                "value": "ISO 28"
            },
            {
                "code": "29",
                "value": "ISO 29"
            },
            {
                "code": "30",
                "value": "ISO 30"
            },
            {
                "code": "31",
                "value": "ISO 31"
            },
            {
                "code": "32",
                "value": "ISO 32"
            },
            {
                "code": "33",
                "value": "ISO 33"
            },
            {
                "code": "34",
                "value": "ISO 34"
            },
            {
                "code": "35",
                "value": "ISO 35"
            },
            {
                "code": "36",
                "value": "ISO 36"
            },
            {
                "code": "37",
                "value": "ISO 37"
            },
            {
                "code": "38",
                "value": "ISO 38"
            },
            {
                "code": "39",
                "value": "ISO 39"
            },
            {
                "code": "40",
                "value": "ISO 40"
            },
            {
                "code": "41",
                "value": "ISO 41"
            },
            {
                "code": "42",
                "value": "ISO 42"
            },
            {
                "code": "43",
                "value": "ISO 43"
            },
            {
                "code": "44",
                "value": "ISO 44"
            },
            {
                "code": "45",
                "value": "ISO 45"
            },
            {
                "code": "46",
                "value": "ISO 46"
            },
            {
                "code": "47",
                "value": "ISO 47"
            },
            {
                "code": "48",
                "value": "ISO 48"
            },
            {
                "code": "49",
                "value": "ISO 49"
            },
            {
                "code": "50",
                "value": "ISO 50"
            },
            {
                "code": "51",
                "value": "ISO 51"
            },
            {
                "code": "52",
                "value": "ISO 52"
            },
            {
                "code": "53",
                "value": "ISO 53"
            },
            {
                "code": "54",
                "value": "ISO 54"
            },
            {
                "code": "55",
                "value": "ISO 55"
            },
            {
                "code": "56",
                "value": "ISO 56"
            },
            {
                "code": "57",
                "value": "ISO 57"
            },
            {
                "code": "58",
                "value": "ISO 58"
            },
            {
                "code": "59",
                "value": "ISO 59"
            },
            {
                "code": "60",
                "value": "ISO 60"
            },
            {
                "code": "61",
                "value": "ISO 61"
            },
            {
                "code": "62",
                "value": "ISO 62"
            },
            {
                "code": "63",
                "value": "ISO 63"
            },
            {
                "code": "64",
                "value": "ISO 64"
            },
            {
                "code": "65",
                "value": "ISO 65"
            },
            {
                "code": "66",
                "value": "ISO 66"
            },
            {
                "code": "67",
                "value": "ISO 67"
            },
            {
                "code": "68",
                "value": "ISO 68"
            },
            {
                "code": "69",
                "value": "ISO 69"
            },
            {
                "code": "70",
                "value": "ISO 70"
            },
            {
                "code": "71",
                "value": "ISO 71"
            },
            {
                "code": "72",
                "value": "ISO 72"
            },
            {
                "code": "73",
                "value": "ISO 73"
            },
            {
                "code": "74",
                "value": "ISO 74"
            },
            {
                "code": "75",
                "value": "ISO 75"
            },
            {
                "code": "76",
                "value": "ISO 76"
            },
            {
                "code": "77",
                "value": "ISO 77"
            },
            {
                "code": "78",
                "value": "ISO 78"
            },
            {
                "code": "79",
                "value": "ISO 79"
            },
            {
                "code": "80",
                "value": "ISO 80"
            },
            {
                "code": "81",
                "value": "ISO 81"
            },
            {
                "code": "82",
                "value": "ISO 82"
            },
            {
                "code": "83",
                "value": "ISO 83"
            },
            {
                "code": "84",
                "value": "ISO 84"
            },
            {
                "code": "85",
                "value": "ISO 85"
            },
            {
                "code": "86",
                "value": "ISO 86"
            },
            {
                "code": "87",
                "value": "ISO 87"
            },
            {
                "code": "88",
                "value": "ISO 88"
            },
            {
                "code": "89",
                "value": "ISO 89"
            },
            {
                "code": "90",
                "value": "ISO 90"
            },
            {
                "code": "91",
                "value": "ISO 91"
            },
            {
                "code": "92",
                "value": "ISO 92"
            },
            {
                "code": "93",
                "value": "ISO 93"
            },
            {
                "code": "94",
                "value": "ISO 94"
            },
            {
                "code": "95",
                "value": "ISO 95"
            },
            {
                "code": "96",
                "value": "ISO 96"
            },
            {
                "code": "97",
                "value": "ISO 97"
            },
            {
                "code": "98",
                "value": "ISO 98"
            },
            {
                "code": "99",
                "value": "ISO 99"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Coding for combined transport for containers (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B].",
                "message": "standardCombinedTransportContainers (1.1.1.1.3.8):): The track {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/standard-combined-transport-containers/StandardCombinedTransportContainers."
            },
            {
                "comment": "Coding for combined transport for containers (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B].",
                "message": "standardCombinedTransportContainers (1.1.1.1.3.8): The track defines a standard combined transport profile number for containers. This error is due to having  a value that is not  an IRI."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#standardCombinedTransportContainers"
    },
    "ILL_ProfileNumRollerUnits": {
        "group": "OP",
        "title": "Standard combined transport profile number for roller units",
        "description": "Coding for combined transport for roller units (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B]",
        "iri": "http://data.europa.eu/949/standardCombinedTransportRollerUnits",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.3.9"
        ],
        "xml_names": [
            "ILL_ProfileNumRollerUnits"
        ],
        "deadline": "12 months after the adoption of the Article 7 Guide for lines belonging to the TEN (1.1.1.1.2.1)",
        "belongs_to_group": "Line layout\n                \n                (\n                \n                1.1.1.1.3 | 1.2.1.0.3 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Standard combined transport profile numbers for roller units",
        "values": [
            {
                "code": "00",
                "value": "B 22"
            },
            {
                "code": "01",
                "value": "B 25"
            },
            {
                "code": "02",
                "value": "B 30"
            },
            {
                "code": "03",
                "value": "B 32"
            },
            {
                "code": "04",
                "value": "B 38"
            },
            {
                "code": "05",
                "value": "B 45"
            },
            {
                "code": "06",
                "value": "B 50"
            },
            {
                "code": "07",
                "value": "B 55"
            },
            {
                "code": "08",
                "value": "B 59"
            },
            {
                "code": "09",
                "value": "B 60"
            },
            {
                "code": "10",
                "value": "B 65"
            },
            {
                "code": "11",
                "value": "B 70"
            },
            {
                "code": "12",
                "value": "B 80"
            },
            {
                "code": "13",
                "value": "B 90"
            },
            {
                "code": "14",
                "value": "B 341"
            },
            {
                "code": "15",
                "value": "B 349"
            },
            {
                "code": "16",
                "value": "B 351"
            },
            {
                "code": "17",
                "value": "B 357"
            },
            {
                "code": "18",
                "value": "B 364"
            },
            {
                "code": "19",
                "value": "B 365"
            },
            {
                "code": "20",
                "value": "B 371"
            },
            {
                "code": "21",
                "value": "B 375"
            },
            {
                "code": "22",
                "value": "B 380"
            },
            {
                "code": "23",
                "value": "B 384"
            },
            {
                "code": "24",
                "value": "B 385"
            },
            {
                "code": "25",
                "value": "B 389"
            },
            {
                "code": "26",
                "value": "B 390"
            },
            {
                "code": "27",
                "value": "B 395"
            },
            {
                "code": "28",
                "value": "B 400"
            },
            {
                "code": "29",
                "value": "B 405"
            },
            {
                "code": "30",
                "value": "B 410"
            },
            {
                "code": "31",
                "value": "B 420"
            },
            {
                "code": "32",
                "value": "B 422"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Coding for combined transport for roller units (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B].",
                "message": "standardCombinedTransportRollerUnits (1.1.1.1.3.9):): The track {$this} in the Section of Line {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/standard-combined-transport-roller-units/StandardCombinedTransportRollerUnits."
            },
            {
                "comment": "Coding for combined transport for roller units (for all freight and mixed-traffic lines) in accordance with the specification referenced in Appendix A-1, index [B].",
                "message": "standardCombinedTransportRollerUnits (1.1.1.1.3.9): The track defines a standard combined transport profile number for roller units. This error is due to having  or having a value that is not  an IRI."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#standardCombinedTransportRollerUnits"
    },
    "ITP_NomGauge": {
        "group": "OP",
        "title": "Nominal track gauge",
        "description": "A single value expressed in millimetres that identifies the track gauge.",
        "iri": "http://data.europa.eu/949/wheelSetGauge",
        "parameter_of": [
            "Restriction",
            "Running track",
            "Subset with common characteristics",
            "Vehicle Registration Restriction",
            "Vehicle Type",
            "Vehicle Type Authorisation Restriction"
        ],
        "numbers": [
            "1.1.1.1.4.1",
            "1.2.1.0.4.1"
        ],
        "xml_names": [
            "ITP_NomGauge"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Track parameters\n                \n                (\n                \n                1.1.1.1.4 | 1.2.1.0.4 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Nominal Track Gauges",
        "values": [
            {
                "code": "10",
                "value": "750 | 750"
            },
            {
                "code": "20",
                "value": "1000 | 1000mm"
            },
            {
                "code": "30",
                "value": "1435 | 1435mm"
            },
            {
                "code": "40",
                "value": "1520 | 1520mm"
            },
            {
                "code": "50",
                "value": "1524 | 1524mm"
            },
            {
                "code": "60",
                "value": "1600 | 1600mm"
            },
            {
                "code": "70",
                "value": "1668 | 1668mm"
            }
        ],
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "A single value expressed in millimeters that identifies The track gauge.",
                "message": "Nominal track gauge (1.1.1.1.4.1, 1.2.1.0.4.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/nominal-track-gauges/NominalTrackGauges."
            },
            {
                "comment": "A single value expressed in millimeters that identifies the track gauge.",
                "message": "wheelSetGauge (1.1.1.1.4.1, 1.2.1.0.4.1): The track must have at most one wheel set gauge value that is an IRI."
            }
        ],
        "general_explanation": "In case of multi-rail track, a set of data is to be published separately to each pair of rails to be operated as separate track (the whole set of parameters for the separate track has to be delivered be careful then with the track identification). Nominal track gauges provided by the INF TSI are only 1435, 1520, 1524, 1600 and 1668.",
        "see_also": "INF TSI: 4.2.4.1 https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#wheelSetGauge"
    },
    "ITP_CantDeficiency": {
        "group": "DP",
        "title": "Cant deficiency",
        "description": "Maximum cant deficiency expressed in millimetres defined as difference between the applied cant and a higher equilibrium cant the line has been designed for.",
        "iri": "http://data.europa.eu/949/cantDeficiency",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.4.2"
        ],
        "xml_names": [
            "ITP_CantDeficiency"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Track parameters\n                \n                (\n                \n                1.1.1.1.4 | 1.2.1.0.4 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Maximum cant deficiency expressed in millimeters defined as difference between the applied cant and a higher equilibrium cant the line has been designed for.",
                "message": "cantDeficiency (1.1.1.1.4.2): The track must have at most one cant deficiency value that is an integer. This error may be due to the track having more than one cant deficiency value or to having a value that is not an int."
            }
        ],
        "general_explanation": "In case of positive value of cant deficiency or zero symbol  '+' shall be applied. In case of negative cant deficiency symbol '-' has to be selected. Value of the cant deficiency shall be given in millimetres. In case of lateral uncompensated acceleration on a 1435 mm track gauge of 1.0 m/s2 the value of 153 mm may be published.",
        "see_also": "INF TSI: 4.2.4.3",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#cantDeficiency"
    },
    "ITP_RailInclination": {
        "group": "OP",
        "title": "Rail inclination",
        "description": "An angle defining the inclination of the head of a rail relative to the running surface.",
        "iri": "http://data.europa.eu/949/railInclination",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type",
            "Vehicle type configuration parameter set"
        ],
        "numbers": [
            "1.1.1.1.4.3"
        ],
        "xml_names": [
            "ITP_RailInclination"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Track parameters\n                \n                (\n                \n                1.1.1.1.4 | 1.2.1.0.4 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Rail Inclinations",
        "values": [
            {
                "code": "0",
                "value": "No inclination | 0"
            },
            {
                "code": "10",
                "value": "1/10 | 1:10"
            },
            {
                "code": "20",
                "value": "1/20 | 1:20"
            },
            {
                "code": "25",
                "value": "1/25 | 1:25"
            },
            {
                "code": "30",
                "value": "1/30 | 1:30"
            },
            {
                "code": "40",
                "value": "1/40 | 1:40"
            },
            {
                "code": "50",
                "value": "1/50 | 1:50"
            },
            {
                "code": "60",
                "value": "1/60 | 1:60"
            },
            {
                "code": "70",
                "value": "1/70 | 1:70"
            },
            {
                "code": "80",
                "value": "1/80 | 1:80"
            }
        ],
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "An angle defining the inclination of the head of a rail relatie to the running surface.",
                "message": "railInclination (1.1.1.1.4.3): The track must have at most one rail inclination measurement value that is an IRI. This error may be due to the track having more than one rail inclination measurement value or to having a value that is not an IRI."
            },
            {
                "comment": "An angle defining the inclination of the head of a rail relatie to the running surface.",
                "message": "Indication of the rail inclination (1.1.1.1.4.3):): The track {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/rail-inclinations/RailInclinations."
            }
        ],
        "general_explanation": "[ERATV] This inclination is in most cases expressed for MS RINF globally, but anyway it requires presentation for the specific track, when in one SoL more values occur.An angle defining the inclination of the head of a rail when installed in the track relative to the plane of the rails (running surface), equal to the angle between the axis of symmetry of the rail (or of an equivalent symmetrical rail having the same rail head profile) and the perpendicular to the plane of the rails. [NN] represents the denominator of the rail inclination expressed as 1/NN. The typical values are 1:20, 1:30, 1:40.For a VehicleType, the value should currently be considered independent of a Vehicle Configuration. This inclination is in most cases expressed for MS globally, but anyway it requires presentation for the specific track, when in one SoL more values occur.An angle defining the inclination of the head of a rail when installed in the track relative to the plane of the rails (running surface), equal to the angle between the axis of symmetry of the rail (or of an equivalent symmetrical rail having the same rail head profile) and the perpendicular to the plane of the rails. The typical values for the railway inclination are 1:20, 1:30, 1:40.",
        "see_also": "INF TSI:4.2.4.7",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#railInclination"
    },
    "ITP_Ballast": {
        "group": "DP",
        "title": "Existence of ballast",
        "description": "Specifies whether track construction is with sleepers embedded in ballast or not.",
        "iri": "http://data.europa.eu/949/hasBallast",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.4.4"
        ],
        "xml_names": [
            "ITP_Ballast"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Track parameters\n                \n                (\n                \n                1.1.1.1.4 | 1.2.1.0.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory for tracks with permitted speed (parameter 1.1.1.1.2.5) greater than 250km/h",
        "validation_rules": [
            {
                "comment": "Specifies whether the track construction is with sleepers embedded in ballast or not.",
                "message": "hasBallast (1.1.1.1.4.4): The track must have at most one existence of ballast value that is Y/N (boolean). This error may be due to the track having more than one has ballast value or to having a value that is not Y/N (boolean)."
            },
            {
                "comment": "Specifies whether track construction is with sleepers embedded in ballast or not.",
                "message": "hasBallast (1.1.1.1.4.4): This error is due to the track {?trackLabel} , violating the rule: Y for tracks with permitted speed (parameter 1.1.1.1.2.5) greater than 250km/h."
            }
        ],
        "general_explanation": "This parameter is related to phenomena of ballast pick-up observed for the high-speed traffic.Requirements regarding ballast pick-up reduction at infrastructure subsystem level only applies to lines intended to be operated at speed greater than 250 km/h and is an open point in INF TSI: 4.2.10.3The parameter is about the phenomenon of ballast pick-up observed for the high-speed traffic, not about the ballast itself. As so far any specifications for mitigation of the problem were disclosed, the only information from RINF will be data about the network where the problems may be faced.",
        "see_also": "Loc&Pas TSI 4.2.6.2.5INF TSI : 4.2.10.3",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasBallast"
    },
    "ISC_TSISwitchCrossing": {
        "group": "DP",
        "title": "TSI compliance of in-service values for switches and crossings",
        "description": "Switches and crossings are maintained to in service limit dimension as specified in TSI.",
        "iri": "http://data.europa.eu/949/tsiSwitchCrossing",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.5.1"
        ],
        "xml_names": [
            "ISC_TSISwitchCrossing"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Switches and crossings\n                \n                (\n                \n                1.1.1.1.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Switches and crossings are maintained to in service limit dimension as specified in TSI.",
                "message": "tsiSwitchCrossing (1.1.1.1.5.1): The track must have at most one existence of TSI switches and crossing value that is Y/N (boolean). This error may be due to the track having more than one tsi swith crossing value or to having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "If for existing track at least one parameter has less strict value than specified in the TSI, then 'N' (false) shall be selected.",
        "see_also": "INF TSI: 4.2.5 and 4.2.8.6",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tsiSwitchCrossing"
    },
    "ISC_MinWheelDiaFixObtuseCrossings": {
        "group": "DP",
        "title": "Minimum wheel diameter for fixed obtuse crossings",
        "description": "Maximum unguided length of fixed obtuse crossings is based on a minimum wheel diameter in service expressed in millimetres.",
        "iri": "http://data.europa.eu/949/minimumWheelDiameter",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.1.5.2"
        ],
        "xml_names": [
            "ISC_MinWheelDiaFixObtuseCrossings"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Switches and crossings\n                \n                (\n                \n                1.1.1.1.5 ) Vehicle type technical characteristic",
        "data_presentation": "Integer",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Maximum unguided length of fixed obtuse crossings is based on a minimum wheel diameter in service expressed in millimiters.",
                "message": "minimumWheelDiameter (1.1.1.1.5.2): The track must have at most one minimum wheel diameter value that is an integer.\n\t This error may be due to the track having more than one minimum wheel diameter value or to having a value that is not an integer.\n\t If the value of the wheel diameter is bigger than 330 mm, it has to be specified."
            }
        ],
        "general_explanation": "The minimum TSI value is 330 mm and this shall be used as a default value unless advised otherwise. If the value of the wheel diameter is bigger than 330 mm, it has to be specified.New lines are assumed to be compliant with the TSI INF. When the line is compliant to TSI the default value of 330 mm has to be presented.",
        "see_also": "INF TSI:  4.2.5.3",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#minimumWheelDiameter"
    },
    "ILR_MaxDeceleration": {
        "group": "DP",
        "title": "Maximum train deceleration",
        "description": "Limit for longitudinal track resistance given as a maximum allowed train deceleration and expressed in metres per square second.",
        "iri": "http://data.europa.eu/949/maximumTrainDeceleration",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.6.1"
        ],
        "xml_names": [
            "ILR_MaxDeceleration"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Track resistance to applied loads\n                \n                (\n                \n                1.1.1.1.6 )",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Not applicable if line is not in scope of INF TSI",
        "validation_rules": [
            {
                "comment": "Limit for longitudinal track resistance given as a maximum allowed train deceleration and expressed in m/s2.",
                "message": "maximumTrainDeceleration (1.1.1.1.6.1): The track must have at most one maximum train deceleration value that is a double (real) number . This error may be due to the track having more than one maximum train deceleration value or to having a value that is not a real (double) number."
            }
        ],
        "general_explanation": "New lines are assumed to be compliant with the TSI INF.For TSI compliant lines the default value of 2.5 m/s2 shall be presented.If for the design of the track the braking forces were assumed on basis of the deceleration lower value than 2.5 m/s2, the applied value of the deceleration has to be specified.",
        "see_also": "INF TSI: 4.2.6",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maximumTrainDeceleration"
    },
    "ILR_EddyCurrentBrakes": {
        "group": "OP",
        "title": "Use of eddy current brakes",
        "description": "Indication of limitations on the use of eddy current brakes.",
        "iri": "http://data.europa.eu/949/eddyCurrentBraking",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.6.2",
            "1.2.1.0.4.2"
        ],
        "xml_names": [
            "ILR_EddyCurrentBrakes"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Track parameters\n                \n                (\n                \n                1.1.1.1.4 | 1.2.1.0.4 ) Track resistance to applied loads\n                \n                (\n                \n                1.1.1.1.6 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Eddy Current Braking",
        "values": [
            {
                "code": "10",
                "value": "Allowed"
            },
            {
                "code": "20",
                "value": "Allowed under conditions"
            },
            {
                "code": "30",
                "value": "Allowed only for emergency brake"
            },
            {
                "code": "40",
                "value": "Allowed under conditions only for emergency brake"
            },
            {
                "code": "50",
                "value": "Not allowed"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication of limitations on the use of eddy current brakes.",
                "message": "eddyCurrentBraking (1.1.1.1.6.2, 1.2.1.0.4.2): The track must have a single use of eddy current brakes value that is an IRI. This error is due to having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "Indication of limitations on the use of eddy current brakes.",
                "message": "eddyCurrentBraking (1.1.1.1.6.2, 1.2.1.0.4.2): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/eddy-current-braking/EddyCurrentBraking."
            }
        ],
        "general_explanation": "The use of both brakes is allowed or not under exterior conditions (depending on the features of the train engines for example).The RINF can't be filled without more precisions.",
        "see_also": "INF TSI: 4.2.6.2.2 (2)OPE TSI: 4.2.2.6.2 (1) (iv)",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#eddyCurrentBraking"
    },
    "ILR_MagneticBrakes": {
        "group": "OP",
        "title": "Use of magnetic brakes",
        "description": "Indication of limitations on the use of magnetic brakes.",
        "iri": "http://data.europa.eu/949/magneticBraking",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.6.3",
            "1.2.1.0.4.3"
        ],
        "xml_names": [
            "ILR_MagneticBrakes"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Track resistance to applied loads\n                \n                (\n                \n                1.1.1.1.6 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Magnetic Braking",
        "values": [
            {
                "code": "10",
                "value": "Allowed"
            },
            {
                "code": "20",
                "value": "Allowed under conditions"
            },
            {
                "code": "30",
                "value": "Allowed under conditions only for emergency brake"
            },
            {
                "code": "40",
                "value": "Allowed only for emergency brake"
            },
            {
                "code": "50",
                "value": "Not allowed"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication of limitations on the use of magnetic brakes.",
                "message": "magneticBraking (1.1.1.1.6.3, 1.2.1.0.4.3): The track must have a single use of magnetic brakes value that is an IRI. This error is due to having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "Indication of limitations on the use of magnetic brakes.",
                "message": "magneticBraking (1.1.1.1.6.3, 1.2.1.0.4.3): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/magnetic-braking/MagneticBraking."
            }
        ],
        "see_also": "INF TSI: 4.2.6.2.2                     OPE TSI: 4.2.2.6.2 (1) (iv)",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#magneticBraking"
    },
    "ILR_ECBDocRef": {
        "group": "OP",
        "title": "Document with the conditions for the use of eddy current brakes",
        "description": "Electronic document available in two EU languages from the IM stored by the Agency with conditions for the use of eddy current brakes identified in 1.1.1.1.6.2.",
        "iri": "http://data.europa.eu/949/eddyCurrentBrakingConditionsDocument",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.6.4"
        ],
        "xml_names": [
            "ILR_ECBDocRef"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Track resistance to applied loads\n                \n                (\n                \n                1.1.1.1.6 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory value to be provided when 1.1.1.1.6.2/Use of eddy current brakes is  allowed under conditions  or  allowed under conditions only for emergency brake",
        "validation_rules": [
            {
                "comment": "Electronic document available in two EU languages from the IM stored by the Agency with conditions for the use of eddy current brakes identified in 1.1.1.1.6.2.",
                "message": "eddyCurrentBrakingConditionsDocument (1.1.1.1.6.4): This error is due to the track {?trackLabel} , violating the rule: Y in case of Y for 1.1.1.1.6.2 Use of eddy current brakes is “allowed under conditions” or “allowed under conditions only for emergency brake””."
            },
            {
                "comment": "Electronic document available in two EU languages from the IM stored by the Agency with conditions for the use of eddy current brakes identified in 1.1.1.1.6.2.",
                "message": "eddyCurrentBrakingConditionsDocument (1.1.1.1.6.4): The track has an eddy current braking conditions document value that must be a Document."
            }
        ],
        "general_explanation": "If there exist conditions to allow the use of eddy current brakes.The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#eddyCurrentBrakingConditionsDocument"
    },
    "ILR_MBDocRef": {
        "group": "OP",
        "title": "Document with the conditions for the use of magnetic brakes",
        "description": "Electronic document available in two EU languages from the IM stored by the Agency with conditions for the use of magnetic brakes identified in 1.1.1.1.6.3.",
        "iri": "http://data.europa.eu/949/magneticBrakingConditionsDocument",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.6.5"
        ],
        "xml_names": [
            "ILR_MBDocRef"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Track resistance to applied loads\n                \n                (\n                \n                1.1.1.1.6 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory value to be provided when 1.1.1.1.6.3 / Use of magnetic brakes is 'allowed under conditions' or 'allowed under conditions only for emergency brake'.",
        "validation_rules": [
            {
                "comment": "Electronic document available in two EU languages from the IM stored by the Agency with conditions for the use of magnetic brakes identified in 1.1.1.1.6.3.",
                "message": "magneticBrakingConditionsDocument (1.1.1.1.6.5): This error is due to the track {?trackLabel} , violating the rule: Y if the answer to 1.1.1.1.6.3 / Use of magnetic brakes is “allowed under conditions” or “allowed under conditions only for emergency brake”."
            },
            {
                "comment": "Electronic documents available in two EU languages from the IM stored by the Agency with conditions for the use of magnetic brakes identified in 1.1.1.1.6.3.",
                "message": "magneticBrakingConditionsDocument (1.1.1.1.6.5): The track has a magnetic braking conditions document value that must be a Document."
            }
        ],
        "general_explanation": "If there exist conditions to allow the use of magnetic brakes.The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#magneticBrakingConditionsDocument"
    },
    "IHS_FlangeLubeForbidden": {
        "group": "DP",
        "title": "Use of flange lubrication forbidden",
        "description": "Indication whether the use of on-board device for flange lubrication is forbidden.",
        "iri": "http://data.europa.eu/949/flangeLubeForbidden",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.7.1"
        ],
        "xml_names": [
            "IHS_FlangeLubeForbidden"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether the use of on-board device for flange lubrication is forbidden.",
                "message": "flangeLubeForbidden (1.1.1.1.7.1): The track must have at most one flange lube forbidden value that is Y/N (boolean). This error may be due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#flangeLubeForbidden"
    },
    "IHS_LevelCrossing": {
        "group": "DP",
        "title": "Existence of level crossings",
        "description": "Indication whether level crossings (including pedestrian track crossing) exist on the section of line.",
        "iri": "http://data.europa.eu/949/hasLevelCrossings",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.7.2"
        ],
        "xml_names": [
            "IHS_LevelCrossing"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether level crossings (including pedestrian track crossing) exist onf the section line.",
                "message": "hasLevelCrossings (1.1.1.1.7.2): The track must have at most one existence of level crossings value that is Y/N (boolean). This error may be due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "This parameter concerns the level crossing of the railway with a road or a street. Provision the correct location of the level crossing(s) is not required, but RINF data model allows providing such information on a voluntary basis, and it can be a geographical information and/or a reference to a line referencing system.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasLevelCrossings"
    },
    "IHS_AccelerationLevelCrossing": {
        "group": "OP",
        "title": "Acceleration allowed near level crossing",
        "description": "Existence of limit for acceleration of train if stopping or recovering speed close to a level crossing expressed in a specific reference acceleration curve.",
        "iri": "http://data.europa.eu/949/accelerationLevelCrossing",
        "parameter_of": [
            "Subset with common characteristics",
            "Track"
        ],
        "numbers": [
            "1.1.1.1.7.3"
        ],
        "xml_names": [
            "IHS_AccelerationLevelCrossing"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory value when the level crossing is defined",
        "validation_rules": [
            {
                "comment": "Existence of limit for acceleration of train if stopping or recovering speed close to a level crossing expressed in a specific reference acceleration curve.",
                "message": "accelerationLevelCrossing (1.1.1.1.7.3): This error is due to the track {?trackLabel} , violating the rule: Applicable only when selected value of parameter 1.1.1.1.7.2 is ‘Y’"
            },
            {
                "comment": "Existence of limit for acceleration of train if stopping or recovering speed close to a level crossing expressed in a specific reference acceleration curve.",
                "message": "accelerationLevelCrossing (1.1.1.1.7.3): The track must have at most one acceleration level crossing value that is a Document. This error may be due to having more than one value or having a value that is not an instance of Document."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#accelerationLevelCrossing"
    },
    "IHS_HABDExist": {
        "group": "DP",
        "title": "Existence of trackside hot axle box detector (HABD)",
        "description": "Existence of trackside HABD",
        "iri": "http://data.europa.eu/949/hasHotAxleBoxDetector",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.7.4"
        ],
        "xml_names": [
            "IHS_HABDExist"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Existence of trackside hot axle box detector.",
                "message": "hasHotAxleBoxDetector (1.1.1.1.7.4): The track must have at most one existence of hot axle box detector value that is Y/N (boolean)."
            }
        ],
        "general_explanation": "The aim of axle bearing condition monitoring is to detect deficient axle box bearings. The TSI Loc&Pas provides with the requirement that units of maximum design speed higher than or equal to 250 km/h, on board detection equipment shall be provided. For units of maximum design speed lower than 250 km/h, and designed to be operated on others track gauge systems than the 1 520 mm system, axle bearing condition monitoring shall be provided and be achieved either by on board equipment or by using track side equipment. Track side equipment (also known as HABD) are defined from the perspective of rolling stock, for which the zone visible to the trackside equipment is defined by the area referred in the standard EN 15437-1:2009, as required by the TSI Loc&Pas.This parameter is to indicate whether the section of line is equipped with trackside hot axle box detector (HABD) and is necessary for the route compatibility check.",
        "see_also": "TSI Loc&Pas: 4.2.10.2.3, 4.2.3.3.2WAG TSI: 4.2.3.4EN 15437-1:2009",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasHotAxleBoxDetector"
    },
    "IHS_TSIHABD": {
        "group": "DP",
        "title": "Trackside HABD TSI compliant",
        "description": "Specific for the French, Italian and Swedish networks.Trackside HABD compliant to TSI means that the HABD Trackside is compliant with:- EN 15437-1:2009 referred in TSIs (LOC&PAS: 4.2.3.3.2.2, WAG TSI: 4.2.3.4),- Specific cases mentioned in TSIs (LOC&PAS TSI, WAG TSI).",
        "iri": "http://data.europa.eu/949/hotAxleBoxDetectorTSICompliant",
        "parameter_of": [
            "Hot Axle Box Detector"
        ],
        "numbers": [
            "1.1.1.1.7.5"
        ],
        "xml_names": [
            "IHS_TSIHABD"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Trackside HABD compilant to TSI means that the HABD is compliant with EN 15437:2009 and specific cases mentioned in TSIs.",
                "message": "hotAxleBoxDetectorTSICompliant (1.1.1.1.7.5): The HABD must have at most one value that defines if the hot axle box detector is TSI compliant and the value is Y/N (boolean). This error may be due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "see_also": "TSI LOC&PAS: 4.2.3.3.2.2, and 7.3.2.3WAG TSI: 4.2.3.4 and 7.3.2.2EN 15437-1:2009",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hotAxleBoxDetectorTSICompliant"
    },
    "IHS_HABDID": {
        "group": "DP",
        "title": "Identification of trackside HABD",
        "description": "Specific for the French, Italian and Swedish networks.Applicable if trackside HABD is not TSI compliant, identification of trackside hot axle box detector.",
        "iri": "http://data.europa.eu/949/hotAxleBoxDetectorIdentification",
        "parameter_of": [
            "Hot Axle Box Detector"
        ],
        "numbers": [
            "1.1.1.1.7.6"
        ],
        "xml_names": [
            "IHS_HABDID"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory if the HABD is not TSI compliant (the value of parameter 1.1.1.1.7.5 (Trackside HABD TSI compliant) is 'False')",
        "validation_rules": [
            {
                "comment": "Specific for the French Italian and Swedish networks. Applicable if trackside HABD is not TSI compliant, identification of trackside hot axle box detector.@en",
                "message": "hotAxleBoxDetectorIdentification (1.1.1.1.7.6): This error is due to HABD {?label}, violating the rule: “Y” if the answer to parameter 1.1.1.1.7.5 is “N”"
            },
            {
                "comment": "Specific for the French, Italian and Swedish networks. Applicable if trackside HABD is not TSI compliant. Identification of the trackside HABD.",
                "message": "hotAxleBoxDetectorIdentification (1.1.1.1.7.6): The HABD must have at most one value that defines the identification of the hot axle box detector and the value is a character string. This error may be due to having more than one value or having a value that is not a string."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hotAxleBoxDetectorIdentification"
    },
    "IHS_HABDGen": {
        "group": "DP",
        "title": "Generation of trackside HABD",
        "description": "Specific for the French Italian and Swedish networks. Generation of trackside hot axle box detector.",
        "iri": "http://data.europa.eu/949/hotAxleBoxDetectorGeneration",
        "parameter_of": [
            "Hot Axle Box Detector"
        ],
        "numbers": [
            "1.1.1.1.7.7"
        ],
        "xml_names": [
            "IHS_HABDGen"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory if the HABD is not TSI compliant (the value of parameter 1.1.1.1.7.5 (Trackside HABD TSI compliant) is 'False')",
        "validation_rules": [
            {
                "comment": "Specific for the French Italian and Swedish networks. Generation of trackside hot axle box detector. “Y” if the answer to parameter 1.1.1.1.7.5 is “N”",
                "message": "hotAxleBoxDetectorGeneration (1.1.1.1.7.7): This error is due to HABD {?label}, violating the rule: “Y” if the answer to parameter 1.1.1.1.7.5 is “N”"
            },
            {
                "comment": "Applicable if trackside HABD is not TSI compliant. Generation of the trackside HABD.",
                "message": "hotAxleBoxDetectorGeneration (1.1.1.1.7.7): The HABD must have at most one generation of the hot axle box detector value that is a string of characters. This error may be due to having more than one value or having a value that is not a string."
            }
        ],
        "general_explanation": "Waiting provision of possible answers by the French, Italian and Swedish NREs",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hotAxleBoxDetectorGeneration"
    },
    "IHS_HABDLoc": {
        "group": "DP",
        "title": "Railway location of trackside HABD",
        "description": "Specific for the French Italian and Swedish networks.Applicable if trackside HABD is not TSI compliant, localisation of trackside hot axle box detector.",
        "iri": "http://data.europa.eu/949/hotAxleBoxDetectorLocation",
        "parameter_of": [
            "Hot Axle Box Detector"
        ],
        "numbers": [
            "1.1.1.1.7.8"
        ],
        "xml_names": [
            "IHS_HABDLoc"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory if the HABD is not TSI compliant (the value of parameter 1.1.1.1.7.5 (Trackside HABD TSI compliant) is 'False')",
        "validation_rules": [
            {
                "comment": "Specific for the French Italian and Swedish networks. Applicable if trackside HABD is not TSI compliant, localisation of trackside hot axle box detector.",
                "message": "hotAxleBoxDetectorLocation (1.1.1.1.7.8): This error is due to the HABD {?label}, violating the rule: “Y” if the answer to parameter 1.1.1.1.7.5 is “N”"
            },
            {
                "comment": "Applicable if trackside HABD is not TSI compliant. Location of the trackside HABD.",
                "message": "hotAxleBoxDetectorLocation (1.1.1.1.7.8): The HABD has a location of the hot axle box detector(s) value that must be a double (real) number with format [±NNNN.NNN]. This error may be due to having a value that is not a double (real) number or does not follow the pattern [±NNNN.NNN]."
            }
        ],
        "general_explanation": "The location (generally the distance from the origin of the line to the point of interest) on a line is given in kilometres with decimals (precision of 0.001).It may be also possible to provide the location of the HABD as an era:netReference property for the HABD pointing to an era:NetPointReference with (at least)era:LinearPositioningSystemCoordinate",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hotAxleBoxDetectorLocation"
    },
    "IHS_HABDDirection": {
        "group": "OP",
        "title": "Direction of measurement of trackside HABD",
        "description": "Direction of measurement of trackside HABD, specific for the French Italian and Swedish networks.",
        "iri": "http://data.europa.eu/949/hotAxleBoxDetectorDirection",
        "parameter_of": [
            "Hot Axle Box Detector"
        ],
        "numbers": [
            "1.1.1.1.7.9"
        ],
        "xml_names": [
            "IHS_HABDDirection"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Hot Axle Box Detector Directions",
        "values": [
            {
                "code": "10",
                "value": "N"
            },
            {
                "code": "20",
                "value": "O"
            },
            {
                "code": "30",
                "value": "B"
            }
        ],
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory if the HABD is not TSI compliant (the value of parameter 1.1.1.1.7.5 (Trackside HABD TSI compliant) is 'False')",
        "validation_rules": [
            {
                "comment": "Specific for the French Italian and Swedish networks. If the direction of measurement is: - the same as the direction defined by the start and end of the SoL: (N); - the opposite to the direction defined by the start and end of the SoL: (O); - both directions: (B). “Y” if the answer to parameter 1.1.1.1.7.5 is “N”.",
                "message": "hotAxleBoxDetectorDirection (1.1.1.1.7.9): This error is due to HABD {?label}, violating the rule: “Y” if the answer to parameter 1.1.1.1.7.5 is “N”"
            },
            {
                "comment": "Direction of measurement of the trackside HABD.",
                "message": "hotAxleBoxDetectorDirection (1.1.1.1.7.9): The HABD must have at most one direction of measurement of the hot axle box detector value that is an IRI. This error may be due to HABD having more than one value of hot axle box detector direction, or having a value that is not an IRI."
            },
            {
                "comment": "Direction of measurement of the trackside HABD.",
                "message": "Indication of the hotAxleBoxDetectorDirection (1.1.1.1.7.9):): The HABD {$this} has a value {?concept} through the era:hotAxleBoxDetectorDirection property that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/hot-axle-box-detector-direction/HotAxleBoxDetectorDirections."
            }
        ],
        "general_explanation": "Specific for the French Italian and Swedish networks.Applicable if trackside HABD is not TSI compliant, direction of measurement of trackside hot axle box detector.If the direction of measurement is:-\tthe same as the direction defined by the start and end of the SoL: (N)-\tthe opposite to the direction defined by the start and end of the SoL: (O)-\tboth directions: (B)",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hotAxleBoxDetectorDirection"
    },
    "IHS_RedLights": {
        "group": "DP",
        "title": "Steady red lights required",
        "description": "Sections where two steady red lights are required in accordance with TSI OPE",
        "iri": "http://data.europa.eu/949/redLightsRequired",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.7.10"
        ],
        "xml_names": [
            "IHS_RedLights"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Sections where two steady red lights are required in accordance with Implementing Regulations (EU) 2019/773.",
                "message": "redLightsRequired (1.1.1.1.7.10): The track must have at most one value that defines if two steady red lights are required and the value must be Y/N (boolean). This error may be due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "From Regulation (EU) 2019/773 (TSI OPE) on tail marking in normal operation: this parameter is only for- freight trains during the transition phase until 31st December 2025 and- specific cases of Belgium, France, Italy, Portugal, and Spain who may continue to apply notified national rules that require freight trains to be equipped with 2 steady red lights as a condition to run on sections of their network, where this is justified by operating practices already in place and/or national rules notified before end of January 2019.Cooperation with neighbouring countries:In the meantime Member States concerned, in particular at the request of the railway undertakings, shall perform an assessment with a view to accept the use of 2 reflective plates in one or more sections of their network if the result of the assessment is positive and define appropriate conditions, which shall be based upon an assessment of the risks and operational requirements. This assessment shall be completed within a maximum period of 6 months after receiving the railway undertaking's request. The acceptance of reflective plates shall be granted, unless the Member State can duly justify the refusal based on the negative result of the assessment.Member States shall in particular endeavour to permit the use of reflective plates on rail freight corridors, with a view to prioritise the current bottlenecks. These sections and details of any conditions pertaining to them shall be recorded in the RINF. Until the information is encoded in RINF, the infrastructure manager shall ensure the information is communicated to railway undertakings by other appropriate means. The infrastructure manager shall identify the sections of lines on which 2 steady red lights are required in the RINF.",
        "see_also": "art 4.2.2.1.3.2. of Implementing Regulation (EU) 2019/773 'Freight trains'",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/2025-03-31",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#redLightsRequired"
    },
    "IHS_QuietRoute": {
        "group": "DP",
        "title": "Belonging to a quieter route",
        "description": "Belonging to a 'quieter route' in accordance with Article 5b of TSI NOI.",
        "iri": "http://data.europa.eu/949/isQuietRoute",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.1.7.11"
        ],
        "xml_names": [
            "IHS_QuietRoute"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Health, safety and environment\n                \n                (\n                \n                1.1.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Belonging to a 'quiet route' in accordance with Article 5b of Regulation (EU) 1304/2014.",
                "message": "isQuietRoute (1.1.1.1.7.11): The track must have at most one value that defines if it belongs to a 'quiet route' and the value must be Y/N (boolean). This error may be due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "Art 5B: A quieter route means a part of the railway infrastructure with a minimum length of 20 km on which the average number of daily operated freight trains during the night-time as defined in national legislation transposing Directive 2002/49/EC of the European Parliament and of the Council (5) was higher than 12. The freight traffic in the years 2015, 2016 and 2017 shall be the basis for the calculation of that average number. In case the freight traffic due to exceptional circumstances diverges in a given year from that average number by more than 25 %, the Member State concerned can calculate the average number on the basis of the remaining two years.Art 5.C 1:   Member States shall designate quieter routes in accordance with Article 5b and the procedure set out in Appendix D.1 of the Annex. They shall provide the European Union Agency for Railways ( the Agency ) with a list of quieter routes six months after the date of publication of this Regulation at the latest. The Agency shall publish those lists on its website.",
        "see_also": "Art 5b of Regulation (EU) 1304/2014 (amended by Regulation (EU) 2019/774) of 16 May 2019",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#isQuietRoute"
    },
    "SOLTunnelIdentification": {
        "group": "DP",
        "title": "Tunnel identification",
        "description": "Unique tunnel identification or unique tunnel number within Member State",
        "iri": "http://data.europa.eu/949/tunnelIdentification",
        "parameter_of": [
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.2",
            "1.2.1.0.5.2",
            "1.2.2.0.5.2"
        ],
        "xml_names": [
            "SOLTunnelIdentification",
            "OPTrackTunnelIdentification",
            "OPSidingTunnelIdentification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Unique tunnel identification or unique number within Member State.",
                "message": "tunnelIdentification (1.1.1.1.8.2, 1.2.1.0.5.2, 1.2.2.0.5.2): Each Tunnel can be referred with only one identification. This error may be due to having a Tunnel with no identification, with more than one identification or with an identification that is not a character string."
            }
        ],
        "general_explanation": "Here should be given the name, number, code or any other expression which is normally used for the identification of the tunnel other than mentioned in parameters 1.1.1.1.8.3   1.1.1.1.8.4. In case when tunnel does not have its own identification within the Member State, the IM should deliver it himself",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tunnelIdentification"
    },
    "OPTrackTunnelIdentification": {
        "group": "DP",
        "title": "Tunnel identification",
        "description": "Unique tunnel identification or unique tunnel number within Member State",
        "iri": "http://data.europa.eu/949/tunnelIdentification",
        "parameter_of": [
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.2",
            "1.2.1.0.5.2",
            "1.2.2.0.5.2"
        ],
        "xml_names": [
            "SOLTunnelIdentification",
            "OPTrackTunnelIdentification",
            "OPSidingTunnelIdentification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Unique tunnel identification or unique number within Member State.",
                "message": "tunnelIdentification (1.1.1.1.8.2, 1.2.1.0.5.2, 1.2.2.0.5.2): Each Tunnel can be referred with only one identification. This error may be due to having a Tunnel with no identification, with more than one identification or with an identification that is not a character string."
            }
        ],
        "general_explanation": "Here should be given the name, number, code or any other expression which is normally used for the identification of the tunnel other than mentioned in parameters 1.1.1.1.8.3   1.1.1.1.8.4. In case when tunnel does not have its own identification within the Member State, the IM should deliver it himself",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tunnelIdentification"
    },
    "OPSidingTunnelIdentification": {
        "group": "DP",
        "title": "Tunnel identification",
        "description": "Unique tunnel identification or unique tunnel number within Member State",
        "iri": "http://data.europa.eu/949/tunnelIdentification",
        "parameter_of": [
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.2",
            "1.2.1.0.5.2",
            "1.2.2.0.5.2"
        ],
        "xml_names": [
            "SOLTunnelIdentification",
            "OPTrackTunnelIdentification",
            "OPSidingTunnelIdentification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Unique tunnel identification or unique number within Member State.",
                "message": "tunnelIdentification (1.1.1.1.8.2, 1.2.1.0.5.2, 1.2.2.0.5.2): Each Tunnel can be referred with only one identification. This error may be due to having a Tunnel with no identification, with more than one identification or with an identification that is not a character string."
            }
        ],
        "general_explanation": "Here should be given the name, number, code or any other expression which is normally used for the identification of the tunnel other than mentioned in parameters 1.1.1.1.8.3   1.1.1.1.8.4. In case when tunnel does not have its own identification within the Member State, the IM should deliver it himself",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tunnelIdentification"
    },
    "SOLTunnelStart": {
        "group": "OP",
        "title": "Start of tunnel kilometer",
        "description": "Part of the Start of tunnel that indicates the km of the line at the beginning of a tunnel.The Start of tunnel is the Geographical coordinates in decimal degrees and km of the line at the beginning of a tunnel.",
        "iri": "http://data.europa.eu/949/lineReferenceTunnelStart",
        "parameter_of": [
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.3"
        ],
        "xml_names": [
            "SOLTunnelStart"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Net Point Reference",
        "applicability_flags": "Y",
        "validation_rules": [
            {
                "comment": "Part of the Start of tunnel that indicates the km of the line at the beginning of a tunnel.",
                "message": "lineReferenceTunnelStart (1.1.1.1.8.3): A Tunnel may have a start of tunnel location (lineReferenceTunnelStart). This error may be due to a value that is not an IRI, more than one value being provided, or a value that is not a NetPointReference."
            }
        ],
        "general_explanation": "Geographical coordinates according to the standard World Geodetic System (WGS).  Precision for both geographical latitude and geographical longitude is assumed as [NN.NNNNNNN] in degrees with decimals what gives discretion of 10 cm in the network.Kilometre shall concern the national line identification given in 1.1.0.0.0.2Location of the point which is assumed to be the beginning of the tunnel it is the point on the track centre line where is laid the vertical shadow of the extreme part of the tunnel s portal.",
        "example": "Kilometer=`0.895`",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#lineReferenceTunnelStart"
    },
    "SOLTunnelEnd": {
        "group": "OP",
        "title": "End of tunnel",
        "description": "Geographical coordinates in decimal degrees and km of the line at the end of a tunnel.",
        "iri": "http://data.europa.eu/949/endLocation",
        "parameter_of": [
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.4"
        ],
        "xml_names": [
            "SOLTunnelEnd"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "HasGeometry\n                \n                (\n                \n                1.1.0.0.1.1 | 1.1.1.0.1.1 | 1.1.1.3.14.6 | 1.2.0.0.0.5 | 1.2.1.0.8.5 ) Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Point",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Geographical coordinates in decimal degrees and km of the line at the end of a tunnel.",
                "message": "endLocation (1.1.1.1.8.4): The Tunnel may have an end location (endLocation) reference that is a Geometry object or a Point. This error mey be due to an endLocation relationship from a Tunnel that is not a Geometry nor a Point."
            }
        ],
        "general_explanation": "Geographical coordinates according to the standard World Geodetic System (WGS).  Precision for both geographical latitude and geographical longitude is assumed as [NN.NNNNNNN] in degrees with decimals what gives discretion of 10 cm in the network.Kilometre shall concern the national line identification given in 1.1.0.0.0.2Location of the point which is assumed to be the end of the tunnel it is the point on the track centre line where is laid the vertical shadow of the extreme part of the tunnel s portal.",
        "example": "Latitude=`51.5479123` Longitude=`-0.076732`",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#endLocation"
    },
    "ITU_ECVerification": {
        "group": "DP",
        "title": "EC declaration of verification relating to compliance with the requirements from TSIs applicable to railway tunnel",
        "description": "Unique number for EC declarations in accordance with Commission Implementing Regulation (EU) 2019/250.",
        "iri": "http://data.europa.eu/949/verificationSRT",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.5",
            "1.2.1.0.5.3",
            "1.2.2.0.5.3"
        ],
        "xml_names": [
            "ITU_ECVerification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Unique number for EC declarations following format requirements specified in the 'Document about practical arrangements for transmitting interoperability documents'",
                "message": "verificationSRT (1.1.1.1.8.5, 1.2.1.0.5.3, 1.2.2.0.5.3): Each Tunnel may have one or more verificationSRT following this pattern country code/national registration number/year between 1900 and 2100/progressive counter. This error may be due to having a value that does not follow the pattern or that is not a character string."
            }
        ],
        "general_explanation": "(SRT) in title means that here we include only declarations concerning requirements of SRT TSI for infrastructure system on the specific track.Parameter shall be repeated when different EC declarations were issued for different elements of infrastructure subsystem on the specific track in the tunnel.With the extension of scope according to Interoperability Directive 2016/797, geographical scope of the INF, ENE and CCS TSIs now includes all the networks (TEN and off-TEN) with the following nominal track gauges: 1435, 1520, 1524, 1600 and 1668 mm",
        "see_also": "Document about practical arrangements for transmitting interoperability documents ERA/INF/10-2009/INT",
        "references": "http://data.europa.eu/eli/reg/2014/1303/2024-01-29",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#verificationSRT"
    },
    "ITU_EIDemonstration": {
        "group": "DP",
        "title": "EI declaration of demonstration (as defined in Recommendation 2014/881/EU) relating to compliance with the requirements from TSIs applicable to railway tunnel",
        "description": "Unique number for EI declarations following the same format requirements as specified for EC declarations in Annex VII of Commission Implementing Regulation (EU) 2019/250.",
        "iri": "http://data.europa.eu/949/demonstrationSRT",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.6",
            "1.2.1.0.5.4",
            "1.2.2.0.5.4"
        ],
        "xml_names": [
            "ITU_EIDemonstration"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "dependencies": "Applicable in case when the demonstration was executed and EI declaration was issued. The procedure for demonstration that existing network fits to requirements of the TSIs is executed on voluntary bases, so when EI declaration do not exist then the parameter is optional.",
        "validation_rules": [
            {
                "comment": "Unique number for EI declarations following the same format requirements as specified in the 'Document about practical arrangements for transmitting interoperability documents'",
                "message": "demonstrationSRT (1.1.1.1.8.6, 1.2.1.0.5.4, 1.2.2.0.5.4): Each Tunnel may have one or more demonstrationSRT following this pattern country code/national registration number/year between 1900 and 2100/progressive counter. This error may be due to having a value that does not follow the pattern or that is not a character string."
            }
        ],
        "general_explanation": "(SRT) in title means that here we include only declarations concerning requirements of SRT TSI for infrastructure system on the specific track.Parameter shall be repeated when different EI declarations were issued for different elements of infrastructure subsystem on the specific track in the tunnel.It may happen that several EI declarations were issued   then parameter has to be repeated as many times as many declarations were issued.The procedure for demonstration that existing network fits to requirements of the TSIs is executed on voluntary bases, so when EI declaration do not exist then the parameter is optional.",
        "see_also": "Recommendation 2014/881/EU",
        "references": "http://data.europa.eu/eli/reco/2014/881/oj ; http://data.europa.eu/eli/reg/2014/1303/2024-01-29",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#demonstrationSRT"
    },
    "ITU_Length": {
        "group": "DP",
        "title": "Length of tunnel",
        "description": "Length of a tunnel in metres from entrance portal to exit portal.",
        "iri": "http://data.europa.eu/949/lengthOfTunnel",
        "parameter_of": [
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.7",
            "1.2.1.0.5.5",
            "1.2.2.0.5.5"
        ],
        "xml_names": [
            "ITU_Length"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Length",
        "data_presentation": "Double",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Only applicable for a tunnel with length of 100 metres or more.",
        "validation_rules": [
            {
                "comment": "Length of a tunnel in metres from entrance portal to exit portal.",
                "message": "length (1.1.1.1.8.7, 1.2.1.0.5.5, 1.2.2.0.5.5): A Tunnel must have at most one length declaration. This error may be due to having a tunnel with more than one length or to having a value that is not a double (real) number."
            }
        ],
        "general_explanation": "Length of a tunnel is expressed in metres from portal to portal at the level of the top of rail.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#lengthOfTunnel"
    },
    "ITU_CrossSectionArea": {
        "group": "DP",
        "title": "Cross section area",
        "description": "Smallest cross section area in square metres of the tunnel",
        "iri": "http://data.europa.eu/949/crossSectionArea",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.8"
        ],
        "xml_names": [
            "ITU_CrossSectionArea"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory if the speed of the line is equal or greater than 200km/h",
        "validation_rules": [
            {
                "comment": "Smallest cross section area in square metres of the tunnel.",
                "message": "crossSectionArea (1.1.1.1.8.8): A Tunnel can have at most one crossSectionArea. This error may be due to having a tunnel with more than one crossSectionArea or having a value  that is not an integer number."
            },
            {
                "comment": "Y (applicable) if is speed of the line equal or greater than 200km/h.",
                "message": "crossSectionArea (1.1.1.1.8.8): The Tunnel {$this} ({?label}) has a maximum permitted speed of {?tunnelSpeed} Km/h . For any tunnel with a speed of the line equal or greater than 200km/h the crossSectionArea parameter is applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Smallest real cross section area (expressed in square metres) of the tunnel.Reference: 4.2.10.1 of INF TSI on Maximum pressure variations in tunnels.",
        "see_also": "https://eur-lex.europa.eu/eli/reg/2014/1299/2023-09-28#:~:text=4.2.10.1.%C2%A0%C2%A0%C2%A0%20Maximum%20pressure%20variations%20in%20tunnels [4.2.10.1 of INF TSI on Maximum pressure variations in tunnels |",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#crossSectionArea"
    },
    "ITU_TSITunnel": {
        "group": "DP",
        "title": "Compliance of the tunnel with TSI INF",
        "description": "Compliance of the tunnel with TSI INF at the maximum permitted speed",
        "iri": "http://data.europa.eu/949/complianceInfTsi",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.8.1"
        ],
        "xml_names": [
            "ITU_TSITunnel"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory if the speed of the line is equal or greater than 200km/h",
        "validation_rules": [
            {
                "comment": "Compliance of the tunnel with INF TSI at the maximum permitted speed.",
                "message": "complianceInfTsi (1.1.1.1.8.8.1): A Tunnel can have at most one complianceInfTsi. This error may be due to having a tunnel with more than one complianceInfTsi or having a value type different than Y/N (boolean)."
            },
            {
                "comment": "Y (applicable) if is speed of the line equal or greater than 200km/h.",
                "message": "complianceInfTsi (1.1.1.1.8.9, 1.2.1.0.5.6, 1.2.2.0.5.6): The Tunnel {$this} ({?label}) has a maximum permitted speed of {?tunnelSpeed} Km/h . For any tunnel with a speed of the line equal or greater than 200km/h the complianceInfTsi parameter is applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "see_also": "[4.2.10.1 of INF TSI on Maximum pressure variations in tunnels | ] https://eur-lex.europa.eu/eli/reg/2014/1299/2023-09-28#:~:text=4.2.10.1.%C2%A0%C2%A0%C2%A0%20Maximum%20pressure%20variations%20in%20tunnels",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#complianceInfTsi"
    },
    "ITU_TunnelDocRef": {
        "group": "OP",
        "title": "Document available from the IM with precise description of the tunnel",
        "description": "Electronic document available from the IM stored by the Agency with precise description of the clearance gauge and geometry of the tunnel.",
        "iri": "http://data.europa.eu/949/tunnelDocRef",
        "parameter_of": [
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.8.2"
        ],
        "xml_names": [
            "ITU_TunnelDocRef"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Electronic document available from the IM stored by the Agency with precise description of the clearance gauge and geometry of the tunnel",
                "message": "tunnelDocRef (1.1.1.1.8.8.2): A Tunnel has a tunnelDocRef with precise description of the clearance gauge and geometry of the tunnel, and it must be a Document. This error a due to having a value that is not an instance of Document"
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tunnelDocRef"
    },
    "ITU_EmergencyPlan": {
        "group": "DP",
        "title": "Existence of emergency plan",
        "description": "Indication whether emergency plan exists.",
        "iri": "http://data.europa.eu/949/hasEmergencyPlan",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.9",
            "1.2.1.0.5.6",
            "1.2.2.0.5.6"
        ],
        "xml_names": [
            "ITU_EmergencyPlan"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory for tunnels longer than 1 km",
        "validation_rules": [
            {
                "comment": "Applicable for tunnels longer than 1 km.",
                "message": "hasEmergencyPlan (1.1.1.1.8.9, 1.2.1.0.5.6, 1.2.2.0.5.6): The Tunnel {$this} ({?label}) has a length of {?tunnelLength} meters. Any tunnel longer than 1 Km makes the hasEmergencyPlan parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Indication whether emergency plan exists.",
                "message": "hasEmergencyPlan (1.1.1.1.8.9, 1.2.1.0.5.6, 1.2.2.0.5.6): A Tunnel has an indication about the existence of an emergency plan. This error may be due to having a tunnel with more than one value for hasEmergencyPlan or having a value type different than Y/N (boolean)."
            }
        ],
        "general_explanation": "A value may not be applicable for tunnels shorter than 1 km, as for them the fire category according SRT TSI does not exist.Emergency plan has to be a document developed for each tunnel under the direction of the IM, in co-operation, where appropriate, with RUs, Rescue services and relevant authorities. It shall be consistent with the self-rescue, evacuation and rescue facilities provided.It is applicable for tunnels longer than 1 km, in accordance with section 4.4.2 of SRT TSI, the emergency plan is mandatory only for tunnel length of more than 1km.                     SRT TSI: 4.4.2OPE TSI: 4.2.3.7",
        "see_also": "SRT TSI: 4.4.2OPE TSI: 4.2.3.7",
        "references": "http://data.europa.eu/eli/reg/2014/1303/2024-01-29",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasEmergencyPlan"
    },
    "ITU_FireCatReq": {
        "group": "OP",
        "title": "Fire category of rolling stock required",
        "description": "Categorisation how a passenger train with a fire on board will continue to operate for a defined time period",
        "iri": "http://data.europa.eu/949/rollingStockFireCategory",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.10",
            "1.2.1.0.5.7",
            "1.2.2.0.5.7"
        ],
        "xml_names": [
            "ITU_FireCatReq"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Rolling Stock Fire Categories",
        "values": [
            {
                "code": "10",
                "value": "A | Rolling stock which is designed and built to operate on underground sections and tunnels of not more than 5 km in length, with side evacuation available is defined as category A"
            },
            {
                "code": "20",
                "value": "B | Rolling stock which is designed and built to operate in all tunnels of the trans-European Network is defined as category B"
            },
            {
                "code": "30",
                "value": "None | None | None of rolling stock fire categories A or B shall be applied on a tunnel"
            }
        ],
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory for tunnels longer than 1 km",
        "validation_rules": [
            {
                "comment": "Applicable for tunnels longer than 1 km.",
                "message": "rollingStockFireCategory (1.1.1.1.8.10, 1.2.1.0.5.7, 1.2.2.0.5.7): The Tunnel {$this} ({?label}) has a length of {?tunnelLength} meters. Any tunnel longer than 1 Km makes the rollingStockFireCategory parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Categorisation on how a passenger train with a fire on board will continue to operate for a defined time period",
                "message": "Categorisation on how a passenger train with a fire on board will continue to operate (1.1.1.1.8.10, 1.2.1.0.5.7, 1.2.2.0.5.7): The tunnel {$this} (label {?tunnelLabel}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/rolling-stock-fire/Categories."
            },
            {
                "comment": "Categorisation on how a passenger train with a fire on board will continue to operate for a defined time period",
                "message": "rollingStockFireCategory (1.1.1.1.8.10, 1.2.1.0.5.7, 1.2.2.0.5.7): A Tunnel may have an indication about the rollingStockFireCategory. This error may be due to having a tunnel without a rollingStockFireCategory declaration or having a literal as value. This error may be due to a tunnel having more than one value or having a value that is not an IRI."
            }
        ],
        "general_explanation": "Wherever category B is not needed, generally the category A has to be understood as the default value.  None  shall be selected when none of A or B fire category is applied for a specific tunnel.For tunnels shorter than 1km, the fire category according to SRT TSI does not exist.",
        "see_also": "SRT TSI: 4.2.3.3.4  LOC&PAS TSI : 4.2.10.4.4",
        "references": "http://data.europa.eu/eli/reg/2014/1302/2023-09-28 ; http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg/2014/1303/2024-01-29",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#rollingStockFireCategory"
    },
    "ITU_NatFireCatReq": {
        "group": "DP",
        "title": "National fire category of rolling stock required",
        "description": "Categorisation of how a passenger train with a fire on board will continue to operate for a defined time period - according to national rules if they exist.",
        "iri": "http://data.europa.eu/949/nationalRollingStockFireCategory",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.11",
            "1.2.1.0.5.8",
            "1.2.2.0.5.8"
        ],
        "xml_names": [
            "ITU_NatFireCatReq"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory for tunnels without value for 1.1.1.8.10 and where national values exist.",
        "validation_rules": [
            {
                "comment": "Applicable only for tunnels when for the parameter 1.1.1.1.8.10 the option 'none' was selected and national rules exist.",
                "message": "nationalRollingStockFireCategory (1.1.1.1.8.11, 1.2.1.0.5.8, 1.2.2.0.5.8): The Tunnel {$this} ({?clsLabel}), has a 'rolling stock fire' category that makes the nationalRollingStockFireCategory parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Categorisation on how a passenger train with a fire on board will continue to operate for a defined time period - according to national rules if they exist.",
                "message": "nationalRollingStockFireCategory (1.1.1.1.8.11, 1.2.1.0.5.8, 1.2.2.0.5.8): A Tunnel may have an indication about the nationalRollingStockFireCategory. This error may be due to having a tunnel with more than one value or having a value type different than string."
            }
        ],
        "general_explanation": "Data shall include both the category and brief name of the document introducing the categorisation.A value is mandatory only for tunnels when the value of the parameter 1.1.1.1.8.10 is  none  and national rules exist.It may be not applicable when respective national rules do not exist",
        "see_also": "SRT TSI: 4.2.3.3.4                                     LOC&PAS TSI : 4.2.10.4.4",
        "references": "http://data.europa.eu/eli/reg/2014/1303/2024-01-29",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#nationalRollingStockFireCategory"
    },
    "ITU_Walkways": {
        "group": "DP",
        "title": "Existence of walkways",
        "description": "Indication of existence of walkways",
        "iri": "http://data.europa.eu/949/hasWalkway",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.12",
            "1.2.1.0.5.10",
            "1.2.2.0.5.9"
        ],
        "xml_names": [
            "ITU_Walkways"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory for TSI-compliant tunnels longer than 0.5 km",
        "validation_rules": [
            {
                "comment": "Indication of existence of walkways.",
                "message": "hasWalkway (1.1.1.1.8.12, 1.2.1.0.5.10, 1.2.2.0.5.9): A Tunnel can have at most one hasWalkway. This error may be due to having a tunnel with more than one hasWalkway or having a value type different than Y/N (boolean)."
            }
        ],
        "general_explanation": "Indicates the existence of \"Escape walkways\", if the tunnel is longer than 0.5km then definition from Section 4.2.1.6 of TSI SRT applies.If the selected value is \"true\", provide the boolean value for \"Is TSI compliant\".On top of the requirements set out in the TSI SRT, the application guide to the TSI allows to use a ballastless track as a walkway. So, a 'Yes' in this parameters might not result in a physical standalone walkway.For Siding the mechanism to locate a specific object is different depending on the member state. The TWG is still working on it.",
        "see_also": "Point 4.2.1.6. \"Escape walkways\" of the Commission Regulation (EU) No 1303/2014 of 18 November 2014 concerning the technical specification for interoperability relating to safety in railway tunnels of the rail system of the European Union|https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1566396648532&uri=CELEX%3A02014R1303-20190616",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasWalkway"
    },
    "ITU_EvacAndRescuePoints": {
        "group": "DP",
        "title": "Existence of evacuation and rescue points",
        "description": "Indication of existence of evacuation and rescue points",
        "iri": "http://data.europa.eu/949/hasEvacuationAndRescuePoints",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.1.1.1.8.13",
            "1.2.1.0.5.11",
            "1.2.2.0.5.10"
        ],
        "xml_names": [
            "ITU_EvacAndRescuePoints"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory for TSI-compliant tunnels longer than 0.5 km",
        "validation_rules": [
            {
                "comment": "Indication of existence of evacuation and rescue points.",
                "message": "hasEvacuationAndRescuePoints (1.1.1.1.8.13, 1.2.1.0.5.11, 1.2.2.0.5.10): A Tunnel has an indication about the existence of an evacuation and rescue points. This error may be due to having a tunnel with more than one value for hasEvacuationAndRescuePoints or having a value type different than Y/N (boolean)."
            }
        ],
        "see_also": "Point 4.2.1.7.  \"Evacuation and rescue points\" of the Commission Regulation (EU) No 1303/2014 of 18 November 2014 concerning the technical specification for interoperability relating to safety in railway tunnels of the rail system of the European Union|https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1566396648532&uri=CELEX%3A02014R1303-20190616",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasEvacuationAndRescuePoints"
    },
    "EDE_ECVerification": {
        "group": "DP",
        "title": "EC declaration of verification for track relating to compliance with the requirements from TSIs applicable to energy subsystem",
        "description": "Unique number for EC declarations in accordance with Commission Implementing Regulation (EU) 2019/250.",
        "iri": "http://data.europa.eu/949/verificationENE",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.1.1"
        ],
        "xml_names": [
            "EDE_ECVerification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Declarations of verification for track\n                \n                (\n                \n                1.1.1.2.1 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Unique number for EC declarations following format requirements specified in the 'Document about practical arrangents for transmitting interoperability documents' .",
                "message": "verificationENE (1.1.1.2.1.1): The track has a number for EC declarations that must follow format CC/XXXXXXXXXXXXXX/YYYY/NNNNNN where CC is country code, XXXXX... is a number, YYYY is a year between 1900 and 2100, NNNNNN is the number for the EC declaration. This error may be due to the track having a value that does not follow the pattern."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#verificationENE"
    },
    "EDE_EIDemonstration": {
        "group": "DP",
        "title": "EI declaration of demonstration (as defined Recommendation 2014/881/EU) for track relating to compliance with the requirements from TSIs applicable to energy subsystem",
        "description": "Unique number for EI declarations following the same format requirements as specified for EC declarations in Annex VII of Commission Implementing Regulation (EU) 2019/250.",
        "iri": "http://data.europa.eu/949/demonstrationENE",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.1.2"
        ],
        "xml_names": [
            "EDE_EIDemonstration"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Declarations of verification for track\n                \n                (\n                \n                1.1.1.2.1 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Unique number for EI declarations following the same format requirements as specified in the 'Document about practical arrangents for transmitting interoperability documents'.",
                "message": "demonstrationENE (1.1.1.2.1.2): The track has a number for EI declarations that must follow format CC/XXXXXXXXXXXXXX/YYYY/NNNNNN where CC is country code, XXXXX... is a number, YYYY is a year between 1900 and 2100, NNNNNN is the number for the EI declaration. This error may be due to the track having a value that is not a tring or that does not follow the pattern."
            }
        ],
        "references": "http://data.europa.eu/eli/reco/2014/881/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#demonstrationENE"
    },
    "ECS_SystemType": {
        "group": "OP",
        "title": "Type of contact line system",
        "description": "Indication of the type of the contact line system.",
        "iri": "http://data.europa.eu/949/contactLineSystemType",
        "parameter_of": [
            "Contact Line System"
        ],
        "numbers": [
            "1.1.1.2.2.1.1"
        ],
        "xml_names": [
            "ECS_SystemType"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Contact Line Systems",
        "values": [
            {
                "code": "10",
                "value": "Overhead contact line (OCL)"
            },
            {
                "code": "20",
                "value": "Third Rail"
            },
            {
                "code": "30",
                "value": "Fourth Rail"
            },
            {
                "code": "40",
                "value": "Not electrified"
            }
        ],
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "If this parameter is repeated, parameters 1.1.1.2.2.1.2, and 1.1.1.2.2.2 shall be created also for the corresponding type. These two parameters are to be considered children of the current.",
        "validation_rules": [
            {
                "comment": "When the value “Third Rail” or “Fourth Rail” is chosen, parameters 1.1.1.2.2.3, 1.1.1.2.2.5 - 1.1.1.2.4.2.3, 1.1.1.2.5.2 and 1.1.1.2.5.3 are not applicable",
                "message": "contactLineSystemType (1.1.1.2.2.1.1): The Contact Line System {$this} ({?clsLabel}), has a 'Third Rail' or 'Fourth Rail' type, and at least one of its parameters has values for at least one of the parameters 1.1.1.2.2.3, 1.1.1.2.2.5 - 1.1.1.2.4.2.3, 1.1.1.2.5.2 and 1.1.1.2.5.3. This happens at least with property {?p} (RINF index {?index})."
            },
            {
                "comment": "When the value \"not electrified\" is chosen, all parameters 1.1.1.2.2.1.2 - 1.1.1.2.5.3 are not applicable",
                "message": "contactLineSystemType (1.1.1.2.2.1.1): The Contact Line System {$this} ({?clsLabel}), has a 'Not electrified' type, and at least one of its parameters has values for at least one of the range of parameters between 1.1.1.2.2.1.2 and 1.1.1.2.5.3. This happens at least with property {?p} (RINF index {?index})."
            },
            {
                "comment": "Indication of the type of the contact line system",
                "message": "contactLineSystemType (1.1.1.2.2.1.1): The contact line system must have a contact line system type, and its value must be an IRI. This error is due to the contact line system not having a value for this property, having more than one value for this property, or having a value that is not an IRI."
            },
            {
                "comment": "Indication of the type of the contact line system",
                "message": "contactLineSystemType (1.1.1.2.2.1.1): The contact line system {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/contact-line-systems/ContactLineSystems."
            }
        ],
        "general_explanation": "When the value is \"not electrified\", then all parameters 1.1.1.2.2.1.2 - 1.1.1.2.5.3 are not applicable. When the value is “Third Rail” or “Fourth Rail”, then parameters 1.1.1.2.2.3, 1.1.1.2.2.5 - 1.1.1.2.4.2.3, 1.1.1.2.5.2 and 1.1.1.2.5.3 are not applicableFor RINF XML data sets:As long as the data provision through XML data sets is allowed, if this parameter is repeated, parameters 1.1.1.2.2.1.2, 1.1.1.2.2.2, 1.1.1.2.2.4 and 1.1.1.2.5.1 shall be created also for the corresponding type. These four parameters are to be considered children of the current. For grouping “children” parameters of the current parameter, an XML attribute called “set” must be declared at the parent and children levels with the same keyword value.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#contactLineSystemType"
    },
    "ECS_VoltFreq": {
        "group": "OP",
        "title": "Energy supply system (Voltage and frequency)",
        "description": "Indication of the traction supply system (nominal voltage and frequency).",
        "iri": "http://data.europa.eu/949/energySupplySystem",
        "parameter_of": [
            "Contact Line System",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.2.2.1.2"
        ],
        "xml_names": [
            "ECS_VoltFreq"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Energy Supply Systems",
        "values": [
            {
                "code": "AC10",
                "value": "AC 25kV-50Hz"
            },
            {
                "code": "AC20",
                "value": "AC 15kV-16.7Hz | 15kV-16 2/3Hz : 2646 kW , 1kV-16 2/3 Hz or 50 Hz"
            },
            {
                "code": "DC30",
                "value": "DC 3kV | 3000V DC, 3kV (PL, CZ, SK)"
            },
            {
                "code": "DC40",
                "value": "DC 1.5kV | 1.5kV Specific Case IE, 1.5kV (Specific Case IE), 1500"
            },
            {
                "code": "DC60",
                "value": "DC 750V | DC 750V third rail, Vía Urbana e Interurbana 750 Vdc, 750V, DC750V"
            },
            {
                "code": "DC70",
                "value": "DC 650V"
            },
            {
                "code": "DC80",
                "value": "DC 600 V"
            },
            {
                "code": "DC90",
                "value": "DC 850V"
            }
        ],
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "When `not electrified` is chosen in parameter 1.1.1.2.2.1.1, then this parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication of the traction supply system",
                "message": "energySupplySystem (1.1.1.2.2.1.2): The contact line system defines the energy supply system.This error is due to a contact line system having more than one value for this property or having a value that is not an IRI."
            },
            {
                "comment": "Indication of the traction supply system",
                "message": "energySupplySystem (1.1.1.2.2.1.2): The contact line system {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/energy-supply-systems/EnergySupplySystems."
            }
        ],
        "general_explanation": "If the real values exceed range of the EN 50163:2004+A1:2007+A2:2020+A3:2022, they could be introduced by the Agency on request via a process of change request.See: ENE TSI: 4.2.3 and EN 50163:2004: clause 4For RINF XML data sets:As long as the data provision through XML data sets is allowed, an XML attribute called “Set” will be used to link the value of this parameter to the parameter 1.1.1.2.2.1.1 / ECS_SystemType",
        "see_also": "EN 50163:2004+A1:2007+A2:2020+A3:2022: clause 4ENE TSI:4.2.3 ENE TSI: 4.2.3 and EN 50163:2004: clause 4",
        "references": "http://data.europa.eu/eli/reg/2014/1301/2023-09-28 ; http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#energySupplySystem"
    },
    "ECS_Umax2": {
        "group": "DP",
        "title": "Umax2 for the French network",
        "description": "Highest non-permanent voltage (Umax2) for France on lines not compliant with values defined in the EN50163:2004+A1:2007+A2:2020+A3:2022",
        "iri": "http://data.europa.eu/949/umax2",
        "parameter_of": [
            "Contact Line System"
        ],
        "numbers": [
            "1.1.1.2.2.1.3"
        ],
        "xml_names": [
            "ECS_Umax2"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "When `not electrified` is chosen in parameter 1.1.1.2.2.1.1, then this parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Umax2 for lines referred to in sections 7.4.2.2.1 and 7.4.2.11.1 of Regulation (EU) 1301/2014",
                "message": "umax2 (1.1.1.2.2.1.3): The contact line system defines the Umax2 . This error is due to having more than one value for this property, having a value that is not an integer, or having an integer that does not follow the pattern [NNNNNN]."
            }
        ],
        "general_explanation": "Specific for the French network. It may concern DC 1.5kV and AC 25kV.                    For RINF XML data sets:As long as the data provision through XML data sets is allowed, an XML attribute called “Set” will be used to link the value of this parameter to the parameter 1.1.1.2.2.1.1 / ECS_SystemType",
        "see_also": "ENE TSI: 4.2.4.1",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#umax2"
    },
    "ECS_MaxTrainCurrent": {
        "group": "DP",
        "title": "Maximum train current",
        "description": "Indication of the maximum allowable train current expressed in amperes.",
        "iri": "http://data.europa.eu/949/maxTrainCurrent",
        "parameter_of": [
            "Contact Line System"
        ],
        "numbers": [
            "1.1.1.2.2.2"
        ],
        "xml_names": [
            "ECS_MaxTrainCurrent"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "When `not electrified` is chosen in parameter 1.1.1.2.2.1.1, then this parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication of the maximum allowable train current",
                "message": "maxTrainCurrent (1.1.1.2.2.2): Defines the maximum allowable train current of the contact line system. This error is due to having more than one value for this property, having a value that is not an integer, or having an integer that does not follow the pattern [NNNN]."
            }
        ],
        "general_explanation": "For RINF XML data sets:As long as the data provision through XML data sets is allowed, an XML attribute called \"Set\" will be used to link the value of this parameter to the parameter 1.1.1.2.2.1.1 / ECS_SystemType",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maxTrainCurrent"
    },
    "ECS_MaxStandstillCurrent": {
        "group": "DP",
        "title": "Maximum current at standstill per pantograph",
        "description": "Indication of the maximum allowable train current at standstill expressed in amperes.",
        "iri": "http://data.europa.eu/949/maxCurrentStandstillPantograph",
        "parameter_of": [
            "Contact Line System",
            "Siding",
            "Vehicle type configuration parameter set"
        ],
        "numbers": [
            "1.1.1.2.2.3",
            "1.2.2.0.6.1"
        ],
        "xml_names": [
            "ECS_MaxStandstillCurrent"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and- by 16 March 2019 at the latest for DC systems;- by 30 June 2024 for AC systems.",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 ) Vehicle type technical characteristic",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "This parameter is applicable only the type of contact line system is 'Overhead contact line (OCL)'In sidings, it may be not applicable, in the following cases:- siding is not electrified- Siding is destined to freight traffic, whose trains have a low consumption in stationary (the maximum demand of energy is due to air conditioning systems, which is not significant in these trains).- Siding is used in access to depots or workshops. [ERATV] This parameter is applicable only if Overhead contact line (OCL) is selected for parameter 1.1.1.2.2.1.1.",
        "validation_rules": [
            {
                "comment": "This parameter is applicable (“Y”) only if “Overhead contact line (OCL)” is selected for parameter 1.1.1.2.2.1.1.",
                "message": "maxCurrentStandstillPantograph (1.1.1.2.2.3, 1.2.2.0.6.1):The Contact Line System {$this} ({?clsLabel}), has a 'Overhead contact line (OCL)' type which makes the maxCurrentStandstillPantograph parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Indication of the maximum allowable current at standstill per pantograph",
                "message": "maxCurrentStandstillPantograph (1.1.1.2.2.3, 1.2.2.0.6.1): Defines the maximum allowable current at standstill per pantograph for the contact line system. This error is due to having more than one value for this property, having a value that is not an integer, or having an integer that does not follow the pattern [NNN]."
            },
            {
                "comment": "Indication of the maximum allowable train current at standstill for DC systems expressed in amperes",
                "message": "maxCurrentStandstillPantograph (1.1.1.2.2.3, 1.2.2.0.6.1): Each siding may define the maximum allowable train current at standstill for DC systems expressed in amperes. This error is due to having a max current standstill pantograph value that is not a double (real) number."
            }
        ],
        "general_explanation": "Parameter related to current taken by the vehicle when it is not in a traction or regenerative mode, e.g. preheating, air-condition, etc.Due to operational reasons, trains can get stuck on SoL for hours, and in some cases, this parameter is even the reason the air-condition is shut down [ERATV] Parameter related to current taken by the vehicle when it is not in a traction or regenerative mode, e.g. preheating, air-condition, etc.                                                  When used for VehicleType, the parameter must have as range a VehicleTypeConfigParameterSet, of which the VehicleTypeConfigurationat least contains one EnergySystem, from the ones recorded under `era:energySupplySystem`. Further, all of the ENE supply systems mentioned under that parametermust have a value for this parameter `era:maxCurrentStandstillPantograph`.",
        "see_also": "ENE TSI: 4.2.5, LOC&PAS TSI: 4.2.8.2.5",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maxCurrentStandstillPantograph"
    },
    "ECS_RegenerativeBraking": {
        "group": "OP",
        "title": "Permission for regenerative braking",
        "description": "Indication whether regenerative braking is permitted, not permitted, or permitted under specific conditions.",
        "iri": "http://data.europa.eu/949/conditionalRegenerativeBrake",
        "parameter_of": [
            "Contact Line System"
        ],
        "numbers": [
            "1.1.1.2.2.4"
        ],
        "xml_names": [
            "ECS_RegenerativeBraking"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Track parameters\n                \n                (\n                \n                1.1.1.1.4 | 1.2.1.0.4 ) Track resistance to applied loads\n                \n                (\n                \n                1.1.1.1.6 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Regenerative Braking",
        "values": [
            {
                "code": "10",
                "value": "Allowed"
            },
            {
                "code": "20",
                "value": "Allowed under conditions"
            },
            {
                "code": "30",
                "value": "Allowed only for emergency brake"
            },
            {
                "code": "40",
                "value": "Allowed under conditions only for emergency brake"
            },
            {
                "code": "50",
                "value": "Not allowed"
            }
        ],
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "When `not electrified` is chosen in parameter 1.1.1.2.2.1.1, then this parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication whether regenerative braking is permitted, not permitted, or permitted under specific conditions.",
                "message": "conditionalRegenerativeBrake (1.1.1.2.2.4):): The track {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/regenerative-braking/RegenerativeBraking."
            },
            {
                "comment": "Indication whether regenerative braking is permitted, not permitted, or permitted under specific conditions.",
                "message": "conditionalRegenerativeBrake (1.1.1.2.2.4): The track defines if the regenerative brake is permitted. This error is due to having more than one value for this property or having a value that is not  an IRI."
            }
        ],
        "general_explanation": "When regenerative braking is \"allowed under conditions\", a document must be provided under 1.1.1.2.2.4.1.For RINF XML data sets:As long as the data provision through XML data sets is allowed, an XML attribute called “Set” will be used to link the value of this parameter to the parameter 1.1.1.2.2.1.1 / ECS_SystemType",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#conditionalRegenerativeBrake"
    },
    "ECS_ConditionRegBraking": {
        "group": "OP",
        "title": "Conditions applying in regards to regenerative braking",
        "description": "Name and/or reference of the document specifying the conditions applying in regards to regenerative braking.",
        "iri": "http://data.europa.eu/949/conditionsAppliedRegenerativeBraking",
        "parameter_of": [
            "Contact Line System"
        ],
        "numbers": [
            "1.1.1.2.2.4.1"
        ],
        "xml_names": [
            "ECS_ConditionRegBraking"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "When `not electrified` is chosen in parameter 1.1.1.2.2.1.1, then this parameter is not applicable. Mandatory when parameter 1.1.1.2.2.4 announces Conditions.",
        "validation_rules": [
            {
                "comment": "Name and/or reference of the document specifying the conditions applying in regards to regenerative braking.",
                "message": "conditionsAppliedRegenerativeBraking (1.1.1.2.2.4.1): The contact line system has a conditionsAppliedRegenerativeBraking reference that must be a Document. This error is due to having more than one value for this property or having a value that is not a Document."
            },
            {
                "comment": "This parameter is applicable (“Y”) only if “Overhead contact line (OCL)” is selected for parameter 1.1.1.2.2.1.1 and the regenerative braking status is “under conditions” (20) or “under conditions only for emergency brake” (40).",
                "message": "conditionsAppliedRegenerativeBraking (1.1.1.2.2.4.1):The Contact Line System {$this} ({?clsLabel}), has a 'Overhead contact line (OCL)' type and a conditional regenerative braking status which makes the conditionsAppliedRegenerativeBraking parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg_impl/2019/777/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#conditionsAppliedRegenerativeBraking"
    },
    "ECS_MaxWireHeight": {
        "group": "DP",
        "title": "Maximum contact wire height",
        "description": "Indication of the maximum contact wire height expressed in metres.",
        "iri": "http://data.europa.eu/949/maximumContactWireHeight",
        "parameter_of": [
            "Contact Line System",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.2.2.5"
        ],
        "xml_names": [
            "ECS_MaxWireHeight"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 ) Vehicle type technical characteristic",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory only if “Overhead contact line (OCL)” is selected in 1.1.1.2.2.1.1, otherwise the parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication of the maximum contact wire height expressed in metres",
                "message": "maximumContactWireHeight (1.1.1.2.2.5): The contact line system defines a maximum contact wire height expressed in metres. This error is due to having more than one value for this property, having a value that is not a double (real) number, or having a number that does not follow the pattern [N.NN] (with up to 2 decimals)."
            },
            {
                "comment": "This parameter is applicable (“Y”) only if “Overhead contact line (OCL)” is selected for parameter 1.1.1.2.2.1.1.",
                "message": "maximumContactWireHeight (1.1.1.2.2.6):The Contact Line System {$this} ({?clsLabel}), has a 'Overhead contact line (OCL)' type which makes the maximumContactWireHeight parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "The value given can be design value or the last known measured value. If there is no change in height, nominal value will be given.Values shall be given in metres with precision of 0.01 m. When used for VehicleType, the parameter must have as range a VehicleTypeConfigParameterSet, of which the VehicleTypeConfigurationat least contains one EnergySystem, from the ones recorded under `era:energySupplySystem`. Further, all of the ENE supply systems mentioned under that parametermust have a value for this parameter `era:maximumContactWireHeight`.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maximumContactWireHeight"
    },
    "ECS_MinWireHeight": {
        "group": "DP",
        "title": "Minimum contact wire height",
        "description": "Indication of the minimum contact wire height expressed in metres.",
        "iri": "http://data.europa.eu/949/minimumContactWireHeight",
        "parameter_of": [
            "Contact Line System",
            "Vehicle type configuration parameter set"
        ],
        "numbers": [
            "1.1.1.2.2.6"
        ],
        "xml_names": [
            "ECS_MinWireHeight"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Contact line system\n                \n                (\n                \n                1.1.1.2.2 ) Vehicle type technical characteristic",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "When `not electrified` is chosen in parameter 1.1.1.2.2.1.1, then this parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication of the minimum minimum contact wire height expressed in metres",
                "message": "minimumContactWireHeight (1.1.1.2.2.6): The contact line system defines a minimum contact wire height expressed in metres. This error is due to having more than one value for this property, having a value that is not a double (real) number, or having a number that does not follow the pattern [N.NN] (with up to 2 decimals)."
            },
            {
                "comment": "This parameter is applicable (“Y”) only if “Overhead contact line (OCL)” is selected for parameter 1.1.1.2.2.1.1.",
                "message": "minimumContactWireHeight (1.1.1.2.2.6):The Contact Line System {$this} ({?clsLabel}), has a 'Overhead contact line (OCL)' type which makes the minimumContactWireHeight parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "When used for VehicleType, the parameter must have as range a VehicleTypeConfigParameterSet, of which the VehicleTypeConfigurationat least contains one EnergySystem, from the ones recorded under `era:energySupplySystem`. Further, all of the ENE supply systems mentioned under that parametermust have a value for this parameter `era:minimumContactWireHeight`. The value given can be design value or the last known measured value. If there is no change in height, nominal value will be given.Values shall be given in metres with precision of 0.01 m.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#minimumContactWireHeight"
    },
    "EPA_TSIHeads": {
        "group": "OP",
        "title": "Accepted TSI compliant pantograph heads",
        "description": "Indication of TSI compliant pantograph heads which are allowed to be used.",
        "iri": "http://data.europa.eu/949/tsiPantographHead",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.3.1"
        ],
        "xml_names": [
            "EPA_TSIHeads"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Pantograph\n                \n                (\n                \n                1.1.1.2.3 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "CompliantPantograph Heads",
        "values": [
            {
                "code": "10",
                "value": "1950 mm (Type 1) with non-insulated horns"
            },
            {
                "code": "20",
                "value": "1600 mm (EP)"
            },
            {
                "code": "30",
                "value": "2000 mm – 2260 mm"
            },
            {
                "code": "40",
                "value": "None"
            },
            {
                "code": "50",
                "value": "1950 mm (Type 1) with insulated horns"
            }
        ],
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory only if “Overhead contact line (OCL)” is selected in 1.1.1.2.2.1.1, otherwise the parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication of TSI compliant pantograph heads which are allowed to be used.",
                "message": "tsiPantographHead (1.1.1.2.3.1): This error is due to the track {?trackLabel} , violating the rule: This parameter is applicable ('Y') only if “Overhead contact line (OCL)” is selected for 1.1.1.2.2.1.1."
            },
            {
                "comment": "Indication of TSI compliant pantograph heads which are allowed to be used.",
                "message": "tsiPantographHead (1.1.1.2.3.1): The track may have TSI compliant pantograph head values and each must be an IRI. This error may be due to having a value that is not an IRI."
            },
            {
                "comment": "Accepted TSI compliant pantograph heads.",
                "message": "Indication of the tsiPantographHead (1.1.1.2.3.1):): The track {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/compliant-pantograph-heads/CompliantPantographHeads."
            }
        ],
        "general_explanation": "The parameter can contain more than one pantograph defined in LOC&PAS TSI. Presentation of those pantographs is done by repetition of the parameter with a single selection. If declaring acceptance of pantograph heads 1950 (type 1), both insulated and conductive horns shall be accepted. The head geometry of pantograph type 1600 mm is as depicted in the points 4.2.8.2.9.2.1 of LOC&PAS TSI which refers to EN 50367:2020+A1:2022 Annex A.2 Figure A.6.The head geometry of pantograph type 1950 mm is as depicted in the points 4.2.8.2.9.2.2 of LOC&PAS TSI which refers to EN 50367:2020+A1:2022 Annex A.2 Figure A.7.The head geometry for pantograph type 2000/2260 mm is depicted in the point 4.2.8.2.9.2.3 of LOC&PAS TSI.",
        "see_also": "LOC&PAS TSI: 4.2.8.2.9.2EN 50367 (2012): Annex A.2 and EN 50206-1 (2010): 4.2 and 6.2.3",
        "references": "http://data.europa.eu/eli/reg/2014/1302/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tsiPantographHead"
    },
    "EPA_OtherHeads": {
        "group": "OP",
        "title": "Accepted other pantograph heads",
        "description": "Indication of pantograph heads which are allowed to be used.",
        "iri": "http://data.europa.eu/949/otherPantographHead",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.3.2"
        ],
        "xml_names": [
            "EPA_OtherHeads"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Pantograph\n                \n                (\n                \n                1.1.1.2.3 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Other Pantograph Heads",
        "values": [
            {
                "code": "10",
                "value": "1950 mm (Type2)"
            },
            {
                "code": "20",
                "value": "1950 mm (PL)"
            },
            {
                "code": "30",
                "value": "1800 mm (NO,SE)"
            },
            {
                "code": "40",
                "value": "1760 mm (BE)"
            },
            {
                "code": "70",
                "value": "1450 mm"
            },
            {
                "code": "90",
                "value": "None"
            },
            {
                "code": "100",
                "value": "1700 mm (ES)"
            },
            {
                "code": "110",
                "value": "1700 mm with insulated horns (ES)"
            },
            {
                "code": "120",
                "value": "1860 mm with insulated horns (ES)"
            }
        ],
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory only if “Overhead contact line (OCL)” is selected in 1.1.1.2.2.1.1, otherwise the parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication of pantograph heads which are allowed to be used.",
                "message": "otherPantographHead (1.1.1.2.3.2): This error is due to the track {?trackLabel} , violating the rule: This parameter is applicable ('Y') only if “Overhead contact line (OCL)” is selected for 1.1.1.2.2.1.1."
            },
            {
                "comment": "Indication of pantograph heads which are allowed to be used.",
                "message": "otherPantographHead (1.1.1.2.3.2): The track may have other pantograph head values and each must be an IRI. This error may be due to having a value that is not an IRI."
            },
            {
                "comment": "Indication of which other pantograph heads are allowed to be used.",
                "message": "Indication of the otherPantographHead (1.1.1.2.3.2):): The track {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/other-pantograph-heads/OtherPantographHeads."
            }
        ],
        "general_explanation": "The parameter may contain more than one type of the pantograph head - all of them shall be indicated by repetition of the parameter with different single selections.Additional values than the already identified in the list above are possible. They will be introduced by the Agency on request via a process of change request.",
        "see_also": "EN 50367:2020+A1:2022: Annex B3LOC&PAS TSI: 7.3.2.14 (specific cases)",
        "references": "http://data.europa.eu/eli/reg/2014/1302/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#otherPantographHead"
    },
    "EPA_NumRaisedSpeed": {
        "group": "OP",
        "title": "Requirements for number of raised pantographs and spacing between them, at the given speed",
        "description": "Indication of maximum number of raised pantographs per train allowed and minimum spacing centre line to centre line of adjacent pantograph heads, expressed in metres, at the given speed.",
        "iri": "http://data.europa.eu/949/trackRaisedPantographsDistanceAndSpeed",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.3.3"
        ],
        "xml_names": [
            "EPA_NumRaisedSpeed"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Pantograph\n                \n                (\n                \n                1.1.1.2.3 )",
        "data_presentation": "Requirements for number of raised pantographs and spacing between them, at the given speed",
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory only if “Overhead contact line (OCL)” is selected in 1.1.1.2.2.1.1, otherwise the parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Relates the track with the class RaisedPantporaphsDistanceAndSpeed. Indication of maximum number of raised pantographs per train allowed and minimum spacing centre line to centre line of adjacent pantograph heads, expressed in metres, at the given speed.",
                "message": "trackRaisedPantographsDistanceAndSpeed (1.1.1.2.3.3): The track defines a raised pantographs distance and speed value that must be an instance of RaisedPantographsDistanceAndSpeed."
            },
            {
                "comment": "Relates the track with the class RaisedPantographsDistanceAndSpeed. Indication of maximum number of raised pantographs per train allowed and minimum spacing centre line to centre line of adjacent pantograph heads, expressed in metres, at the given speed.",
                "message": "trackRaisedPantographsDistanceAndSpeed (1.1.1.2.3.3): This error is due to the track {?trackLabel} , violating the rule: This parameter is applicable ('Y') only if “Overhead contact line (OCL)” is selected for 1.1.1.2.2.1.1."
            }
        ],
        "general_explanation": "This parameter gives the information about the number of pantographs and the distance between them at a given speed for which the Overhead Contact Line (OCL) has been designed.As for different speeds different combinations of number of pantographs and distance between them may exist, so this parameter can be repeated to present all of them.The raised pantographs distance and speed is the indication of maximum number of raised pantographs per train allowed and minimum spacing centre line to centre line of adjacent pantograph heads, expressed in metres, at the given speed. See 4.2.13 (TSI ENE) and 4.2.8.2.9.7 (TSI LOC&PAS)",
        "see_also": "ENE TSI: 4.2.13 ; LOC&PAS TSI: 4.2.8.2.9.7",
        "references": "http://data.europa.eu/eli/reg/2014/1302/2023-09-28 ; http://data.europa.eu/eli/reg/2014/1301/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trackRaisedPantographsDistanceAndSpeed"
    },
    "EPA_StripMaterial": {
        "group": "DP",
        "title": "Contact strip material metallic content",
        "description": "Indication of max. percentage of contact strip material Impregnated Carbon permitted to be used.",
        "iri": "http://data.europa.eu/949/contactStripMaterialMetallicContent",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.3.4"
        ],
        "xml_names": [
            "EPA_StripMaterial"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Pantograph\n                \n                (\n                \n                1.1.1.2.3 )",
        "data_presentation": "Integer",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory only if impregnated carbon ([NN] % of metallic content)” is selected in 1.1.1.2.3.4, otherwise no value should be provided",
        "validation_rules": [
            {
                "comment": "In case that the value of the property era:contactStripMaterial is impregnated carbon, it is the metallic content, the maximum percentage allowed.",
                "message": "contactStripMaterialMetallicContent (1.1.1.2.3.4): The track has an indication of the material of the contact strip that must be an integer. This error may be due to the track having a value that is not an integer."
            }
        ],
        "general_explanation": "In case that the value of the property era:contactStripMaterial is \"impregnated carbon\", it is the metallic content in % (this value must be added). This is the maximum percentage allowed.",
        "see_also": "LOC&PAS TSI: 4.2.8.2.9.4.2",
        "references": "http://data.europa.eu/eli/reg/2014/1302/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#contactStripMaterialMetallicContent"
    },
    "EOS_Phase": {
        "group": "DP",
        "title": "Phase separation",
        "description": "Indication of existence of phase separation and required information.",
        "iri": "http://data.europa.eu/949/hasPhaseSeparation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.4.1.1"
        ],
        "xml_names": [
            "EOS_Phase"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "OCL separation sections\n                \n                (\n                \n                1.1.1.2.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value is mandatory only if 1.1.1.2.2.1.1 parameter values is  Overhead contact line (OCL) , otherwise applicability flag is \"N\" (not applicable)",
        "validation_rules": [
            {
                "comment": "Indication of existence of phase separation and required information.",
                "message": "hasPhaseSeparation (1.1.1.2.4.1.1): This error is due to the track {?trackLabel} , violating the rule: This parameter is applicable ('Y') only if “Overhead contact line (OCL)” is selected for 1.1.1.2.2.1.1."
            },
            {
                "comment": "Indication of existence of phase separation and required information.",
                "message": "hasPhaseSeparation (1.1.1.2.4.1.1): The track defines at most one existence of phase separation and required information value that is Y/N (boolean). This error may be due to the track having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "In case of existence of phase separation on the track or on the section of the line the option  True  shall be selected.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasPhaseSeparation"
    },
    "EOS_InfoPhase": {
        "group": "OP",
        "title": "Information on phase separation",
        "description": "Relates the Track with PhaseInfo. Indication of required several information on phase separation.",
        "iri": "http://data.europa.eu/949/trackPhaseInfo",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.4.1.2"
        ],
        "xml_names": [
            "EOS_InfoPhase"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "OCL separation sections\n                \n                (\n                \n                1.1.1.2.4 )",
        "data_presentation": "Phase info",
        "applicability_flags": "Y/N",
        "dependencies": "A value is mandatory only if 1.1.1.2.4.1.1 parameter \"Phase separation\" value is \"Y\" (true), otherwise applicability flag is \"N\" (not applicable)",
        "validation_rules": [
            {
                "comment": "Relates the Track with PhaseInfo. Indication of required several information on phase separation.",
                "message": "trackPhaseInfo (1.1.1.2.4.1.2): The track defines a track phase info value that must be an instance of PhaseInfo."
            },
            {
                "comment": "Relates the Track with PhaseInfo. Indication of required several information on phase separation.",
                "message": "trackPhaseInfo (1.1.1.2.4.1.2): This error is due to the track {?trackLabel} , violating the rule: Applicable when in parameter 1.1.1.2.4.1.1 selected option is ‘Y’"
            }
        ],
        "see_also": "ENE TSI: 4.2.15",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trackPhaseInfo"
    },
    "EOS_System": {
        "group": "DP",
        "title": "System separation",
        "description": "Indication of existence of system separation",
        "iri": "http://data.europa.eu/949/hasSystemSeparation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.4.2.1"
        ],
        "xml_names": [
            "EOS_System"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "OCL separation sections\n                \n                (\n                \n                1.1.1.2.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "It is applicable ( Y ) only if the value  Overhead contact line (OCL)  is selected for parameter \"Type of contact line system\"",
        "validation_rules": [
            {
                "comment": "Indication of existence of system separation.",
                "message": "hasSystemSeparation (1.1.1.2.4.2.1): The track has at most one existence of system separation value that must be Y/N (boolean). This error may be due to the track having more than one value or to having a value that is not Y/N (boolean)."
            },
            {
                "comment": "Indication of existence of system separation.",
                "message": "hasSystemSeparation (1.1.1.2.4.2.1): This error is due to the track {?trackLabel} , violating the rule: This parameter is applicable ('Y') only if “Overhead contact line (OCL)” is selected for 1.1.1.2.2.1.1."
            }
        ],
        "general_explanation": "In case of existence of system separation on the track or on the section of the line and required information on the section of the line, the option  Y=yes  shall be selected.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasSystemSeparation"
    },
    "EOS_InfoSystem": {
        "group": "OP",
        "title": "Information on system separation",
        "description": "Indication of required several information on system separation",
        "iri": "http://data.europa.eu/949/trackSystemSeparationInfo",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.4.2.2"
        ],
        "xml_names": [
            "EOS_InfoSystem"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "OCL separation sections\n                \n                (\n                \n                1.1.1.2.4 )",
        "data_presentation": "System separation info",
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory if there is an indication of existence of system separation (parameter 1.1.1.2.4.2.1)",
        "validation_rules": [
            {
                "comment": "Relates the Track with the SystemSeparationInfo. Indication of required several information on system separation.",
                "message": "trackSystemSeparationInfo (1.1.1.2.4.2.2): The track defines a system separation info value that must be an instance of SystemSeparationInfo."
            },
            {
                "comment": "Relates the Track with the SystemSeparationInfo. Indication of required several information on system separation.",
                "message": "trackSystemSeparationInfo (1.1.1.2.4.2.2): This error is due to the track {?trackLabel} , violating the rule: Applicable when in parameter 1.1.1.2.4.2.1 selected option is ‘Y’"
            }
        ],
        "general_explanation": "Length - the length of the system separation in metersSwitch off breaker - single selection of  Y=yes  or  N=no  to show whether the breaker has to be switched offLower pantograph - single selection of  Y=yes  or  N=no  to show whether the pantograph has to be loweredKm - the location from the start of the line where the new value is valid",
        "see_also": "ENE TSI: 4.2.16",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trackSystemSeparationInfo"
    },
    "EOS_DistSignToPhaseEnd": {
        "group": "DP",
        "title": "Distance between signboard and phase separation ending",
        "description": "Distance between the signboard authorizing the driver to  raise pantograph  or  close the circuit breaker  after passing the phase separation and the end of the phase separation section.",
        "iri": "http://data.europa.eu/949/distSignToPhaseEnd",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.4.3"
        ],
        "xml_names": [
            "EOS_DistSignToPhaseEnd"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "OCL separation sections\n                \n                (\n                \n                1.1.1.2.4 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "It is applicable ( Y ) only if the value  Overhead contact line (OCL)  is selected for parameter \"Type of contact line system\"",
        "validation_rules": [
            {
                "comment": "Specific for route compatibility check on French network. Distance between the signboard authorizing the driver to 'raise pantograph' or 'close the circuit breaker' after passing the phase separation and the end of the phase separation section.",
                "message": "distSignToPhaseEnd: The track must have at most one value of the distance between the signboard authorizing the driver to 'raise pantograph' or 'close the circuit breaker' after passing the phase separation and the end of the phase separation section, and the value is an integer. This error is due to the track having more than one value or to having a value that is not an integer."
            }
        ],
        "general_explanation": "Specific for route compatibility check on French network.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#distSignToPhaseEnd"
    },
    "ERS_PowerLimitOnBoard": {
        "group": "DP",
        "title": "Current or power limitation on board required",
        "description": "Indication of whether an on board current or power limitation function on vehicles is required.",
        "iri": "http://data.europa.eu/949/currentLimitationRequired",
        "parameter_of": [
            "Contact Line System"
        ],
        "numbers": [
            "1.1.1.2.5.1"
        ],
        "xml_names": [
            "ERS_PowerLimitOnBoard"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Requirements for rolling stock\n                \n                (\n                \n                1.1.1.2.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "dependencies": "When \"not electrified\" is chosen in parameter \"Type of contact line system\", then this parameter is not applicable.",
        "validation_rules": [
            {
                "comment": "Indication of whether an on board current or power limitation function on vehicles is required.",
                "message": "currentLimitationRequired (1.1.1.2.5.1): The track may have a current limitation required value that is a boolean. This error may be due to the track having a value that is not a boolean."
            },
            {
                "comment": "Indication of whether an on board current or power limitation function on vehicles is required.",
                "message": "currentLimitationRequired (1.1.1.2.5.1): This error is due to the track {?trackLabel} , violating the rule: When 'not electrified' is chosen in parameter 1.1.1.2.2.1.1, then this parameter is not applicable selection ‘N’."
            }
        ],
        "see_also": "LOC&PAS TSI: 4.2.8.2.4",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#currentLimitationRequired"
    },
    "ERS_ContactForce": {
        "group": "DP",
        "title": "Contact force permitted",
        "description": "Indication of contact force allowed expressed in newton.",
        "iri": "http://data.europa.eu/949/permittedContactForce",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.5.2"
        ],
        "xml_names": [
            "ERS_ContactForce"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Requirements for rolling stock\n                \n                (\n                \n                1.1.1.2.5 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value is mandatory if the value  Overhead contact line (OCL)  is selected for parameter \"Type of contact line system\"",
        "validation_rules": [
            {
                "comment": "Indication of contact force allowed expressed in newton.",
                "message": "permittedContactForce (1.1.1.2.5.2): This error is due to the track {?trackLabel} , violating the rule: This parameter is applicable ('Y') only if “Overhead contact line (OCL)” is selected for 1.1.1.2.2.1.1."
            },
            {
                "comment": "Indication of contact force allowed expressed in newtons.",
                "message": "permittedContactForce (1.1.1.2.5.2): The track must have at most one value of the contact force allowed expressed in newtons. This error is due to the track having more than one value or to having a value that is not a character string."
            }
        ],
        "general_explanation": "The formula of the function shall represent the curve describing the value of the contact force in relation to the speed.Static and maximum forces are given only for the maximum permitted line speed (see parameter number 1.1.1.1.2.5).",
        "see_also": "LOC&PAS TSI: 4.2.8.2.9.6ENE TSI: 4.2.11EN 50367:2020+A1:2022 Table 6",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#permittedContactForce"
    },
    "ERS_AutoDropRequired": {
        "group": "DP",
        "title": "Automatic dropping device required",
        "description": "Indication of whether an automatic dropping device (ADD) required on the vehicle.",
        "iri": "http://data.europa.eu/949/automaticDroppingDeviceRequired",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.5.3"
        ],
        "xml_names": [
            "ERS_AutoDropRequired"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Requirements for rolling stock\n                \n                (\n                \n                1.1.1.2.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value is mandatory if the value  Overhead contact line (OCL)  is selected for parameter \"Type of contact line system\"",
        "validation_rules": [
            {
                "comment": "Indication of the requirement of automatic dropping device.",
                "message": "automaticDroppingDeviceRequired (1.1.1.2.5.3): The track must have at most one value of the requirement of automatic dropping device and it is Y/N (boolean). This error is due to the track having more than one value or to having a value that is not Y/N (boolean)."
            },
            {
                "comment": "Indication of whether an automatic dropping device (ADD) required on the vehicle.",
                "message": "automaticDroppingDeviceRequired (1.1.1.2.5.3): This error is due to the track {?trackLabel} , violating the rule: This parameter is applicable ('Y') only if “Overhead contact line (OCL)” is selected for 1.1.1.2.2.1.1."
            }
        ],
        "see_also": "LOC&PAS TSI: 4.2.8.2.9.10EN 50206-1:2010",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#automaticDroppingDeviceRequired"
    },
    "ERS_RestrictionPowerConsDoc": {
        "group": "OP",
        "title": "Document with restriction related to power consumption of specific electric traction unit(s)",
        "description": "Name and/or reference of the document specifying the restriction(s) related to power consumption of specific electric traction unit(s).",
        "iri": "http://data.europa.eu/949/documentRestrictionPowerConsumption",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.5.4"
        ],
        "xml_names": [
            "ERS_RestrictionPowerConsDoc"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Requirements for rolling stock\n                \n                (\n                \n                1.1.1.2.5 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Document with restriction related to power consumption of specific electric traction unit(s).",
                "message": "documentRestrictionPowerConsumption (1.1.1.2.5.4): The track may have a Document with restriction related to power consumption of specific electric traction unit(s) value that is a Document. This error may be due to the track having a value that is not a Document."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#documentRestrictionPowerConsumption"
    },
    "ERS_RestrictionMTDoc": {
        "group": "OP",
        "title": "Document with restriction related to the position of Multiple Traction unit(s) to comply with contact line separation",
        "description": "Name and/or reference of the document specifying the restriction(s) related to the position of Multiple Traction unit(s) to comply with contact line separation.",
        "iri": "http://data.europa.eu/949/documentRestrictionPositionContactLineSeparation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.2.5.5"
        ],
        "xml_names": [
            "ERS_RestrictionMTDoc"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Requirements for rolling stock\n                \n                (\n                \n                1.1.1.2.5 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Document with restriction related to the position of Multiple Traction unit(s) to comply with contact line separation.",
                "message": "documentRestrictionPositionContactLineSeparation (1.1.1.2.5.5): The track may have a Document with restriction related to the position of Multiple Traction unit(s) to comply with contact line separation value that is a Document. This error may be due to the track having a value that is not a Document."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#documentRestrictionPositionContactLineSeparation"
    },
    "CDE_ECVerification": {
        "group": "DP",
        "title": "EC declaration of verification for track relating to compliance with the requirements from TSIs applicable to control, command signalling subsystem",
        "description": "Unique number for EC declarations in accordance with Commission Implementing Regulation (EU) 2019/250.",
        "iri": "http://data.europa.eu/949/verificationCCS",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Registration Case"
        ],
        "numbers": [
            "1.1.1.3.1.1"
        ],
        "xml_names": [
            "CDE_ECVerification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Declarations of verification for track\n                \n                (\n                \n                1.1.1.3.1 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Unique number for EC declarations following format requirements specified in the 'Document about practical arrangements for transmitting interoperability documents'.",
                "message": "verificationCCS (1.1.1.3.1.1): The track defines the unique number for EC declarations following format requirements specified in the 'Document about practical arrangements for transmitting interoperability documents; the value must be a string that follows the pattern [CC/RRRRRRRRRRRRRR/YYYY/NNNNNN] where the YYYY characters must be a number between 1900 and 2100, and the NNNNNN characters must be digits. This error is due to having a value that does not follow the pattern."
            }
        ],
        "general_explanation": "(CCS) in title means that here we include only declarations concerning command   control and signalling subsystem on the specific track. For the specific track the several EC declarations may be issued, so parameter has to repeated as many times as many numbers of declarations has to be presented.",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#verificationCCS"
    },
    "CPE_Level": {
        "group": "OP",
        "title": "European Train Control System (ETCS) level",
        "description": "ETCS application level related to the track side equipment.",
        "iri": "http://data.europa.eu/949/etcsLevelType",
        "parameter_of": [
            "ETCS"
        ],
        "numbers": [
            "1.1.1.3.2.1",
            "1.2.1.1.1.1"
        ],
        "xml_names": [
            "CPE_Level"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "ETCS Levels",
        "values": [
            {
                "code": "10",
                "value": "N/A (le code 10, non défini dans le RINF)"
            },
            {
                "code": "20",
                "value": "1"
            },
            {
                "code": "30",
                "value": "2"
            },
            {
                "code": "50",
                "value": "0"
            },
            {
                "code": "60",
                "value": "NTC"
            },
            {
                "code": "70",
                "value": "ETCS under construction"
            }
        ],
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indicates the type associated as a SKOS concept from the era:ETCSLevel related to the track side equipment.",
                "message": "etcsLevelType (1.1.1.3.2.1, 1.2.1.1.1.1): The ETCS has at most one etcsLevelType value and it must be an IRI. This error is due to the ETCS having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "Indicates the type associated as a SKOS concept from the era:ETCSLevel related to the track side equipment.",
                "message": "Indication of the etcsLevelType (1.1.1.3.2.1, 1.2.1.1.1.1): The ETCS {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/etcs-levels/."
            }
        ],
        "general_explanation": "The different ERTMS / ETCS application levels are a way to express the possible operating relationships between track and train.   Level definitions are principally related to the track side equipment used, to the way the track side information reaches the on-board units and to which functions are processed in the track side and in the on-board equipment respectively.If ETCS is on the trackside (one or more levels are selected), all other ETCS parameters (from 1.1.1.3.2.2 to 1.1.1.3.2.10) are applicable and mandatory to be populated with values .If the line is only equipped with Class B, this should be reflected in Parameter 1.1.1.3.5.3, and this parameter is “N”(not applicable). The ETCS value NTC is only relevant when the line is dual equipped with ETCS (i.e., balises are placed in the track) and Class B system, and both systems are in operation at the same time. In those cases, this parameter should be filled relevant ETCS Level and repeated with the value NTC.  If the line is only equipped with Class B, this should be reflected in Parameter 1.1.1.3.5.3, and this parameter etcsLevelType should not be used. See: TSI CCS (Subset-026, Chapter 2, 2.6)",
        "see_also": "TSI CCS (Subset-026, Chapter 2, 2.6)",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#etcsLevelType"
    },
    "CPE_Infill": {
        "group": "DP",
        "title": "ETCS infill necessary for line access",
        "description": "Indication whether infill is required to access the line for safety reasons.",
        "iri": "http://data.europa.eu/949/etcsInfillLineAccess",
        "parameter_of": [
            "ETCS",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.2.3",
            "1.2.1.1.1.3"
        ],
        "xml_names": [
            "CPE_Infill"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value has to be provided when ETCS is present (a value is provided on 1.1.1.3.2.1) and the ETCS level is 1.",
        "validation_rules": [
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "etcsInfillLineAccess (1.1.1.3.2.3, 1.2.1.1.1.3):The ETCS or subset {$this} ({?thisLabel}), has a 'ETCS Level Type' defined which makes the etcsInfillLineAccess parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Indication whether infill is required to access the line for safety reasons.",
                "message": "etcsInfillLineAccess (1.1.1.3.2.3, 1.2.1.1.1.3): Each ETCS or subset may define the existence of a ETCS infill necessary for line access. This error is due to having more than one indication of ETCS infill necessary for line access value or having an indication of ETCS infill necessary for line access value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "As indicated in CCS TSI section 7.2.9.1, an ETCS Level 1 trackside application may require that the on-board is equipped with the corresponding in-fill data transmission (Euroloop or radio)                          if the release speed is set to zero for safety reasons.",
        "see_also": "TSI CCS 7.2.9.1 & 4.2.3",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#etcsInfillLineAccess"
    },
    "CPE_InfillLineSide": {
        "group": "OP",
        "title": "ETCS infill installed line-side",
        "description": "Information about installed trackside equipment capable to transmit infill information by loop or Global System for Mobile communications for Railways (GSM-R) for level 1 installations.",
        "iri": "http://data.europa.eu/949/etcsInfill",
        "parameter_of": [
            "ETCS",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.2.4",
            "1.2.1.1.1.4"
        ],
        "xml_names": [
            "CPE_InfillLineSide"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "ETCS Infills",
        "values": [
            {
                "code": "10",
                "value": "None"
            },
            {
                "code": "20",
                "value": "Euroloop | Euroloop infill"
            },
            {
                "code": "30",
                "value": "Radio infill | Radio, GSM-R"
            },
            {
                "code": "40",
                "value": "Euroloop & Radio | Euroloop & Radio infill"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory in case of ETCS level 1 and infill device(s) are installed. Otherwise it is not applicable.",
        "validation_rules": [
            {
                "comment": "Information about installed trackside equipment capable of transmitting infill information by loop or Global System for Mobile communications for Railways (GSM-R) for level 1 installations.",
                "message": "etcsInfill (1.1.1.3.2.4, 1.2.1.1.1.4): The ETCS {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/etcs-infills/."
            },
            {
                "comment": "Information about installed trackside equipment capable of transmitting infill information by loop or Global System for Mobile communications for Railways (GSM-R) for level 1 installations.",
                "message": "etcsInfill (1.1.1.3.2.4, 1.2.1.1.1.4): The ETCS may have an ETCS infill, and its value must be an IRI. This error is due to the ETCS instance having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 contains 1. Related to rule for etcsLevelType",
                "message": "etcsInfill (1.1.1.3.2.4, 1.2.1.1.1.4): The ETCS {$this} ({?thisLabel}), has a ETCS level type value of 1 which makes the etcsInfill parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "TSI CCS (4.2.2 & 4.3.3)",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#etcsInfill"
    },
    "CPE_NatApplication": {
        "group": "DP",
        "title": "Has ETCS national packet 44 application implemented",
        "description": "Indication whether data for national packet 44 applications is transmitted between track and train.",
        "iri": "http://data.europa.eu/949/hasEtcsNationalPacket44",
        "parameter_of": [
            "ETCS",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.2.5",
            "1.2.1.1.1.5"
        ],
        "xml_names": [
            "CPE_NatApplication"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Boolean",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
        "validation_rules": [
            {
                "comment": "Indication whether data for national packet 44 applications is transmitted between track and train.",
                "message": "hasEtcsNationalPacket44 (1.1.1.3.2.5, 1.2.1.1.1.5): Each ETCS or subset may define the existence of an ETCS national packet 44 application. This error is due to having more than one indication of ETCS national packet 44 application value or having an indication of ETCS national packet 44 application value that is not Y/N (boolean)."
            },
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "hasEtcsNationalPacket44 (1.1.1.3.2.5, 1.2.1.1.1.5):The ETCS {$this} ({?thisLabel}), has an  'ETCS Level Type' defined that makes the hasEtcsNationalPacket44 parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Value can be `false` or a link to the implemented functions. The hasEtcsNationalPacket44 property represents the true or false value. The etcsNationalPacket44Function represents the functions.Packets 44 are the means to transmit data for national applications between train and track and vice versa, using the data transmission facilities included within the ETCS. NID_XUSER values managed by ERA in a document about ETCS variables available on ERA website.",
        "see_also": "https://www.era.europa.eu/domains/technical-specifications-interoperability/control-command-and-signalling-tsi_en#oe-content-paragraph-1632 TSI CCS (7.4.3 & 6.2.4.2).",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasEtcsNationalPacket44"
    },
    "CPE_RestrictionsConditions": {
        "group": "DP",
        "title": "Existence of operating restrictions or conditions",
        "description": "Indication whether restrictions or conditions due to partial compliance with the TSI CCS exist.",
        "iri": "http://data.europa.eu/949/hasETCSRestrictionsConditions",
        "parameter_of": [
            "ETCS",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.2.6",
            "1.2.1.1.1.6"
        ],
        "xml_names": [
            "CPE_RestrictionsConditions"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value has to be provided when ETCS is present (a value is provided on 1.1.1.3.2.1).",
        "validation_rules": [
            {
                "comment": "Indication whether restrictions or conditions due to partial compliance with the TSI CCS exist.",
                "message": "hasETCSRestrictionsConditions (1.1.1.3.2.6, 1.2.1.1.1.6): Each ETCS or subset may define the existence of operating restrictions or conditions. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "Only applicable (true) when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "hasETCSRestrictionsConditions (1.1.1.3.2.6, 1.2.1.1.1.6):The ETCS or subset {$this} ({?thisLabel}), has a 'ETCS level' type selected which makes the hasETCSRestrictionsConditions parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "If operational restrictions and conditions are applicable, a document will be provided as a value of era:era:etcsRestrictionsConditionsDoc property. The RU has to contact the IM to be informed about these conditions.                                  These conditions and restrictions of use are considered in section 6.4 of the CCS TSI. They should be described using the template available on Agency website (Certification and deviations - Guidelines for using the ERA template) with the following link: https://www.era.europa.eu/activities/european-rail-traffic-management-system-ertms_en#meeting6.",
        "see_also": "https://www.era.europa.eu/content/certification-issues https://www.era.europa.eu/system/files/2022-11/restrictions_and_added_functions_en_1.doc",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasETCSRestrictionsConditions"
    },
    "CPE_IntegrityConfirmation": {
        "group": "DP",
        "title": "Train integrity confirmation from on-board (not from driver) necessary for line access",
        "description": "Indication whether train confirmation from on-board is required to access the line for safety reasons.",
        "iri": "http://data.europa.eu/949/trainIntegrityOnBoardRequired",
        "parameter_of": [
            "ETCS",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.2.8",
            "1.2.1.1.1.8"
        ],
        "xml_names": [
            "CPE_IntegrityConfirmation"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value has to be provided when ETCS Level 2 is present, ETCS Baseline > 4 MR1 and IM confirms train integrity function is required). Parameter only applicable when ETCS Baseline > 4 MR1 with operation requiring train integrity.",
        "validation_rules": [
            {
                "comment": "Indication whether train confirmation from on-board is required to access the line for safety reasons.",
                "message": "trainIntegrityOnBoardRequired (1.1.1.3.2.8, 1.2.1.1.1.8): value must be xsd:boolean (true/false) and at most one value is allowed."
            }
        ],
        "general_explanation": "Value is modeled as xsd:boolean:                                    - true  = required                                    - false = not required                                    In hybrid operation, the requirement may depend on the operational mode; represent the applicable case using true/false, or omit the statement when not applicable.",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trainIntegrityOnBoardRequired"
    },
    "CPE_SystemCompatibility": {
        "group": "OP",
        "title": "ETCS system compatibility",
        "description": "ETCS requirements used for demonstrating technical compatibility.",
        "iri": "http://data.europa.eu/949/etcsSystemCompatibility",
        "parameter_of": [
            "ETCS",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.2.9",
            "1.2.1.1.1.9"
        ],
        "xml_names": [
            "CPE_SystemCompatibility"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "ETCS System Compatibilities",
        "values": [
            {
                "code": "10",
                "value": "Not Defined"
            },
            {
                "code": "20",
                "value": "ESC-EU-0"
            },
            {
                "code": "30",
                "value": "ESC-SE-01-HiL2"
            },
            {
                "code": "50",
                "value": "ESC-SE-03-L3"
            },
            {
                "code": "60",
                "value": "ESC-SE-04-HiL2B3"
            },
            {
                "code": "70",
                "value": "ESC-SE-05-BoL2B3"
            },
            {
                "code": "71",
                "value": "ESC-ES-211"
            },
            {
                "code": "72",
                "value": "ESC-ES-221"
            },
            {
                "code": "73",
                "value": "ESC-ES-231"
            },
            {
                "code": "74",
                "value": "ESC-ES-232"
            },
            {
                "code": "75",
                "value": "ESC-ES-241"
            },
            {
                "code": "76",
                "value": "ESC-ES-251"
            },
            {
                "code": "77",
                "value": "ESC-ES-262"
            },
            {
                "code": "78",
                "value": "ESC-ES-271"
            },
            {
                "code": "79",
                "value": "ESC-ES-281"
            },
            {
                "code": "80",
                "value": "ESC-ES-292"
            },
            {
                "code": "81",
                "value": "ESC-ES-311"
            },
            {
                "code": "82",
                "value": "ESC-ES-312"
            },
            {
                "code": "83",
                "value": "ESC-ES-321"
            },
            {
                "code": "84",
                "value": "ESC-ES-332"
            },
            {
                "code": "85",
                "value": "ESC-ES-341"
            },
            {
                "code": "86",
                "value": "ESC-ES-351"
            },
            {
                "code": "87",
                "value": "ESC-ES-381"
            },
            {
                "code": "88",
                "value": "ESC-ES-412"
            },
            {
                "code": "89",
                "value": "ESC-ES-422"
            },
            {
                "code": "90",
                "value": "ESC-ES-432"
            },
            {
                "code": "91",
                "value": "ESC-ES-441"
            },
            {
                "code": "92",
                "value": "ESC-ES-511"
            },
            {
                "code": "93",
                "value": "ESC-ES-521"
            },
            {
                "code": "94",
                "value": "ESC-ES-541"
            },
            {
                "code": "95",
                "value": "ESC-SE-07"
            },
            {
                "code": "96",
                "value": "ESC-ES-442"
            },
            {
                "code": "101",
                "value": "ESC-NL-01"
            },
            {
                "code": "102",
                "value": "ESC-NL-02"
            },
            {
                "code": "103",
                "value": "ESC-NL-03"
            },
            {
                "code": "105",
                "value": "ESC-NL-05"
            },
            {
                "code": "106",
                "value": "ESC-NL-06"
            },
            {
                "code": "107",
                "value": "ESC-NL-07"
            },
            {
                "code": "108",
                "value": "ESC-NL-08"
            },
            {
                "code": "109",
                "value": "ESC-NL-09"
            },
            {
                "code": "110",
                "value": "ESC-NL-10"
            },
            {
                "code": "111",
                "value": "ESC-NL-11"
            },
            {
                "code": "112",
                "value": "ESC-NL-12"
            },
            {
                "code": "113",
                "value": "ESC-NL-13"
            },
            {
                "code": "114",
                "value": "ESC-NL-14"
            },
            {
                "code": "115",
                "value": "ESC-NL-15"
            },
            {
                "code": "116",
                "value": "ESC-NL-16"
            },
            {
                "code": "117",
                "value": "ESC-NL-17"
            },
            {
                "code": "118",
                "value": "ESC-NL-18"
            },
            {
                "code": "119",
                "value": "ESC-NL-19"
            },
            {
                "code": "120",
                "value": "ESC-NL-20"
            },
            {
                "code": "121",
                "value": "ESC-NL-21"
            },
            {
                "code": "122",
                "value": "ESC-NL-22"
            },
            {
                "code": "123",
                "value": "ESC-NL-23"
            },
            {
                "code": "124",
                "value": "ESC-NL-24"
            },
            {
                "code": "125",
                "value": "ESC-NL-25"
            },
            {
                "code": "126",
                "value": "ESC-NL-26"
            },
            {
                "code": "127",
                "value": "ESC-NL-27"
            },
            {
                "code": "128",
                "value": "ESC-NL-28"
            },
            {
                "code": "201",
                "value": "ESC-FR-01-LB"
            },
            {
                "code": "202",
                "value": "ESC-FR-02-LB"
            },
            {
                "code": "203",
                "value": "ESC-FR-03-LB"
            },
            {
                "code": "204",
                "value": "ESC-FR-04-LB"
            },
            {
                "code": "205",
                "value": "ESC-FR-05-LB"
            },
            {
                "code": "206",
                "value": "ESC-FR-06-LB"
            },
            {
                "code": "207",
                "value": "ESC-FR-07-SF"
            },
            {
                "code": "208",
                "value": "ESC-FR-08-SF"
            },
            {
                "code": "209",
                "value": "ESC-FR-09-SF"
            },
            {
                "code": "210",
                "value": "ESC-FR-10-SF"
            },
            {
                "code": "211",
                "value": "ESC-FR-11-SF"
            },
            {
                "code": "212",
                "value": "ESC-FR-12-SF"
            },
            {
                "code": "213",
                "value": "ESC-FR-13-SF"
            },
            {
                "code": "214",
                "value": "ESC-FR-14-SF"
            },
            {
                "code": "215",
                "value": "ESC-FR-15-SF"
            },
            {
                "code": "216",
                "value": "ESC-FR-16-SF"
            },
            {
                "code": "217",
                "value": "ESC-FR-17-SF"
            },
            {
                "code": "218",
                "value": "ESC-FR-18-SF"
            },
            {
                "code": "219",
                "value": "ESC-FR-19-SF"
            },
            {
                "code": "220",
                "value": "ESC-FR-20-SF"
            },
            {
                "code": "221",
                "value": "ESC-FR-21-SF"
            },
            {
                "code": "222",
                "value": "ESC-FR-22-LB"
            },
            {
                "code": "223",
                "value": "ESC-FR-23-LB"
            },
            {
                "code": "224",
                "value": "ESC-FR-27-LGVEE"
            },
            {
                "code": "225",
                "value": "ESC-FR-28-LGVEE"
            },
            {
                "code": "226",
                "value": "ESC-FR-29-LGVEE"
            },
            {
                "code": "227",
                "value": "ESC-FR-30-LGVEE"
            },
            {
                "code": "228",
                "value": "ESC-FR-31-LGVEE"
            },
            {
                "code": "229",
                "value": "ESC-FR-32-LGVEE"
            },
            {
                "code": "230",
                "value": "ESC-BE-02-L2FS"
            },
            {
                "code": "231",
                "value": "ESC-BE-03-L1LS"
            },
            {
                "code": "237",
                "value": "ESC-IT-06-RFI-1.0_L2_AVp_DD_01"
            },
            {
                "code": "239",
                "value": "ESC-PL-01-L1"
            },
            {
                "code": "240",
                "value": "ESC-PL-02-L1LS"
            },
            {
                "code": "241",
                "value": "ESC-PL-03-L2"
            },
            {
                "code": "242",
                "value": "ESC-PL-04-L2"
            },
            {
                "code": "243",
                "value": "ESC-NO-01"
            },
            {
                "code": "245",
                "value": "ESC-IT-09-RFI-2.0_L1_Cs_CHIASSO_01"
            },
            {
                "code": "246",
                "value": "ESC-IT-10-RFI-2.1_L2_Cs_NOPD_01"
            },
            {
                "code": "247",
                "value": "ESC-IT-11-RFI-2.0_L1_Cs_PTLU_01"
            },
            {
                "code": "248",
                "value": "ESC-BE-01-L1FS"
            },
            {
                "code": "249",
                "value": "ESC-BE-04-LGV3_4"
            },
            {
                "code": "250",
                "value": "ESC-DK-01-East"
            },
            {
                "code": "251",
                "value": "ESC-DK-02-West"
            },
            {
                "code": "252",
                "value": "ESC-AT-01"
            },
            {
                "code": "253",
                "value": "ESC-FR-24-AA"
            },
            {
                "code": "254",
                "value": "ESC-FR-25-AD"
            },
            {
                "code": "255",
                "value": "ESC-FR-26-AE"
            },
            {
                "code": "256",
                "value": "ESC-FR-33-SEA"
            },
            {
                "code": "257",
                "value": "ESC-FR-34-SEA"
            },
            {
                "code": "258",
                "value": "ESC-FR-35-BPL"
            },
            {
                "code": "259",
                "value": "ESC-FR-36-BPL"
            },
            {
                "code": "260",
                "value": "ESC-IT-12-RFI-2.0_L1_Cs_ISDO_CH_01"
            },
            {
                "code": "261",
                "value": "ESC-IT-13-RFI-2.0_L1_Cs_PTLU_CH_01"
            },
            {
                "code": "263",
                "value": "ESC-IT-15-RFI_2.1_L1_Cs_VENTIMIGLIA_FR_01"
            },
            {
                "code": "266",
                "value": "ESC-PL-05-L2"
            },
            {
                "code": "267",
                "value": "ESC-PL-06-L2"
            },
            {
                "code": "268",
                "value": "ESC-CZ-01"
            },
            {
                "code": "269",
                "value": "ESC-CZ-02"
            },
            {
                "code": "270",
                "value": "ESC-RO-01"
            },
            {
                "code": "271",
                "value": "ESC-DE-01-B2_L2"
            },
            {
                "code": "272",
                "value": "ESC-DE-02-B3_L2"
            },
            {
                "code": "273",
                "value": "ESC-NO-02"
            },
            {
                "code": "280",
                "value": "ESC-CH-01-L1LS"
            },
            {
                "code": "281",
                "value": "ESC-CH-02-L2"
            },
            {
                "code": "282",
                "value": "ESC-CH-03-L1LSL2"
            },
            {
                "code": "283",
                "value": "ESC-LU-01-RFN"
            },
            {
                "code": "284",
                "value": "ESC-LU-02-MSM"
            },
            {
                "code": "285",
                "value": "ESC-LU-03-IG"
            },
            {
                "code": "286",
                "value": "ESC-DE-03-B3_L1LS"
            },
            {
                "code": "287",
                "value": "ESC-DE-05-B3-L2"
            },
            {
                "code": "288",
                "value": "ESC-DE-08-B3-L2"
            },
            {
                "code": "289",
                "value": "ESC-IT-24-RFI_B2_L2AV_AF_01"
            },
            {
                "code": "290",
                "value": "ESC-IT-25-RFI_B2_L2AV_HR_01"
            },
            {
                "code": "291",
                "value": "ESC-IT-26-RFI_B3_L2s_HR_01"
            },
            {
                "code": "292",
                "value": "ESC-IT-27-RFI_B3_L2s_AF_01"
            },
            {
                "code": "293",
                "value": "ESC-IT-28-RFI_2.1_L1_Cs_VENTIMIGLIA_IT_01"
            },
            {
                "code": "294",
                "value": "ESC-IT-29-RFI_B3_L1LS_NAZIONALE_01"
            },
            {
                "code": "295",
                "value": "ESC-IT-30-RFI_B3_L1RI_NAZIONALE_01"
            },
            {
                "code": "296",
                "value": "ESC-IT-31-RFI_2.0_L1_Cs_ISDO_IT_01"
            },
            {
                "code": "297",
                "value": "ESC-IT-32-RFI_2.0_L1_Cs_PTLU_IT_01"
            },
            {
                "code": "298",
                "value": "ESC-SI-01"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "A value has to be provided when ETCS is present (a value is provided on 1.1.1.3.2.1).",
        "validation_rules": [
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "etcsSystemCompatibility (1.1.1.3.2.9, 1.2.1.1.1.9): The ETCS {$this} ({?thisLabel}), has a ETCS level type which makes the etcsSystemCompatibility parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "ETCS requirements used for demonstrating technical compatibility.",
                "message": "etcsSystemCompatibility (1.1.1.3.2.9, 1.2.1.1.1.9): The ETCS {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/etcs-system-compatibilities/ETCSSystemCompatibilities."
            },
            {
                "comment": "ETCS requirements used for demonstrating technical compatibility.",
                "message": "etcsSystemCompatibility (1.1.1.3.2.9, 1.2.1.1.1.9): The ETCS has a etcsSystemCompatibility value that must be an IRI. This error is due to the ETCS having a value that is not an IRI."
            }
        ],
        "general_explanation": "The Values \"Not defined\" or \"ESC-EU-0\" should not be combined with other values.For application in CCS Onboard:The vehicles are considered compatible with the infrastructure for this parameter, if their parameter value matches any of the values declared on the trackside. For application in CCS Trackside:The Infrastructure Manager is responsible for defining the ESC type(s). All sections of the Union network which require the same set of checks for the demonstration of ESC shall have the same ESC type.See: TSI CCS, Appendix A, Table A 1, 4.2.17 a.The list of ESC Types is published and maintained by the European Union Agency for Railways in the technical document \"ESC/RSC technical document, TD/011REC1028\".The Agency shall assess the checks unless they have been assessed by a NoBo as required in Table 6.3 row 10. The assessment by the Agency shall be done within 2 months of receipt thereof, unless a longer period is agreed between the Agency and the Infrastructure Manager but not exceeding 4 months in total. The technical document will be updated within 10 working days after positive assessment.The ESC Types shall only be used when published with status \"Valid\" in the Agency Technical document referred above.",
        "see_also": "TSI CCS, Appendix A, Table A 1, 4.2.17 a. https://www.era.europa.eu/system/files/2023-05/esc-rsc_technical_document_en.pdf https://www.era.europa.eu/domains/technical-specifications-interoperability/control-command-and-signalling-tsi_en#oe-content-paragraph-1632",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#etcsSystemCompatibility"
    },
    "CPE_MVersion": {
        "group": "OP",
        "title": "ETCS M_version",
        "description": "ETCS M_version according to the specification referenced in Appendix A-1, index [C], SRS 7.5.1.9.",
        "iri": "http://data.europa.eu/949/etcsMVersion",
        "parameter_of": [
            "ETCS"
        ],
        "numbers": [
            "1.1.1.3.2.10",
            "1.2.1.1.1.10"
        ],
        "xml_names": [
            "CPE_MVersion"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "ETCS M Versions",
        "values": [
            {
                "code": "00",
                "value": "Previous"
            },
            {
                "code": "10",
                "value": "1.0"
            },
            {
                "code": "11",
                "value": "1.1"
            },
            {
                "code": "20",
                "value": "2.0"
            },
            {
                "code": "21",
                "value": "2.1"
            },
            {
                "code": "22",
                "value": "2.2"
            },
            {
                "code": "23",
                "value": "2.3"
            },
            {
                "code": "30",
                "value": "3.0"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value has to be provided when ETCS is present (a value is provided on 1.1.1.3.2.1).",
        "validation_rules": [
            {
                "comment": "ETCS_M version according to SRS 7.5.1.9",
                "message": "etcsMVersion (1.1.1.3.2.10, 1.2.1.1.1.10): The ETCS has at most one ETCS_M version value and it must be an IRI. This error is due to the ETCS having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 contains 1. Related to rule for etcsLevelType",
                "message": "etcsMVersion (1.1.1.3.2.10, 1.2.1.1.1.10): The ETCS {$this} ({?thisLabel}), has a ETCS level type '1' which makes the etcsMVersion parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "ETCS_M version according to SRS 7.5.1.9",
                "message": "Indication of the etcsMVersion (1.1.1.3.2.10, 1.1.1.3.2.10):): The ETCS {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/etcs-m-versions/ETCSMVersions."
            }
        ],
        "general_explanation": "See: TSI CCS (Subset-026, Chapter 7, 7.5.1.79 M_VERSION)",
        "see_also": "https://www.era.europa.eu/domains/technical-specifications-interoperability/control-command-and-signalling-tsi_en#oe-content-paragraph-1632",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#etcsMVersion"
    },
    "CPE_SafeLenghtInf": {
        "group": "OP",
        "title": "Safe consist length information from on-board necessary for access the line and SIL",
        "description": "Indication whether safe consist train length information from on-board is required to access the line for safety reasons and the required safety integrity level.",
        "iri": "http://data.europa.eu/949/safeConsistLengthInformationNecessary",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.2.11",
            "1.2.1.1.1.11"
        ],
        "xml_names": [
            "CPE_SafeLenghtInf"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Safe Consistent Length required with SIL",
        "values": [
            {
                "code": "00",
                "value": "N"
            },
            {
                "code": "02",
                "value": "Y+2"
            },
            {
                "code": "04",
                "value": "Y+4"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value has to be provided when ETCS is present (a value is provided on 1.1.1.3.2.1).",
        "validation_rules": [
            {
                "comment": "Indication whether safe consist train length information from on-board is required to access the line for safety reasons and the required safety integrity level.",
                "message": "safeConsistLengthInformationNecessary (1.1.1.3.2.11, 1.2.1.1.1.11): The ETCS or subset {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/safe-consist-length/SafeConsistLengthNecessary."
            },
            {
                "comment": "Indication whether safe consist train length information from on-board is required to access the line for safety reasons and the required safety integrity level.",
                "message": "safeConsistLengthInformationNecessary (1.1.1.3.2.11, 1.2.1.1.1.11): The ETCS or subset must have a single Safe consist length information from on-board necessary for access the line and SIL value that is an IRI. This error is due to having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "Only applicable when parameter 1.1.1.3.2.1 is applicable (its Applicable: 'Y').",
                "message": "safeConsistLengthInformationNecessary (1.1.1.3.2.11, 1.2.1.1.1.11):The ETCS or subset {$this} ({?thisLabel}), has an  'ETCS Level Type' defined which makes the safeConsistLengthInformationNecessary parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "see_also": "TSI CCS (Subset-026, Chapter 7, 7.5.1.112.1 and P10) https://www.era.europa.eu/domains/technical-specifications-interoperability/control-command-and-signalling-tsi_en#oe-content-paragraph-1632",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#safeConsistLengthInformationNecessary"
    },
    "CEN_PhoneNumbRBC": {
        "group": "DP",
        "title": "Phone number of ERTMS/ETCS Radio Block Center",
        "description": "Unique RBC calling number (NID_RADIO) as defined in the specification referenced in Appendix A-1, index [C].",
        "iri": "http://data.europa.eu/949/rbcPhone",
        "parameter_of": [
            "Radio Block Center"
        ],
        "numbers": [
            "1.1.1.3.2.17",
            "1.2.1.1.1.17"
        ],
        "xml_names": [
            "CEN_PhoneNumbRBC"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Unique RBC calling number (NID_RADIO) as defined in the specification referenced in TSI CCS.",
                "message": "rbcPhone (1.1.1.3.2.17, 1.2.1.1.1.17): The radio block center phone must be represented as a String and follow the pattern [NNNN NNNN NNNN NNNN].This error may be due to having a value that is not a string or that does not follow the pattern"
            }
        ],
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#rbcPhone"
    },
    "CEN_BigMetalMass": {
        "group": "DP",
        "title": "Big Metal Mass",
        "description": "Indication of existence of metal mass in the vicinity of the location, susceptible of perturbating the reading of balises by the on-board system.",
        "iri": "http://data.europa.eu/949/bigMetalMass",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.2.18",
            "1.2.1.1.1.18"
        ],
        "xml_names": [
            "CEN_BigMetalMass"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant train protection system (ETCS)\n                \n                (\n                \n                1.1.1.3.2 | 1.2.1.1.1 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "A value has to be provided when ETCS is present (a value is provided on 1.1.1.3.2.1).",
        "validation_rules": [
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "bigMetalMass (1.1.1.3.2.18, 1.2.1.1.1.18):The track {$this} ({?label}), has an  'ETCS Level Type' defined which makes the bigMetalMass parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Indication of existence of metal mass in the vicinity of the location, susceptible of perturbating the reading of balises by the on-board system.",
                "message": "bigMetalMass (1.1.1.3.2.18, 1.2.1.1.1.18): Each track may define the existence of a metal mass in the vicinity of the location. This error is due to having more than one indication of existence of big metal mass value or having an indication of big metal mass value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "According to the specification referenced in TSI CCS.",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#bigMetalMass"
    },
    "CRG_Version": {
        "group": "OP",
        "title": "GSM-R version",
        "description": "GSM-R functional requirements specification (FRS) and system requirements specification (SRS) in accordance with the specification respectively referenced in Appendix A-1, index [E] and index [F], version number or baseline installed.",
        "iri": "http://data.europa.eu/949/gsmRVersion",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.3.1",
            "1.2.1.1.2.1"
        ],
        "xml_names": [
            "CRG_Version"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "GSM-R Versions",
        "values": [
            {
                "code": "10",
                "value": "le code 10 non normalisés RINF"
            },
            {
                "code": "20",
                "value": "le code 20 non normalisés RINF"
            },
            {
                "code": "00",
                "value": "Baseline 0"
            },
            {
                "code": "50",
                "value": "Baseline 1"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "GSM-R must be installed for this parameter to be applicable and a value to be provided. If this property is not used, all GSM-R related properties should not be used either.",
        "validation_rules": [
            {
                "comment": "GSM-R functional requirements specification and system requirements specification in accordance with the specification respectively referenced in TSI CCS (Annex ), version number installed lineside.",
                "message": "gsmRVersion (1.1.1.3.3.1, 1.2.1.1.2.1): The track must have a GSM-R version value that is an IRI."
            },
            {
                "comment": "GSM-R functional requirements specification and system requirements specification in accordance with the specification respectively referenced in TSI CCS (Annex ), version number installed lineside.",
                "message": "gsmRVersion (1.1.1.3.3.1, 1.2.1.1.2.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/gsmr-versions/GSMRVersions."
            }
        ],
        "general_explanation": "GSM-R functional requirements specification and system requirements specification in accordance with the specification respectively referenced in TSI CCS (Annex ), version number installed lineside.                Since more than one version may be installed in different areas, this property can have multiple values.In case there is no GSM-R network available, this property shall be flagged as not applicable and all other GSM-R parameters ('Number of active GSM-R mobiles (EDOR) or simultaneous communication session on-board for ETCS Level 2 needed to perform radio block centre handovers without having an operational disruption' and 'Optional GSM-R functions') shall be flagged as not applicable.",
        "see_also": "Referenced in Appendix A-1, index [E] and index [F]",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gsmRVersion"
    },
    "CRG_NumActiveMob": {
        "group": "OP",
        "title": "Number of active GSM-R mobiles (EDOR) or simultaneous communication session on board for ETCS level 2 needed to perform radio block centre handovers without having an operational disruption",
        "description": "Number of simultaneous communication session on board for ETCS level 2 required for a smooth running of the train. This relates to the radio block centre (RBC) handling of communication sessions. Not safety critical and no matter of interoperability.",
        "iri": "http://data.europa.eu/949/gsmRActiveMobiles",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.2",
            "1.2.1.1.2.2"
        ],
        "xml_names": [
            "CRG_NumActiveMob"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Number of active GSM-R mobiles",
        "values": [
            {
                "code": "10",
                "value": "0"
            },
            {
                "code": "20",
                "value": "1"
            },
            {
                "code": "30",
                "value": "2"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "GSM-R and ETCS level 2 must be installed for this parameter to be applicable.",
        "validation_rules": [
            {
                "comment": "Number of simultaneous communication session on board for ETCS level 2 required for a smooth running of the train. This relates to the radio block centre (RBC) handling of communication sessions. Not safety critical and no matter of interoperability.",
                "message": "gsmRActiveMobiles (1.1.1.3.3.2, 1.2.1.1.2.2): The track must have a number of active GSM-R mobiles (EDOR) or simultaneous communication session on-board for ETCS Level 2 needed to perform radio block centre handovers without having an operational disruption value that is a single IRI. This error is due to having more than one value or having a value that is  not an IRI."
            },
            {
                "comment": "Number of simultaneous communication session on board for ETCS level 2 required for a smooth running of the train. This relates to the radio block centre (RBC) handling of communication sessions. Not safety critical and no matter of interoperability.",
                "message": "gsmRActiveMobiles (1.1.1.3.3.2, 1.2.1.1.2.2): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/gsmr-number-active-mobiles/NumberActiveMobiles."
            },
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) and ETCS L2 (parameter 1.1.1.3.2.1) must be installed for this parameter to be applicable.",
                "message": "gsmRActiveMobiles (1.1.1.3.3.2, 1.2.1.1.2.2):The track {$this} ({?label}), has a 'GSM-R version' defined and a 'ETCS level' type selected which makes the gsmRActiveMobiles parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "In case there is no ETCS Level 2 in the line, do this parameter must be flagged as Not Applicable.In case there is ETCS Level 2 in the line, the minimum number of EDOR required on board would be 1. In case ETCS baseline 3 release 2 or baseline 4 is selected, select \"2\" .Please select \" 1\"  or \"2\" , taking into account that TSI compliant trains may only be fitted with 1 EDOR.",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gsmRActiveMobiles"
    },
    "CRG_OptionalFunctions": {
        "group": "OP",
        "title": "Optional GSM-R functions",
        "description": "Use of optional GSM-R functions which might improve operation on the line. They are for information only and not for network access criteria.",
        "iri": "http://data.europa.eu/949/gsmROptionalFunctions",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.3",
            "1.2.1.1.2.3"
        ],
        "xml_names": [
            "CRG_OptionalFunctions"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Optional GSM-R functions",
        "values": [
            {
                "code": "10",
                "value": "Network selection manual (*1)"
            },
            {
                "code": "20",
                "value": "Network selection via balise (*1)"
            },
            {
                "code": "30",
                "value": "Network selection automatic (*1)"
            },
            {
                "code": "40",
                "value": "Public emergency (112) available (*2)"
            },
            {
                "code": "50",
                "value": "Broadcast calls (VBS) used (*3)"
            },
            {
                "code": "60",
                "value": "Text message service used (SMS) (*4)"
            },
            {
                "code": "70",
                "value": "Restriction of display of called/calling user (*5)"
            },
            {
                "code": "80",
                "value": "Automatically forward of incoming call if no reply (*5)"
            },
            {
                "code": "90",
                "value": "Automatically forward of incoming call if not reachable (*5)"
            },
            {
                "code": "100",
                "value": "Use of chargeable Network Services (*6)"
            },
            {
                "code": "110",
                "value": "General data applications (*7)"
            },
            {
                "code": "130",
                "value": "ETCS RBC or other devices alerted when initiating a REC (Railway Emergency Call) (*8)"
            },
            {
                "code": "140",
                "value": "Display at the controller terminal of the location of the mobile initiating a REC (Railway Emergency Call) (*8)"
            },
            {
                "code": "150",
                "value": "Use of enhanced Railway Emergency Call (eREC) (*8)"
            },
            {
                "code": "160",
                "value": "GSM-R shunting used (*8)"
            },
            {
                "code": "170",
                "value": "Data recorded in case of Shunting Emergency Call (*8)"
            },
            {
                "code": "180",
                "value": "Extended frequency bands used (*9)"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable",
        "validation_rules": [
            {
                "comment": "Use of optional GSM-R functions which might improve operation on the line. They are for information only and not for network access criteria.",
                "message": "gsmROptionalFunctions (1.1.1.3.3.2, 1.2.1.1.2.2): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/gsmr-optional-functions/OptionalFunctions."
            },
            {
                "comment": "Use of optional GSM-R functions which might improve operation on the line. They are for information only and not for network access criteria.",
                "message": "gsmROptionalFunctions (1.1.1.3.3.3, 1.2.1.1.2.3): The track must have optional GSM-R functions value that is an IRI. This error is due to having a avalue that is not an IRI"
            },
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
                "message": "gsmROptionalFunctions (1.1.1.3.3.2, 1.2.1.1.2.2):The track {$this} ({?label}), has a 'GSM-R version' defined which makes the gsmROptionalFunctions parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "(*1) These inputs refer to the expected behaviour by the network, i.e. if there is any area or point where an automatic selection of network should be done or if there is any location where balises to instruct a change of radio network have been installed. In order to be able to attend to these indications (automatic network, network change by balise) some configuration is needed in the mobile.In case there is a balise used to announce the change of the network, or if there are locations where the network selection is planned by the IM to be done automatically (and not manually, as stated in the requirements). It should be considered as an item that is related to the design of the infrastructure.(*2) the possibility to dial 112 is something specific to the network that should be communicated to the vehicles accessing it.(*3) the use of broadcast calls is something specific to the network that has to be configured in it.(*4) it is something specific to the network that has to be configured in it if the service is provided.(*5) it is something specific to the network that has to be configured in it if the service is provided; something may need to be configured on the network but also in the mobile subscriber data if it wants to use the service. What is requested here is the information of the network capability.(*6) if they are configured on the network. Please indicate which in the \"Other information\" box.(*7) To be selected if other data applications, different from ETCS L2, can be used within the network - (*8) if it is configured on the network. \"GSM-R Shunting used\" in order to make public if the GSM-R is used in the network for shunting activities. (*9) Please specify in the \"Other information\" box for which services /applications are they planned and which are the frequencies in use.(*11) Please use this field to indicate any additional information on network characteristics, e.g.; interference level, leading to the need of additional on-board protection;",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gsmROptionalFunctions"
    },
    "CRG_AdditionalnetworkInfo": {
        "group": "OP",
        "title": "Additional information on network characteristics",
        "description": "Any additional information on network characteristics or corresponding document available from the IM and stored by the Agency, e.g.; interference level, leading to the recommendation of additional on-board protection.",
        "iri": "http://data.europa.eu/949/gsmRAdditionalInfo",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.3.1",
            "1.2.1.1.2.3.1"
        ],
        "xml_names": [
            "CRG_AdditionalnetworkInfo"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N/NYA",
        "dependencies": "GSM-R must be installed for this parameter to be applicable",
        "validation_rules": [
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
                "message": "gsmRAdditionalInfo (1.1.1.3.3.3.1, 1.2.1.1.2.3.1):The track {$this} ({?label}), has a 'GSM-R version' defined which makes the gsmRAdditionalInfo parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Any additional information on network characteristics or corresponding document available from the IM and stored by the Agency, e.g.; interference level, leading to the recommendation of additional on-board protection.",
                "message": "gsmRAdditionalInfo (1.1.1.3.3.3.1 , 1.2.1.1.2.3.1): The track has additional information on network characteristics that must be a Document."
            }
        ],
        "general_explanation": "Please use this field to indicate any additional information on the GSM-R network. The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gsmRAdditionalInfo"
    },
    "CRG_GPRSForETCS": {
        "group": "DP",
        "title": "GPRS for ETCS",
        "description": "Indication if GPRS can be used for ETCS",
        "iri": "http://data.europa.eu/949/gprsForETCS",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.3.2",
            "1.2.1.1.2.3.2"
        ],
        "xml_names": [
            "CRG_GPRSForETCS"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "GSM-R and ETCS L2 must be installed for this parameter to be applicable.",
        "validation_rules": [
            {
                "comment": "Indication if GPRS can be used for ETCS.",
                "message": "gprsForETCS (1.1.1.3.3.3.2, 1.2.1.1.2.3.2): Each track may define the existence of GPRS for ETCS. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) and ETCS L2 (parameter 1.1.1.3.2.1) must be installed for this parameter to be applicable.",
                "message": "gprsForETCS (1.1.1.3.3.3.2, 1.2.1.1.2.3.2):The track {$this} ({?label}), has a 'GSM-R version' defined and a 'ETCS level' type selected which makes the gprsForETCS parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Sections of EIRENE and ETCS subsets for trackside in TSI",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gprsForETCS"
    },
    "CRG_GPRSAreaOfImpl": {
        "group": "DP",
        "title": "Area of implementation of GPRS",
        "description": "Indication of the area in which GPRS can be used for ETCS, expressed as a list of GPRS-enabled RBCs.",
        "iri": "http://data.europa.eu/949/gprsImplementationArea",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.3.3",
            "1.2.1.1.2.3.3"
        ],
        "xml_names": [
            "CRG_GPRSAreaOfImpl"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N/NYA",
        "dependencies": "GSM-R, ETCS L2 and GPRS for ETCS must be installed for this parameter to be applicable.",
        "validation_rules": [
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1), ETCS L2 (parameter 1.1.1.3.2.1) and GPRS for ETCS (parameter 1.1.1.3.3.3.2) must be installed for this parameter to be applicable.",
                "message": "gprsImplementationArea (1.1.1.3.3.3.3, 1.2.1.1.2.3.3):The track {$this} ({?label}), has a 'GSM-R version' defined and a 'ETCS level' type selected which makes the gprsImplementationArea parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Indication of the area in which GPRS can be used for ETCS, expressed as a list of GPRS-enabled RBC's.",
                "message": "gprsImplementationArea (1.1.1.3.3.3.3, 1.2.1.1.2.3.3): The gprsImplementationArea must be a string. This error is due to the value not being a string."
            }
        ],
        "general_explanation": "Since GPRS can be used for ETCS, indicate in which areas it is implemented (e.g.: whole section, only between two signals, at the station…)",
        "see_also": "Sections of EIRENE optional for trackside in TSI",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gprsImplementationArea"
    },
    "CRG_Needof555": {
        "group": "DP",
        "title": "GSM-R use of group 555",
        "description": "Indication if group 555 is used trackside or whether onboard has Voice SIM Card support for Group ID 555.",
        "iri": "http://data.europa.eu/949/usesGroup555",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.3.4",
            "1.2.1.1.2.4"
        ],
        "xml_names": [
            "CRG_Needof555"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "GSM-R and ETCS L2 must be installed for this parameter to be applicable.",
        "validation_rules": [
            {
                "comment": "Indication if group 555 is used.",
                "message": "usesGroup555 (1.1.1.3.3.4, 1.2.1.1.2.4): Each track may define the existence of GSM-R use of group 555. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) and ETCS L2 (parameter 1.1.1.3.2.1) must be installed for this parameter to be applicable.",
                "message": "usesGroup555 (1.1.1.3.3.4, 1.2.1.1.2.4):The track {$this} ({?label}), has a 'GSM-R version' defined and a 'ETCS level' type selected which makes the usesGroup555 parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Sections of EIRENE not covered by references in TSI. GSM-R (parameter 1.1.1.3.3.1) and ETCS L2 (parameter 1.1.1.3.2.1) must be installed for this parameter to be applicable.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#usesGroup555"
    },
    "CRG_RoamingAgreement": {
        "group": "OP",
        "title": "GSM-R networks covered by a roaming agreement",
        "description": "Name of the own GSM-R network and list of GSM-R networks which are covered by a roaming agreement (for CS services).",
        "iri": "http://data.europa.eu/949/gsmrNetworkCoverage",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.5",
            "1.2.1.1.2.5"
        ],
        "xml_names": [
            "CRG_RoamingAgreement"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "GSM-R Networks",
        "values": [
            {
                "code": "10",
                "value": "GSM-R A (Austria)"
            },
            {
                "code": "20",
                "value": "GSM-R AL (Albania)"
            },
            {
                "code": "30",
                "value": "GSM-R B (Belgium)"
            },
            {
                "code": "40",
                "value": "GSM-R BA (Bosnia Herzegovina)"
            },
            {
                "code": "50",
                "value": "GSM-R BG (Bulgaria)"
            },
            {
                "code": "60",
                "value": "GSM-R BY (Belarus)"
            },
            {
                "code": "70",
                "value": "GSM-R CH (Switzerland)"
            },
            {
                "code": "80",
                "value": "GSM-R CZ (Czech Rep.)"
            },
            {
                "code": "90",
                "value": "GSM-R D (Germany)"
            },
            {
                "code": "100",
                "value": "GSM-R DK (Denmark)"
            },
            {
                "code": "110",
                "value": "GSM-R E (Spain)"
            },
            {
                "code": "120",
                "value": "GSM-R EE (Estonia)"
            },
            {
                "code": "130",
                "value": "GSM-R F (France)"
            },
            {
                "code": "140",
                "value": "GSM-R FI (Finland)"
            },
            {
                "code": "150",
                "value": "GSM-R GB (UK (Great Britain))"
            },
            {
                "code": "160",
                "value": "GSM-R GR (Greece)"
            },
            {
                "code": "170",
                "value": "GSM-R HR (Croatia)"
            },
            {
                "code": "180",
                "value": "GSM-R HU (Hungary)"
            },
            {
                "code": "190",
                "value": "GSM-R I (Italy)"
            },
            {
                "code": "200",
                "value": "GSM-R IE (Ireland)"
            },
            {
                "code": "210",
                "value": "GSM-R IS (Iceland)"
            },
            {
                "code": "220",
                "value": "GSM-R KO (Kosovo)"
            },
            {
                "code": "230",
                "value": "GSM-R L (Luxembourg)"
            },
            {
                "code": "240",
                "value": "GSM-R LT (Lithuania)"
            },
            {
                "code": "250",
                "value": "GSM-R LV (Latvia)"
            },
            {
                "code": "260",
                "value": "GSM-R MD (Moldova)"
            },
            {
                "code": "270",
                "value": "GSM-R ME (Montenegro)"
            },
            {
                "code": "280",
                "value": "GSM-R MK (Macedonia)"
            },
            {
                "code": "290",
                "value": "GSM-R N (Norway)"
            },
            {
                "code": "300",
                "value": "GSM-R NL (Netherlands)"
            },
            {
                "code": "310",
                "value": "GSM-R P (Portugal)"
            },
            {
                "code": "320",
                "value": "GSM-R PL (Poland)"
            },
            {
                "code": "330",
                "value": "GSM-R RO (Romania)"
            },
            {
                "code": "340",
                "value": "GSM-R RU (Russia)"
            },
            {
                "code": "350",
                "value": "GSM-R S (Sweden)"
            },
            {
                "code": "360",
                "value": "GSM-R SI (Slovenia)"
            },
            {
                "code": "370",
                "value": "GSM-R SK (Slovakia)"
            },
            {
                "code": "380",
                "value": "GSM-R SR (Serbia )"
            },
            {
                "code": "390",
                "value": "GSM-R TR (Turkey)"
            },
            {
                "code": "400",
                "value": "GSM-R UA (Ukraine)"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "GSM-R must be installed for this parameter to be applicable",
        "validation_rules": [
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
                "message": "gsmrNetworkCoverage (1.1.1.3.3.5, 1.2.1.1.2.5):The track {$this} ({?label}), has a 'GSM-R version' defined which makes the gsmrNetworkCoverage parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "List of GSM-R networks which are covered by a roaming agreement.",
                "message": "gsmrNetworkCoverage (1.1.1.3.3.5, 1.2.1.1.2.5): The track must have a GSM-R networks covered by a roaming agreement value that is an IRI."
            },
            {
                "comment": "List of GSM-R networks which are covered by a roaming agreement.",
                "message": "gsmrNetworkCoverage (1.1.1.3.3.5, 1.2.1.1.2.5): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/gsmr-networks/GSMRNetworks."
            }
        ],
        "general_explanation": "Name of the own GSM-R network and list of GSM-R networks which are covered by a roaming agreement for CS services. This list is managed by UIC. The Agency will monitor it in order to update the list of possible values when necessary. For Route Compatibility purposes and simplicity, the own network needs to be declared by the IM, so the RUs can systematically check the compatibility.For voice services, roaming for CS is applicable.  For ETCS, as long as roaming for CS is ensured, the interoperability will be guaranteed.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gsmrNetworkCoverage"
    },
    "CRG_RoamingPublic": {
        "group": "DP",
        "title": "Existence of GSM-R roaming to public networks",
        "description": "Existence of roaming to a public network.                                                  In case of Y, provide the name of the public network(s) under parameter \"Details on GSM-R roaming to public networks\".",
        "iri": "http://data.europa.eu/949/publicNetworkRoaming",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.6",
            "1.2.1.1.2.6"
        ],
        "xml_names": [
            "CRG_RoamingPublic"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "GSM-R must be installed for this parameter to be applicable",
        "validation_rules": [
            {
                "comment": "Existence of roaming to a public network.",
                "message": "publicNetworkRoaming (1.1.1.3.3.6, 1.2.1.1.2.6): Each track may define the existence of GSM-R roaming to public networks. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
                "message": "publicNetworkRoaming (1.1.1.3.3.6, 1.2.1.1.2.6):The track {$this} ({?label}), has a 'GSM-R version' defined which makes the publicNetworkRoaming parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Sections of EIRENE not covered by references in TSI.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#publicNetworkRoaming"
    },
    "CRG_RoamingPublicDetails": {
        "group": "DP",
        "title": "Details on GSM-R roaming to public networks",
        "description": "If roaming to public networks is configured, please indicate to which networks, for which users and in which areas.",
        "iri": "http://data.europa.eu/949/publicNetworkRoamingDetails",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.7",
            "1.2.1.1.2.7"
        ],
        "xml_names": [
            "CRG_RoamingPublicDetails"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory if GSM-R is installed and era:publicNetworkRoaming is 'true'. Otherwise, it is not applicable.",
        "validation_rules": [
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
                "message": "publicNetworkRoamingDetails (1.1.1.3.3.7, 1.2.1.1.2.7):The track {$this} ({?label}), has a 'GSM-R version' defined which makes the publicNetworkRoamingDetails parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "If roaming to public networks is configured, please:\n1. indicate to which networks, for which users and in which areas.\n2. list if any GSM-R functionality is not available when roaming to a public network (e.g. REC, Functional Addressing, Group Calls). \n3. also add if there is any operational restriction for vehicles that cannot roam into any of the available public networks.",
                "message": "publicNetworkRoamingDetails (1.1.1.3.3.7, 1.2.1.1.2.7): Each track may have details on GSM-R roaming to public networks that is a character string. This error is due to having more than one publicNetworkRoamingDetails value or having a value that is not a string."
            }
        ],
        "general_explanation": "List if any GSM-R functionality is not available when roaming to a public network (e.g. REC, Functional Addressing, Group Calls). Please also add if there is any operational restriction for vehicles that cannot roam into any of the available public networks.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#publicNetworkRoamingDetails"
    },
    "CRG_GSMRNoCoverage": {
        "group": "DP",
        "title": "No GSMR coverage",
        "description": "Indication if there is no GSMR coverage",
        "iri": "http://data.europa.eu/949/gsmRNoCoverage",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.3.8",
            "1.2.1.1.2.8"
        ],
        "xml_names": [
            "CRG_GSMRNoCoverage"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
        "validation_rules": [
            {
                "comment": "Indication if there is no GSMR coverage.",
                "message": "gsmRNoCoverage (1.1.1.3.3.8, 1.2.1.1.2.8): Each track may define the indication of existence of GSMR coverage. This error is due to having more than one  value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
                "message": "gsmRNoCoverage (1.1.1.3.3.8, 1.2.1.1.2.8):The track {$this} ({?label}), has a 'GSM-R version' defined which makes the gsmRNoCoverage parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "If GSM-R is not installed, this parameter should not be used.This parameter is mainly to capture the case of Radio Hole functionality (lack of GSM-R coverage), that is foreseen in the ETCS specifications as packet 68. Another possible use is the declaration of a temporary situation where, although the area is in principle covered by GSM-R, there is a long-term outage or a project for replacement of the radio (i.e. a section that will not be covered with GSM-R for half a year or longer).",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gsmRNoCoverage"
    },
    "CRG_RadioCompVoice": {
        "group": "OP",
        "title": "Radio system compatibility voice",
        "description": "Radio requirements used for demonstrating technical compatibility voice.",
        "iri": "http://data.europa.eu/949/voiceRadioCompatible",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.3.9",
            "1.2.1.1.2.9"
        ],
        "xml_names": [
            "CRG_RadioCompVoice"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Radio System Compatibilities Voice",
        "values": [
            {
                "code": "10",
                "value": "Not Defined"
            },
            {
                "code": "20",
                "value": "RSC-EU-0"
            },
            {
                "code": "50",
                "value": "RSC-ES-03-V"
            },
            {
                "code": "60",
                "value": "RSC-ES-04-V"
            },
            {
                "code": "70",
                "value": "RSC-SE-01-V"
            },
            {
                "code": "80",
                "value": "RSC-FR-01-V"
            },
            {
                "code": "100",
                "value": "RSC-AT-01-V"
            },
            {
                "code": "110",
                "value": "RSC-BE-01-V"
            },
            {
                "code": "120",
                "value": "RSC-RO-01-V"
            },
            {
                "code": "130",
                "value": "RSC-ES-05-V"
            },
            {
                "code": "140",
                "value": "RSC-DE-01-V"
            },
            {
                "code": "150",
                "value": "RSC-LU-01-V"
            },
            {
                "code": "160",
                "value": "RSC-CH-01-V"
            },
            {
                "code": "180",
                "value": "RSC-PT-02-V"
            },
            {
                "code": "190",
                "value": "RSC-PL-01-V"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "GSM-R must be installed for this parameter to be applicable.In case of RSC-EU-0 or None, no other values are allowed.",
        "validation_rules": [
            {
                "comment": "Radio requirements used for demonstrating technical compatibility voice.",
                "message": "voiceRadioCompatible (1.1.1.3.3.9, 1.2.1.1.2.9): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/radio-system-compatibilities-voice/RadioSystemCompatibilitiesVoice."
            },
            {
                "comment": "Radio requirements used for demonstrating technical compatibility voice.",
                "message": "voiceRadioCompatible (1.1.1.3.3.9, 1.2.1.1.2.9): The track may have a radio system compatibility voice value that is an IRI. This error is due to having a  value that is not an IRI."
            },
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) must be installed for this parameter to be applicable.",
                "message": "voiceRadioCompatible (1.1.1.3.3.9, 1.2.1.1.2.9):The track {$this} ({?label}), has a 'GSM-R version' defined which makes the voiceRadioCompatible parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Information on RSC voice requirements per country is given in the referred document.Vehicles are considered compatible with the infrastructure regarding this parameter, if any of the values declared matches. In case the value “Not Defined” or “RSC-EU-0” is used, repetitions with additional values are not expected.",
        "see_also": "https://www.era.europa.eu/system/files/2023-05/esc-rsc_technical_document_en.pdf https://www.era.europa.eu/era-folder/radio-system-compatibility-rsc-voice-and-data-documents https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#voiceRadioCompatible"
    },
    "CRG_RadioCompData": {
        "group": "OP",
        "title": "Radio system compatibility data",
        "description": "Radio requirements used for demonstrating technical compatibility data.",
        "iri": "http://data.europa.eu/949/dataRadioCompatible",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.3.10",
            "1.2.1.1.2.10"
        ],
        "xml_names": [
            "CRG_RadioCompData"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "TSI compliant radio (RMR)\n                \n                (\n                \n                1.1.1.3.3 | 1.2.1.1.2 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Radio System Compatibilities Data",
        "values": [
            {
                "code": "10",
                "value": "Not Defined"
            },
            {
                "code": "20",
                "value": "RSC-EU-0"
            },
            {
                "code": "50",
                "value": "RSC-ES-03-D"
            },
            {
                "code": "60",
                "value": "RSC-ES-04-D"
            },
            {
                "code": "61",
                "value": "RSC-ES-04.LAXAVA-D"
            },
            {
                "code": "62",
                "value": "RSC-ES-04.ORESAN-D"
            },
            {
                "code": "63",
                "value": "RSC-ES-04.ARAVIL-D"
            },
            {
                "code": "64",
                "value": "RSC-ES-04.GENERAL-D"
            },
            {
                "code": "70",
                "value": "RSC-SE-01-D"
            },
            {
                "code": "80",
                "value": "RSC-FR-01-D"
            },
            {
                "code": "90",
                "value": "RSC-AT-01-D"
            },
            {
                "code": "100",
                "value": "RSC-PL-01-D"
            },
            {
                "code": "110",
                "value": "RSC-ES-05-D"
            },
            {
                "code": "111",
                "value": "RSC-ES-05.LEOPOL-D"
            },
            {
                "code": "112",
                "value": "RSC-ES-05.PEDORE-D"
            },
            {
                "code": "113",
                "value": "RSC-ES-05.GENERAL-D"
            },
            {
                "code": "114",
                "value": "RSC-ES-03.GENERAL-D"
            },
            {
                "code": "115",
                "value": "RSC-ES-03.SPECIFIC-D"
            },
            {
                "code": "160",
                "value": "RSC-CH-01-D"
            },
            {
                "code": "501",
                "value": "RSC-ES-03.ALBALI-D"
            },
            {
                "code": "502",
                "value": "RSC-ES-03.ANTGRA-D"
            },
            {
                "code": "503",
                "value": "RSC-ES-03.CHATO-D"
            },
            {
                "code": "504",
                "value": "RSC-ES-03.BAFI-D"
            },
            {
                "code": "505",
                "value": "RSC-ES-03.CORMAL-D"
            },
            {
                "code": "506",
                "value": "RSC-ES-03.SAGTOL-D"
            },
            {
                "code": "507",
                "value": "RSC-ES-03.MADBCN-D"
            },
            {
                "code": "508",
                "value": "RSC-ES-03.MADVLL-D"
            },
            {
                "code": "509",
                "value": "RSC-ES-03.MONMUR-D"
            },
            {
                "code": "510",
                "value": "RSC-ES-03.MOTVLCALB-D"
            },
            {
                "code": "511",
                "value": "RSC-ES-03.OLMPED-D"
            },
            {
                "code": "512",
                "value": "RSC-ES-05.PLACACBAD-D"
            },
            {
                "code": "513",
                "value": "RSC-ES-03.TORMOT-D"
            },
            {
                "code": "514",
                "value": "RSC-ES-03.VALLEOBUR-D"
            },
            {
                "code": "515",
                "value": "RSC-ES-03.VILTAR-D"
            },
            {
                "code": "516",
                "value": "RSC-ES-05.HOSMAT-D"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "GSM-R and ETCS L2 must be installed for this parameter to be applicable.",
        "validation_rules": [
            {
                "comment": "GSM-R (parameter 1.1.1.3.3.1) and ETCS L2 (parameter 1.1.1.3.2.1) must be installed for this parameter to be applicable.",
                "message": "dataRadioCompatible (1.1.1.3.3.10, 1.2.1.1.2.10):The track {$this} ({?label}), has a 'GSM-R version' defined and a 'ETCS level' type selected which makes the dataRadioCompatible parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Radio requirements used for demonstrating technical compatibility data.",
                "message": "dataRadioCompatible (1.1.1.3.3.10, 1.2.1.1.2.10): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/radio-system-compatibilities-data/RadioSystemCompatibilitiesData."
            },
            {
                "comment": "Radio requirements used for demonstrating technical compatibility data.",
                "message": "dataRadioCompatible (1.1.1.3.3.10, 1.2.1.1.2.10): The track may have a radio system compatibility data value that is an IRI. This error is due to having a  value that is not an IRI."
            }
        ],
        "general_explanation": "Information on RSC data requirements per country.Vehicles are considered compatible with the infrastructure regarding this parameter, if any of the values declared matches. In case the value “Not Defined” or “RSC-EU-0” is used, repetitions with additional values are not expected.",
        "see_also": "https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf https://www.era.europa.eu/system/files/2023-05/esc-rsc_technical_document_en.pdf https://www.era.europa.eu/era-folder/radio-system-compatibility-rsc-voice-and-data-documents",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#dataRadioCompatible"
    },
    "CCD_TSITrainDetection": {
        "group": "DP",
        "title": "Existence of train detection system fully compliant with the TSI",
        "description": "Indication if there is any train detection system installed and fully compliant with the TSI CCS",
        "iri": "http://data.europa.eu/949/hasTSITrainDetection",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.4.1",
            "1.2.1.1.3.1"
        ],
        "xml_names": [
            "CCD_TSITrainDetection"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Train detection systems defined based on frequency bands\n                \n                (\n                \n                1.1.1.3.4 | 1.2.1.1.3 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication if there is any train detection system installed and fully compliant with the TSI CCS (Annex I, Appendix A, Table A.2 -Index 77).",
                "message": "hasTSITrainDetection (1.1.1.3.4.1, 1.2.1.1.3.1): Each track may define the existence of train detection system fully compliant with the TSI. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "Verification of compliance with TSI includes application of notified national rules (when they exist).",
        "see_also": "Annex I, Appendix A, Table A.2 -Index 77 https://www.era.europa.eu/system/files/2023-09/index077_-_ERA_ERTMS_033281_v5.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasTSITrainDetection"
    },
    "CCD_FreqBandDetec": {
        "group": "OP",
        "title": "Frequency bands for detection",
        "description": "Bands of the frequency management of the train detection systems as defined in the TSI CCS, and in the specific cases or technical documents referred to in Article 13 of TSI CCS when they are available.",
        "iri": "http://data.europa.eu/949/frequencyBandsForDetection",
        "parameter_of": [
            "Train Detection System"
        ],
        "numbers": [
            "1.1.1.3.4.2",
            "1.2.1.1.3.2"
        ],
        "xml_names": [
            "CCD_FreqBandDetec"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Train detection systems defined based on frequency bands\n                \n                (\n                \n                1.1.1.3.4 | 1.2.1.1.3 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Frequency bands for detection, one collection for axle counters, one for track circuits.",
        "values": [
            {
                "code": "A0",
                "value": "DC-operated Track Circuits"
            },
            {
                "code": "A10",
                "value": "Band A10 for Track Circuits"
            },
            {
                "code": "A11",
                "value": "Band A11 for Track Circuits"
            },
            {
                "code": "A1",
                "value": "Band A1 for Axle Counters"
            },
            {
                "code": "A1",
                "value": "Band A1 for Track Circuits"
            },
            {
                "code": "A2",
                "value": "Band A2 for Axle Counters"
            },
            {
                "code": "A2",
                "value": "Band A2 for Track Circuits"
            },
            {
                "code": "A3",
                "value": "Band A3 for Axle Counters"
            },
            {
                "code": "A3",
                "value": "Band A3 for Track Circuits"
            },
            {
                "code": "A4",
                "value": "Band A4 for Track Circuits"
            },
            {
                "code": "A5",
                "value": "Band A5 for Track Circuits"
            },
            {
                "code": "A6",
                "value": "Band A6 for Track Circuits"
            },
            {
                "code": "A7",
                "value": "Band A7 for Track Circuits"
            },
            {
                "code": "A8",
                "value": "Band A8 for Track Circuits"
            },
            {
                "code": "A9",
                "value": "Band A9 for Track Circuits"
            },
            {
                "code": "B1",
                "value": "Band B1 for Track Circuits"
            },
            {
                "code": "B2",
                "value": "Band B2 for Track Circuits"
            },
            {
                "code": "B3",
                "value": "Band B3 for Track Circuits"
            },
            {
                "code": "C10",
                "value": "Band C10 for Track Circuits"
            },
            {
                "code": "C11",
                "value": "Band C11 for Track Circuits"
            },
            {
                "code": "C1",
                "value": "Band C1 for Track Circuits"
            },
            {
                "code": "C2",
                "value": "Band C2 for Track Circuits"
            },
            {
                "code": "C3",
                "value": "Band C3 for Track Circuits"
            },
            {
                "code": "C4",
                "value": "Band C4 for Track Circuits"
            },
            {
                "code": "C5",
                "value": "Band C5 for Track Circuits"
            },
            {
                "code": "C6",
                "value": "Band C6 for Track Circuits"
            },
            {
                "code": "C7",
                "value": "Band C7 for Track Circuits"
            },
            {
                "code": "C8",
                "value": "Band C8 for Track Circuits"
            },
            {
                "code": "C9",
                "value": "Band C9 for Track Circuits"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Bands of the frequency management of the train detection systems as defined in the TSI CCS (Annex I, Appendix A, Table A.2 -Index 77), and in the specific cases or technical documents referred to in Article 13 of TSI CCS when they are available.",
                "message": "frequencyBandsForDetection (1.1.1.3.4.2.1, 1.2.1.1.3.2): The train detection system has a frequency band for detection that must be an IRI. This error may be due to having more than one value or having a value that is not a Document."
            },
            {
                "comment": "Indication of the frequency band for detection of the train detection system",
                "message": "Indication of the frequency band for detection of the train detection system (1.1.1.3.4.2, 1.2.1.1.3.2): The train detection system {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/train-detection/FrequencyBandsForDetection."
            }
        ],
        "general_explanation": "Verification of compliance with TSI includes application of notified national rules (when they exist).Multiple selection from a predefined list:- Axle Counters: bands A1-A3- Track circuits: bands A1-A8",
        "see_also": "https://eur-lex.europa.eu/eli/reg_impl/2023/1695/oj https://www.era.europa.eu/system/files/2023-09/index077_-_ERA_ERTMS_033281_v5.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#frequencyBandsForDetection"
    },
    "CCD_MaxInterfCurrent": {
        "group": "DP",
        "title": "Maximum interference current",
        "description": "Maximum interference current limits allowed for track circuits for a defined frequency band.",
        "iri": "http://data.europa.eu/949/maximumInterferenceCurrent",
        "parameter_of": [
            "Train Detection System"
        ],
        "numbers": [
            "1.1.1.3.4.2.1",
            "1.2.1.1.3.2.1"
        ],
        "xml_names": [
            "CCD_MaxInterfCurrent"
        ],
        "deadline": "For train detection system compliant with TSIs: 12 months after publication of Article 7 Guide.For train detection system not TSI compliant: in relation to article 13 of TSI CCS",
        "belongs_to_group": "Train detection systems defined based on frequency bands\n                \n                (\n                \n                1.1.1.3.4 | 1.2.1.1.3 )",
        "data_presentation": "Double",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Evaluation parameters must be added if preferred bands are not used.",
        "validation_rules": [
            {
                "comment": "Maximum interference current limits allowed for track circuits for a defined frequency band (to be expressed in A/m).",
                "message": "maximumInterferenceCurrent (1.1.1.3.4.2.1, 1.2.1.1.3.2.1): Each train detection system must define the maximum interference current in Amperes. This error may be due to having more than one value or having a value that is not a double (real) number."
            }
        ],
        "general_explanation": "To be expressed in A/m. Verification of compliance with TSI includes application of notified national rules (when they exist).                                Evaluation parameters must be added if preferred bands are not used.",
        "see_also": "https://www.era.europa.eu/system/files/2023-09/index077_-_ERA_ERTMS_033281_v5.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maximumInterferenceCurrent"
    },
    "CCD_VehicleImpedance": {
        "group": "OP",
        "title": "Vehicle impedance",
        "description": "Impedance as defined in the specification referenced in Appendix A-1, index [D]",
        "iri": "http://data.europa.eu/949/minVehicleImpedance",
        "parameter_of": [
            "Train Detection System",
            "Vehicle type configuration parameter set"
        ],
        "numbers": [
            "1.1.1.3.4.2.2",
            "1.2.1.1.3.2.2"
        ],
        "xml_names": [
            "CCD_VehicleImpedance"
        ],
        "deadline": "For train detection system compliant with TSIs, 12 months after publication of Article 7 Guide.For train detection system not TSI compliant: in relation to article 13 of TSI CCS",
        "belongs_to_group": "Train detection systems defined based on frequency bands\n                \n                (\n                \n                1.1.1.3.4 | 1.2.1.1.3 )",
        "data_presentation": "Minimum Vehicle Impedance",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory only for track circuits",
        "validation_rules": [
            {
                "comment": "The parameter minVehicleImpedance is applicable for track circuits.",
                "message": "minVehicleImpedance (1.1.1.3.4.2.2):The Train Detection System {$this} ({?tdsLabel}), has a 'track circuit' type that makes the minVehicleImpedance parameter applicable. This error is due to not having a value for such a parameter."
            }
        ],
        "general_explanation": "Compatibility with track circuits. A track circuit is only able to detect rolling stock if the impedance between rails does not exceed a certain value.",
        "see_also": "https://eur-lex.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#minVehicleImpedance"
    },
    "CCD_MaxMagnField": {
        "group": "OP",
        "title": "Maximum magnetic field",
        "description": "The maximum magnetic field limits allowed for axle counters (in dB µA/m) for a defined frequency band.It should be provided in 3 directions.",
        "iri": "http://data.europa.eu/949/tdsMaximumMagneticField",
        "parameter_of": [
            "Train Detection System"
        ],
        "numbers": [
            "1.1.1.3.4.2.3",
            "1.2.1.1.3.2.3"
        ],
        "xml_names": [
            "CCD_MaxMagnField"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Train detection systems defined based on frequency bands\n                \n                (\n                \n                1.1.1.3.4 | 1.2.1.1.3 )",
        "data_presentation": "Maximum magnetic field",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Mandatory for train detection systems based on axle counters",
        "validation_rules": [
            {
                "comment": "Y, for parameter 1.1.1.3.7.1.1 “Axle Counters” only.",
                "message": "tdsMaximumMagneticField (1.1.1.3.4.2.3, 1.2.1.1.3.2.3):The Train Detection System {$this} ({?clsLabel}), has an 'axle counters' type that makes the tdsMaximumMagneticField parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Relates the Axle Counter TrainDetectionSystem with its MaximumMagneticField in (X,Y,Z). The maximum magnetic field limits allowed for axle counters (in dB µA/m) for a defined frequency band. It should be provided in 3 directions.",
                "message": "tdsMaximumMagneticField (1.1.1.3.4.2.3, 1.2.1.1.3.2.3): The train detection system has a train detection system maximum magnetic field reference that must be a maximum magnetic field. This error may be due to having more than one value or having a value that is not an instance of a MaximumMagnaticField."
            }
        ],
        "general_explanation": "Relates the Axle Counter TrainDetectionSystem with its MaximumMagneticField in (X,Y,Z). Verification of compliance with TSI includes application of notified national rules (when they exist).",
        "see_also": "https://www.era.europa.eu/system/files/2023-09/index077_-_ERA_ERTMS_033281_v5.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/2023-09-08",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tdsMaximumMagneticField"
    },
    "CPO_LegacyTrainProtection": {
        "group": "OP",
        "title": "Train protection legacy system",
        "description": "Indication of which class B system is installed.",
        "iri": "http://data.europa.eu/949/protectionLegacySystem",
        "parameter_of": [
            "Restriction",
            "Running track",
            "Subset with common characteristics",
            "Vehicle Registration Restriction",
            "Vehicle Type",
            "Vehicle Type Authorisation Restriction"
        ],
        "numbers": [
            "1.1.1.3.5.3",
            "1.2.1.1.4.1"
        ],
        "xml_names": [
            "CPO_LegacyTrainProtection"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Train protection legacy systems\n                \n                (\n                \n                1.1.1.3.5 | 1.2.1.1.4 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Train Protection Legacy Systems",
        "values": [
            {
                "code": "00",
                "value": "None"
            },
            {
                "code": "01",
                "value": "ALSN"
            },
            {
                "code": "02",
                "value": "ASFA"
            },
            {
                "code": "03",
                "value": "ATB"
            },
            {
                "code": "04",
                "value": "ATP-VR/RHK"
            },
            {
                "code": "05",
                "value": "BACC"
            },
            {
                "code": "06",
                "value": "CAWS and ATP"
            },
            {
                "code": "07",
                "value": "Crocodile"
            },
            {
                "code": "08",
                "value": "Ebicab"
            },
            {
                "code": "09",
                "value": "EVM"
            },
            {
                "code": "10",
                "value": "GW ATP"
            },
            {
                "code": "11",
                "value": "Indusi/PZB"
            },
            {
                "code": "12",
                "value": "KVB"
            },
            {
                "code": "13",
                "value": "LS"
            },
            {
                "code": "14",
                "value": "LZB"
            },
            {
                "code": "15",
                "value": "MEMOR II+"
            },
            {
                "code": "16",
                "value": "RETB"
            },
            {
                "code": "17",
                "value": "RSDD/SCMT"
            },
            {
                "code": "18",
                "value": "SELCAB"
            },
            {
                "code": "19",
                "value": "SHP"
            },
            {
                "code": "20",
                "value": "TBL"
            },
            {
                "code": "21",
                "value": "TPWS/AWS"
            },
            {
                "code": "22",
                "value": "TVM"
            },
            {
                "code": "23",
                "value": "ZUB 123"
            },
            {
                "code": "24",
                "value": "ZUB 121"
            },
            {
                "code": "25",
                "value": "ATB First generation"
            },
            {
                "code": "26",
                "value": "ATB new generation"
            },
            {
                "code": "27",
                "value": "ATP"
            },
            {
                "code": "28",
                "value": "CAWS"
            },
            {
                "code": "29",
                "value": "Chiltern-ATP"
            },
            {
                "code": "30",
                "value": "DAAT"
            },
            {
                "code": "31",
                "value": "EBICAB 700"
            },
            {
                "code": "32",
                "value": "EBICAB 900 ES"
            },
            {
                "code": "33",
                "value": "EuroSIGNUM"
            },
            {
                "code": "34",
                "value": "EuroZUB"
            },
            {
                "code": "35",
                "value": "Indusi"
            },
            {
                "code": "36",
                "value": "KCVB"
            },
            {
                "code": "37",
                "value": "KCVP"
            },
            {
                "code": "38",
                "value": "KVBP"
            },
            {
                "code": "39",
                "value": "Mechanical Trainstops"
            },
            {
                "code": "40",
                "value": "NEXTEO"
            },
            {
                "code": "41",
                "value": "PKP radio system with Radiostop function"
            },
            {
                "code": "42",
                "value": "SSC"
            },
            {
                "code": "43",
                "value": "TBL 1"
            },
            {
                "code": "44",
                "value": "TBL 2"
            },
            {
                "code": "45",
                "value": "TBL1+"
            },
            {
                "code": "46",
                "value": "TVM 300"
            },
            {
                "code": "47",
                "value": "TVM 430"
            },
            {
                "code": "48",
                "value": "ATC v2"
            },
            {
                "code": "49",
                "value": "ATC vR"
            },
            {
                "code": "50",
                "value": "EBICAB 700 BU"
            },
            {
                "code": "51",
                "value": "EBICAB 700 PT [CONVEL]"
            },
            {
                "code": "52",
                "value": "GNT [Geschwindigkeitsüberwachung für NeiTech-Züge]"
            },
            {
                "code": "53",
                "value": "INDUSI I60"
            },
            {
                "code": "54",
                "value": "LZB [LZB L72, LZB L72 CE I and LZB L72 CE II]"
            },
            {
                "code": "55",
                "value": "LZB ES"
            },
            {
                "code": "56",
                "value": "PZB 90"
            },
            {
                "code": "57",
                "value": "SCMT + RSC"
            },
            {
                "code": "58",
                "value": "SCMT"
            },
            {
                "code": "59",
                "value": "LZB L72"
            },
            {
                "code": "60",
                "value": "LZB CE I"
            },
            {
                "code": "61",
                "value": "LZB CE II"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Indication of which class B system is installed.",
                "message": "protectionLegacySystem (1.1.1.3.5.3): The track has an indication of the class B system that must be an IRI."
            },
            {
                "comment": "Indication of which class B system is installed.",
                "message": "Indication of the protectionLegacySystem (1.1.1.3.5.3): The track {$this}  has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: {?conceptScheme}."
            }
        ],
        "general_explanation": "The list is in line with ERA/TD/2011-09/INT (v1.17), Table 3, and is now in 3.3 of the annex II of TSI CCS.",
        "see_also": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1695&qid=1694158367331#d1295e32-554-1 https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj ; http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#protectionLegacySystem"
    },
    "CRS_Installed": {
        "group": "OP",
        "title": "Class B or other radio systems installed (Radio Legacy Systems)",
        "description": "Indication of radio legacy systems installed.",
        "iri": "http://data.europa.eu/949/legacyRadioSystem",
        "parameter_of": [
            "Restriction",
            "Running track",
            "Subset with common characteristics",
            "Vehicle Registration Restriction",
            "Vehicle Type",
            "Vehicle Type Authorisation Restriction"
        ],
        "numbers": [
            "1.1.1.3.6.1",
            "1.2.1.1.5.1"
        ],
        "xml_names": [
            "CRS_Installed"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Radio Legacy Systems\n                \n                (\n                \n                1.1.1.3.6 | 1.2.1.1.5 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Legacy Radio Systems",
        "values": [
            {
                "code": "01",
                "value": "UIC Radio Chapter 1-4"
            },
            {
                "code": "02",
                "value": "UIC Radio Chapter 1-4+6"
            },
            {
                "code": "03",
                "value": "UIC Radio Chapter 1- 4 + 6 [Irish system]"
            },
            {
                "code": "08",
                "value": "UIC Radio Chapter 1-4 [TTT radio system installed at Cascais line]"
            },
            {
                "code": "09",
                "value": "TTT radio system CP_N [RSC – Rádio Solo-Comboio]"
            },
            {
                "code": "10",
                "value": "PKP radio system"
            },
            {
                "code": "13",
                "value": "LDZ radio system"
            },
            {
                "code": "14",
                "value": "CH — Greek Railways radio system [VHF]"
            },
            {
                "code": "15",
                "value": "UIC Radio Chapter Bulgaria"
            },
            {
                "code": "16",
                "value": "The Estonian radio system"
            },
            {
                "code": "17",
                "value": "The Lithuanian radio system"
            },
            {
                "code": "18",
                "value": "450 Mhz UIC [Channel C]"
            },
            {
                "code": "19",
                "value": "Analogue Radio Germany - UIC 751"
            },
            {
                "code": "20",
                "value": "BOSCH [160 MHz]"
            },
            {
                "code": "21",
                "value": "GSM-P"
            },
            {
                "code": "22",
                "value": "Multikom [160 MHz and 450 MHz]"
            },
            {
                "code": "23",
                "value": "OMEGA [160 MHz]"
            },
            {
                "code": "24",
                "value": "RDZ - in compliance with UIC 751-3"
            },
            {
                "code": "25",
                "value": "RETB [voice]"
            },
            {
                "code": "26",
                "value": "Radio Network of CFR"
            },
            {
                "code": "27",
                "value": "SRO [160 MHz]"
            },
            {
                "code": "28",
                "value": "Shunting Radio Communication System"
            },
            {
                "code": "31",
                "value": "Analogue railway radio system [RDU] - in compliance with UIC 751-3"
            },
            {
                "code": "32",
                "value": "SRD"
            },
            {
                "code": "33",
                "value": "DMR"
            },
            {
                "code": "100",
                "value": "None"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Indication of radio legacy systems installed.",
                "message": "legacyRadioSystem (1.1.1.3.6.1, 1.2.1.1.5.1): The track may have other radio systems installed (Radio Legacy Systems) value that is an IRI. This error is due to having a value that is not an IRI"
            },
            {
                "comment": "Indication of radio legacy systems installed.",
                "message": "legacyRadioSystem (1.1.1.3.6.1, 1.2.1.1.5.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/legacy-radio-systems/LegacyRadioSystems."
            }
        ],
        "general_explanation": "The list is in line with ERA/TD/2011-09/INT (v1.17), Table 4, and is now in 3.4 of the annex II of TSI CCS.",
        "see_also": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1695&qid=1694158367331#d1295e32-554-1 https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj ; http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#legacyRadioSystem"
    },
    "CTD_DetectionSystem": {
        "group": "OP",
        "title": "Type of train detection system",
        "description": "Indication of types of train detection systems installed.",
        "iri": "http://data.europa.eu/949/trainDetectionSystemType",
        "parameter_of": [
            "Restriction",
            "Train Detection System",
            "Vehicle Registration Restriction",
            "Vehicle Type",
            "Vehicle Type Authorisation Restriction"
        ],
        "numbers": [
            "1.1.1.3.7.1.1",
            "1.2.1.1.3.1.1"
        ],
        "xml_names": [
            "CTD_DetectionSystem"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Other train detection systems\n                \n                (\n                \n                1.1.1.3.7 | 1.2.1.1.6 ) Vehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "Train Detection Systems",
        "values": [
            {
                "code": "10",
                "value": "Track circuit | Track circuits"
            },
            {
                "code": "20",
                "value": "Wheel detector"
            },
            {
                "code": "30",
                "value": "Loop | Loops"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Not all parameters are applicable to all types of train detection systems; it depends on the applicability condition.",
        "validation_rules": [
            {
                "comment": "Indication of types of train detection system installed.",
                "message": "Indication of types of train detection system installed (1.1.1.3.7.1.1, 1.2.1.1.3.1.1): The train detection system {$this} (label {?tdsLabel}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/train-detection/TrainDetectionSystems."
            },
            {
                "comment": "Indication of types of train detection system installed.",
                "message": "trainDetectionSystemType (1.1.1.3.7.1.1, 1.2.1.1.3.1.1): The train detection system has a train detection system type that must be a single IRI. This error may be due to having more than one value or having a value that is not an IRI."
            }
        ],
        "general_explanation": "Verification of compliance with TSI includes application of notified national rules (when they exist).Explanation on data presentation: The option of \"wheel detector\" has to be also selected for: wheel sensor for axle counter, pedal or treadle.If there is no train detection system (if this parameters is not applicable) it has an impact on parameters \"Type of track circuits or axle counter to which specific checks are needed\" and \"Document with the procedure(s) related to the type of train detection systems declared in 1.1.1.3.7.1.2 ( 1.2.1.1.6.1, if in OP)\", making them also not applicable. Explanation on data presentation:The option of \"wheel detector\" has to be also selected for: wheel sensor for axle counter, pedal or treadle.",
        "see_also": "https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en.pdf",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trainDetectionSystemType"
    },
    "CTD_TCCheck": {
        "group": "OP",
        "title": "Type of track circuits or axle counters to which specific checks are needed",
        "description": "Reference to the technical specification of train detection system, in accordance with the specification referenced in Appendix A-1, index [D]",
        "iri": "http://data.europa.eu/949/trainDetectionSystemSpecificCheck",
        "parameter_of": [
            "Train Detection System"
        ],
        "numbers": [
            "1.1.1.3.7.1.2",
            "1.2.1.1.6.1"
        ],
        "xml_names": [
            "CTD_TCCheck"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Other train detection systems\n                \n                (\n                \n                1.1.1.3.7 | 1.2.1.1.6 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Train Detection Systems Specific Checks",
        "values": [
            {
                "code": "AT",
                "value": "ZP43"
            },
            {
                "code": "AT",
                "value": "ZP70"
            },
            {
                "code": "AT",
                "value": "EMR-mod (Gleisrelais) mit Track Circuit 100Hz"
            },
            {
                "code": "AT",
                "value": "Gleich-stromkreis"
            },
            {
                "code": "AT",
                "value": "S50108914 106,7 Hz"
            },
            {
                "code": "AT",
                "value": "Thales 100HZ"
            },
            {
                "code": "AT",
                "value": "Track Circuit 100 Hz (eWM)"
            },
            {
                "code": "BE",
                "value": "SK50"
            },
            {
                "code": "BE",
                "value": "UM71"
            },
            {
                "code": "BG",
                "value": "Föstalpine Uni ACE2"
            },
            {
                "code": "BG",
                "value": "Frauscher ACS - 2000"
            },
            {
                "code": "BG",
                "value": "Frauscher RSR 123"
            },
            {
                "code": "BG",
                "value": "Frauscher RSR 180"
            },
            {
                "code": "BG",
                "value": "Promelectronic ESSO-M"
            },
            {
                "code": "BG",
                "value": "Siemens ACM-100"
            },
            {
                "code": "BG",
                "value": "Siemens AzS350"
            },
            {
                "code": "BG",
                "value": "Siemens AzS350U"
            },
            {
                "code": "BG",
                "value": "Siemens ZP-43D"
            },
            {
                "code": "BG",
                "value": "Thales 6221 A3 - Centralized system"
            },
            {
                "code": "BG",
                "value": "Thales 6315 LM - Centralized System"
            },
            {
                "code": "BG",
                "value": "Thales 6316 LS - Decentralized System"
            },
            {
                "code": "BG",
                "value": "AC rail circuit with heterodyne receiver at 71÷83 Hz"
            },
            {
                "code": "BG",
                "value": "DC with continuous power supply WSSB"
            },
            {
                "code": "BG",
                "value": "DC with road relay"
            },
            {
                "code": "BG",
                "value": "DC with Road Relay Experimental"
            },
            {
                "code": "BG",
                "value": "KERV"
            },
            {
                "code": "BG",
                "value": "Phase-sensitive 25 Hz"
            },
            {
                "code": "BG",
                "value": "Pulse"
            },
            {
                "code": "CH",
                "value": "12 Volt DC (two variations re. transmission: DC & AC w/inverter)"
            },
            {
                "code": "CH",
                "value": "125 Hz 3-phase"
            },
            {
                "code": "CZ",
                "value": "A3 Alcatel"
            },
            {
                "code": "CZ",
                "value": "ACS 2000 - RSR122"
            },
            {
                "code": "CZ",
                "value": "AŽD - PZN-1"
            },
            {
                "code": "CZ",
                "value": "AzF - RSR180, RSR120"
            },
            {
                "code": "CZ",
                "value": "Azl 70"
            },
            {
                "code": "DE",
                "value": "DMK"
            },
            {
                "code": "DE",
                "value": "DSS 200/400 (Tiefenbach)"
            },
            {
                "code": "DE",
                "value": "Sk11"
            },
            {
                "code": "DE",
                "value": "Zp 30 mit EAK 30 und Sk30/Sk30H"
            },
            {
                "code": "DE",
                "value": "Zp 30 S mit EAK 30S und Sk30/Sk30H"
            },
            {
                "code": "DE",
                "value": "Zp 30C mit EAK 30C und Sk30/30H"
            },
            {
                "code": "DE",
                "value": "ZP 43E ges."
            },
            {
                "code": "DE",
                "value": "ZP 43M ges."
            },
            {
                "code": "DE",
                "value": "ZP 70 ges."
            },
            {
                "code": "DE",
                "value": "ZP30C-NT mit EAK 30C-NT und Sk30H bis 250km/h"
            },
            {
                "code": "DE",
                "value": "ZP30C-NT mit EAK 30C-NT und Sk30H bis 380km/h"
            },
            {
                "code": "DE",
                "value": "FSP"
            },
            {
                "code": "DE",
                "value": "FSS"
            },
            {
                "code": "DE",
                "value": "FSSB"
            },
            {
                "code": "DE",
                "value": "16kHz"
            },
            {
                "code": "DE",
                "value": "5/10kHz TF-Gleiskreis"
            },
            {
                "code": "DE",
                "value": "EON 1/3"
            },
            {
                "code": "DE",
                "value": "EON 7"
            },
            {
                "code": "DE",
                "value": "GF 100"
            },
            {
                "code": "DE",
                "value": "GF 42 (LF-TC 42Hz)"
            },
            {
                "code": "DE",
                "value": "GF 50"
            },
            {
                "code": "DE",
                "value": "Gleichstromgleiskreis GFO"
            },
            {
                "code": "DE",
                "value": "GLS 100"
            },
            {
                "code": "DE",
                "value": "GLS 106,7"
            },
            {
                "code": "DE",
                "value": "GLS 42"
            },
            {
                "code": "DE",
                "value": "GLS 50"
            },
            {
                "code": "DE",
                "value": "GLS9/15"
            },
            {
                "code": "DE",
                "value": "Röhrengleiskreis 100Hz"
            },
            {
                "code": "DE",
                "value": "Röhrengleiskreis 106,7Hz"
            },
            {
                "code": "DE",
                "value": "Röhrengleiskreis 50Hz"
            },
            {
                "code": "DE",
                "value": "F300(Baugleich RSR122)"
            },
            {
                "code": "DE",
                "value": "FEW Impulsgeber"
            },
            {
                "code": "DE",
                "value": "RS L"
            },
            {
                "code": "DE",
                "value": "RSE 45"
            },
            {
                "code": "DE",
                "value": "RSK 89(mech.Schienenkontakt"
            },
            {
                "code": "DE",
                "value": "RSR 122 (Germany)"
            },
            {
                "code": "DE",
                "value": "S44"
            },
            {
                "code": "DE",
                "value": "Schienenkopfschalter(Tiefenbach)"
            },
            {
                "code": "DE",
                "value": "WSD- E"
            },
            {
                "code": "DE",
                "value": "WSSB Impulsgeber"
            },
            {
                "code": "EE",
                "value": "ACM 200 Axle counting System"
            },
            {
                "code": "EE",
                "value": "Az S 350 U Axle counting System"
            },
            {
                "code": "EE",
                "value": "FAdC R2 with COM-FSE Axle counters"
            },
            {
                "code": "EE",
                "value": "AC track circuit 50Hz"
            },
            {
                "code": "EE",
                "value": "CTRL@TRACK 100 Track circuit"
            },
            {
                "code": "EL",
                "value": "AzS 350 U"
            },
            {
                "code": "EL",
                "value": "SMARTWAY DIGICODE DTC-24"
            },
            {
                "code": "EL",
                "value": "SMARTWAY DIGICODE DTC-921"
            },
            {
                "code": "EL",
                "value": "TI-21"
            },
            {
                "code": "ES",
                "value": "CLX"
            },
            {
                "code": "ES",
                "value": "DEF-214-PLUS"
            },
            {
                "code": "ES",
                "value": "E-CE-95"
            },
            {
                "code": "ES",
                "value": "RSL"
            },
            {
                "code": "ES",
                "value": "SIG.L90"
            },
            {
                "code": "ES",
                "value": "DEF-87-CE"
            },
            {
                "code": "ES",
                "value": "ERD-214"
            },
            {
                "code": "ES",
                "value": "RSR 122 (Spain)"
            },
            {
                "code": "ES",
                "value": "Zp30 C/H"
            },
            {
                "code": "ES",
                "value": "50 Hz"
            },
            {
                "code": "ES",
                "value": "50 Hz (ENYSE)"
            },
            {
                "code": "ES",
                "value": "50 Hz (ERICSSON-ADTRANZ)"
            },
            {
                "code": "ES",
                "value": "DSA 50 Hz"
            },
            {
                "code": "ES",
                "value": "DSA CC"
            },
            {
                "code": "ES",
                "value": "FS 2000/5000"
            },
            {
                "code": "ES",
                "value": "FS 3000"
            },
            {
                "code": "ES",
                "value": "GRS 50 Hz used in Spain"
            },
            {
                "code": "ES",
                "value": "ITE JS (HVI)"
            },
            {
                "code": "ES",
                "value": "ME 3015/ME 3047 (Electrans)"
            },
            {
                "code": "ES",
                "value": "ME 3191"
            },
            {
                "code": "ES",
                "value": "RCF (SASIB 50 Hz)"
            },
            {
                "code": "ES",
                "value": "SJ-24S"
            },
            {
                "code": "ES",
                "value": "SSA 50 Hz"
            },
            {
                "code": "ES",
                "value": "UM71-2000"
            },
            {
                "code": "ES",
                "value": "50 Hz ALCATEL-THALES"
            },
            {
                "code": "ES",
                "value": "50 Hz SIEMENS"
            },
            {
                "code": "ES",
                "value": "EBITRACK 400"
            },
            {
                "code": "ES",
                "value": "TI21 I-M"
            },
            {
                "code": "FI",
                "value": "125 Hz"
            },
            {
                "code": "FI",
                "value": "75 Hz used in Finland"
            },
            {
                "code": "FI",
                "value": "FTGS46"
            },
            {
                "code": "FI",
                "value": "FTGS917"
            },
            {
                "code": "FI",
                "value": "TMC100"
            },
            {
                "code": "FR",
                "value": "Compteur d'essieu / DER D39/D50"
            },
            {
                "code": "FR",
                "value": "Compteur d'essieu / DER ZP30h / Zp30k"
            },
            {
                "code": "FR",
                "value": "Cdv 50 Hz"
            },
            {
                "code": "FR",
                "value": "Cdv 83Hz"
            },
            {
                "code": "FR",
                "value": "Cdv UM71 avec Recepteur REMOD"
            },
            {
                "code": "FR",
                "value": "Cdv UM71 CTVM 300"
            },
            {
                "code": "FR",
                "value": "Direct Current (DC) track circuit"
            },
            {
                "code": "HR",
                "value": "SK30 used in Croatia"
            },
            {
                "code": "HR",
                "value": "ZK24"
            },
            {
                "code": "HR",
                "value": "ZK24-2 used in Croatia"
            },
            {
                "code": "HR",
                "value": "Audio fekventni izolirani odsjek 9607 - 10 kHz"
            },
            {
                "code": "HR",
                "value": "Audio fekventni izolirani odsjek Siemens 10 kHz"
            },
            {
                "code": "HR",
                "value": "Audio fekventni izolirani odsjek 12 R 65 - 8 kHz"
            },
            {
                "code": "HR",
                "value": "Audio frekventni izolirani odsjek IPTC 71150"
            },
            {
                "code": "HR",
                "value": "Audio frekventni izolirani odsjek Iskra 465-425-500"
            },
            {
                "code": "HR",
                "value": "EOC detekori"
            },
            {
                "code": "HR",
                "value": "Istosmjerni izolirani odsjeci"
            },
            {
                "code": "HR",
                "value": "Izolirani odsjeci 50 Hz"
            },
            {
                "code": "HR",
                "value": "Izolirani odsjeci Integra Domino 125 Hz"
            },
            {
                "code": "HR",
                "value": "Izolirani odsjeci Integra Domino APB - IB relej"
            },
            {
                "code": "HR",
                "value": "Izolirani odsjeci Kon?ar 175/225/275Hz"
            },
            {
                "code": "HR",
                "value": "Izolirani odsjeci Saxby"
            },
            {
                "code": "HR",
                "value": "Izolirani odsjeci SEL 83,3 Hz"
            },
            {
                "code": "HR",
                "value": "Izolirani odsjeci Siemens 83,3 Hz"
            },
            {
                "code": "HR",
                "value": "Kolosije?ni/Tirni relej"
            },
            {
                "code": "HR",
                "value": "MS2000"
            },
            {
                "code": "HR",
                "value": "Magnetski tra?ni?ki kontakti Bs SK 9684/154 A"
            },
            {
                "code": "HR",
                "value": "RSR122 used in Croatia"
            },
            {
                "code": "HR",
                "value": "RSR180 used in Croatia"
            },
            {
                "code": "HU",
                "value": "RSR"
            },
            {
                "code": "HU",
                "value": "SK30H"
            },
            {
                "code": "HU",
                "value": "SK30K used in Hungary"
            },
            {
                "code": "HU",
                "value": "WSD"
            },
            {
                "code": "HU",
                "value": "ZK24-2 used in Hungary"
            },
            {
                "code": "HU",
                "value": "ZPD43"
            },
            {
                "code": "HU",
                "value": "S&B"
            },
            {
                "code": "HU",
                "value": "13 kHz"
            },
            {
                "code": "HU",
                "value": "400 Hz"
            },
            {
                "code": "HU",
                "value": "75 Hz used in Hungary"
            },
            {
                "code": "IE",
                "value": "Track Circuits (16 types)"
            },
            {
                "code": "IE",
                "value": "Vehicle Overhang at end axle"
            },
            {
                "code": "IT",
                "value": "AXLE COUNTER before RFI DTCDNSSSTB SR IS 11 005 C 29/11/06"
            },
            {
                "code": "IT",
                "value": "AXLE COUNTER DUCATI HW 2.4 / 2.5 - SW 4.0 (RFI DTCDNSSSTB SR IS 11 005 C 29/11/06)"
            },
            {
                "code": "IT",
                "value": "AXLE COUNTER ECM v2.8 and v3.01 (RFI DTCDNSSSTB SR IS 11 005 C 29/11/06)"
            },
            {
                "code": "IT",
                "value": "50 Hz TRACK CIRCUIT INTEGRATED IN ELECTRONIC INTERLOCKING CCB9 - CB18C"
            },
            {
                "code": "IT",
                "value": "50 Hz TRACK CIRCUIT INTEGRATED IN ELECTRONIC INTERLOCKING CDB"
            },
            {
                "code": "IT",
                "value": "50 Hz TRACK CIRCUIT INTEGRATED IN ELECTRONIC INTERLOCKING DEV/DEP - CDBC"
            },
            {
                "code": "IT",
                "value": "50 Hz TRACK CIRCUIT INTEGRATED IN ELECTRONIC INTERLOCKING FTC/OC - FTC/LB"
            },
            {
                "code": "IT",
                "value": "50 Hz TRACK CIRCUIT INTEGRATED IN ELECTRONIC INTERLOCKING MGRC - STDS"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" CdB a 50 Hz a doppia fuga di rotaia isolata con relè a disco alimentati a correnti fisse Relè a corrente alternata a due elementi, due posizioni tipo FS a disco (NT IS292 Ed. 1972)"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" CdB a 50 Hz a doppia fuga di rotaia isolata con relè a disco elettronico alimentati a correnti fisse Relè a disco elettronico (RFI DTCSTSSSTB SR IS 21 028 C 18/2/2016)"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" CdB a 50 Hz a doppia fuga di rotaia isolata del BACC alimentati a correnti codificate"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" CdB a 50 Hz ad una fuga di rotaia isolata con relè a disco elettronico Relè a disco elettronico (RFI DTCSTSSSTB SR IS 21 028 C 18/2/2016)"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" CdB a 50 Hz ad una fuga di rotaia isolata con relè a disco Relè a corrente alternata a due elementi, due posizioni tipo FS a disco (NT IS292 Ed. 1972)"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" CdB a 83.3 Hz PSK a doppia fuga di rotaia isolata con relè a disco elettronico alimentati a correnti fisse Relè a disco elettronico (RFI DTCSTSSSTB SR IS 21 028 C 18/2/2016)"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" CdB a 83.3 Hz PSK ad una fuga di rotaia isolata con relè a disco elettronico Relè a disco elettronico (RFI DTCSTSSSTB SR IS 21 028 C 18/2/2016)"
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" (mainly used for Level Crossings) CdB tipo \"Overlay FSK\""
            },
            {
                "code": "IT",
                "value": "CONVENTIONAL ELECTROMECHANICAL TRACK CIRCUIT \"STAND-ALONE\" (used for Level Crossings) CdB \"CoRTo AF\" (usato nel PEPL) (RFI DTC STSSSTB SR IS 02 41 A)"
            },
            {
                "code": "IT",
                "value": "WHEEL DETECTOR  (used for Level Crossings) Electronic Wheel Detector SIPED4D (RFI DTC STSSSTB SR IS 02 41 A)"
            },
            {
                "code": "LT",
                "value": "Frauscher RSR122 (hot axle detection)"
            },
            {
                "code": "LT",
                "value": "25 Hz track circuits  (1435 mm track gauge)"
            },
            {
                "code": "LT",
                "value": "DC track circuits (1435 mm track gauge)"
            },
            {
                "code": "LT",
                "value": "TRC-AT-C97 track circuits (1435 mm track gauge)"
            },
            {
                "code": "LU",
                "value": "Axle counter detectors of type DSS200-45"
            },
            {
                "code": "LU",
                "value": "Axle counter detectors of type ZP 43 E (manufactured prior to 2005) (Zählpunkt ZP 43 E (Version vor 2005))"
            },
            {
                "code": "LU",
                "value": "Inductive loop (Fahrzeugsensor Scheidt und Bachmann (FSSB))"
            },
            {
                "code": "LU",
                "value": "50 Hz track circuit (Gleisstromkreis 50 Hz mit Motorgleisrelais)"
            },
            {
                "code": "LU",
                "value": "83.3 Hz track circuit"
            },
            {
                "code": "LU",
                "value": "DC track circuit (Circuit de voie à courant continu)"
            },
            {
                "code": "LU",
                "value": "125 Hz track circuit"
            },
            {
                "code": "LU",
                "value": "83.3 Hz and 125 Hz track circuit"
            },
            {
                "code": "LV",
                "value": "ESSO axle counter with DKU wheel detector"
            },
            {
                "code": "LV",
                "value": "50 Hz coded track circuits"
            },
            {
                "code": "LV",
                "value": "AC 25 Hz track circuits"
            },
            {
                "code": "LV",
                "value": "AC 50 Hz track circuits"
            },
            {
                "code": "LV",
                "value": "Audio frequency track circuits TRC-3"
            },
            {
                "code": "LV",
                "value": "DC impulse track circuits"
            },
            {
                "code": "LV",
                "value": "DC track circuits"
            },
            {
                "code": "NL",
                "value": "Az L90"
            },
            {
                "code": "NL",
                "value": "Ebi Track 2000"
            },
            {
                "code": "NL",
                "value": "SCA-2"
            },
            {
                "code": "NL",
                "value": "ATB-EG (integrated ATP-system)"
            },
            {
                "code": "NL",
                "value": "GRS (75 Hz)"
            },
            {
                "code": "NL",
                "value": "GRS 50 Hz used in Netherlands"
            },
            {
                "code": "NL",
                "value": "High Voltage Track Circuits (PSSSL)"
            },
            {
                "code": "NL",
                "value": "JADE-1"
            },
            {
                "code": "NotApplicable",
                "value": "Not Applicable"
            },
            {
                "code": "PL",
                "value": "\"Classic\" track circuits"
            },
            {
                "code": "PL",
                "value": "EOC track circuit"
            },
            {
                "code": "PL",
                "value": "EON track circuit"
            },
            {
                "code": "PL",
                "value": "SOT track circuit"
            },
            {
                "code": "PT",
                "value": "Zp30C"
            },
            {
                "code": "PT",
                "value": "ZP43 Cascais"
            },
            {
                "code": "PT",
                "value": "125Hz Bifásico"
            },
            {
                "code": "PT",
                "value": "50Hz Bifásico Cascais"
            },
            {
                "code": "PT",
                "value": "8700Hz"
            },
            {
                "code": "PT",
                "value": "DRS"
            },
            {
                "code": "PT",
                "value": "ER 428"
            },
            {
                "code": "PT",
                "value": "UM 71 TAD/ERC with BU"
            },
            {
                "code": "RO",
                "value": "ACM 200"
            },
            {
                "code": "RO",
                "value": "ACS2000"
            },
            {
                "code": "RO",
                "value": "Az LS"
            },
            {
                "code": "RO",
                "value": "Az S 350 U"
            },
            {
                "code": "RO",
                "value": "AzLM 6.4"
            },
            {
                "code": "RO",
                "value": "BO23"
            },
            {
                "code": "RO",
                "value": "UniAC2"
            },
            {
                "code": "RO",
                "value": "Circuite de cale electronice  tip C 4-64"
            },
            {
                "code": "RO",
                "value": "Circuite de cale electronice cu cod numeric în 75 Hz -  tip CN-75-6"
            },
            {
                "code": "RO",
                "value": "Circuite de cale electronice cu impulsuri de tensiune ridicat? tip CS 24-6"
            },
            {
                "code": "RO",
                "value": "Circuite de cale în curent alternativ 2 secven?e"
            },
            {
                "code": "RO",
                "value": "Circuite de cale în curent alternativ cu celula descifratoare tip  CD 3B"
            },
            {
                "code": "RO",
                "value": "Circuite de cale în curent alternativ permanent - 25 Hz"
            },
            {
                "code": "RO",
                "value": "Circuite de cale în curent alternativ permanent - 50Hz sau 75 Hz"
            },
            {
                "code": "RO",
                "value": "Circuite de cale în curent continu"
            },
            {
                "code": "SE",
                "value": "Product #1 - TRV dc track circuit"
            },
            {
                "code": "SI",
                "value": "BO23 - ZK24"
            },
            {
                "code": "SI",
                "value": "RSR122 used in Slovenia"
            },
            {
                "code": "SI",
                "value": "RSR123"
            },
            {
                "code": "SI",
                "value": "RSR180 used in Slovenia"
            },
            {
                "code": "SI",
                "value": "SK30 used in Slovenia"
            },
            {
                "code": "SI",
                "value": "SK30K used in Slovenia"
            },
            {
                "code": "SI",
                "value": "TDR14 - ZK24"
            },
            {
                "code": "SI",
                "value": "S&B Loop"
            },
            {
                "code": "SI",
                "value": "Train current loop"
            },
            {
                "code": "SI",
                "value": "Zelisko loop LC"
            },
            {
                "code": "SK",
                "value": "BO 23 - ZK24 (ALTPRO)"
            },
            {
                "code": "SK",
                "value": "Paralelný - DSR-12"
            },
            {
                "code": "SK",
                "value": "Paralelný - DSR-12S"
            },
            {
                "code": "SK",
                "value": "Paralelný - DSŠ-12"
            },
            {
                "code": "SK",
                "value": "Paralelný - DSŠ-12P"
            },
            {
                "code": "SK",
                "value": "Paralelný - DSŠ-12S"
            },
            {
                "code": "SK",
                "value": "Paralelný - DSŠ-13"
            },
            {
                "code": "SK",
                "value": "Paralelný - DSŠ-13A"
            },
            {
                "code": "SK",
                "value": "Paralelný - FID-2"
            },
            {
                "code": "SK",
                "value": "Paralelný - FID-3"
            },
            {
                "code": "SK",
                "value": "Paralelný - IMVŠ-110"
            },
            {
                "code": "SK",
                "value": "Paralelný - iný"
            },
            {
                "code": "SK",
                "value": "Paralelný - IRV-110"
            },
            {
                "code": "SK",
                "value": "Paralelný - IVG"
            },
            {
                "code": "SK",
                "value": "Paralelný - NMVŠ1-1100"
            },
            {
                "code": "SK",
                "value": "Paralelný - NMVŠ2-1000/1000"
            },
            {
                "code": "SK",
                "value": "Paralelný - NR 1-2"
            },
            {
                "code": "SK",
                "value": "Paralelný - NR 2-2"
            },
            {
                "code": "SK",
                "value": "Paralelný - NVR1-1000"
            },
            {
                "code": "SK",
                "value": "Paralelný - OMŠ"
            },
            {
                "code": "SK",
                "value": "Paralelný - TCR"
            },
            {
                "code": "SK",
                "value": "Paralelný - WSSB"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "It is applicable only when parameter \"Type of train detection system\" is applicable",
        "validation_rules": [
            {
                "comment": "Reference to the technical specification of train detection system.",
                "message": "Indication of specific checks of train detection system installed (1.1.1.3.7.1.2, 1.2.1.1.6.1): The train detection system {$this} (label {?tdsLabel}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/train-detection-specific-checks."
            },
            {
                "comment": "Only applicable when 1.1.1.3.7.1.1 is applicable and the declared type is a track circuit or axle counter (per Appendix A-1, index [D]). Not applicable for loops. A value of era-tdssc:NotApplicable is accepted when the system is fully TSI CCS compliant and no specific check is required.",
                "message": "trainDetectionSystemSpecificCheck (1.1.1.3.7.1.2, 1.2.1.1.6.1):The Train Detection System {$this} ({?clsLabel}) has a type (track circuit or axle counter) that makes the trainDetectionSystemSpecificCheck parameter applicable. This error is due to {$this} not having a value for such a parameter. Use era-tdssc:NotApplicable when no specific check is required."
            },
            {
                "comment": "Reference to the technical specification of train detection system.",
                "message": "trainDetectionSystemSpecificCheck (1.1.1.3.7.1.2, 1.2.1.1.6.1): The train detection system has a train detection system specific check that must be a single IRI. This error may be due to having more than one value or having a value that is not an IRI."
            }
        ],
        "general_explanation": "String containing the name of the TD system for which checks are mentioned in 1.1.1.3.7.1.3.",
        "see_also": "https://www.era.europa.eu/system/files/2023-09/index077_-_ERA_ERTMS_033281_v5.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trainDetectionSystemSpecificCheck"
    },
    "CTD_TCCheckDocRef": {
        "group": "OP",
        "title": "Document with the procedure(s) related to the type of train detection systems declared in \"Type of track circuits or axle counters to which specific checks are needed\"",
        "description": "Electronic document from the IM stored by the Agency with precise values in accordance with TSI CCS Article13 and the specification referenced in Appendix A-1, index [D], for the specific check to be performed for train detection systems identified in parameter \"Type of track circuits or axle counters to which specific checks are needed\".",
        "iri": "http://data.europa.eu/949/trainDetectionSystemSpecificCheckDocument",
        "parameter_of": [
            "Train Detection System"
        ],
        "numbers": [
            "1.1.1.3.7.1.3",
            "1.2.1.1.6.2"
        ],
        "xml_names": [
            "CTD_TCCheckDocRef"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Other train detection systems\n                \n                (\n                \n                1.1.1.3.7 | 1.2.1.1.6 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "It is applicable only when parameter \"Type of train detection system\" is applicable",
        "validation_rules": [
            {
                "comment": "Only applicable when 1.1.1.3.7.1.1 is applicable and the declared type is a track circuit or axle counter (per Appendix A-1, index [D]). Not applicable for loops, nor when 1.1.1.3.7.1.2 is set to era-tdssc:NotApplicable.",
                "message": "trainDetectionSystemSpecificCheckDocument (1.1.1.3.7.1.3, 1.2.1.1.6.2):The Train Detection System {$this} ({?clsLabel}) has a type (track circuit or axle counter) and a specific check that makes the trainDetectionSystemSpecificCheckDocument parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Electronic document available in two EU languages from the IM stored by the Agency with precise procedures for the specific check to be performed for train detection systems identified in 1.1.1.3.7.1.2.",
                "message": "trainDetectionSystemSpecificCheckDocument (1.1.1.3.7.1.3, 1.2.1.1.6.2): The track defines the electronic document available in two EU languages value and it must be a Document. This error may be due to having more than one value or having a value that is not a Document."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "see_also": "https://www.era.europa.eu/system/files/2023-09/index077_-_ERA_ERTMS_033281_v5.pdf",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#trainDetectionSystemSpecificCheckDocument"
    },
    "CTD_TCLimitation": {
        "group": "OP",
        "title": "Section with train detection limitation",
        "description": "Specific for route compatibility check on French network.",
        "iri": "http://data.europa.eu/949/tdsFrenchTrainDetectionSystemLimitation",
        "parameter_of": [
            "Train Detection System"
        ],
        "numbers": [
            "1.1.1.3.7.1.4",
            "1.2.1.1.6.3"
        ],
        "xml_names": [
            "CTD_TCLimitation"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Other train detection systems\n                \n                (\n                \n                1.1.1.3.7 | 1.2.1.1.6 )",
        "data_presentation": "Section with train detection limitation",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Only applicable on running tracks in France",
        "validation_rules": [
            {
                "comment": "Relates the class train detection system with the class that represents the section with train detection limitation. Specific for route compatibility check on French network.",
                "message": "tdsFrenchTrainDetectionSystemLimitation (1.1.1.3.7.1.4, 1.2.1.1.6.3): The train detection system has a tds french train detection system limitation reference that must be a french train detection system limitation. This error may be due to having more than one value or having a value that is not an instance of a FrenchTrainDetectionSystemLimitation"
            }
        ],
        "general_explanation": "Relates the class train detection system with the class that represents the section with train detection limitation. Select the special condition as applicable through National Rule from the List.For RINF XML data sets:As long as the data provision through XML data sets is allowed, the data format is a character string with the following structure: [Y/N]+[N]where:- [Y/N] - is the existence of section with train detection limitation- [N] is a number from 1 to 8 referring to sections with:    [1] Tonnage circulated per track is inferior to 15000 tons/day/track    [2] Directional Interlocking    [3] 45-second delay for directional interlocking    [4] Installation with track circuit announcement    [5] Absence of a shunting assistance pedal in the normal direction of circulation for non-reversible double track lines    [6] Absence of a shunting assistance pedal regardless of the direction of traffic for single track lines and tracks for two way working    [7] Absence of a pedal announcement mechanism    [8] 45-second delay for specific announcement reset devices.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tdsFrenchTrainDetectionSystemLimitation"
    },
    "CTS_SwitchProtectControlWarn": {
        "group": "DP",
        "title": "Existence of switch over between different protection, control and warning systems while running",
        "description": "Indication whether a switch over between different systems whilst running exists.",
        "iri": "http://data.europa.eu/949/switchProtectControlWarning",
        "parameter_of": [
            "Subset with common characteristics",
            "Track"
        ],
        "numbers": [
            "1.1.1.3.8.1",
            "1.2.1.1.7.1"
        ],
        "xml_names": [
            "CTS_SwitchProtectControlWarn"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Transitions between systems\n                \n                (\n                \n                1.1.1.3.8 | 1.2.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Applicable when at least two different protection, control and warning systems exist.",
        "validation_rules": [
            {
                "comment": "Indication whether a switch over between different systems whilst running exists.",
                "message": "switchProtectControlWarning (1.2.1.1.7.1, 1.1.1.3.8.1): Each track may define the existence of switch over between different protection, control and warning systems while running. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "Applicable ('Y') when at least two different class of protection systems exist.",
                "message": "switchProtectControlWarning (1.2.1.1.7.1, 1.1.1.3.8.1):The track {$this} ({?label}), has  more than one protection system defined which makes the switchProtectControlWarning parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Switch over between different systems whilst running. Installation depends on local conditions.",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj ; http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#switchProtectControlWarning"
    },
    "CTS_SwitchProtectControlWarnCondition": {
        "group": "DP",
        "title": "Special conditions to switch over between different class B train protection, control and warning systems",
        "description": "Conditions to switch over between different class B train protection, control and warning systems.",
        "iri": "http://data.europa.eu/949/conditionsSwitchTrainProtectionSystems",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.8.1.1",
            "1.2.1.1.7.1.1"
        ],
        "xml_names": [
            "CTS_SwitchProtectControlWarnCondition"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Transitions between systems\n                \n                (\n                \n                1.1.1.3.8 | 1.2.1.1.7 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Applicable when at least two different protection, control and warning systems exist.",
        "validation_rules": [
            {
                "comment": "Conditions to switch over between different class B train protection, control and warning systems.",
                "message": "conditionsSwitchTrainProtectionSystems (1.1.1.3.8.1.1, 1.2.1.1.7.1.1): The track has a Special conditions to switch over between different class B train protection, control and warning systems value that must be a string and follow the format [NNN]. The error is due to having more than one value, having a value that is not a string, or it is due to the value not following the pattern."
            }
        ],
        "general_explanation": "Switch over between different systems whilst running. Installation depends on local conditions.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#conditionsSwitchTrainProtectionSystems"
    },
    "CTS_SwitchRadioSystem": {
        "group": "DP",
        "title": "Existence of switch over between different radio systems",
        "description": "Indication whether a switch over between different radio systems and no communication system whilst running exists.",
        "iri": "http://data.europa.eu/949/switchRadioSystem",
        "parameter_of": [
            "Subset with common characteristics",
            "Track"
        ],
        "numbers": [
            "1.1.1.3.8.2",
            "1.2.1.1.7.2"
        ],
        "xml_names": [
            "CTS_SwitchRadioSystem"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Transitions between systems\n                \n                (\n                \n                1.1.1.3.8 | 1.2.1.1.7 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Applicable when at least two different radio systems exist.",
        "validation_rules": [
            {
                "comment": "Indication whether a switch over between different radio systems and no communication system whilst running exists.",
                "message": "switchRadioSystem (1.2.1.1.7.2, 1.1.1.3.8.2): Each track may define the existence of switch over between different radio systems. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "Applicable ('Y') when at least two different radio systems exist.",
                "message": "switchRadioSystem (1.2.1.1.7.2, 1.1.1.3.8.2):The track {$this} ({?label}), has more than one radio system defined which makes the switchRadioSystem parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Switch over between different radio systems and no communication system whilst running. Installation depends on local conditions. The \"Indication if other radio systems in normal operation are installed line-side\" is given in parameter 1.1.1.3.6.1 / SOL Track Parameter CRS_Installed",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#switchRadioSystem"
    },
    "CTS_SwitchRadioSystemCondition": {
        "group": "OP",
        "title": "Special instructions to switch over between different radio systems",
        "description": "Name and/or reference of the document specifying the Special instructions to switch over between different radio systems.",
        "iri": "http://data.europa.eu/949/instructionsSwitchRadioSystems",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.8.2.1",
            "1.2.1.1.7.2.1"
        ],
        "xml_names": [
            "CTS_SwitchRadioSystemCondition"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Transitions between systems\n                \n                (\n                \n                1.1.1.3.8 | 1.2.1.1.7 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N/NYA",
        "dependencies": "Applicable when at least two different radio systems exist.",
        "validation_rules": [
            {
                "comment": "Applicable ('Y') when at least two different radio systems exist.",
                "message": "instructionsSwitchRadioSystems (1.1.1.3.8.2.1, 1.2.1.1.7.2.1):The track {$this} ({?label}), has a more than one radio system defined which makes the instructionsSwitchRadioSystems parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Name and/or reference of the document specifying the Special instructions to switch over between different radio systems.",
                "message": "instructionsSwitchRadioSystems (1.1.1.3.8.2.1, 1.2.1.1.7.2.1): The track has Special instructions to switch over between different radio systems value that must be a Document."
            }
        ],
        "general_explanation": "The details of the conditions to switch radio systems must be published.The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#instructionsSwitchRadioSystems"
    },
    "CTS_SwitchERTMSClassBCondition": {
        "group": "OP",
        "title": "Special technical conditions required to switch over between ERTMS/ETCS and Class B systems",
        "description": "Name and/or reference of the document specifying the Special technical conditions required to switch over between ERTMS/ETCS and Class B systems.",
        "iri": "http://data.europa.eu/949/conditionsSwitchClassBSystems",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.8.3",
            "1.2.1.1.7.3"
        ],
        "xml_names": [
            "CTS_SwitchERTMSClassBCondition"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Transitions between systems\n                \n                (\n                \n                1.1.1.3.8 | 1.2.1.1.7 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Applicable when at least two different class of protection systems exist.",
        "validation_rules": [
            {
                "comment": "Applicable ('Y') when at least two different class of protection systems exist.",
                "message": "conditionsSwitchClassBSystems (1.1.1.3.8.3, 1.2.1.1.7.3):The track {$this} ({?label}), has a more than one protection system defined which makes the conditionsSwitchClassBSystems parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Name and/or reference of the document specifying the Special technical conditions required to switch over between ERTMS/ETCS and Class B systems.",
                "message": "conditionsSwitchClassBSystems (1.1.1.3.8.3, 1.2.1.1.7.3): The track has Special technical conditions required to switch over between ERTMS/ETCS and Class B systems value that must be a Document.  This error is due to having more than one value or having a value that is not an instance of Document."
            }
        ],
        "general_explanation": "The details of the conditions to switch between Class B train protection systems must be published.The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#conditionsSwitchClassBSystems"
    },
    "CEI_TSIMagneticFields": {
        "group": "DP",
        "title": "Existence and TSI compliance of rules for magnetic fields emitted by a vehicle",
        "description": "Indication whether rules exist and are compliant with the TSI.",
        "iri": "http://data.europa.eu/949/tsiMagneticFields",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.9.1",
            "1.2.1.1.8.1"
        ],
        "xml_names": [
            "CEI_TSIMagneticFields"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Parameters related to electromagnetic interferences\n                \n                (\n                \n                1.1.1.3.9 | 1.2.1.1.8 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Applicable ( Y ) only when for parameter 1.1.1.3.7.1 the selected option is wheel detector. The parameter is not applicable when the rules do not exist.",
        "validation_rules": [
            {
                "comment": "Indication whether rules exist and are compliant with the TSI.",
                "message": "tsiMagneticFields (1.1.1.3.9.1, 1.2.1.1.8.1): Each track may define the existence and TSI compliance of rules for magnetic fields emitted by a vehicle. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            },
            {
                "comment": "Applicable ('Y') only when for parameter 1.1.1.3.7.1.1 the selected option is 'wheel detector'.",
                "message": "tsiMagneticFields (1.1.1.3.9.1, 1.2.1.1.8.1):The track {$this} ({?label}), has a 'train detection system' type ('wheel detector') that makes the tsiMagneticFields parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "The electromagnetic fields generated by rolling stock can interfere with the operation of axle counters and wheel detectors.                       'True' means the rules exist and are compliant with the frequency management specified in the TSI.                      'False' means the rules exist and are not compliant with the frequency management specified in the TSI.                      Verification of compliance with TSI includes application of notified national rules (when they exist) in case of part covered by open point.",
        "see_also": "https://www.era.europa.eu/system/files/2023-09/index077_-_ERA_ERTMS_033281_v5.pdf",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tsiMagneticFields"
    },
    "CEI_TSITractionHarmonics": {
        "group": "DP",
        "title": "Existence and TSI compliance of limits in harmonics in the traction current of vehicles",
        "description": "Indication whether rules exist and are compliant with the TSI.",
        "iri": "http://data.europa.eu/949/tsiTractionHarmonics",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.9.2",
            "1.2.1.1.8.2"
        ],
        "xml_names": [
            "CEI_TSITractionHarmonics"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Parameters related to electromagnetic interferences\n                \n                (\n                \n                1.1.1.3.9 | 1.2.1.1.8 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Applicable ('Y') only when for parameter 1.1.1.3.7.1.1 the selected option is 'wheel detector' or 'track circuit'.",
                "message": "tsiTractionHarmonics (1.1.1.3.9.2, 1.2.1.1.8.2): The track {$this} ({?label}), has a 'train detection system' type ('wheel detector' or 'track circuit')  that makes the tsiTractionHarmonics parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Indication whether rules exist and are compliant with the TSI.",
                "message": "tsiTractionHarmonics (1.1.1.3.9.2, 1.2.1.1.8.2): Each track may define the existence and TSI compliance of limits in harmonics in the traction current of vehicles. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "Compatibility with track circuits and wheel detectors of axle counters.                          The harmonics in the traction current in the rails can interfere with the operation of track circuits. The DC current in the rails may saturate the detectors of the axle counters, preventing their operation. 'Y' means the rules exist and are compliant with the frequency management specified in the TSI.'N' 'means the rules exist and are not compliant with the frequency management specified in the TSI.Verification of compliance with TSI includes application of notified national rules (when they exist) in case of part covered by open point.LOC&PAS TSI : Appendix J-2, index 1, clause 3.2.2",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#tsiTractionHarmonics"
    },
    "CLD_ETCSSituation": {
        "group": "OP",
        "title": "ETCS level for degraded situation",
        "description": "ERTMS / ETCS application level for degraded situation related to the track side equipment.",
        "iri": "http://data.europa.eu/949/etcsDegradedSituation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.10.1",
            "1.2.1.1.9.1"
        ],
        "xml_names": [
            "CLD_ETCSSituation"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Line-side system for degraded situation\n                \n                (\n                \n                1.1.1.3.10 | 1.2.1.1.9 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "ETCS Level for Degraded Situations",
        "values": [
            {
                "code": "10",
                "value": "None"
            },
            {
                "code": "11",
                "value": "0"
            },
            {
                "code": "20",
                "value": "1"
            },
            {
                "code": "50",
                "value": "NTC"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "Mandatory when ETCS is present.",
        "validation_rules": [
            {
                "comment": "ERTMS / ETCS application level for degraded situation related to the track side equipment.",
                "message": "etcsDegradedSituation (1.1.1.3.10.1, 1.2.1.1.9.1): The track must have an ETCS level for degraded situation value that is an IRI."
            },
            {
                "comment": "ERTMS / ETCS application level for degraded situation related to The track side equipment.",
                "message": "etcsDegradedSituation (1.1.1.3.10.1, 1.2.1.1.9.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/etcs-situation/ETCSSituations."
            },
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "etcsDegradedSituation (1.1.1.3.10.1, 1.2.1.1.9.1):The track {$this} ({?label}), has an 'ETCS Level Type' defined that makes the etcsDegradedSituation parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "System for degraded situation. In case of failure of the ETCS Level for normal operation, train movement can be supervised in another ETCS Level. If parameter 1.1.1.3.2.1 is not used (no ETCS), no degradation is possible, so only \"none\" level is possible for degraded .It assumed that the degraded level has to be lower than the actual operating level.See also TSI OPE 4.2.3.6. Degraded operation.",
        "example": "Level 1 as a degraded mode for Level 2.",
        "see_also": "https://eur-lex.europa.eu/eli/reg_impl/2019/773/oj",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/2023-09-28 ; http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#etcsDegradedSituation"
    },
    "CLD_OtherProtectControlWarn": {
        "group": "OP",
        "title": "Other train protection, control and warning systems for degraded situation",
        "description": "Indication of existence of other system than ETCS for degraded situation.",
        "iri": "http://data.europa.eu/949/otherTrainProtection",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.10.2",
            "1.2.1.1.9.2"
        ],
        "xml_names": [
            "CLD_OtherProtectControlWarn"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks",
        "belongs_to_group": "Line-side system for degraded situation\n                \n                (\n                \n                1.1.1.3.10 | 1.2.1.1.9 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Other Protection Control and Warnings",
        "values": [
            {
                "code": "01",
                "value": "ALSN"
            },
            {
                "code": "02",
                "value": "ASFA"
            },
            {
                "code": "04",
                "value": "ATP-VR/RHK"
            },
            {
                "code": "07",
                "value": "Crocodile"
            },
            {
                "code": "09",
                "value": "EVM"
            },
            {
                "code": "10",
                "value": "GW ATP"
            },
            {
                "code": "12",
                "value": "KVB"
            },
            {
                "code": "13",
                "value": "LS"
            },
            {
                "code": "16",
                "value": "RETB"
            },
            {
                "code": "19",
                "value": "SHP"
            },
            {
                "code": "21",
                "value": "TPWS/AWS"
            },
            {
                "code": "23",
                "value": "ZUB 123"
            },
            {
                "code": "25",
                "value": "ATB First generation"
            },
            {
                "code": "26",
                "value": "ATB new generation"
            },
            {
                "code": "27",
                "value": "ATP"
            },
            {
                "code": "28",
                "value": "CAWS"
            },
            {
                "code": "29",
                "value": "Chiltern-ATP"
            },
            {
                "code": "30",
                "value": "DAAT"
            },
            {
                "code": "32",
                "value": "EBICAB 900 ES"
            },
            {
                "code": "33",
                "value": "EuroSIGNUM"
            },
            {
                "code": "34",
                "value": "EuroZUB"
            },
            {
                "code": "36",
                "value": "KCVB"
            },
            {
                "code": "37",
                "value": "KCVP"
            },
            {
                "code": "38",
                "value": "KVBP"
            },
            {
                "code": "39",
                "value": "Mechanical Trainstops"
            },
            {
                "code": "40",
                "value": "NEXTEO"
            },
            {
                "code": "41",
                "value": "PKP radio system with Radiostop function"
            },
            {
                "code": "42",
                "value": "SSC"
            },
            {
                "code": "43",
                "value": "TBL 1"
            },
            {
                "code": "44",
                "value": "TBL 2"
            },
            {
                "code": "45",
                "value": "TBL1+"
            },
            {
                "code": "46",
                "value": "TVM 300"
            },
            {
                "code": "47",
                "value": "TVM 430"
            },
            {
                "code": "48",
                "value": "ATC v2"
            },
            {
                "code": "49",
                "value": "ATC vR"
            },
            {
                "code": "50",
                "value": "EBICAB 700 BU"
            },
            {
                "code": "51",
                "value": "EBICAB 700 PT [CONVEL]"
            },
            {
                "code": "52",
                "value": "GNT [Geschwindigkeitsüberwachung für NeiTech-Züge]"
            },
            {
                "code": "53",
                "value": "INDUSI I60"
            },
            {
                "code": "55",
                "value": "LZB ES"
            },
            {
                "code": "56",
                "value": "PZB 90"
            },
            {
                "code": "57",
                "value": "SCMT + RSC"
            },
            {
                "code": "58",
                "value": "SCMT"
            },
            {
                "code": "59",
                "value": "LZB L72"
            },
            {
                "code": "60",
                "value": "LZB CE I"
            },
            {
                "code": "61",
                "value": "LZB CE II"
            },
            {
                "code": "100",
                "value": "None"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "characteristics": "Functional property (unique value)",
        "dependencies": "Only applicable when for parameter 1.1.1.3.10.1 \"none\" was selected.",
        "validation_rules": [
            {
                "comment": "Indication of existence of other system than ETCS for degraded situation.",
                "message": "otherTrainProtection (1.1.1.3.10.2, 1.2.1.1.9.2): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/other-protection-control-warning/OtherProtectionControlWarnings."
            },
            {
                "comment": "Indication of existence of other system than ETCS for degraded situation.",
                "message": "otherTrainProtection (1.1.1.3.10.2, 1.2.1.1.9.2): The track may have other train protection, control and warning systems for degraded situation value that is an IRI. This error is due to having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "otherTrainProtection (1.1.1.3.10.2, 1.2.1.1.9.2):The track {$this} ({?label}), has an  'ETCS Level Type' defined which makes the otherTrainProtection parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "Selected value shall answer the question whether any other system than ETCS exists on the respective track. The list of possible values is in line with ERA/TD/2011-09/INT, Table 3.",
        "see_also": "https://www.era.europa.eu/system/files/2022-11/list_harmonised_national_restriction_codes_en %281%29.pdf?t=1707149802",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj ; http://data.europa.eu/eli/reg_impl/2019/773/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#otherTrainProtection"
    },
    "CBP_MaxBrakeDist": {
        "group": "DP",
        "title": "Maximum braking distance requested",
        "description": "The maximum value of the braking distance [in metres] of a train shall be given for the maximum line speed.",
        "iri": "http://data.europa.eu/949/maximumBrakingDistance",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.11.1"
        ],
        "xml_names": [
            "CBP_MaxBrakeDist"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Brake related parameters\n                \n                (\n                \n                1.1.1.3.11 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "The maximum value of the braking distance [in metres] of a train shall be given for the maximum line speed.",
                "message": "maximumBrakingDistance (1.1.1.3.11.1): The track must define at most one value of the maximum value of the braking distance [in metres] of a train and it is an integer. This error may be due to the track having more than one value or to having a value that is not an integer."
            }
        ],
        "general_explanation": "This distance corresponds to the smallest physical distance between signals of the section of line at V max, taking into account the effect of gradient, minus the value of the safety margin used by the IM.The braking capability of a train allows it to respect this braking distance.Note that the OPE TSI provides for an exchange of detailed information between the infrastructure manager and the railway undertaking to ensure safe operation.See also: - OPE TSI: 4.2.2.6 - CCS TSI: 4.2.2",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj ; http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#maximumBrakingDistance"
    },
    "CBP_AddInfoAvailable": {
        "group": "DP",
        "title": "Availability by the IM of additional information",
        "description": "Availability by the IM of additional information as defined in point (2) of point 4.2.2.6.2 of Regulation (EU) 2023/1693 - TSI OPE",
        "iri": "http://data.europa.eu/949/hasAdditionalBrakingInformation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.11.2"
        ],
        "xml_names": [
            "CBP_AddInfoAvailable"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Brake related parameters\n                \n                (\n                \n                1.1.1.3.11 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Availability by the IM of additional information as defined in 4.2.2.6.2 (2) Regulation XXX-OPE TSI.",
                "message": "hasAdditionalBrakingInformation (1.1.1.3.11.2): The track must define at most one value of the availability by the IM of additional information and it is Y/N (boolean). This error may be due to the track having more than one value or to having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "[See TSI OPE 4.2.2.6.2 (2)]",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasAdditionalBrakingInformation"
    },
    "CBP_BrakePerfDocRef": {
        "group": "OP",
        "title": "Documents available by the IM relating to braking performance",
        "description": "Electronic document available in two EU languages from the IM stored by the Agency providing additional information as defined in point (2) of point 4.2.2.6.2 of TSI OPE.",
        "iri": "http://data.europa.eu/949/additionalBrakingInformationDocument",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.11.3"
        ],
        "xml_names": [
            "CBP_BrakePerfDocRef"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Brake related parameters\n                \n                (\n                \n                1.1.1.3.11 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "dependencies": "Only applicable when for parameter 1.1.1.3.11.2 True is selected",
        "validation_rules": [
            {
                "comment": "Documents available by the IM relating to braking performance.",
                "message": "additionalBrakingInformationDocument (1.1.1.3.11.3): The track defines the documents available by the IM relating to braking performance value and it must be a Document."
            },
            {
                "comment": "Electronic document available in two EU languages from the IM stored by the Agency providing additional information as defined in point (2) of point 4.2.2.6.2 of TSI OPE.",
                "message": "additionalBrakingInformationDocument (1.1.1.3.11.3): This error is due to the track {?trackLabel} , violating the rule: Y in case of Y for 1.1.1.3.11.2."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#additionalBrakingInformationDocument"
    },
    "CAO_ATOGradeAutomation": {
        "group": "OP",
        "title": "ATO Grade of Automation",
        "description": "ATO grade of automation installed lineside.",
        "iri": "http://data.europa.eu/949/atoGradeAutomation",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.3.13.1",
            "1.2.1.1.10.1"
        ],
        "xml_names": [
            "CAO_ATOGradeAutomation"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Automated Train Operation (ATO)\n                \n                (\n                \n                1.1.1.3.13 | 1.2.1.1.10 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "ATO Grade of Automation",
        "values": [
            {
                "code": "0",
                "value": "0"
            },
            {
                "code": "1",
                "value": "1"
            },
            {
                "code": "2",
                "value": "2"
            },
            {
                "code": "3",
                "value": "3"
            },
            {
                "code": "4",
                "value": "4"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "Parameter only applicable when ETCS Baseline > 4 MR1 and ATO is implemented",
        "validation_rules": [
            {
                "comment": "ATO grade of automation installed lineside.",
                "message": "atoGradeAutomation (1.1.1.3.13.1, 1.2.1.1.10.1): The track must have a ATO grade of automation installed lineside value that is an IRI."
            },
            {
                "comment": "ATO grade of automation installed lineside.",
                "message": "atoGradeAutomation (1.1.1.3.13.1, 1.2.1.1.10.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ato-grades-automation/ATOGradeOfAutomation."
            }
        ],
        "general_explanation": "ATO is an optional function added in ETCS B4, only available under L2. See: TSI CCS, 4.2.4 & 4.2.19.                       Parameter only applicable when ETCS Baseline > 4 MR1 and ATO is implemented",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj ; http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#atoGradeAutomation"
    },
    "CAO_ATOSystemvers": {
        "group": "OP",
        "title": "ATO System version",
        "description": "ATO system version according to the specification referenced in TSI CCS 2023/1695",
        "iri": "http://data.europa.eu/949/atoSystemVersion",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.13.2",
            "1.2.1.1.10.2"
        ],
        "xml_names": [
            "CAO_ATOSystemvers"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Automated Train Operation (ATO)\n                \n                (\n                \n                1.1.1.3.13 | 1.2.1.1.10 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "ATO System Versions",
        "values": [
            {
                "code": "0",
                "value": "Non-harmonised"
            },
            {
                "code": "1",
                "value": "1.0"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "Parameter only applicable when ETCS Baseline > 4 MR1 and ATO is implemented",
        "validation_rules": [
            {
                "comment": "ATO system version according to the specification referenced in TSI CCS (4.2.19).",
                "message": "atoSystemVersion (1.1.1.3.13.1, 1.2.1.1.10.1): The track must have a ATO system version value that is an IRI."
            },
            {
                "comment": "ATO system version according to the specification referenced in TSI CCS (4.2.19).",
                "message": "atoSystemVersion (1.1.1.3.13.1, 1.2.1.1.10.1): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ato-s-versions/ATOSystemVersions."
            }
        ],
        "general_explanation": "ATO is an optional function added in ETCS B4, only available under L2. See: TSI CCS, 4.2.4 & 4.2.19.                     Parameter only applicable when ETCS Baseline > 4 MR1 and ATO is implemented",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#atoSystemVersion"
    },
    "CAO_ATOCommSystem": {
        "group": "OP",
        "title": "ATO communication system",
        "description": "Supported ATO communication systems from trackside.",
        "iri": "http://data.europa.eu/949/atoCommunicationSystem",
        "parameter_of": [
            "Running track",
            "Subset with common characteristics",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.13.3",
            "1.2.1.1.10.3"
        ],
        "xml_names": [
            "CAO_ATOCommSystem"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Automated Train Operation (ATO)\n                \n                (\n                \n                1.1.1.3.13 | 1.2.1.1.10 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "ATO Communication System",
        "values": [
            {
                "code": "gsmr",
                "value": "Gsmr"
            },
            {
                "code": "public",
                "value": "Public"
            }
        ],
        "applicability_flags": "Y/N/NYA",
        "dependencies": "Parameter only applicable when ETCS Baseline > 4 MR1 and ATO is implemented",
        "validation_rules": [
            {
                "comment": "Supported ATO communication systems from trackside.",
                "message": "atoCommunicationSystem (1.1.1.3.13.3, 1.2.1.1.10.3): The track {$this} (label {?label}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/ato-commsys/ATOCommSystem."
            },
            {
                "comment": "Supported ATO communication systems from trackside.",
                "message": "atoCommunicationSystem (1.1.1.3.13.3, 1.2.1.1.10.3): The track must have a ATO communication system value that is an IRI."
            }
        ],
        "general_explanation": "ATO system communication system to the specification referenced in TSI CCS (4.2.4 & 4.2.19).                           Parameter only applicable when ETCS Baseline > 4 MR1 and ATO is implemented",
        "references": "http://data.europa.eu/eli/reg_impl/2023/1695/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#atoCommunicationSystem"
    },
    "RUL_LocalRulesOrRestrictions": {
        "group": "DP",
        "title": "Existence of rules and restrictions of a strictly local nature",
        "description": "Existence of rules and restrictions of a strictly local nature",
        "iri": "http://data.europa.eu/949/localRulesOrRestrictions",
        "parameter_of": [
            "Operational Point",
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.4.1",
            "1.2.3.1"
        ],
        "xml_names": [
            "RUL_LocalRulesOrRestrictions"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Rules and restrictions\n                \n                (\n                \n                1.1.1.4 | 1.2.3 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Existence of rules and restrictions of a strictly local nature.",
                "message": "localRulesOrRestrictions (1.1.1.4.1, 1.2.3.1): Each track may define the existence of rules and restrictions of a strictly local nature. This error is due to having more than one value or having a value that is not Y/N (boolean)."
            }
        ],
        "general_explanation": "There is a general obligation for Member States to notify existing national rules but:  Member States may decide not to notify rules and restrictions of a strictly local nature. In such cases, Member States shall mention those rules and restrictions in the registers of infrastructure. In this eventuality, this parameter allows the IM accordingly to its Member State decision to declare the existence of such rules and to provide them with the parameter 'Documents regarding the rules or restrictions of a strictly local nature available by the IM'",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#localRulesOrRestrictions"
    },
    "RUL_LocalRulesOrRestrictionsDocRef": {
        "group": "OP",
        "title": "Documents regarding the rules or restrictions of a strictly local nature available by the IM",
        "description": "Electronic document available from the IM stored by the Agency providing additional information.",
        "iri": "http://data.europa.eu/949/localRulesOrRestrictionsDoc",
        "parameter_of": [
            "Operational Point",
            "Running track",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.1.1.4.2",
            "1.2.3.2"
        ],
        "xml_names": [
            "RUL_LocalRulesOrRestrictionsDocRef"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Rules and restrictions\n                \n                (\n                \n                1.1.1.4 | 1.2.3 )",
        "data_presentation": "ERA Document",
        "applicability_flags": "Y/N",
        "dependencies": "Mandatory to provide at least a document if parameter \"Existence of rules and restrictions of a strictly local nature\" value is boolean \"Yes\"",
        "validation_rules": [
            {
                "comment": "Only applicable when localRulesOrRestrictions is true.",
                "message": "localRulesOrRestrictionsDoc (1.1.1.4.2, 1.2.3.2): The track, subset with common characteristics or operational point {$this} ({?label}), has 'localRulesOrRestrictions' value 'true' which makes the localRulesOrRestrictionsDoc parameter applicable. This error is due to {$this} not having a value for such a parameter."
            },
            {
                "comment": "Electronic document available from the IM stored by the Agency providing additional information.",
                "message": "localRulesOrRestrictionsDoc (1.1.1.4.2, 1.2.3.2): The track has a value of the document regarding the rules or restrictions of a strictly local nature available by the IM, that must be a Document."
            }
        ],
        "general_explanation": "The value of this parameter should be either a reference to a file name or an external link to a document. If a file name is provided, the Infrastructure Manager (IM) must upload a document with the same file name using the \"Reference Documents Management\" functionality in the RINF application. The document must be in electronic format and available in two official EU languages. In this case, the parameter value must be repeated for each document. If an external link is provided, the IM must ensure that the document is available at the provided link.IOD: Notification of national rules Art 14. 11. Member States may decide not to notify rules and restrictions of a strictly local nature. In such cases, Member States shall mention those rules and restrictions in the registers of infrastructure referred to in Article 49",
        "see_also": "IOD: Notification of national rules Art 14. 11",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#localRulesOrRestrictionsDoc"
    },
    "OPName": {
        "group": "DP",
        "title": "Name of operational point",
        "description": "Name normally related to the town or village or to traffic control purpose.",
        "iri": "http://data.europa.eu/949/opName",
        "parameter_of": [
            "Operational Point"
        ],
        "numbers": [
            "1.2.0.0.0.1"
        ],
        "xml_names": [
            "OPName"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Operational point generic information\n                \n                (\n                \n                1.2.0.0.0 )",
        "data_presentation": "Lang String",
        "applicability_flags": "Y",
        "validation_rules": [
            {
                "comment": "Name normally related to the town or village or to traffic control purpose.",
                "message": "opName (1.2.0.0.0.1): Each Operational Point must have at least one name in English (@en). Additional multilingual names are allowed, but only one value per language tag is permitted. All values must be language-tagged string literals."
            }
        ],
        "general_explanation": "Name of OP may not always exist in common use. In such case IM should propose a name for OP.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#opName"
    },
    "UniqueOPID": {
        "group": "DP",
        "title": "Unique OP ID",
        "description": "Code composed of country code and alphanumeric operational point code.",
        "iri": "http://data.europa.eu/949/uopid",
        "parameter_of": [
            "Operational Point"
        ],
        "numbers": [
            "1.2.0.0.0.2"
        ],
        "xml_names": [
            "UniqueOPID"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Operational point generic information\n                \n                (\n                \n                1.2.0.0.0 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Code composed of country code and alphanumeric OP code.",
                "message": "uopid (1.2.0.0.0.2): The OperationalPoint {$this} with id {?uopid} and label {?opLabel} is a border point that references a ReferenceBorderPoint, but its uopid does not match the borderPointId of the referenced point ('{?uopid}' ≠ '{?refId}')."
            },
            {
                "comment": "Code composed of country code and alphanumeric OP code.",
                "message": "uopid (1.2.0.0.0.2): This error is due to having more than one op id, not having an op id, having a value that is not a string, or having a value that does not follow the pattern where the first part 'AA' is the country code in two-letter system of ISO (or 'EU' for border points) and the second part is the alphanumeric OP code within the MS."
            }
        ],
        "general_explanation": "Explanation on data presentation: The first two characters represent the country code in two-letter system of ISO. The second part  AAAAAAAAAA  is maximum 10 Characters String corresponding to OP code within the MS. 'LUAB4' or 'LUAB46TH-G' or 'LUAB4/-_ERT7' are accepted by the validation process.In case of  borders point , the code is to be selected in the corresponding list in annex 5.1 (this first part  AA  is EU. The second part is  AAAAAAAAAA ). Any OP ID that is not referenced in the annex 5.1 will not be accepted by the validation process.In case of  domestic borders point , the code will be selected in the corresponding list in annex 5.2 that will be developed later.Any OP ID that is not referenced in the annex 5.1 will not be accepted by the validation process.The provided OP ID must be unique within each Member State. The validation has to be made nationally by NRE. The exceptions are  Border point  and  domestic border point  that must be referenced in annex 5.1.",
        "see_also": "ISO 3166-1 alpha 2",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#uopid"
    },
    "OPTafTapCode": {
        "group": "OP",
        "title": "Primary location",
        "description": "Primary location code developed for information exchange in accordance with the TSIs relating to the telematics applications subsystem.",
        "iri": "http://data.europa.eu/949/primaryLocation",
        "parameter_of": [
            "Infrastructure element"
        ],
        "numbers": [
            "1.2.0.0.0.3"
        ],
        "xml_names": [
            "OPTafTapCode"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Operational point generic information\n                \n                (\n                \n                1.2.0.0.0 )",
        "data_presentation": "Primary Location",
        "applicability_flags": "Y/N",
        "dependencies": "Applicable only in case when a primary location exists",
        "validation_rules": [
            {
                "comment": "Primary location code developed for information exchange in accordance with the TSIs relating to the telematics applications subsystem.",
                "message": "primaryLocation: The infrastructure element has a primaryLocation reference that must be an IRI that refers to an instance of PrimaryLocation."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#primaryLocation"
    },
    "OPType": {
        "group": "OP",
        "title": "Type of operational point",
        "description": "Type of facility in relation to the dominating operational functions.",
        "iri": "http://data.europa.eu/949/opType",
        "parameter_of": [
            "Operational Point"
        ],
        "numbers": [
            "1.2.0.0.0.4"
        ],
        "xml_names": [
            "OPType"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Operational point generic information\n                \n                (\n                \n                1.2.0.0.0 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Operational Point Types",
        "values": [
            {
                "code": "10",
                "value": "Station | large or major railway node with several functions, important for international traffic, basic for national railway system"
            },
            {
                "code": "30",
                "value": "Passenger terminal | station with dominating function of service for passenger traffic, serving as a central hub for passengers, often integrating rail operations with intermodal transport networks and large-scale passenger facilities, including ticketing, waiting areas, and other passenger services"
            },
            {
                "code": "40",
                "value": "Freight terminal | station dominantly serving for loading and unloading of freight trains"
            },
            {
                "code": "50",
                "value": "Depot or workshop | group of tracks used by depot or workshop for rolling stock maintenance"
            },
            {
                "code": "60",
                "value": "Train technical services | group of tracks for servicing trains (parking, washing, etc.)"
            },
            {
                "code": "70",
                "value": "Passenger stop | or halts - small operational point consisting of at least one platform, normally serving mostly for local passenger services, without routing, dispatching, or train management facilities"
            },
            {
                "code": "80",
                "value": "Junction | consists of at least one turnout, normally used mostly for changing direction of trains, with reduced or not existing other functions"
            },
            {
                "code": "90",
                "value": "Border point | located exactly in the point where a border between Member States meets a railway line."
            },
            {
                "code": "100",
                "value": "Shunting yard | group of tracks used for shunting trains, mostly related to freight traffic"
            },
            {
                "code": "120",
                "value": "Switch | consists of only one switch and the area around it delimited and protected by entry signals, normally used for changing direction of trains, with reduced or not existing other function"
            },
            {
                "code": "130",
                "value": "Private siding | Operational Point allowing to provide more information on the private siding and on the way its is linked to the main network. Its use is left to the discretion of each Member State."
            },
            {
                "code": "140",
                "value": "Domestic border point | designated location on the main lines where the infrastructure responsibilities transition between IMs"
            }
        ],
        "applicability_flags": "Y",
        "validation_rules": [
            {
                "comment": "Type of facility in relation to the dominating operational functions.Each existing case has to be approximated to the one of the above defined types by including size, importance and dominating functions. It is most important to recognize the most important role of specific OP in the network. That is why only one type for one OP is permitted.",
                "message": "opType (1.2.0.0.0.4):  Each Operational Point must have exactly one type. This error may be due to having an OP  with no type or with more than one type, or its value is not an IRI."
            },
            {
                "comment": "Type of facility in relation to the dominating operational functions.\nEach existing case has to be approximated to the one of the above defined types by including size, importance and dominating functions. It is most important to recognize the most important role of specific OP in the network. That is why only one type for one OP is permitted.",
                "message": "Type of operational point   (1.2.0.0.0.4): The OP {$this} (label {?opLabel}) has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/op-types/OperationalPointTypes."
            }
        ],
        "general_explanation": "Each existing case has to be approximated to the one of the above defined types by including size, importance and dominating functions. It is most important to recognize the most important role of specific OP in the network. That is why only one type for one OP is permitted.For purpose of RINF, there were defined the following types of OPs:1.\tStation - large or major railway node with several functions, important for international traffic, basic for national railway system;2.\tPassenger terminal - station with dominating function of service for passenger traffic, serving as a central hub for passengers, often integrating rail operations with intermodal transport networks and large-scale passenger facilities, including ticketing, waiting areas, and other passenger services;3.\tFreight terminal - station dominantly serving for loading and unloading of freight trains;4.\tDepot or workshop - group of tracks used by depot or workshop for RST maintenance;5.\tTrain technical services - group of tracks for servicing trains (parking, washing, etc.);6.\tPassenger stop - or halts - small OP consisting of at least one platform, normally serving mostly for local passenger services, without routing, dispatching, or train management facilities;7.\tJunction - OP consisting of at least one turnout, normally used mostly for changing direction of trains, with reduced or not existing other functions;8.\tBorder point - located in the point where a border between MSs meets a railway line; 9.\tShunting yard - group of tracks used for shunting trains, mostly related to freight traffic;10.\tSwitch - OP consisting of only one switch and the area around it, delimited and protected by entry signals, normally used for changing direction of trains, with reduced or not existing other functions;11.\tDomestic border point - designated location on the main lines where the infrastructure responsibilities transition between IMs.",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#opType"
    },
    "OPTypeGaugeChangeover": {
        "group": "DP",
        "title": "Type of track gauge changeover facility",
        "description": "Type of track gauge changeover facility.",
        "iri": "http://data.europa.eu/949/opTypeGaugeChangeover",
        "parameter_of": [
            "Operational Point"
        ],
        "numbers": [
            "1.2.0.0.0.4.1"
        ],
        "xml_names": [
            "OPTypeGaugeChangeover"
        ],
        "deadline": "16 January 2020",
        "belongs_to_group": "Operational point generic information\n                \n                (\n                \n                1.2.0.0.0 )",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Type of track gauge changeover facility.",
                "message": "opTypeGaugeChangeover (1.2.0.0.0.4.1): The Operational Point must have at most one value of opTypeGaugeChangeover and its type must be a string."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#opTypeGaugeChangeover"
    },
    "OPRailwayLocation": {
        "group": "DP",
        "title": "Kilometer number",
        "description": "Kilometer number of the kilometric post related to line identification defining the location of an infrastructure element.",
        "iri": "http://data.europa.eu/949/kilometer",
        "parameter_of": [
            "Kilometric Post"
        ],
        "numbers": [
            "1.2.0.0.0.6"
        ],
        "xml_names": [
            "OPRailwayLocation"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 ) Signal\n                \n                (\n                \n                1.1.1.3.14 )",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Distance measured in kilometers from the origin of a national railway line/route.",
                "message": "kilometer (1.1.1.1.8.12.1, 1.1.1.1.8.13.1, 1.1.1.3.14.3, 1.1.1.3.14.7, 1.2.0.0.0.6, 1.2.1.0.5.10.1, 1.2.1.0.5.11.1, 1.2.1.0.8.3, 1.2.2.0.5.10.1, 1.2.2.0.5.9.1): The kilometer must be represented as a double number."
            }
        ],
        "general_explanation": "For walkways: Value provided in Kilometric point of the start of the walkway and the length in m. Repeatable values for each location.For rescue points: Value provided in Kilometric point of the start of the point of evacuation and rescue point and the length in m. Repeatable values for each location.For signals: Relative position to the line identified under parameter 1.1.0.0.0.2, given in km ([reference point, via era:referent] / [NNN.NNN] ).",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#kilometer"
    },
    "ITU_DieselThermAllowed": {
        "group": "DP",
        "title": "Diesel or other thermal traction allowed",
        "description": "Indication whether it is allowed to use diesel or other thermal traction in the tunnel",
        "iri": "http://data.europa.eu/949/dieselThermalAllowed",
        "parameter_of": [
            "Subset with common characteristics",
            "Tunnel"
        ],
        "numbers": [
            "1.2.1.0.5.9"
        ],
        "xml_names": [
            "ITU_DieselThermAllowed"
        ],
        "deadline": "1 January 2021",
        "belongs_to_group": "Tunnel\n                \n                (\n                \n                1.1.1.1.8 | 1.2.1.0.5 | 1.2.2.0.5 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether it is allowed to use diesel or other thermal traction in the tunnel.",
                "message": "dieselThermalAllowed (1.2.1.0.5.9): A Tunnel may have an indication about the permission of thermal traction. This error may be due to having a tunnel with more than one dieselThermalAllowed declaration or having a value type different than Y/N (boolean)."
            }
        ],
        "references": "http://data.europa.eu/eli/reg/2014/1303/2024-01-29",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#dieselThermalAllowed"
    },
    "OPTrackPlatformIdentification": {
        "group": "DP",
        "title": "Identification of platform",
        "description": "Unique platform identification or unique platform number within an Operational Point.",
        "iri": "http://data.europa.eu/949/platformId",
        "parameter_of": [
            "Platform edge"
        ],
        "numbers": [
            "1.2.1.0.6.2"
        ],
        "xml_names": [
            "OPTrackPlatformIdentification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Platform\n                \n                (\n                \n                1.2.1.0.6 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Each platform shall have unique identification or number within the OP. This number cannot be used for naming any other platform in the same OP.",
                "message": "platformId (1.2.1.0.6.2):: Each platform shall have unique identification or number within the OP. This number cannot be used for naming any other platform in the same OP. There is a problem with OP {$this} ({?opLabel}) and platforms {?platform1} ({?platform1Label}) and {?platform2} ({?platform2Label}), since they have the same identifier: {?value}."
            },
            {
                "comment": "Unique platform identification or unique platform number within OP.",
                "message": "platformId (1.2.1.0.6.2): Each Platform must have exactly one platformId. This error may be due to having a platform without or with more than one platformId or it value is not a string."
            }
        ],
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#platformId"
    },
    "IPL_Length": {
        "group": "DP",
        "title": "Usable length of platform",
        "description": "The maximum continuous length (expressed in metres) of that part of platform in front of which a train is intended to remain stationary in normal operating conditions for passengers to board and alight from the train, making appropriate allowance for stopping tolerances.",
        "iri": "http://data.europa.eu/949/lengthOfPlatform",
        "parameter_of": [
            "Platform edge"
        ],
        "numbers": [
            "1.2.1.0.6.4"
        ],
        "xml_names": [
            "IPL_Length"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Platform\n                \n                (\n                \n                1.2.1.0.6 ) Length",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "The maximum continuous length (expressed in metres) of that part of platform in front of which a train is intended to remain stationary in normal operating conditions for passengers to board and alight from the train, making appropriate allowance for stopping tolerances.",
                "message": "length (1.2.1.0.6.4): Each Platform must have at most one length. This error may be caused due to having a platform with more than one length or having a value that is not a Real number."
            }
        ],
        "general_explanation": "Platform dimensions are always related to one neighbouring track at a time.So, if two tracks are along a platform, this platform should be divided into two RINF platforms to have precise description of each.",
        "see_also": "INF TSI: 4.2.1, 4.2.9.1 OPE TSI: 4.2.2.5.2, 4.2.2.7.2",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28 ; http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#lengthOfPlatform"
    },
    "IPL_Height": {
        "group": "OP",
        "title": "Height of platform",
        "description": "Distance between the upper surface of platform and running surface of the neighbouring track. It is the nominal value expressed in millimetres.",
        "iri": "http://data.europa.eu/949/platformHeight",
        "parameter_of": [
            "Platform edge",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.1.0.6.5"
        ],
        "xml_names": [
            "IPL_Height"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Platform\n                \n                (\n                \n                1.2.1.0.6 )",
        "data_presentation": "Concept",
        "taxonomy_reference": "Platform Heights",
        "values": [
            {
                "code": "10",
                "value": "250 mm"
            },
            {
                "code": "20",
                "value": "280 mm"
            },
            {
                "code": "30",
                "value": "550 mm"
            },
            {
                "code": "40",
                "value": "760 mm"
            },
            {
                "code": "50",
                "value": "150 mm"
            },
            {
                "code": "60",
                "value": "200 mm"
            },
            {
                "code": "70",
                "value": "580 mm"
            },
            {
                "code": "80",
                "value": "680 mm"
            },
            {
                "code": "90",
                "value": "685 mm"
            },
            {
                "code": "100",
                "value": "730 mm"
            },
            {
                "code": "110",
                "value": "840 mm"
            },
            {
                "code": "120",
                "value": "900 mm"
            },
            {
                "code": "130",
                "value": "915mm (UK specific case)"
            },
            {
                "code": "140",
                "value": "920 mm"
            },
            {
                "code": "150",
                "value": "960 mm"
            },
            {
                "code": "160",
                "value": "1100 mm"
            },
            {
                "code": "220",
                "value": "220 mm"
            },
            {
                "code": "300",
                "value": "300 mm (with dual moveable step)"
            },
            {
                "code": "350",
                "value": "350 mm"
            },
            {
                "code": "380",
                "value": "380 mm"
            }
        ],
        "applicability_flags": "Y",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Distance between the upper surface of platform and running surface of the neighbouring track. It is the nominal value expressed in millimetres.",
                "message": "platformHeight (1.2.1.0.6.5): Each Platform must have at most  one height. This error may be due to having a platform with more than one height, or having a value that is not an URI."
            },
            {
                "comment": "Distance between the upper surface of platform and running surface of the neighbouring track. It is the nominal value expressed in millimetres.",
                "message": "Platform height (1.2.1.0.6.5): The platform {$this} with label {?label} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/platform-heights/PlatformHeights."
            }
        ],
        "general_explanation": "Values included in the list are taken from PRM and INF TSIs including Specific Cases. They are the values which are mandatory for the design of the platform at the respective part of the network. They are not real values measured at real platforms.Platform dimensions are always related to one neighbouring track at a time.So, if two tracks are along a platform, this platform should be divided into two or more ‘RINF platforms’ to have precise description of each.",
        "see_also": "INF TSI: 4.2.9.2PRM TSI: 4.2.2.11OPE TSI: 2.3.7 of Appendix D2",
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj ; http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#platformHeight"
    },
    "IPL_AssistanceStartingTrain": {
        "group": "DP",
        "title": "Existence of platform assistance for starting train",
        "description": "Indication of existence of equipment or staff supporting the train crew in starting the train.",
        "iri": "http://data.europa.eu/949/assistanceStartingTrain",
        "parameter_of": [
            "Platform edge",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.1.0.6.6"
        ],
        "xml_names": [
            "IPL_AssistanceStartingTrain"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Platform\n                \n                (\n                \n                1.2.1.0.6 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication of existence of equipment or staff supporting the train crew in starting the train.\nFixed equipment (for example mirrors or CCTV cameras) or station staff indicating to train crew or driver when to close doors and whether this has been done successfully.",
                "message": "assistanceStartingTrain (1.2.1.0.6.6): Each Platform must have at most one assistanceStartingTrain declaration. This error may be caused due to having a platform with having more than one assistanceStartingTrain, or its value is not Y/N (boolean)."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#assistanceStartingTrain"
    },
    "IPL_AreaBoardingAid": {
        "group": "DP",
        "title": "Range of use of the platform boarding aid",
        "description": "Information of the train access level for which the boarding aid can be used.",
        "iri": "http://data.europa.eu/949/areaBoardingAid",
        "parameter_of": [
            "Platform edge",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.1.0.6.7"
        ],
        "xml_names": [
            "IPL_AreaBoardingAid"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Platform\n                \n                (\n                \n                1.2.1.0.6 )",
        "data_presentation": "Integer",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Information of the train access level for which the boarding aid can be used.",
                "message": "areaBoardingAid (1.2.1.0.6.7): Each Platform must have at most one areaBoardingAid value. This error may be caused due to having a platform with multiple areaBoardingAid values or having a value that is not an integer."
            }
        ],
        "general_explanation": "Information of the train access level for which the boarding aid can be used. Data is presented as the vertical difference that is overcome by the platform boarding aid in millimetres. The value “0” means that the platform is not equipped with a platform boarding aid.",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#areaBoardingAid"
    },
    "IPL_Curvature": {
        "group": "DP",
        "title": "Curvature of the platform",
        "description": "Indication of the existence of the curvature of the platform.",
        "iri": "http://data.europa.eu/949/hasPlatformCurvature",
        "parameter_of": [
            "Platform edge",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.1.0.6.8"
        ],
        "xml_names": [
            "IPL_Curvature"
        ],
        "deadline": "12 months after publication of Article 7 Guide",
        "belongs_to_group": "Platform\n                \n                (\n                \n                1.2.1.0.6 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "Indication of the existence of the curvature of the platform.",
                "message": "hasPlatformCurvature (1.2.1.0.6.8): Each Platform must have at most one hasPlatformCurvature value. This error may be caused due to having a platform with multiple hasPlatformCurvature values or having a value that is not a boolean."
            }
        ],
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasPlatformCurvature"
    },
    "OPSidingIdentification": {
        "group": "DP",
        "title": "Identification of siding",
        "description": "Unique siding identification or number within an Operational Point.",
        "iri": "http://data.europa.eu/949/sidingId",
        "parameter_of": [
            "Siding"
        ],
        "numbers": [
            "1.2.2.0.0.2"
        ],
        "xml_names": [
            "OPSidingIdentification"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Siding\n                \n                (\n                \n                1.2.2 ) Identifier",
        "data_presentation": "String",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Each siding shall have unique identification or number within the OP. This number cannot be used for naming any other siding in the same OP.",
                "message": "sidingId (1.2.2.0.0.2):: Each siding shall have unique identification or number within the OP. This number cannot be used for naming any other siding in the same OP. There is a problem with the OP {$this} ({?opLabel}) and sidings {?siding1} ({?siding1Label}) and {?siding2} ({?siding2Label}), since they have the same identifier: {?value}."
            },
            {
                "comment": "Unique siding identification or unique siding number within OP",
                "message": "sidingId (1.2.2.0.0.2): Each siding must have a unique siding identification that is a character string. This error is due to not having a sidingId value, having more than one sidingId value or having a value that is not a string."
            }
        ],
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#sidingId"
    },
    "IPP_Length": {
        "group": "DP",
        "title": "Usable length of siding",
        "description": "Total length of the siding/stabling track expressed in metres where trains can be parked safely.",
        "iri": "http://data.europa.eu/949/lengthOfSiding",
        "parameter_of": [
            "Siding"
        ],
        "numbers": [
            "1.2.2.0.2.1"
        ],
        "xml_names": [
            "IPP_Length"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Siding\n                \n                (\n                \n                1.2.2 ) Length",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Total length of the siding/stabling track expressed in meters where trains can be parked safely",
                "message": "lengthOfSiding (1.2.2.0.2.1): Each siding may have a length in meters. This error is due to having more than one length value or having a length that is not a double (real) number or not following the pattern [NNNN]."
            }
        ],
        "references": "http://data.europa.eu/eli/reg_impl/2019/773/oj",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#lengthOfSiding"
    },
    "ILL_Gradient": {
        "group": "DP",
        "title": "Gradient for stabling tracks",
        "description": "Maximum value of the gradient for stabling tracks expressed in millimetres per metre.",
        "iri": "http://data.europa.eu/949/gradient",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.3.1"
        ],
        "xml_names": [
            "ILL_Gradient"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Siding\n                \n                (\n                \n                1.2.2 )",
        "data_presentation": "Double",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Maximum value of the gradient expressed in millimeters per meter",
                "message": "gradient (1.2.2.0.3.1): Each siding may have a gradient in millimeters per meter. This error is due to having more than one gradient value or having a gradient that is not a double (real) number."
            }
        ],
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#gradient"
    },
    "ILL_MinRadVertCurve": {
        "group": "OP",
        "title": "Minimum radius of vertical curve",
        "description": "Radius of the smallest vertical curve expressed in metres.",
        "iri": "http://data.europa.eu/949/minimumVerticalRadius",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.3.3"
        ],
        "xml_names": [
            "ILL_MinRadVertCurve"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Siding\n                \n                (\n                \n                1.2.2 )",
        "data_presentation": "Minimum radius of vertical curve",
        "applicability_flags": "Y/N",
        "validation_rules": [
            {
                "comment": "Indication of types of appearance of track lineside distance indications.",
                "message": "minimumVerticalRadius (1.2.2.0.3.3) : The siding must have at most one value of minimum vertical radius that must be an instace of MinimumVerticalRadius. This error may be due to the track having more than one value or having a value that is not an instance of the class MinimumVerticalRadius."
            }
        ],
        "general_explanation": "The radius of vertical curves (except for humps in marshalling yards) shall be at least 500 m on a crest or 900 m in a hollow.",
        "see_also": "INF TSI: 4.2.3.54",
        "references": "http://data.europa.eu/eli/reg/2014/1299/2019-06-16",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#minimumVerticalRadius"
    },
    "ITS_ToiletDischarge": {
        "group": "DP",
        "title": "Existence of toilet discharge",
        "description": "Indication whether exists an installation of toilet discharge (fixed installation for servicing trains) as defined in TSI INF",
        "iri": "http://data.europa.eu/949/hasToiletDischarge",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.4.1"
        ],
        "xml_names": [
            "ITS_ToiletDischarge"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Fixed installations for servicing trains\n                \n                (\n                \n                1.2.2.0.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether exists and installation for toilet discharge (fixed installation for servicing trains) as defined in INF TSIs",
                "message": "hasToiletDischarge (1.2.2.0.4.1): Each siding may define the existence of a toilet discharge. This error is due to having more than one has toilet discharge value or having a has has toilet discharge value that is not Y/N (boolean)."
            }
        ],
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasToiletDischarge"
    },
    "ITS_ExternalCleaning": {
        "group": "DP",
        "title": "Existence of external cleaning facilities",
        "description": "Indication whether exists an installation of external cleaning facility (fixed installation for servicing trains) as defined in TSI INF",
        "iri": "http://data.europa.eu/949/hasExternalCleaning",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.4.2"
        ],
        "xml_names": [
            "ITS_ExternalCleaning"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Fixed installations for servicing trains\n                \n                (\n                \n                1.2.2.0.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether exists and installation for external cleaning facility (fixed installation for servicing trains) as defined in INF TSIs",
                "message": "hasExternalCleaning (1.2.2.0.4.2): Each siding may define the existence of an external cleaning facility. This error is due to having more than one has external cleaning value or having a has external cleaning value that is not Y/N (boolean)."
            }
        ],
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasExternalCleaning"
    },
    "ITS_WaterRestocking": {
        "group": "DP",
        "title": "Existence of water restocking",
        "description": "Indication whether exists an installation of water restocking (fixed installation for servicing trains) as defined in TSI INF",
        "iri": "http://data.europa.eu/949/hasWaterRestocking",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.4.3"
        ],
        "xml_names": [
            "ITS_WaterRestocking"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Fixed installations for servicing trains\n                \n                (\n                \n                1.2.2.0.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether exists and installation for water restocking (fixed installation for servicing trains) as defined in INF TSIs",
                "message": "hasWaterRestocking (1.2.2.0.4.3): Each siding may define the existence of a water restocking facility. This error is due to having more than one has water restocking value or having a has  water restocking value that is not Y/N (boolean)."
            }
        ],
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasWaterRestocking"
    },
    "ITS_Refuelling": {
        "group": "DP",
        "title": "Existence of refuelling",
        "description": "Indication whether exists an installation of refuelling (fixed installation for servicing trains) as defined in TSI INF.",
        "iri": "http://data.europa.eu/949/hasRefuelling",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.4.4"
        ],
        "xml_names": [
            "ITS_Refuelling"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Fixed installations for servicing trains\n                \n                (\n                \n                1.2.2.0.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether exists and installation for refuelling (fixed installation for servicing trains) as defined in INF TSIs",
                "message": "hasRefuelling (1.2.2.0.4.4): Each siding may define the existence of a refuelling facility. This error is due to having more than one has refuelling value or having a  has refuelling value that is not Y/N (boolean)."
            }
        ],
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasRefuelling"
    },
    "ITS_SandRestocking": {
        "group": "DP",
        "title": "Existence of sand restocking",
        "description": "Indication whether an installation of sand restocking exists (fixed installation for servicing trains).",
        "iri": "http://data.europa.eu/949/hasSandRestocking",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.4.5"
        ],
        "xml_names": [
            "ITS_SandRestocking"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Fixed installations for servicing trains\n                \n                (\n                \n                1.2.2.0.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether an installation for sand restocking exists(fixed installation for servicing trains)",
                "message": "hasSandRestocking (1.2.2.0.4.5): Each siding may define the existence of a sand restocking facility. This error is due to having more than one has sand restocking value or having a  has sand restocking value that is not Y/N (boolean)."
            }
        ],
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasSandRestocking"
    },
    "ITS_ElectricShoreSupply": {
        "group": "DP",
        "title": "Existence of electric shore supply",
        "description": "Indication whether exists an installation of electric shore supply (fixed installation for servicing trains).",
        "iri": "http://data.europa.eu/949/hasElectricShoreSupply",
        "parameter_of": [
            "Siding",
            "Subset with common characteristics"
        ],
        "numbers": [
            "1.2.2.0.4.6"
        ],
        "xml_names": [
            "ITS_ElectricShoreSupply"
        ],
        "deadline": "In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "Fixed installations for servicing trains\n                \n                (\n                \n                1.2.2.0.4 )",
        "data_presentation": "Boolean",
        "applicability_flags": "Y/N",
        "characteristics": "Functional property (unique value)",
        "validation_rules": [
            {
                "comment": "Indication whether an installation for electric shore supply exists (fixed installation for servicing trains)",
                "message": "hasElectricShoreSupply (1.2.2.0.4.6): Each siding may define the existence of an electric shore supply facility. This error is due to having more than one has electric shore supply value or having a  has electric shore supply value that is not Y/N (boolean)."
            }
        ],
        "references": "http://data.europa.eu/eli/reg/2014/1299/2023-09-28",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#hasElectricShoreSupply"
    },
    "CPE_Baseline": {
        "group": "C",
        "title": "ETCS baseline",
        "description": "ETCS baseline installed lineside.",
        "iri": "http://data.europa.eu/949/etcsBaseline",
        "parameter_of": [
            "ETCS",
            "Vehicle Type"
        ],
        "numbers": [
            "1.1.1.3.2.2",
            "1.2.1.1.1.2"
        ],
        "xml_names": [
            "CPE_Baseline"
        ],
        "deadline": "12 months after publication of Article 7 Guide for OP tracks. In accordance with Implementing Decision 2014/880/EU and by 16 March 2019 at the latest",
        "belongs_to_group": "TSI compliant train protection system (ETCS) ( 1.1.1.3.2 | 1.2.1.1.1 )\nVehicle type technical characteristic",
        "data_presentation": "Concept",
        "taxonomy_reference": "ETCS Baselines",
        "applicability_flags": "Y/N/NYA",
        "validation_rules": [
            {
                "comment": "ETCS baseline installed lineside",
                "message": "etcsBaseline (1.1.1.3.2.2, 1.2.1.1.1.2): The ETCS may have an ETCS baseline, and its value must be an IRI. This error is due to the ETCS instance having more than one value or having a value that is not an IRI."
            },
            {
                "comment": "ETCS baseline installed lineside",
                "message": "etcsBaseline (1.1.1.3.2.2, 1.2.1.1.1.2): The ETCS {$this} has a value {?concept} that is not one of the predefined values and cannot be converted into a SKOS concept on this list: http://data.europa.eu/949/concepts/etcs-baselines/."
            },
            {
                "comment": "Only applicable when selected value for 1.1.1.3.2.1 (ETCS present).",
                "message": "etcsBaseline (1.1.1.3.2.2, 1.2.1.1.1.2): The ETCS {$this} ({?thisLabel}), has a ETCS level type which makes the etcsBaseline parameter applicable. This error is due to {$this} not having a value for such a parameter."
            }
        ],
        "general_explanation": "The ETCS baseline needs to be provided for each available ETCS Level. See: TSI CCS (Table A2)",
        "see_also": "Appendix D2 Index: 3.2.7",
        "url": "https://rinf.data.era.europa.eu/era-vocabulary/rinf-appGuide/#etcsBaseline",
        "values": [
            { "code": "00", "value": "Pre-baseline 2 - SRS < 2.2.2" },
            { "code": "10", "value": "Pre-baseline 2 - SRS 2.2.2" },
            { "code": "20", "value": "Baseline 2 - SRS 2.3.0d" },
            { "code": "30", "value": "Baseline 3 - SRS 3.3.0" },
            { "code": "40", "value": "Baseline 3 maintenance release 1 - SRS 3.4.0" },
            { "code": "50", "value": "Baseline 3 release 2 - SRS 3.6.0" },
            { "code": "60", "value": "Baseline 4 (release 1) - SRS 4.0.0" }
        ]
    }
};
