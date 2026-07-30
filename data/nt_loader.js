// data/nt_loader.js
// NT バックエンド実装。公開 API は data_loader.js 経由で呼ぶこと。
import { setMultiValueParams } from '../js/state.js';
import { rinfParams }          from './rinf_parameters_final.js';

/* ══════════════════════════════════════════════════════════════════════
   §1  VOCABULARY
   ══════════════════════════════════════════════════════════════════════ */
const ERA      = 'http://data.europa.eu/949/';
const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const GEO_LAT  = 'http://www.w3.org/2003/01/geo/wgs84_pos#lat';
const GEO_LONG = 'http://www.w3.org/2003/01/geo/wgs84_pos#long';

const iriOf = (xmlName) => rinfParams[xmlName]?.iri ?? null;

const VOCAB = {
    canonicalURI:  ERA + 'canonicalURI',
    notApplicable: ERA + 'notApplicable',
    validFrom:     ERA + 'validityDateStart',
    validTo:       ERA + 'validityDateEnd',
    solLineId:     iriOf('SOLLineIdentification'),
    solLength:     iriOf('SOLLength'),
    solNature:     iriOf('SOLNature'),
    solHasTrack:   ERA + 'track',
    opUopid:       iriOf('UniqueOPID'),
    opName:        iriOf('OPName'),
    opType:        iriOf('OPType'),
    opTafTap:      iriOf('OPTafTapCode'),
    opLat:         GEO_LAT,
    opLong:        GEO_LONG,
    opHasTrack:    ERA + 'track',
    trackId:       iriOf('SOLTrackIdentification'),
    trackDir:      iriOf('SOLTrackDirection'),
    hasPart:       ERA + 'hasPart',
    habd:                 ERA + 'hasHotAxleBoxDetector',
    sidingId:      iriOf('OPSidingIdentification'),
    contactLineSystem:    ERA + 'contactLineSystem',
    etcs:                 ERA + 'etcs',
    trainDetectionSystem: ERA + 'trainDetectionSystem',
    platformId:    iriOf('OPTrackPlatformIdentification'),
    tunnelId:      iriOf('SOLTunnelIdentification'),
    tunnelIMCode:  ERA + 'organisationCode',
    tunnelStartKm: ERA + 'startKilometer',
    tunnelEndKm:   ERA + 'endKilometer',
};

const SUB_ENTITY_LINKS = [
    { pred: VOCAB.contactLineSystem,    ntType: 'ContactLineSystem',    setName: 'ContactLineSystem'    },
    { pred: VOCAB.etcs,                 ntType: 'ETCS',                 setName: 'ETCS'                 },
    { pred: VOCAB.trainDetectionSystem, ntType: 'TrainDetectionSystem', setName: 'TrainDetectionSystem' },
    { pred: VOCAB.habd,                 ntType: 'HABD',                 setName: 'HABD'                 },
];

function getEntitySetName(subjectIri, store) {

    const label = getLit(
        subjectIri,
        'http://www.w3.org/2000/01/rdf-schema#label',
        store
    );

    if (label) {
        return label;
    }

    return localName(subjectIri);
}

/* ══════════════════════════════════════════════════════════════════════
   §2  PARAM LOOKUP
   ══════════════════════════════════════════════════════════════════════ */
const PARAM_OF_TO_NT_TYPE = {
    'Body':                                'Body',
    'Contact Line System':                 'ContactLineSystem',
    'ETCS':                                'ETCS',
    'Hot Axle Box Detector':               'HABD',
    'Infrastructure element':              'InfrastructureElement',
    'Kilometric Post':                     'KilometricPost',
    'Operational Point':                   'OperationalPoint',
    'Platform edge':                       'PlatformEdge',
    'Running track':                       'RunningTrack',
    'Section Of Line':                     'SectionOfLine',
    'Siding':                              'Siding',
    'Train Detection System':              'TrainDetectionSystem',
    'Tunnel':                              'Tunnel',
    'Subset with common characteristics':  'RunningTrack',
    'Radio Block Center':                  null,
    'Restriction':                         null,
    'Track':                               null,
    'Vehicle Registration Case':           null,
    'Vehicle Registration Restriction':    null,
    'Vehicle Type':                        null,
    'Vehicle Type Authorisation Restriction':   null,
    'Vehicle type configuration parameter set': null,
};

