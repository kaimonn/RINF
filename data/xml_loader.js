// data/xml_loader.js
import { setMultiValueParams } from '/js/state.js';


let _index   = null;   // Map — 一度だけ構築
let _promise = null;   // ロード中の Promise
let _opIndex = null;   
let _tunnelIndex = null; 

// -----------------------------------------------------------------------
// XML パース
// -----------------------------------------------------------------------

function parseSOL(solEl) {
    const childVal = (parent, tag) =>
        parent.querySelector(`:scope > ${tag}`)?.getAttribute('Value') ?? null;

    const tracks = [];
    solEl.querySelectorAll(':scope > SOLTrack').forEach(trackEl => {

        // 既存: SOLTrackParameter の収集（変更なし）
        const paramMap = new Map();
        trackEl.querySelectorAll(':scope > SOLTrackParameter').forEach(p => {
            const id          = p.getAttribute('ID');
            if (!id) return;
            const isApplicable = p.getAttribute('IsApplicable') ?? 'N';
            const value        = p.getAttribute('Value')        ?? null;
            const set          = p.getAttribute('Set')          ?? null;
            const key          = `${set}|${id}`;

            if (!paramMap.has(key)) {
                paramMap.set(key, { ID: id, IsApplicable: isApplicable, Value: [], Set: set });
            }
            const entry = paramMap.get(key);
            if (entry.IsApplicable !== 'Y' && isApplicable === 'Y') entry.IsApplicable = 'Y';
            if (value !== null && value !== '') entry.Value.push(value);
        });

        // ★ 追加: SOLTunnel の収集
        const tunnels = [];
        trackEl.querySelectorAll(':scope > SOLTunnel').forEach(tunnelEl => {
            const tunnelParams = [];
            tunnelEl.querySelectorAll(':scope > SOLTunnelParameter').forEach(p => {
                const id = p.getAttribute('ID');
                if (!id) return;
                const isApplicable = p.getAttribute('IsApplicable') ?? 'N';
                const value        = p.getAttribute('Value')        ?? null;
                tunnelParams.push({
                    ID:            id,
                    IsApplicable:  isApplicable,
                    Value:         value !== null && value !== '' ? [value] : [],
                    Set:           null,
                });
            });

            tunnels.push({
                ValidityDateStart:      tunnelEl.getAttribute('ValidityDateStart'),
                ValidityDateEnd:        tunnelEl.getAttribute('ValidityDateEnd'),
                SOLTunnelIMCode: tunnelEl.querySelector(':scope > SOLTunnelIMCode')?.getAttribute('Value') ?? null,
                SOLTunnelIdentification:{ Value: tunnelEl.querySelector(':scope > SOLTunnelIdentification')?.getAttribute('Value') ?? null },
                SOLTunnelStart: {
                    Kilometer: tunnelEl.querySelector(':scope > SOLTunnelStart')?.getAttribute('Kilometer') ?? null,
                    Longitude: tunnelEl.querySelector(':scope > SOLTunnelStart')?.getAttribute('Longitude') ?? null,
                    Latitude:  tunnelEl.querySelector(':scope > SOLTunnelStart')?.getAttribute('Latitude')  ?? null,
                },
                SOLTunnelEnd: {
                    Kilometer: tunnelEl.querySelector(':scope > SOLTunnelEnd')?.getAttribute('Kilometer') ?? null,
                    Longitude: tunnelEl.querySelector(':scope > SOLTunnelEnd')?.getAttribute('Longitude') ?? null,
                    Latitude:  tunnelEl.querySelector(':scope > SOLTunnelEnd')?.getAttribute('Latitude')  ?? null,
                },
                SOLTunnelParameter: tunnelParams,
            });
        });

        tracks.push({
            SOLTrackIdentification : trackEl.querySelector(':scope > SOLTrackIdentification')?.getAttribute('Value') ?? null,
            SOLTrackDirection      : trackEl.querySelector(':scope > SOLTrackDirection')?.getAttribute('Value')      ?? null,
            SOLTrackParameter      : [...paramMap.values()],
            SOLTunnel              : tunnels, // ★ この1行を追加
            ValidityDateStart      : trackEl.getAttribute('ValidityDateStart'),
            ValidityDateEnd        : trackEl.getAttribute('ValidityDateEnd'),
        });
    });

    const solLengthStr = childVal(solEl, 'SOLLength');
    return {
        SOLLineIdentification : childVal(solEl, 'SOLLineIdentification'),
        SOLOPStart            : childVal(solEl, 'SOLOPStart'),
        SOLOPEnd              : childVal(solEl, 'SOLOPEnd'),
        SOLIMCode             : childVal(solEl, 'SOLIMCode'),
        SOLNature             : childVal(solEl, 'SOLNature'),
        SOLLength             : solLengthStr !== null ? parseFloat(solLengthStr) : null,
        ValidityDateStart     : solEl.getAttribute('ValidityDateStart'),
        ValidityDateEnd       : solEl.getAttribute('ValidityDateEnd'),
        SOLTrack              : tracks,
    };
}



