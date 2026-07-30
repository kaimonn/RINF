// ui/bottomBar/renderers/renderers_structure.js

import { PARAM_STRUCTURE }         from '../../sidebar/config_sidebar/sol_config.js';
import { TUNNEL_SOL_STRUCTURE }    from '../../sidebar/config_sidebar/sol_tunnel_config.js';
import { OP_PARAM_STRUCTURE }      from '../../sidebar/config_sidebar/op_config.js';
import { TUNNEL_OP_STRUCTURE }     from '../../sidebar/config_sidebar/op_tunnel_config.js';
import { OP_PLATFORM_STRUCTURE }   from '../../sidebar/config_sidebar/op_platform_config.js';
import { OP_SIDING_STRUCTURE }     from '../../sidebar/config_sidebar/op_siding_config.js';
import { countParams, countStructureParams } from './renderers_common.js';
import { lookupOP } from '../../../../data/data_loader.js';

// ── 共通ヘルパー ─────────────────────────────────────────────────────────────

/** paramArray → Map<ID, param> */
function buildParamMap(paramArray) {
    return new Map((Array.isArray(paramArray) ? paramArray : []).map(p => [p.ID, p]));
}

/** STRUCTURE 配列 → STI 子ノード配列 */
function buildStiChildren(structure, paramMap, idPrefix, typePrefix) {
    return structure.map((sti, stiIdx) => {
        const { available, total, notApplicable } = countParams(sti, paramMap);
        const stiNode = {
            id:       `${idPrefix}-sti-${stiIdx}`,
            label:    sti.stiLabel,
            type:     `${typePrefix}-sti`,
            badge:    { available, total, notApplicable },
            payload:  { sti, paramMap },
            children: [],
        };
        // sections がある場合はさらに子ノードに
        (sti.sections || []).forEach((section, secIdx) => {
            const { available: ca, total: ct } = countParams(section, paramMap);
            stiNode.children.push({
                id:       `${idPrefix}-sti-${stiIdx}-sec-${secIdx}`,
                label:    section.label,
                type:     `${typePrefix}-sti-section`,
                badge:    { available: ca, total: ct, notApplicable: 0 },
                payload:  { section, paramMap },
                children: [],
            });
        });
        return stiNode;
    });
}

// ── SOL ──────────────────────────────────────────────────────────────────────

export function buildSolTreeData(properties) {
    const tracks = Array.isArray(properties.SOLTrack)
        ? properties.SOLTrack
        : (properties.SOLTrack ? [properties.SOLTrack] : []);

    const lineCode = properties.SOLLineIdentification ?? null;

    function getKmForLine(opId, line) {
        if (!opId || !line) return null;
        const opData = lookupOP(opId);
        if (!opData) return null;
        const raw = opData.OPRailwayLocation;
        if (!raw) return null;
        const locations = Array.isArray(raw) ? raw : [raw];
        const loc = locations.find(l => String(l.NationalIdentNum ?? '') === String(line));
        if (!loc || loc.Kilometer == null) return null;
        const km = parseFloat(loc.Kilometer);
        return Number.isNaN(km) ? null : km;
    }

    const startKm  = getKmForLine(properties.SOLOPStart, lineCode);
    const endKm    = getKmForLine(properties.SOLOPEnd,   lineCode);
    const formatPk = (km) => (km == null ? '?' : `PK ${km}`);

    const root = {
        id:      'sol-general',
        label:   `Tronçon ${lineCode ?? '?'} : ${formatPk(startKm)} → ${formatPk(endKm)}`,
        type:    'sol-general',
        badge:   null,
        payload: { properties },
        children: [],
    };

    const allTunnelNodes = [];  // ★ tracks.forEach の外で初期化

    tracks.forEach((track, trackIdx) => {
        const paramMap = buildParamMap(track.SOLTrackParameter);
        const { available, total, notApplicable } = countStructureParams(PARAM_STRUCTURE, paramMap);
        const trackId = `track-${trackIdx}`;

        const trackNode = {
            id:       trackId,
            label:    track.SOLTrackIdentification || `Voie ${trackIdx + 1}`,
            type:     'track-basic',
            badge:    { available, total, notApplicable },
            payload:  { track },
            children: [],
        };

        trackNode.children.push(...buildStiChildren(PARAM_STRUCTURE, paramMap, trackId, 'sol'));

        // ★ trackNode.children ではなく allTunnelNodes に push
        const tunnels = Array.isArray(track.SOLTunnel)
            ? track.SOLTunnel
            : (track.SOLTunnel ? [track.SOLTunnel] : []);

        tunnels.forEach((tunnel, tunIdx) => {
            const tParamMap = buildParamMap(tunnel.SOLTunnelParameter);
            const { available: ta, total: tt, notApplicable: tna } =
                countStructureParams(TUNNEL_SOL_STRUCTURE, tParamMap);

            const identRaw = tunnel.SOLTunnelIdentification;
            const label = (identRaw && typeof identRaw === 'object')
                ? identRaw.Value || `Tunnel ${tunIdx + 1}`
                : identRaw || `Tunnel ${tunIdx + 1}`;

            const tunId = `${trackId}-tunnel-${tunIdx}`;

            allTunnelNodes.push({                          // ★ ここが修正箇所
                id:       tunId,
                label:    `🚇 ${label}`,
                type:     'sol-tunnel',
                badge:    { available: ta, total: tt, notApplicable: tna },
                payload:  { tunnel, paramMap: tParamMap },
                children: buildStiChildren(TUNNEL_SOL_STRUCTURE, tParamMap, tunId, 'sol-tunnel'),
            });
        });

        root.children.push(trackNode);
    });

    // ★ トンネルをセクションノードとして root に追加
    if (allTunnelNodes.length > 0) {
        root.children.push({
            id:      'sol-tunnels-section',
            label:   `🚇 Tunnels`,
            type:    'sol-tunnels-section',
            badge:   null,
            payload: { sol: properties },
            children: allTunnelNodes,
        });
    }

    return [root];
}
// ── OP ───────────────────────────────────────────────────────────────────────