const TYPE_IRI_TO_XML_ID = (() => {
    const map = new Map();
    for (const [xmlId, def] of Object.entries(rinfParams)) {
        if (!def.iri) continue;
        for (const pOf of (def.parameter_of ?? [])) {
            const ntType = PARAM_OF_TO_NT_TYPE[pOf];
            if (!ntType) continue;
            if (!map.has(ntType)) map.set(ntType, new Map());
            const m = map.get(ntType);
            if (!m.has(def.iri)) m.set(def.iri, xmlId);
        }
    }
    return map;
})();

/* ══════════════════════════════════════════════════════════════════════
   §3  NT PARSER  (streaming)
   ══════════════════════════════════════════════════════════════════════ */

function parseNTLine(line) {
    const raw = line.trim();
    if (!raw || raw[0] === '#') return null;
    let pos = 0;

    if (raw[pos] !== '<') return null;
    const sEnd = raw.indexOf('>', pos + 1);
    if (sEnd < 0) return null;
    const subject = raw.slice(pos + 1, sEnd);
    pos = sEnd + 1;
    while (pos < raw.length && (raw[pos] === ' ' || raw[pos] === '\t')) pos++;

    if (raw[pos] !== '<') return null;
    const pEnd = raw.indexOf('>', pos + 1);
    if (pEnd < 0) return null;
    const predicate = raw.slice(pos + 1, pEnd);
    pos = pEnd + 1;
    while (pos < raw.length && (raw[pos] === ' ' || raw[pos] === '\t')) pos++;

    let object;
    if (raw[pos] === '<') {
        const oEnd = raw.indexOf('>', pos + 1);
        if (oEnd < 0) return null;
        object = { type: 'iri', value: raw.slice(pos + 1, oEnd) };
    } else if (raw[pos] === '"') {
        let i = pos + 1, lit = '';
        while (i < raw.length) {
            const ch = raw[i];
            if (ch === '\\') {
                const e = raw[++i];
                lit += e === 'n' ? '\n' : e === 't' ? '\t' : e === 'r' ? '\r' : e;
            } else if (ch === '"') { i++; break; }
            else lit += ch;
            i++;
        }
        let lang = null, datatype = null;
        if (raw[i] === '@') {
            const end = raw.indexOf(' ', i);
            lang = raw.slice(i + 1, end > 0 ? end : raw.length);
        } else if (raw.slice(i, i + 2) === '^^') {
            const ds = i + 3, de = raw.indexOf('>', ds);
            if (de > 0) datatype = raw.slice(ds, de);
        }
        object = { type: 'literal', value: lit, lang, datatype };
    } else {
        return null;
    }

    return { subject, predicate, object };
}

async function parseNT(ntPath) {
    const res = await fetch(ntPath);
    if (!res.ok) throw new Error(`Cannot load ${ntPath} (HTTP ${res.status})`);
    if (!res.body) throw new Error('ReadableStream not supported by this browser.');

    const store   = new Map();
    const byType  = new Map();
    let triples   = 0;
    const reader  = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let leftover  = '';

    const processText = (text) => {
        const lines = text.split('\n');
        const last  = lines.pop() ?? '';
        for (const line of lines) {
            if (!line) continue;
            const t = parseNTLine(line);
            if (!t) continue;
            triples++;
            let pm = store.get(t.subject);
            if (!pm) { pm = new Map(); store.set(t.subject, pm); }
            let arr = pm.get(t.predicate);
            if (!arr) { arr = []; pm.set(t.predicate, arr); }
            arr.push(t.object);
            if (t.predicate === RDF_TYPE && t.object.type === 'iri') {
                const short = t.object.value.startsWith(ERA)
                    ? t.object.value.slice(ERA.length) : t.object.value;
                let s = byType.get(short);
                if (!s) { s = new Set(); byType.set(short, s); }
                s.add(t.subject);
            }
        }
        return last;
    };

    while (true) {
        const { done, value } = await reader.read();
        leftover = processText(leftover + decoder.decode(value ?? new Uint8Array(), { stream: !done }));
        if (done) break;
    }
    if (leftover) processText(leftover + '\n');

    console.log(`[nt_loader] Stream parsed: ${triples.toLocaleString()} triples, ` +
                `${store.size.toLocaleString()} subjects, ${byType.size} types`);
    return { store, byType };
}