function parseOPParams(el, tag) {
    const params = [];
    el.querySelectorAll(`:scope > ${tag}`).forEach(p => {
        const rawVal = p.getAttribute('Value') ?? '';
        params.push({
            ID:           p.getAttribute('ID'),
            IsApplicable: p.getAttribute('IsApplicable') ?? 'Y',
            Value:        rawVal === '' ? [] : rawVal.split('|').filter(v => v !== ''),
        });
    });
    return params;
}

function parseOP(opEl) {
    const childVal = (tag) =>
        opEl.querySelector(`:scope > ${tag}`)?.getAttribute('Value') ?? null;

    const opTracks = [];
    opEl.querySelectorAll(':scope > OPTrack').forEach(trackEl => {
        const platforms = [];
        trackEl.querySelectorAll(':scope > OPTrackPlatform').forEach(pfEl => {
            platforms.push({
                ValidityDateStart:              pfEl.getAttribute('ValidityDateStart'),
                ValidityDateEnd:                pfEl.getAttribute('ValidityDateEnd'),
                OPTrackPlatformIdentification:  pfEl.querySelector(':scope > OPTrackPlatformIdentification')?.getAttribute('Value') ?? null,
                OPTrackPlatformIMCode:          pfEl.querySelector(':scope > OPTrackPlatformIMCode')?.getAttribute('Value') ?? null,
                OPTrackPlatformParameter:       parseOPParams(pfEl, 'OPTrackPlatformParameter'),
            });
        });

        const tunnels = [];
        trackEl.querySelectorAll(':scope > OPTrackTunnel').forEach(tuEl => {
            tunnels.push({
                ValidityDateStart:             tuEl.getAttribute('ValidityDateStart'),
                ValidityDateEnd:               tuEl.getAttribute('ValidityDateEnd'),
                OPTrackTunnelIdentification:   tuEl.querySelector(':scope > OPTrackTunnelIdentification')?.getAttribute('Value') ?? null,
                OPTrackTunnelIMCode:           tuEl.querySelector(':scope > OPTrackTunnelIMCode')?.getAttribute('Value') ?? null,
                OPTrackTunnelParameter:        parseOPParams(tuEl, 'OPTrackTunnelParameter'),
            });
        });

        opTracks.push({
            ValidityDateStart:       trackEl.getAttribute('ValidityDateStart'),
            ValidityDateEnd:         trackEl.getAttribute('ValidityDateEnd'),
            OPTrackIdentification:   trackEl.querySelector(':scope > OPTrackIdentification')?.getAttribute('Value') ?? null,
            OPTrackIMCode:           trackEl.querySelector(':scope > OPTrackIMCode')?.getAttribute('Value') ?? null,
            OPTrackParameter:        parseOPParams(trackEl, 'OPTrackParameter'),
            OPTrackPlatform:         platforms,
            OPTrackTunnel:           tunnels,
        });
    });

    const opSidings = [];
    opEl.querySelectorAll(':scope > OPSiding').forEach(sidingEl => {

        // ★ OPSidingTunnel を収集
        const sidingTunnels = [];
        sidingEl.querySelectorAll(':scope > OPSidingTunnel').forEach(tuEl => {
            sidingTunnels.push({
                ValidityDateStart:              tuEl.getAttribute('ValidityDateStart'),
                ValidityDateEnd:                tuEl.getAttribute('ValidityDateEnd'),
                OPSidingTunnelIdentification:   tuEl.querySelector(':scope > OPSidingTunnelIdentification')?.getAttribute('Value') ?? null,
                OPSidingTunnelIMCode:           tuEl.querySelector(':scope > OPSidingTunnelIMCode')?.getAttribute('Value') ?? null,
                OPSidingTunnelParameter:        parseOPParams(tuEl, 'OPSidingTunnelParameter'),
            });
        });

        opSidings.push({
            ValidityDateStart:      sidingEl.getAttribute('ValidityDateStart'),
            ValidityDateEnd:        sidingEl.getAttribute('ValidityDateEnd'),
            OPSidingIdentification: sidingEl.querySelector(':scope > OPSidingIdentification')?.getAttribute('Value') ?? null,
            OPSidingIMCode:         sidingEl.querySelector(':scope > OPSidingIMCode')?.getAttribute('Value') ?? null,
            OPSidingParameter:      parseOPParams(sidingEl, 'OPSidingParameter'),
            OPSidingTunnel:         sidingTunnels, // ★ 追加
        });
    });

    const geoLocEl = opEl.querySelector(':scope > OPGeographicLocation');

    return {
        ValidityDateStart: opEl.getAttribute('ValidityDateStart'),
        ValidityDateEnd:   opEl.getAttribute('ValidityDateEnd'),
        UniqueOPID:        childVal('UniqueOPID'),
        OPName:            childVal('OPName'),
        OPType:            childVal('OPType'),
        OPTafTapCode: {
            Value:        opEl.querySelector(':scope > OPTafTapCode')?.getAttribute('Value') ?? null,
            IsApplicable: opEl.querySelector(':scope > OPTafTapCode')?.getAttribute('IsApplicable') ?? null,
        },
        OPTypeGaugeChangeover: {
            Value:        opEl.querySelector(':scope > OPTypeGaugeChangeover')?.getAttribute('Value') ?? null,
            IsApplicable: opEl.querySelector(':scope > OPTypeGaugeChangeover')?.getAttribute('IsApplicable') ?? null,
        },
        OPGeographicLocation: geoLocEl ? {
            Latitude:  parseFloat(geoLocEl.getAttribute('Latitude')),
            Longitude: parseFloat(geoLocEl.getAttribute('Longitude')),
        } : null,
        OPRailwayLocation: Array.from(opEl.querySelectorAll(':scope > OPRailwayLocation')).map(locEl => ({
            NationalIdentNum: locEl.getAttribute('NationalIdentNum') ?? null,
            Kilometer: locEl.getAttribute('Kilometer') ? parseFloat(locEl.getAttribute('Kilometer')) : null,
        })),
        OPTrack:   opTracks,
        OPSiding:  opSidings,
    };
}