export function buildOpTreeData(op) {
    if (!op) return [];

    const tracks  = Array.isArray(op.OPTrack)  ? op.OPTrack  : (op.OPTrack  ? [op.OPTrack]  : []);
    const sidings = Array.isArray(op.OPSiding) ? op.OPSiding : (op.OPSiding ? [op.OPSiding] : []);

    const opName = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'Point OP';

    const root = {
        id:       'op-general',
        label:    opName,
        type:     'op-general',
        badge:    null,
        payload:  { op },
        children: [],
    };

    // ── OPTrack ──
    tracks.forEach((track, trackIdx) => {
        const paramMap = buildParamMap(track.OPTrackParameter);
        const { available, total, notApplicable } = countStructureParams(OP_PARAM_STRUCTURE, paramMap);
        const trackId = `op-track-${trackIdx}`;

        const trackNode = {
            id:       trackId,
            label:    track.OPTrackIdentification || `Voie ${trackIdx + 1}`,
            type:     'op-track-basic',
            badge:    { available, total, notApplicable },
            payload:  { track },
            children: [],
        };

        // STI (OP_PARAM_STRUCTURE)
        trackNode.children.push(...buildStiChildren(OP_PARAM_STRUCTURE, paramMap, trackId, 'op'));

        // OPTrackPlatform
        const platforms = Array.isArray(track.OPTrackPlatform)
            ? track.OPTrackPlatform
            : (track.OPTrackPlatform ? [track.OPTrackPlatform] : []);


        if (platforms.length > 0) {
            const trackLabel = track.OPTrackIdentification || `Voie ${trackIdx + 1}`;
            const platformNodes = platforms.map((pf, pfIdx) => {
                const pfParamMap = buildParamMap(pf.OPTrackPlatformParameter);
                const { available: pa, total: pt, notApplicable: pna } =
                    countStructureParams(OP_PLATFORM_STRUCTURE, pfParamMap);
                const pfId = `${trackId}-platform-${pfIdx}`;
                return {
                    id:       pfId,
                    label:    `🚉 ${pf.OPTrackPlatformIdentification || `Quai ${pfIdx + 1}`}`,
                    type:     'op-platform',
                    badge:    { available: pa, total: pt, notApplicable: pna },
                    payload:  { platform: pf, paramMap: pfParamMap },
                    children: buildStiChildren(OP_PLATFORM_STRUCTURE, pfParamMap, pfId, 'op-platform'),
                };
            });
            trackNode.children.push({
                id:      `${trackId}-platforms-section`,
                label:   `🚉 Quais`,
                type:    'op-track-platforms-section',
                badge:   null,
                payload: { track, label: trackLabel },
                children: platformNodes,
            });
        }
        // OPTrackTunnel
        const tunnels = Array.isArray(track.OPTrackTunnel)
            ? track.OPTrackTunnel
            : (track.OPTrackTunnel ? [track.OPTrackTunnel] : []);

        if (tunnels.length > 0) {
            const trackLabel = track.OPTrackIdentification || `Voie ${trackIdx + 1}`;
            const tunnelNodes = tunnels.map((tu, tuIdx) => {
                const tuParamMap = buildParamMap(tu.OPTrackTunnelParameter);
                const { available: ta, total: tt, notApplicable: tna } =
                    countStructureParams(TUNNEL_OP_STRUCTURE, tuParamMap);
                const tuId = `${trackId}-tunnel-${tuIdx}`;
                return {
                    id:       tuId,
                    label:    `🚇 ${tu.OPTrackTunnelIdentification || `Tunnel ${tuIdx + 1}`}`,
                    type:     'op-tunnel',
                    badge:    { available: ta, total: tt, notApplicable: tna },
                    payload:  { tunnel: tu, paramMap: tuParamMap },
                    children: buildStiChildren(TUNNEL_OP_STRUCTURE, tuParamMap, tuId, 'op-tunnel'),
                };
            });
            trackNode.children.push({
                id:      `${trackId}-tunnels-section`,
                label:   `🚇 Tunnels`,
                type:    'op-track-tunnels-section',
                badge:   null,
                payload: { track, label: trackLabel },
                children: tunnelNodes,
            });
        }

        root.children.push(trackNode);
    });

    // ── OPSiding ──
    if (sidings.length > 0) {
        const sidingNodes = sidings.map((siding, sidingIdx) => {
            const sidingParamMap = buildParamMap(siding.OPSidingParameter);
            const { available, total, notApplicable } =
                countStructureParams(OP_SIDING_STRUCTURE, sidingParamMap);
            const sidingId    = `op-siding-${sidingIdx}`;
            const sidingLabel = siding.OPSidingIdentification || `Voie de service ${sidingIdx + 1}`;

            const sidingNode = {
                id:       sidingId,
                label:    `🔀 ${sidingLabel}`,
                type:     'op-siding',
                badge:    { available, total, notApplicable },
                payload:  { siding, paramMap: sidingParamMap },
                children: [],
            };

            sidingNode.children.push(...buildStiChildren(OP_SIDING_STRUCTURE, sidingParamMap, sidingId, 'op-siding'));

            // OPSidingTunnel → section
            const sidingTunnels = Array.isArray(siding.OPSidingTunnel)
                ? siding.OPSidingTunnel
                : (siding.OPSidingTunnel ? [siding.OPSidingTunnel] : []);

            if (sidingTunnels.length > 0) {
                const sidingTunnelNodes = sidingTunnels.map((tu, tuIdx) => {
                    const tuParamMap = buildParamMap(tu.OPSidingTunnelParameter);
                    const { available: ta, total: tt, notApplicable: tna } =
                        countStructureParams(TUNNEL_OP_STRUCTURE, tuParamMap);
                    const tuId = `${sidingId}-tunnel-${tuIdx}`;
                    return {
                        id:       tuId,
                        label:    `🚇 ${tu.OPSidingTunnelIdentification || `Tunnel ${tuIdx + 1}`}`,
                        type:     'op-siding-tunnel',
                        badge:    { available: ta, total: tt, notApplicable: tna },
                        payload:  { tunnel: tu, paramMap: tuParamMap },
                        children: buildStiChildren(TUNNEL_OP_STRUCTURE, tuParamMap, tuId, 'op-siding-tunnel'),
                    };
                });
                sidingNode.children.push({
                    id:      `${sidingId}-tunnels-section`,
                    label:   `🚇 Tunnels`,
                    type:    'op-siding-tunnels-section',
                    badge:   null,
                    payload: { siding, label: sidingLabel },
                    children: sidingTunnelNodes,
                });
            }

            return sidingNode;
        });

        root.children.push({
            id:      'op-sidings-section',
            label:   `🔀 Voies de service`,
            type:    'op-sidings-section',
            badge:   null,
            payload: { op },
            children: sidingNodes,
        });
    }

    return [root];
}