/* ══════════════════════════════════════════════════════════════════════
   §4  STORE HELPERS & CANONICAL URI PARSERS
   ══════════════════════════════════════════════════════════════════════ */

const _objs   = (s, p, st) => (p ? st.get(s)?.get(p) : null) ?? [];
const _first  = (s, p, st) => _objs(s, p, st)[0] ?? null;
const getIRI  = (s, p, st) => { const o = _first(s,p,st); return o?.type==='iri'     ? o.value : null; };
const getLit  = (s, p, st) => { const o = _first(s,p,st); return o?.type==='literal' ? o.value : null; };
const allIRIs = (s, p, st) => _objs(s,p,st).filter(o => o.type==='iri').map(o => o.value);

const localName = (iri) =>
    iri.slice(Math.max(iri.lastIndexOf('#'), iri.lastIndexOf('/')) + 1);

function getPartsByType(parentIri, typeFragment, store) {
    return allIRIs(parentIri, VOCAB.hasPart, store)
        .filter(x => x.includes(typeFragment));
}

function resolveOPID(opIri, store) {
    if (!opIri) return null;
    const canonical = getIRI(opIri, VOCAB.canonicalURI, store);
    if (canonical) return localName(canonical);
    const lit = getLit(opIri, VOCAB.opUopid, store);
    if (lit) return lit;
    return localName(opIri);
}

/**
 * RunningTrack canonical: {lineId}_{opStart}_{opEnd}_{trackId}
 * e.g. "590000-2_FR0000007853_FR9900003381_VLINK"
 */
function parseTrackCanonical(canonIri) {
    if (!canonIri) return null;
    const local = localName(canonIri);
    const i1 = local.indexOf('_');  if (i1 < 0) return null;
    const i2 = local.indexOf('_', i1 + 1); if (i2 < 0) return null;
    const i3 = local.indexOf('_', i2 + 1); if (i3 < 0) return null;
    return {
        lineId:  local.slice(0, i1),
        opStart: local.slice(i1 + 1, i2),
        opEnd:   local.slice(i2 + 1, i3),
        trackId: local.slice(i3 + 1),
    };
}

/**
 * SectionOfLine canonical: {lineId}_{opStart}_{opEnd}
 * e.g. "640000-1_FR0000005782_FR0000006089"
 */
function parseSolCanonical(canonIri) {
    if (!canonIri) return null;
    const local = localName(canonIri);
    const i1 = local.indexOf('_');  if (i1 < 0) return null;
    const i2 = local.indexOf('_', i1 + 1); if (i2 < 0) return null;
    return {
        lineId:  local.slice(0, i1),
        opStart: local.slice(i1 + 1, i2),
        opEnd:   local.slice(i2 + 1),
    };
}

/**
 * Siding canonical: {imCode}_{opUOPID}_{sidingId}
 * e.g. "0087_FR0000009291_10"
 */
function parseSidingCanonical(canonIri) {
    if (!canonIri) return null;
    const local = localName(canonIri);
    const i1 = local.indexOf('_');  if (i1 < 0) return null;
    const i2 = local.indexOf('_', i1 + 1); if (i2 < 0) return null;
    return {
        imCode:   local.slice(0, i1),
        opUopid:  local.slice(i1 + 1, i2),
        sidingId: local.slice(i2 + 1),
    };
}

/**
 * Tunnel canonical (6-seg): {imCode}_{lineId}_{opStart}_{opEnd}_{trackId}_{tunnelName}
 * Tunnel canonical (4-seg): {imCode}_{lineId}_{opStart}_{tunnelName}
 * e.g. "0087_984000-1_FR0000003779_FR0000002669_Voie-V2-..._de-Montebello"
 * → { imCode: "0087", tunnelName: "de-Montebello" }
 */