async function buildIndex(xmlPath) {
    const res = await fetch(xmlPath);
    if (!res.ok) {
        throw new Error(`Impossible de charger ${xmlPath} (HTTP ${res.status})`);
    }

    const text   = await res.text();
    const parser = new DOMParser();
    const doc    = parser.parseFromString(text, 'application/xml');

    const index   = new Map(); // SOL 用
    const opIndex = new Map(); // OP 用 ★

    // --- 既存：SOL のインデックス化 ---
    doc.querySelectorAll('SectionOfLine').forEach(solEl => {
        const sol = parseSOL(solEl);  // 既存の関数
        if (!sol) return;

        const key3 = `${sol.SOLLineIdentification}|${sol.SOLOPStart}|${sol.SOLOPEnd}`;
        const key2 = `${sol.SOLOPStart}|${sol.SOLOPEnd}`;
        index.set(key3, sol);
        if (!index.has(key2)) index.set(key2, sol);
    });

    console.log(`[xml_loader] Index chargé : ${index.size} SOL`);

    // --- ★ 新規：OP のインデックス化（必ず buildIndex の中で） ---
    doc.querySelectorAll('OperationalPoint').forEach(opEl => {
        const op = parseOP(opEl);  // 前回追加した parseOP
        if (!op || !op.UniqueOPID) return;
        opIndex.set(op.UniqueOPID, op);
    });

    _opIndex = opIndex;  // グローバルに保存
    console.log(`[xml_loader] Index OP chargé : ${_opIndex.size} OP`);


    const multiParams = new Set();

    for (const sol of index.values()) {
        for (const track of (sol.SOLTrack || [])) {
            // paramId → 全 Set にまたがる全 Value を集約
            const valsByParamId = new Map();
            for (const param of (track.SOLTrackParameter || [])) {
                const id = param.ID;
                if (!id) continue;
                if (!valsByParamId.has(id)) valsByParamId.set(id, new Set());
                for (const v of (param.Value || [])) {
                    valsByParamId.get(id).add(v);
                }
            }
            for (const [paramId, vals] of valsByParamId.entries()) {
                if (vals.size > 1) multiParams.add(paramId);
            }
        }
    }

    setMultiValueParams([...multiParams]);
    console.log(`[xml_loader] multiValue params détectés : ${multiParams.size}`);

    return index; // 既存どおり：戻り値は SOL の index
}

// -----------------------------------------------------------------------
// 公開 API
// -----------------------------------------------------------------------

/**
 * XMLインデックスを初期化（遅延ロード、1回のみ）
 * アプリ起動時に await initXMLLoader() を呼ぶこと
 */
export async function initXMLLoader(xmlPath = 'data/RINF_Sp92v2.xml') {
    if (!_promise) {
        _promise = buildIndex(xmlPath).then(idx => {
            _index = idx;
            return idx;
        });
    }
    return _promise;
}

/**
 * GeoJSON フィーチャーのプロパティから SOL の完全データを返す
 * @param {object} geoProps - クリックされた GeoJSON フィーチャーの properties
 * @returns {object|null}
 */
export function lookupSOL(geoProps) {
    if (!_index) return null;
    const { SOLLineIdentification: lid, SOLOPStart: start, SOLOPEnd: end } = geoProps;
    // 完全キー優先 → SOLOPStart+SOLOPEnd のフォールバック
    return _index.get(`${lid}|${start}|${end}`)
        ?? _index.get(`${start}|${end}`)
        ?? null;
}
export function lookupOP(uniqueOPID) {
    if (!_opIndex) return null;
    return _opIndex.get(uniqueOPID) ?? null;
}
export function lookupTunnel(imCode, identification) {
    if (!_tunnelIndex || !imCode || !identification) return null;
    return _tunnelIndex.get(`${String(imCode)}|${String(identification)}`) ?? null;
}