// ── ツリーHTML生成（共通） ────────────────────────────────────────────────────

export function renderTreeHtml(treeNodes, depth = 0) {
    if (!treeNodes || treeNodes.length === 0) return '';

    let html = '';
    treeNodes.forEach(node => {
        const hasChildren = node.children?.length > 0;
        const badgeHtml   = node.badge?.total > 0
            ? `<span class="tree-badge ${
                node.badge.available === 0 ? 'zero'
                : node.badge.available === node.badge.total ? 'full'
                : 'partial'
              }">${node.badge.available}/${node.badge.total}</span>`
            : '';

        html += `
            <div class="tree-node ${depth === 0 ? 'tree-root' : ''}"
                 style="padding-left:${depth * 16}px"
                 data-node-id="${node.id}"
                 data-node-type="${node.type}">
                <span class="tree-toggle${hasChildren ? '' : ' tree-toggle-placeholder'}">
                    ${hasChildren ? '▶' : ''}
                </span>
                <span class="tree-label">${node.label}</span>
                ${badgeHtml}
            </div>
        `;

        if (hasChildren) {
            html += `
                <div class="tree-children" data-parent="${node.id}" style="display:none;">
                    ${renderTreeHtml(node.children, depth + 1)}
                </div>
            `;
        }
    });
    return html;
}