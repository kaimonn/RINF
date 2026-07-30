// ui/bottomBar/renderers/renderers_op.js

import { parseAndFormatDate, getParamLabel, formatParamValues } from '../../sidebar/sidebar_utils.js';
import { OP_PARAM_STRUCTURE } from '../../sidebar/config_sidebar/op_config.js';
import { TUNNEL_OP_STRUCTURE } from '../../sidebar/config_sidebar/op_tunnel_config.js';
import { OP_PLATFORM_STRUCTURE } from '../../sidebar/config_sidebar/op_platform_config.js';
import { OP_SIDING_STRUCTURE } from '../../sidebar/config_sidebar/op_siding_config.js';
import {
    countStructureParams,
    renderCountBadge,
    renderStiBlocks,
    renderParamColorToggleButton, 
} from './renderers_common.js';

/* ──────────────────────────────────────────────
 * OP サイドバー（1.2.* を使用）
 * ────────────────────────────────────────────── */

/**
 * OP 共通: ラベル + [参照コード＋ID]
 */
function renderOPLabelWithReference(paramId) {
    const { label, reference, url } = getParamLabel(paramId, 'OP');
    const referenceHtml = reference
        ? url
            ? `<div class="param-reference">[<a href="${url}" target="_blank" rel="noopener noreferrer">${reference} ${paramId}</a>]</div>`
            : `<div class="param-reference">[${reference} ${paramId}]</div>`
        : '';
    return `<div class="param-label">${label}</div>${referenceHtml}`;
}

/**
 * OP 共通: paramMap 変換
 */
function buildOPParamMap(paramArray) {
    return new Map((paramArray || []).map(p => [p.ID, p]));
}

/**
 * OP 共通: パラメータ値 HTML（必要なら個別に使用）
 */
function renderOPParamValueHtml(paramId, param) {
    if (!param) return `<span class="param-empty">-</span>`;
    if (param.IsApplicable === 'N') return `<span class="param-not-applicable">Non applicable</span>`;
    if (!param.Value?.length) return `<span class="param-empty">-</span>`;
    return formatParamValues(paramId, param.Value);
}

/**
 * OP 共通: IsApplicable 対応の基本行ヘルパー（renderOPFeature 専用）
 */
function renderOPBasicRowFromFlag(paramId, flagObj) {
    if (!flagObj) return '';
    if (flagObj.IsApplicable === 'N') {
        const { label, reference, url } = getParamLabel(paramId, 'OP');
        const referenceHtml = reference
            ? url
                ? `<div class="param-reference">[<a href="${url}" target="_blank" rel="noopener noreferrer">${reference} ${paramId}</a>]</div>`
                : `<div class="param-reference">[${reference} ${paramId}]</div>`
            : '';
        return `
            <tr class="not-applicable">
                <td class="param-name">
                    <div class="param-label">${label}</div>
                    ${referenceHtml}
                </td>
                <td class="param-value"><span class="param-not-applicable">Non applicable</span></td>
            </tr>`;
    }
    if (!flagObj.Value) return '';
    return renderOPBasicRow(paramId, flagObj.Value);
}

function formatRailwayLocation(loc) {
    const lineCode = loc.NationalIdentNum ?? '?';
    const km       = loc.Kilometer       ?? '?';
    return `
        <span class="op-info">
            <span class="op-info-label">${lineCode} @ km ${km}</span>
            <button type="button"
                    class="line-link-icon"
                    data-focus-line="${lineCode}"
                    title="Rechercher cette ligne">🔍</button>
        </span>`;
}

/**
 * OP 共通: 固定行（基本情報）を param-reference 付きで描画
 */
function renderOPBasicRow(paramId, displayValue) {
    if (displayValue === null || displayValue === undefined || displayValue === '') return '';
    const quickToggleHtml = renderParamColorToggleButton('OP', paramId); // ★ 追加
    return `
        <tr>
            <td class="param-name">
                ${renderOPLabelWithReference(paramId)}
                ${quickToggleHtml}
            </td>
            <td class="param-value">${displayValue}</td>
        </tr>`;
}

/* OP – Track STI */

function renderOPTrackSti(track) {
    const paramMap = buildOPParamMap(track.OPTrackParameter);
    const html = renderStiBlocks(OP_PARAM_STRUCTURE, paramMap, 'OP', 4);
    return html || '<div class="no-params">Aucun paramètre disponible.</div>';
}