function parseTunnelCanonical(canonIri) {
    if (!canonIri) return null;
    const local = localName(canonIri);
    const parts = local.split('_');
    if (parts.length < 2) return null;
    return {
        imCode:     parts[0],
        tunnelName: parts[parts.length - 1],   // last segment = tunnel identifier
    };
}

/**
 * PlatformEdge canonical: _{opUOPID}_{trackId}_{platformName}
 * e.g. "_FR0000004877_Voie-V1_Quai-V1"
 * → { opUopid: "FR0000004877", trackId: "Voie-V1", platformName: "Quai-V1" }
 */
function parsePlatformCanonical(canonIri) {
    if (!canonIri) return null;
    const local = localName(canonIri);
    // local starts with '_', so split gives ['', opUopid, trackId, platformName...]
    const parts = local.split('_');
    if (parts.length < 4) return null;   // ['', opUopid, trackId, name] minimum
    return {
        opUopid:      parts[1],
        trackId:      parts[2],
        platformName: parts.slice(3).join('_'),
    };
}

/* ══════════════════════════════════════════════════════════════════════
   §5  PARAMETER EXTRACTION
   ══════════════════════════════════════════════════════════════════════ */

/**
 * ERA SKOS concept IRIs carry a version suffix (Y_1 → Y, N_2 → N).
 * Strip it to match the values expected by the app.
 */
const valueFromObj = (o) => {
    if (o.type === 'literal') return o.value;
    if (o.type === 'iri') {
        const name = localName(o.value);
        return o.value.includes('/concepts/') ? name.replace(/_\d+$/, '') : name;
    }
    return null;
};

function extractParams(subject, ntType, setName, store) {
    const irixMap = TYPE_IRI_TO_XML_ID.get(ntType);
    if (!irixMap) return [];
    const pm = store.get(subject);
    if (!pm) return [];

    const naSet  = new Set(allIRIs(subject, VOCAB.notApplicable, store));
    const result = [];
    const seen   = new Set();

    for (const [predIri, objects] of pm) {
        const xmlId = irixMap.get(predIri);
        if (!xmlId || seen.has(xmlId)) continue;
        seen.add(xmlId);
        const values = objects.flatMap(o => { const v = valueFromObj(o); return v !== null ? [v] : []; });
        result.push({ ID: xmlId, IsApplicable: naSet.has(predIri) ? 'N' : 'Y', Value: values, Set: setName });
    }
    for (const naIri of naSet) {
        const xmlId = irixMap.get(naIri);
        if (!xmlId || seen.has(xmlId)) continue;
        seen.add(xmlId);
        result.push({ ID: xmlId, IsApplicable: 'N', Value: [], Set: setName });
    }
    return result;
}

/* ══════════════════════════════════════════════════════════════════════
   §6  TUNNEL BUILDER
   ══════════════════════════════════════════════════════════════════════ */

function buildTunnelEntry(tSubject, store) {
    // Canonical URI is the authoritative source for imCode and tunnelName
    // when the corresponding literal predicates are absent in NT.
    const canonParsed = parseTunnelCanonical(getIRI(tSubject, VOCAB.canonicalURI, store));
    return {
        ValidityDateStart:       getLit(tSubject, VOCAB.validFrom,    store),
        ValidityDateEnd:         getLit(tSubject, VOCAB.validTo,      store),
        SOLTunnelIMCode:         getLit(tSubject, VOCAB.tunnelIMCode, store)
                              ?? canonParsed?.imCode ?? null,
        SOLTunnelIdentification: {
            Value: getLit(tSubject, VOCAB.tunnelId, store)
                ?? canonParsed?.tunnelName
                ?? localName(tSubject),
        },
        SOLTunnelStart: { Kilometer: getLit(tSubject, VOCAB.tunnelStartKm, store), Longitude: null, Latitude: null },
        SOLTunnelEnd:   { Kilometer: getLit(tSubject, VOCAB.tunnelEndKm,   store), Longitude: null, Latitude: null },
        SOLTunnelParameter: extractParams(tSubject, 'Tunnel', null, store),
    };
}