/* OP – Tunnel (Track & Siding 共通構造) */

function renderOPTunnelParamsSection(paramMap, baseNestLevel = 6) {
    const html = renderStiBlocks(TUNNEL_OP_STRUCTURE, paramMap, 'OP', baseNestLevel);
    return html || '<div class="no-params">Aucun paramètre disponible.</div>';
}

/**
 * OPTrackTunnel ブロック
 */
function renderOPTunnelBlock(tunnel, trackIndex, tuIndex) {
    const id       = tunnel.OPTrackTunnelIdentification || `Tunnel ${tuIndex + 1}`;
    const imCode   = tunnel.OPTrackTunnelIMCode || '-';
    const vds      = tunnel.ValidityDateStart || null;
    const vde      = tunnel.ValidityDateEnd   || null;
    const paramMap = buildOPParamMap(tunnel.OPTrackTunnelParameter);

    const { total, available, notApplicable } = countStructureParams(TUNNEL_OP_STRUCTURE, paramMap);

    return `
        <details class="tunnel-block nest-level-5" data-node-id="op-tunnel-${trackIndex}-${tuIndex}">
            <summary class="tunnel-summary">
                <span class="summary-label">🚇 ${id}</span>
                ${renderCountBadge(available, total, notApplicable)}
            </summary>
            <div class="tunnel-content">
                <table class="basic-properties-table">
                    ${renderOPBasicRow('OPTrackTunnelIdentification', id)}
                    ${renderOPBasicRow('OPTrackTunnelIMCode', imCode)}
                    ${renderOPBasicRow('ValidityDateStart', vds ? parseAndFormatDate(vds) : '-')}
                    ${renderOPBasicRow('ValidityDateEnd',   vde ? parseAndFormatDate(vde) : '-')}
                </table>
                <div class="tunnel-sti-section">
                    ${renderOPTunnelParamsSection(paramMap, 6)}
                </div>
            </div>
        </details>`;
}

/**
 * 将来拡張用: OPSidingTunnel ブロック
 */
function renderOPSidingTunnelBlock(tunnel, sidingIndex, tuIndex) {
    const id       = tunnel.OPSidingTunnelIdentification || `Tunnel ${tuIndex + 1}`;
    const imCode   = tunnel.OPSidingTunnelIMCode || '-';
    const vds      = tunnel.ValidityDateStart || null;
    const vde      = tunnel.ValidityDateEnd   || null;
    const paramMap = buildOPParamMap(tunnel.OPSidingTunnelParameter);

    const { total, available, notApplicable } = countStructureParams(TUNNEL_OP_STRUCTURE, paramMap);

    return `
        <details class="tunnel-block nest-level-5" data-node-id="op-siding-tunnel-${sidingIndex}-${tuIndex}">
            <summary class="tunnel-summary">
                <span class="summary-label">🚇 ${id}</span>
                ${renderCountBadge(available, total, notApplicable)}
            </summary>
            <div class="tunnel-content">
                <table class="basic-properties-table">
                    ${renderOPBasicRow('OPSidingTunnelIdentification', id)}
                    ${renderOPBasicRow('OPSidingTunnelIMCode', imCode)}
                    ${renderOPBasicRow('ValidityDateStart', vds ? parseAndFormatDate(vds) : '-')}
                    ${renderOPBasicRow('ValidityDateEnd',   vde ? parseAndFormatDate(vde) : '-')}
                </table>
                <div class="tunnel-sti-section">
                    ${renderOPTunnelParamsSection(paramMap, 6)}
                </div>
            </div>
        </details>`;
}

/* OP – Platform */

function renderOPPlatformBlock(platform, trackIndex, pfIndex) {
    const id       = platform.OPTrackPlatformIdentification || `Quai ${pfIndex + 1}`;
    const imCode   = platform.OPTrackPlatformIMCode || '-';
    const vds      = platform.ValidityDateStart || null;
    const vde      = platform.ValidityDateEnd   || null;
    const paramMap = buildOPParamMap(platform.OPTrackPlatformParameter);

    const { total, available, notApplicable } = countStructureParams(OP_PLATFORM_STRUCTURE, paramMap);
    const paramsHtml = renderStiBlocks(OP_PLATFORM_STRUCTURE, paramMap, 'OP', 6);

    return `
        <details class="tunnel-block nest-level-5" data-node-id="op-platform-${trackIndex}-${pfIndex}">
            <summary class="tunnel-summary">
                <span class="summary-label">🚉 ${id}</span>
                ${renderCountBadge(available, total, notApplicable)}
            </summary>
            <div class="tunnel-content">
                <table class="basic-properties-table">
                    ${renderOPBasicRow('OPTrackPlatformIdentification', id)}
                    ${renderOPBasicRow('OPTrackPlatformIMCode', imCode)}
                    ${renderOPBasicRow('ValidityDateStart', vds ? parseAndFormatDate(vds) : '-')}
                    ${renderOPBasicRow('ValidityDateEnd',   vde ? parseAndFormatDate(vde) : '-')}
                </table>
                <div class="platform-sti-section">
                    ${paramsHtml}
                </div>
            </div>
        </details>`;
}

/* OP – Siding */

function renderOPSidingBlock(siding, index) {
    const id       = siding.OPSidingIdentification || `Voie de service ${index + 1}`;
    const imCode   = siding.OPSidingIMCode || '-';
    const vds      = siding.ValidityDateStart || null;
    const vde      = siding.ValidityDateEnd   || null;
    const paramMap = buildOPParamMap(siding.OPSidingParameter);

    const { total, available, notApplicable } = countStructureParams(OP_SIDING_STRUCTURE, paramMap);
    const paramsHtml = renderStiBlocks(OP_SIDING_STRUCTURE, paramMap, 'OP', 3);

    const sidingTunnels = Array.isArray(siding.OPSidingTunnel)
        ? siding.OPSidingTunnel
        : (siding.OPSidingTunnel ? [siding.OPSidingTunnel] : []);

    const sidingTunnelsHtml = sidingTunnels.length > 0
        ? `
        <div class="track-tunnels-section nest-level-3">
            <h4 class="track-tunnels-title">Tunnels</h4>
            ${sidingTunnels.map((tu, i) => renderOPSidingTunnelBlock(tu, index, i)).join('')}
        </div>`
        : '';

    return `
        <details class="track-block nest-level-2" data-node-id="op-siding-${index}">
            <summary class="track-summary">
                <span class="summary-label">🔀 ${id}</span>
                ${renderCountBadge(available, total, notApplicable)}
            </summary>
            <div class="track-content">
                <table class="basic-properties-table">
                    ${renderOPBasicRow('OPSidingIdentification', id)}
                    ${renderOPBasicRow('OPSidingIMCode', imCode)}
                    ${renderOPBasicRow('ValidityDateStart', vds ? parseAndFormatDate(vds) : '-')}
                    ${renderOPBasicRow('ValidityDateEnd',   vde ? parseAndFormatDate(vde) : '-')}
                </table>
                <div class="siding-sti-section nest-level-3">
                    ${paramsHtml}
                </div>
                ${sidingTunnelsHtml}
            </div>
        </details>`;
}

/* OP – Track */

function renderOPTrackBlock(track, index) {
    const trackId    = track.OPTrackIdentification || `track-${index}`;
    const trackLabel = track.OPTrackIdentification || `Voie ${index + 1}`;
    const imCode     = track.OPTrackIMCode || '-';
    const vds        = track.ValidityDateStart || null;
    const vde        = track.ValidityDateEnd   || null;

    const platforms = Array.isArray(track.OPTrackPlatform) ? track.OPTrackPlatform : [];
    const tunnels   = Array.isArray(track.OPTrackTunnel)   ? track.OPTrackTunnel   : [];

    const platformsHtml = platforms.length > 0
        ? `
        <div class="track-tunnels-section nest-level-4">
            <h4 class="track-tunnels-title">Quais</h4>
            ${platforms.map((pf, i) => renderOPPlatformBlock(pf, index, i)).join('')}
        </div>`
        : '';

    const tunnelsHtml = tunnels.length > 0
        ? `
        <div class="track-tunnels-section nest-level-4">
            <h4 class="track-tunnels-title">Tunnels</h4>
            ${tunnels.map((tu, i) => renderOPTunnelBlock(tu, index, i)).join('')}
        </div>`
        : '';

    return `
        <details class="track-block nest-level-2" data-track-id="op-track-${trackId}">
            <summary class="track-summary">${trackLabel}</summary>
            <div class="track-content">
                <div class="track-basic-info nest-level-3">
                    <h4 class="track-basic-title">Informations basiques de la voie</h4>
                    <table class="track-info-table">
                        ${renderOPBasicRow('OPTrackIdentification', trackId)}
                        ${renderOPBasicRow('OPTrackIMCode', imCode)}
                        ${renderOPBasicRow('ValidityDateStart', vds ? parseAndFormatDate(vds) : '-')}
                        ${renderOPBasicRow('ValidityDateEnd',   vde ? parseAndFormatDate(vde) : '-')}
                    </table>
                </div>
                <div class="track-sti-section nest-level-3">
                    ${renderOPTrackSti(track)}
                </div>
                ${platformsHtml}
                ${tunnelsHtml}
            </div>
        </details>`;
}