/* ══════════════════════════════════════════════════════════════════════
   §7  SOL INDEX
   ══════════════════════════════════════════════════════════════════════ */

function buildSOLTrack(trackSubject, canonParsed, store) {
    const params = extractParams(trackSubject, 'RunningTrack', null, store);
    for (const { pred, ntType } of SUB_ENTITY_LINKS) {

        for (const subIri of allIRIs(trackSubject, pred, store)) {

            const setName =
                getEntitySetName(
                    subIri,
                    store
                );

            params.push(
                ...extractParams(
                    subIri,
                    ntType,
                    setName,
                    store
                )
            );
        }
    }
    const tunnels =
        getPartsByType(trackSubject, '/tunnel/', store)
            .map(tIri => buildTunnelEntry(tIri, store));
    const trackId = canonParsed?.trackId
        ?? getLit(trackSubject, VOCAB.trackId, store)
        ?? localName(trackSubject);
    return {
        SOLTrackIdentification: trackId,
        SOLTrackDirection:      getLit(trackSubject, VOCAB.trackDir, store),
        SOLTrackParameter:      params,
        SOLTunnel:              tunnels,
        ValidityDateStart:      getLit(trackSubject, VOCAB.validFrom, store),
        ValidityDateEnd:        getLit(trackSubject, VOCAB.validTo,   store),
    };
}

function buildSOLIndex(store, byType) {
    const index = new Map();

    // Pass 1a: reverse map  track IRI → SectionOfLine subject  (via era:track predicate)
    const trackToSOL = new Map();
    // Pass 1b: direct map  lineId|opStart|opEnd → SectionOfLine subject  (via canonical URI)
    // SectionOfLine canonical: {lineId}_{opStart}_{opEnd}
    // This is more reliable when era:track predicate is absent.
    const solByKey3 = new Map();
    for (const solSubject of (byType.get('SectionOfLine') ?? [])) {
        for (const tIri of allIRIs(solSubject, VOCAB.solHasTrack, store)) {
            trackToSOL.set(tIri, solSubject);
        }
        const cp = parseSolCanonical(getIRI(solSubject, VOCAB.canonicalURI, store));
        if (cp) {
            const key3 = `${cp.lineId}|${cp.opStart}|${cp.opEnd}`;
            if (!solByKey3.has(key3)) solByKey3.set(key3, solSubject);
        }
    }

    // Pass 2: group RunningTracks by (lineId, opStart, opEnd) from canonical URI
    const solGroups = new Map();
    for (const tSubject of (byType.get('RunningTrack') ?? [])) {
        const canonIri = getIRI(tSubject, VOCAB.canonicalURI, store);
        const parsed   = parseTrackCanonical(canonIri);
        if (!parsed) continue;
        const { lineId, opStart, opEnd } = parsed;
        const key3 = `${lineId}|${opStart}|${opEnd}`;
        if (!solGroups.has(key3)) {
            // Use era:track reverse map first, then canonical URI map as fallback
            solGroups.set(key3, { lineId, opStart, opEnd, tracks: [],
                solSubject: trackToSOL.get(tSubject) ?? solByKey3.get(key3) ?? null });
        }
        const grp = solGroups.get(key3);
        grp.tracks.push({ subject: tSubject, parsed });
        if (!grp.solSubject)
            grp.solSubject = trackToSOL.get(tSubject) ?? solByKey3.get(key3) ?? null;
    }

    // Pass 3: assemble SOL entries
    for (const [key3, { lineId, opStart, opEnd, tracks, solSubject }] of solGroups) {
        const solParams = solSubject ? extractParams(solSubject, 'SectionOfLine', null, store) : [];
        const lenStr    = solSubject ? getLit(solSubject, VOCAB.solLength, store) : null;
        const sol = {
            SOLLineIdentification: lineId,
            SOLOPStart:            opStart,
            SOLOPEnd:              opEnd,
            SOLIMCode:  solParams.find(p => p.ID === 'SOLIMCode')?.Value?.[0] ?? null,
            SOLNature:  solSubject
                ? (getLit(solSubject, VOCAB.solNature, store)
                ?? solParams.find(p => p.ID === 'SOLNature')?.Value?.[0] ?? null)
                : null,
            SOLLength:         lenStr !== null ? parseFloat(lenStr) : null,
            ValidityDateStart: solSubject ? getLit(solSubject, VOCAB.validFrom, store) : null,
            ValidityDateEnd:   solSubject ? getLit(solSubject, VOCAB.validTo,   store) : null,
            SOLTrack: tracks.map(({ subject, parsed }) => buildSOLTrack(subject, parsed, store)),
        };
        const key2 = `${opStart}|${opEnd}`;
        index.set(key3, sol);
        if (!index.has(key2)) index.set(key2, sol);
    }

    console.log(`[nt_loader] SOL index: ${index.size} entries ` +
                `(${solGroups.size} groups, solByKey3: ${solByKey3.size} SOL canonical matches)`);
    return index;
}