/* OP – フィーチャー全体 */

export function renderOPFeature(op) {
    const {
        UniqueOPID, OPName, OPType,
        ValidityDateStart, ValidityDateEnd,
        OPTafTapCode, OPTypeGaugeChangeover,
        OPGeographicLocation, OPRailwayLocation = [],
        OPTrack = [], OPSiding = [],
    } = op;

    let html = '<div class="op-basic-info nest-level-1">';
    html += '<h3 class="troncon-basic-title">Informations sur le point opérationnel</h3>';
    html += '<table class="basic-properties-table">';

    html += renderOPBasicRow('OPName', OPName);
    html += renderOPBasicRow('UniqueOPID', UniqueOPID);
    html += renderOPBasicRow('OPType', OPType ? formatParamValues('OPType', OPType) : null);

    html += renderOPBasicRowFromFlag('OPTafTapCode', OPTafTapCode);

    // OPTypeGaugeChangeover: 値があればコード値をフォーマット
    let gaugeFlag = null;
    if (OPTypeGaugeChangeover) {
        if (OPTypeGaugeChangeover.IsApplicable === 'N') {
            gaugeFlag = OPTypeGaugeChangeover;
        } else if (OPTypeGaugeChangeover.Value) {
            gaugeFlag = {
                IsApplicable: 'Y',
                Value: formatParamValues('OPTypeGaugeChangeover', OPTypeGaugeChangeover.Value)
            };
        }
    }
    if (gaugeFlag) {
        html += renderOPBasicRowFromFlag('OPTypeGaugeChangeover', gaugeFlag);
    }

    if (OPGeographicLocation) {
        html += renderOPBasicRow(
            'OPGeographicLocation',
            `${OPGeographicLocation.Latitude}, ${OPGeographicLocation.Longitude}`
        );
    }
    if (OPRailwayLocation.length > 0) {
        html += renderOPBasicRow(
            'OPRailwayLocation',
            OPRailwayLocation.map(l => formatRailwayLocation(l)).join('<br>')
        );
    }

    html += renderOPBasicRow(
        'ValidityDateStart',
        ValidityDateStart ? parseAndFormatDate(ValidityDateStart) : null
    );
    html += renderOPBasicRow(
        'ValidityDateEnd',
        ValidityDateEnd ? parseAndFormatDate(ValidityDateEnd) : null
    );

    html += '</table></div>';

    if (OPTrack.length > 0) {
        html += '<div class="tracks-container nest-level-1">';
        OPTrack.forEach((track, idx) => {
            html += renderOPTrackBlock(track, idx);
        });
        html += '</div>';
    }

    if (OPSiding.length > 0) {
        html += '<div class="tracks-container nest-level-1">';
        html += '<h3 class="section-title">Voies de service</h3>';
        OPSiding.forEach((siding, idx) => {
            html += renderOPSidingBlock(siding, idx);
        });
        html += '</div>';
    }

    return html;
}



// renderers_op.js に追加（bottom_bar.js から呼ぶ）

export function renderOpGeneralDetails(op) {
    // renderOPFeature の基本情報テーブル部分のみ抽出（OPTrack/OPSidingは含まない）
    const { UniqueOPID, OPName, OPType, ValidityDateStart, ValidityDateEnd,
            OPTafTapCode, OPTypeGaugeChangeover, OPGeographicLocation,
            OPRailwayLocation = [] } = op;
    let html = '<table class="basic-properties-table">';
    html += renderOPBasicRow('OPName', OPName);
    html += renderOPBasicRow('UniqueOPID', UniqueOPID);
    html += renderOPBasicRow('OPType', OPType ? formatParamValues('OPType', OPType) : null);
    html += renderOPBasicRowFromFlag('OPTafTapCode', OPTafTapCode);
    if (OPGeographicLocation)
        html += renderOPBasicRow('OPGeographicLocation',
            `${OPGeographicLocation.Latitude}, ${OPGeographicLocation.Longitude}`);
    if (OPRailwayLocation.length > 0)
        html += renderOPBasicRow('OPRailwayLocation',
            OPRailwayLocation.map(l => formatRailwayLocation(l)).join('<br>'));
    html += renderOPBasicRow('ValidityDateStart',
        ValidityDateStart ? parseAndFormatDate(ValidityDateStart) : null);
    html += renderOPBasicRow('ValidityDateEnd',
        ValidityDateEnd ? parseAndFormatDate(ValidityDateEnd) : null);
    html += '</table>';
    return html;
}

export function renderOpTrackBasicDetails(track) {
    const title = track.OPTrackIdentification || 'Voie';
    let html = `<h3 class="track-basic-title">${title}</h3>`;
    html += '<table class="basic-properties-table">';
    html += renderOPBasicRow('OPTrackIdentification', track.OPTrackIdentification);
    html += renderOPBasicRow('OPTrackIMCode',        track.OPTrackIMCode);
    html += renderOPBasicRow('ValidityDateStart',
        track.ValidityDateStart ? parseAndFormatDate(track.ValidityDateStart) : null);
    html += renderOPBasicRow('ValidityDateEnd',
        track.ValidityDateEnd ? parseAndFormatDate(track.ValidityDateEnd) : null);
    html += '</table>';
    return html;
}

export function renderOpPlatformBasicDetails(pf) {
    const title = pf.OPTrackPlatformIdentification || 'Quai';
    let html = `<h3 class="section-title">🚉 ${title}</h3>`;
    html += '<table class="basic-properties-table">';
    html += renderOPBasicRow('OPTrackPlatformIdentification', pf.OPTrackPlatformIdentification);
    html += renderOPBasicRow('OPTrackPlatformIMCode',        pf.OPTrackPlatformIMCode);
    html += renderOPBasicRow('ValidityDateStart',
        pf.ValidityDateStart ? parseAndFormatDate(pf.ValidityDateStart) : null);
    html += renderOPBasicRow('ValidityDateEnd',
        pf.ValidityDateEnd ? parseAndFormatDate(pf.ValidityDateEnd) : null);
    html += '</table>';
    return html;
}

export function renderOpTunnelBasicDetails(tu) {
    const id     = tu.OPTrackTunnelIdentification ?? tu.OPSidingTunnelIdentification ?? 'Tunnel';
    const imCode = tu.OPTrackTunnelIMCode ?? tu.OPSidingTunnelIMCode ?? '-';
    let html = `<h3 class="section-title">🚇 ${id}</h3>`;
    html += '<table class="basic-properties-table">';
    html += renderOPBasicRow('OPTrackTunnelIMCode', imCode);
    html += renderOPBasicRow('ValidityDateStart',
        tu.ValidityDateStart ? parseAndFormatDate(tu.ValidityDateStart) : null);
    html += renderOPBasicRow('ValidityDateEnd',
        tu.ValidityDateEnd ? parseAndFormatDate(tu.ValidityDateEnd) : null);
    html += '</table>';
    return html;
}

export function renderOpSidingBasicDetails(siding) {
    const title = siding.OPSidingIdentification || 'Voie de service';
    let html = `<h3 class="section-title">🔀 ${title}</h3>`;
    html += '<table class="basic-properties-table">';
    html += renderOPBasicRow('OPSidingIdentification', siding.OPSidingIdentification);
    html += renderOPBasicRow('OPSidingIMCode',        siding.OPSidingIMCode);
    html += renderOPBasicRow('ValidityDateStart',
        siding.ValidityDateStart ? parseAndFormatDate(siding.ValidityDateStart) : null);
    html += renderOPBasicRow('ValidityDateEnd',
        siding.ValidityDateEnd ? parseAndFormatDate(siding.ValidityDateEnd) : null);
    html += '</table>';
    return html;
}