/* ══════════════════════════════════════════════════════════════════════
   §8  OP INDEX
   ══════════════════════════════════════════════════════════════════════ */

function buildOPTrack(trackSubject, store) {
    const params = extractParams(trackSubject, 'RunningTrack', null, store);
    const platforms =
        getPartsByType(trackSubject, '/platformEdge/', store)
            .map(pfIri => {
        // PlatformEdge canonical: _{opUOPID}_{trackId}_{platformName}
        const cp = parsePlatformCanonical(getIRI(pfIri, VOCAB.canonicalURI, store));
        return {
            ValidityDateStart:             getLit(pfIri, VOCAB.validFrom,    store),
            ValidityDateEnd:               getLit(pfIri, VOCAB.validTo,      store),
            OPTrackPlatformIdentification: getLit(pfIri, VOCAB.platformId,   store)
                                        ?? cp?.platformName
                                        ?? localName(pfIri),
            OPTrackPlatformIMCode:         getLit(pfIri, VOCAB.tunnelIMCode, store),
            OPTrackPlatformParameter:      extractParams(pfIri, 'PlatformEdge', null, store),
        };
    });
    const tunnels =
        getPartsByType(trackSubject, '/tunnel/', store)
            .map(tIri => {
        const e = buildTunnelEntry(tIri, store);
        return {
            ValidityDateStart:           e.ValidityDateStart,
            ValidityDateEnd:             e.ValidityDateEnd,
            OPTrackTunnelIdentification: e.SOLTunnelIdentification?.Value ?? null,
            OPTrackTunnelIMCode:         e.SOLTunnelIMCode,
            OPTrackTunnelParameter:      e.SOLTunnelParameter,
        };
    });
    return {
        ValidityDateStart:     getLit(trackSubject, VOCAB.validFrom, store),
        ValidityDateEnd:       getLit(trackSubject, VOCAB.validTo,   store),
        OPTrackIdentification: getLit(trackSubject, VOCAB.trackId,   store) ?? localName(trackSubject),
        OPTrackIMCode:         params.find(p => p.ID === 'OPTrackIMCode')?.Value?.[0] ?? null,
        OPTrackParameter:      params,
        OPTrackPlatform:       platforms,
        OPTrackTunnel:         tunnels,
    };
}

function buildSiding(sidingSubject, store, canonParsed = null) {
    const parsed = canonParsed
        ?? parseSidingCanonical(getIRI(sidingSubject, VOCAB.canonicalURI, store));
    const params  = extractParams(sidingSubject, 'Siding', null, store);
    const tunnels =
        getPartsByType(sidingSubject, '/tunnel/', store)
            .map(tIri => {

        const e = buildTunnelEntry(tIri, store);
        return {
            ValidityDateStart:            e.ValidityDateStart,
            ValidityDateEnd:              e.ValidityDateEnd,
            OPSidingTunnelIdentification: e.SOLTunnelIdentification?.Value ?? null,
            OPSidingTunnelIMCode:         e.SOLTunnelIMCode,
            OPSidingTunnelParameter:      e.SOLTunnelParameter,
        };
    });
    return {
        ValidityDateStart:      getLit(sidingSubject, VOCAB.validFrom, store),
        ValidityDateEnd:        getLit(sidingSubject, VOCAB.validTo,   store),
        OPSidingIdentification: getLit(sidingSubject, VOCAB.sidingId, store)
                             ?? parsed?.sidingId ?? localName(sidingSubject),
        OPSidingIMCode:         params.find(p => p.ID === 'OPSidingIMCode')?.Value?.[0]
                             ?? parsed?.imCode ?? null,
        OPSidingParameter:      params,
        OPSidingTunnel:         tunnels,
    };
}

function parseRailwayLocationLabel(label) {

    if (!label) return null;

    const m = label.match(
        /km\s+([0-9.]+)\s+on\s+line\s+([A-Za-z0-9-]+)/i
    );

    if (!m) return null;

    return {
        Kilometer: m[1],
        NationalIdentNum: m[2],
    };
}

function buildOPRailwayLocations(opSubject, store) {

    const result = [];

    const refs =
        allIRIs(opSubject, ERA + 'netReference', store);

    for (const ref of refs) {

        const label =
            getLit(
                ref,
                'http://www.w3.org/2000/01/rdf-schema#label',
                store
            );

        const parsed =
            parseRailwayLocationLabel(label);

        if (parsed) {
            result.push(parsed);
        }
    }

    return result;
}

function buildOPIndex(store, byType) {
    const sidingByOP = new Map();
    for (const sidingSubject of (byType.get('Siding') ?? [])) {
        const parsed = parseSidingCanonical(getIRI(sidingSubject, VOCAB.canonicalURI, store));
        if (!parsed?.opUopid) continue;
        if (!sidingByOP.has(parsed.opUopid)) sidingByOP.set(parsed.opUopid, []);
        sidingByOP.get(parsed.opUopid).push({ subject: sidingSubject, parsed });
    }

    const opIndex = new Map();
    for (const opSubject of (byType.get('OperationalPoint') ?? [])) {
        const uopid  = getLit(opSubject, VOCAB.opUopid, store) ?? resolveOPID(opSubject, store);
        if (!uopid) continue;
        const lat    = getLit(opSubject, VOCAB.opLat,  store);
        const lon    = getLit(opSubject, VOCAB.opLong, store);
        const tafObj = _first(opSubject, VOCAB.opTafTap, store);
        const sidings =
            (sidingByOP.get(uopid) ?? [])
                .map(({ subject, parsed }) =>
                    buildSiding(subject, store, parsed));
        opIndex.set(uopid, {
            ValidityDateStart: getLit(opSubject, VOCAB.validFrom, store),
            ValidityDateEnd:   getLit(opSubject, VOCAB.validTo,   store),
            UniqueOPID:        uopid,
            OPName:            getLit(opSubject, VOCAB.opName, store),
            OPType:            getLit(opSubject, VOCAB.opType, store),
            OPTafTapCode: {
                Value:        tafObj?.type === 'literal' ? tafObj.value
                            : tafObj?.type === 'iri'     ? localName(tafObj.value) : null,
                IsApplicable: null,
            },
            OPTypeGaugeChangeover: { Value: null, IsApplicable: null },
            OPGeographicLocation: (lat && lon)
                ? { Latitude: parseFloat(lat), Longitude: parseFloat(lon) } : null,
            OPRailwayLocation: buildOPRailwayLocations(opSubject, store),
            OPTrack:
                getPartsByType(opSubject, '/track/', store)
                    .map(t => buildOPTrack(t, store)),
            OPSiding: sidings,
        });
    }
    console.log(`[nt_loader] OP index: ${opIndex.size} entries ` +
                `(sidingByOP: ${sidingByOP.size} distinct OPs have sidings)`);
    return opIndex;
}

/* ══════════════════════════════════════════════════════════════════════
   §9  TUNNEL INDEX
   ══════════════════════════════════════════════════════════════════════ */

function buildTunnelIndex(store, byType) {
    const tunnelIndex = new Map();
    for (const tSubject of (byType.get('Tunnel') ?? [])) {
        // Canonical URI is the only reliable source for imCode + tunnelName in NT.
        // VOCAB.tunnelIMCode / tunnelId literals may be absent.
        const canonParsed = parseTunnelCanonical(getIRI(tSubject, VOCAB.canonicalURI, store));
        const imCode         = getLit(tSubject, VOCAB.tunnelIMCode, store) ?? canonParsed?.imCode ?? null;
        const identification = getLit(tSubject, VOCAB.tunnelId,    store) ?? canonParsed?.tunnelName ?? null;
        if (!imCode || !identification) continue;
        const key = `${imCode}|${identification}`;
        if (!tunnelIndex.has(key)) tunnelIndex.set(key, buildTunnelEntry(tSubject, store));
    }
    console.log(`[nt_loader] Tunnel index: ${tunnelIndex.size} entries`);
    return tunnelIndex;
}

/* ══════════════════════════════════════════════════════════════════════
   §10  multiValueParams DETECTION
   ══════════════════════════════════════════════════════════════════════ */

function detectMultiValueParams(solIndex) {
    const multi = new Set();
    for (const sol of solIndex.values()) {
        for (const track of (sol.SOLTrack ?? [])) {
            const byId = new Map();
            for (const p of (track.SOLTrackParameter ?? [])) {
                if (!p.ID) continue;
                if (!byId.has(p.ID)) byId.set(p.ID, new Set());
                for (const v of (p.Value ?? [])) byId.get(p.ID).add(v);
            }
            for (const [id, vals] of byId) if (vals.size > 1) multi.add(id);
        }
    }
    setMultiValueParams([...multi]);
    console.log(`[nt_loader] multiValue params detected: ${multi.size}`);
}

/* ══════════════════════════════════════════════════════════════════════
   §11  DIAGNOSTIC HELPER
   ══════════════════════════════════════════════════════════════════════ */

function _exposeVerify(store) {
    window.__ntVerify = () => {
        console.group('[nt_loader] VOCAB predicate verification');
        for (const [key, pred] of Object.entries(VOCAB)) {
            if (!pred) { console.warn(`  ${key}: null (iriOf returned nothing)`); continue; }
            let count = 0;
            for (const pm of store.values()) if (pm.has(pred)) count++;
            const ok = count > 0;
            console[ok ? 'log' : 'error'](
                `  ${ok ? '✅' : '❌'} ${key.padEnd(28)} ${count.toLocaleString().padStart(8)} subjects   ${pred}`
            );
        }
        console.groupEnd();
    };
    console.log('[nt_loader] Tip: call window.__ntVerify() to verify VOCAB predicates.');
}

/* ══════════════════════════════════════════════════════════════════════
   §12  PUBLIC API
   ══════════════════════════════════════════════════════════════════════ */

let _index       = null;
let _promise     = null;
let _opIndex     = null;
let _tunnelIndex = null;

export async function initNTLoader(ntPath) {
    if (!_promise) {
        _promise = (async () => {
            const { store, byType } = await parseNT(ntPath);
            _index       = buildSOLIndex(store, byType);
            _opIndex     = buildOPIndex(store, byType);
            _tunnelIndex = buildTunnelIndex(store, byType);
            detectMultiValueParams(_index);
            _exposeVerify(store);
            return _index;
        })();
    }
    return _promise;
}

export function lookupSOL(geoProps) {
    if (!_index) return null;
    const { SOLLineIdentification: lid, SOLOPStart: start, SOLOPEnd: end } = geoProps;
    return _index.get(`${lid}|${start}|${end}`) ?? _index.get(`${start}|${end}`) ?? null;
}

export function lookupOP(uniqueOPID) {
    return _opIndex?.get(uniqueOPID) ?? null;
}

export function lookupTunnel(imCode, identification) {
    if (!_tunnelIndex || !imCode || !identification) return null;
    return _tunnelIndex.get(`${String(imCode)}|${String(identification)}`) ?? null;
}
