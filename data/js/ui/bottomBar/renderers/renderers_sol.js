// ui/bottomBar/renderers/renderers_sol.js

import { lookupSOL, lookupOP } from '../../../../data/data_loader.js';
import { parseAndFormatDate, getParamLabel, formatParamValues } from '../../sidebar/sidebar_utils.js';
import { PARAM_STRUCTURE } from '../../sidebar/config_sidebar/sol_config.js';
import { TUNNEL_SOL_STRUCTURE } from '../../sidebar/config_sidebar/sol_tunnel_config.js';
import { renderStiBlocks, countStructureParams, renderCountBadge, renderParamColorToggleButton } from './renderers_common.js';


/* ──────────────────────────────────────────────
 * SOL – Voie (Track)
 * ────────────────────────────────────────────── */

/**
 * トラックSTIをレンダリング（SOL 用）→ 1.1.* を使用
 */
function renderTrackSti(track) {
    const params = Array.isArray(track.SOLTrackParameter) ? track.SOLTrackParameter : [];
    const paramMap = new Map(params.map(p => [p.ID, p]));

    const html = renderStiBlocks(PARAM_STRUCTURE, paramMap, 'SOL', 4);
    if (!html) {
        return '<div class="no-params">Aucun paramètre STI disponible pour cette voie.</div>';
    }
    return html;
}



/**
 * トロンソン基本属性をレンダリング（SOL → 1.1.*）
 */
export function renderTronconBasicProperties(properties) {
    const {
        SOLIMCode,
        SOLLineIdentification,
        SOLOPStart,
        SOLOPEnd,
        SOLNature,
        SOLLength,
        ValidityDateStart,
        ValidityDateEnd
    } = properties;

    // OP の OPRailwayLocation から指定路線の km を取得
    function getKmForLine(opData, lineCode) {
        if (!opData || !lineCode) return null;
        const raw = opData.OPRailwayLocation;
        if (!raw) return null;
        const locations = Array.isArray(raw) ? raw : [raw];
        const loc = locations.find(l => String(l.NationalIdentNum ?? '') === lineCode);
        if (!loc) return null;
        const km = parseFloat(loc.Kilometer);
        return Number.isNaN(km) ? null : km;
    }

    function formatLineWithLink(lineCode) {
        if (!lineCode) return lineCode;
        return `
            <span class="line-info-link">
                <span class="line-info-label">${lineCode}</span>
                <button
                    type="button"
                    class="line-link-icon"
                    data-focus-line="${lineCode}"
                    title="Afficher toutes les sections de cette ligne">
                    🔍
                </button>
            </span>
        `;
    }

    // ★ 表示文字列: ID - Name (PK xx.xxx) ＋ 横にリンクアイコン
    function formatOPWithNameAndKm(opId, lineCode) {
        if (!opId) return opId;

        const opData = lookupOP(opId) || {};
        let name = opData.OPName;
        if (name && typeof name === 'object') {
            name = name.Value ?? '';
        }

        const km = getKmForLine(opData, lineCode);

        // ラベル部分: ID - Name (PK xx.xxx)
        let label = opId;
        if (name) {
            label += ` - ${name}`;
        }
        if (km !== null) {
            label += ` (PK ${km})`;
        }

        // テキストはクリック不可、右の🔍だけに data-focus-op を付与
        return `
            <span class="op-info">
                <span class="op-info-label">${label}</span>
                <button
                    type="button"
                    class="op-link-icon"
                    data-focus-op="${opId}"
                    title="Afficher ce point opérationnel sur la carte">
                    🔍
                </button>
            </span>
        `;
    }

    const basicProps = [
        { labelParamId: 'SOLIMCode',             value: SOLIMCode,           formatParamId: 'SOLIMCode' },

        // ★ ここを元の "value: SOLLineIdentification" から差し替え
        { labelParamId: 'SOLLineIdentification', value: formatLineWithLink(SOLLineIdentification) },

        // SOLOPStart / SOLOPEnd は前回説明した ID - Name (PK) 版ヘルパーを利用
        { labelParamId: 'SOLOPStart',
          value: formatOPWithNameAndKm(SOLOPStart, SOLLineIdentification) },
        { labelParamId: 'SOLOPEnd',
          value: formatOPWithNameAndKm(SOLOPEnd,   SOLLineIdentification) },

        { labelParamId: 'SOLLength',             value: SOLLength,           isLength: true },
        { labelParamId: 'SOLNature',             value: SOLNature,           formatParamId: 'SOLNature' },
        { labelParamId: 'ValidityDateStart',     value: ValidityDateStart,   isDate: true },
        { labelParamId: 'ValidityDateEnd',       value: ValidityDateEnd,     isDate: true }
    ];

    let html = '<div class="troncon-basic-info nest-level-1">';
    html += '<h3 class="troncon-basic-title">Informations sur le tronçon</h3>';
    html += '<table class="basic-properties-table">';

    basicProps.forEach(prop => {
        if (prop.value === null || prop.value === undefined || prop.value === '') return;

        let displayValue = prop.value;
        if (prop.formatParamId) {
            displayValue = formatParamValues(prop.formatParamId, prop.value);
        } else if (prop.isLength && typeof prop.value === 'number') {
            displayValue = prop.value.toFixed(3);
        } else if (prop.isDate) {
            displayValue = parseAndFormatDate(prop.value);
        }

        const { label, reference, url } = getParamLabel(prop.labelParamId, 'SOL');

        const referenceHtml = reference
            ? url
                ? `<div class="param-reference">[<a href="${url}" target="_blank" rel="noopener noreferrer">${reference} ${prop.labelParamId}</a>]</div>`
                : `<div class="param-reference">[${reference} ${prop.labelParamId}]</div>`
            : '';

        // ★ ボトムバー用のクイック切り替えボタン
        const quickToggleHtml = renderParamColorToggleButton('SOL', prop.labelParamId);

        html += `
            <tr>
                <td class="property-name">
                    <div class="param-label">${label}</div>
                    ${referenceHtml}
                    ${quickToggleHtml}
                </td>
                <td class="property-value">${displayValue}</td>
            </tr>
        `;
    });

    html += '</table></div>';
    return html;
}

/* ──────────────────────────────────────────────
 * SOL – Tunnel
 * ────────────────────────────────────────────── */

/**
 * SOLTunnel から paramMap を作成
 */
function buildTunnelParamMap(tunnel) {
    const params = Array.isArray(tunnel.SOLTunnelParameter)
        ? tunnel.SOLTunnelParameter
        : (tunnel.SOLTunnelParameter ? [tunnel.SOLTunnelParameter] : []);
    return new Map(params.map(p => [p.ID, p]));
}

function renderSingleTunnel(tunnel, index) {
    const paramMap = buildTunnelParamMap(tunnel);

    const identValue = tunnel.SOLTunnelIdentification?.Value || `Tunnel ${index}`;
    const imCode     = tunnel.SOLTunnelIMCode?.Value || '';
    const startKm    = tunnel.SOLTunnelStart?.Kilometer ?? null;
    const endKm      = tunnel.SOLTunnelEnd?.Kilometer ?? null;
    const vds        = tunnel.ValidityDateStart || null;
    const vde        = tunnel.ValidityDateEnd   || null;

    // パラメータの充足度バッジ（構造化 config ベース）
    const { total, available, notApplicable } = countStructureParams(TUNNEL_SOL_STRUCTURE, paramMap);
    const badgeHtml = renderCountBadge(available, total, notApplicable);

    // ラベル取得（あればRINFラベルを表示）
    const idMeta     = getParamLabel('SOLTunnelIdentification', 'SOL');
    const imCodeMeta = getParamLabel('SOLTunnelIMCode', 'SOL');

    return `
        <details class="tunnel-block nest-level-4" data-tunnel-id="${identValue}">
            <summary class="tunnel-summary">
                <span class="summary-label">${identValue}</span>
                ${badgeHtml}
            </summary>
            <div class="tunnel-content">
                <div class="tunnel-basic-info">
                    <table class="basic-properties-table">
                        <tr>
                            <td class="param-name">
                                <div class="param-label">${idMeta.label}</div>
                            </td>
                            <td class="param-value">${identValue}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">${imCodeMeta.label}</div>
                            </td>
                            <td class="param-value">${imCode || '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">Km début</div>
                            </td>
                            <td class="param-value">${startKm ?? '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">Km fin</div>
                            </td>
                            <td class="param-value">${endKm ?? '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">ValidityDateStart</div>
                            </td>
                            <td class="param-value">${vds ? parseAndFormatDate(vds) : '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">ValidityDateEnd</div>
                            </td>
                            <td class="param-value">${vde ? parseAndFormatDate(vde) : '-'}</td>
                        </tr>
                    </table>
                </div>
                <div class="tunnel-sti-section">
                    ${renderStiBlocks(TUNNEL_SOL_STRUCTURE, paramMap, 'SOL', 5)}
                </div>
            </div>
        </details>
    `;
}

function renderTrackTunnels(track) {
    console.log('[DEBUG] track.SOLTunnel:', track.SOLTunnel);
    // XML パーサによっては SOLTunnel が単体オブジェクトのことがあるので両対応
    let tunnels = [];
    if (Array.isArray(track.SOLTunnel)) {
        tunnels = track.SOLTunnel;
    } else if (track.SOLTunnel) {
        tunnels = [track.SOLTunnel];
    }

    if (!tunnels.length) {
        return ''; // トンネルが無ければ何も表示しない
    }

    let html = `
        <div class="track-tunnels-section nest-level-3">
            <h4 class="track-tunnels-title">Tunnels rattachés à cette voie</h4>
    `;

    tunnels.forEach((tunnel, idx) => {
        html += renderSingleTunnel(tunnel, idx + 1);
    });

    html += '</div>';
    return html;
}

/**
 * トラックブロックをレンダリング（SOL）
 */
function renderTrackBlock(track, index) {
    const trackId    = track.SOLTrackIdentification || `track-${index}`;
    const trackLabel = track.SOLTrackIdentification || `Voie ${index + 1}`;

    const ValidityDateStart  = track.ValidityDateStart  || null;
    const ValidityDateEnd   = track.ValidityDateEnd   || null;

    const directionRaw = track.SOLTrackDirection;
    const directionDisplay = directionRaw
        ? formatParamValues('SOLTrackDirection', directionRaw)
        : '-';

    // RINF メタデータ取得（label, reference, url）
    const trackIdMeta   = getParamLabel('SOLTrackIdentification', 'SOL');
    const directionMeta = getParamLabel('SOLTrackDirection', 'SOL');

    // [1.1.x.x SOLTrackIdentification] 全体をリンクにする
    const trackIdReferenceHtml = trackIdMeta.reference
        ? trackIdMeta.url
            ? `<div class="param-reference">[<a href="${trackIdMeta.url}" target="_blank" rel="noopener noreferrer">${trackIdMeta.reference} SOLTrackIdentification</a>]</div>`
            : `<div class="param-reference">[${trackIdMeta.reference} SOLTrackIdentification]</div>`
        : '';

    // [1.1.x.x SOLTrackDirection] 全体をリンクにする
    const directionReferenceHtml = directionMeta.reference
        ? directionMeta.url
            ? `<div class="param-reference">[<a href="${directionMeta.url}" target="_blank" rel="noopener noreferrer">${directionMeta.reference} SOLTrackDirection</a>]</div>`
            : `<div class="param-reference">[${directionMeta.reference} SOLTrackDirection]</div>`
        : '';

    return `
        <details class="track-block nest-level-2" data-track-id="${trackId}">
            <summary class="track-summary">${trackLabel}</summary>
            <div class="track-content">
                <div class="track-basic-info nest-level-3">
                    <h4 class="track-basic-title">Informations basiques de la voie</h4>
                    <table class="track-info-table">
                        <tr>
                            <td class="param-name">
                                <div class="param-label">${trackIdMeta.label}</div>
                                ${trackIdReferenceHtml}
                            </td>
                            <td class="param-value">${trackId}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">${directionMeta.label}</div>
                                ${directionReferenceHtml}
                            </td>
                            <td class="param-value">${directionDisplay}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">ValidityDateStart</div>
                            </td>
                            <td class="param-value">${ValidityDateStart ? parseAndFormatDate((ValidityDateStart)) : '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name">
                                <div class="param-label">ValidityDateEnd</div>
                            </td>
                            <td class="param-value">${ValidityDateEnd ? parseAndFormatDate(ValidityDateEnd) : '-'}</td>
                        </tr>
                    </table>
                </div>
                <div class="track-sti-section nest-level-3">
                    ${renderTrackSti(track)}
                </div>
                ${renderTrackTunnels(track)}
            </div>
        </details>
    `;
}

/**
 * GeoJSON トンネル用：1 voie + その voie に紐づくトンネルを表示
 */
function renderTunnelModeTrackBlock(track, index) {
    const tunnel = track.SOLTunnel;
    if (!tunnel) return '';

    const paramMap = buildTunnelParamMap(tunnel);

    const voieLabel   = track.SOLTrackIdentification || `Voie ${index + 1}`;
    const identValue  = tunnel.SOLTunnelIdentification || 'Tunnel inconnu';
    const imCode      = tunnel.SOLTunnelIMCode || '';
    const startKm     = tunnel.SOLTunnelStart?.Kilometer ?? null;
    const endKm       = tunnel.SOLTunnelEnd?.Kilometer   ?? null;
    const vds         = tunnel.ValidityDateStart || null;
    const vde         = tunnel.ValidityDateEnd   || null;

    const { total, available, notApplicable } = countStructureParams(TUNNEL_SOL_STRUCTURE, paramMap);
    const badgeHtml = renderCountBadge(available, total, notApplicable);

    return `
        <details class="tunnel-block nest-level-2" data-tunnel-id="${identValue}-${index}" open>
            <summary class="tunnel-summary">
                <span class="summary-label">${identValue} – ${voieLabel}</span>
                ${badgeHtml}
            </summary>
            <div class="tunnel-content">
                <div class="tunnel-basic-info">
                    <table class="basic-properties-table">
                        <tr>
                            <td class="param-name"><div class="param-label">Voie</div></td>
                            <td class="param-value">${voieLabel}</td>
                        </tr>
                        <tr>
                            <td class="param-name"><div class="param-label">Code IM tunnel</div></td>
                            <td class="param-value">${imCode || '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name"><div class="param-label">Km début</div></td>
                            <td class="param-value">${startKm ?? '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name"><div class="param-label">Km fin</div></td>
                            <td class="param-value">${endKm ?? '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name"><div class="param-label">ValidityDateStart</div></td>
                            <td class="param-value">${vds ? parseAndFormatDate(vds) : '-'}</td>
                        </tr>
                        <tr>
                            <td class="param-name"><div class="param-label">ValidityDateEnd</div></td>
                            <td class="param-value">${vde ? parseAndFormatDate(vde) : '-'}</td>
                        </tr>
                    </table>
                </div>
                <div class="tunnel-sti-section">
                    ${renderStiBlocks(TUNNEL_SOL_STRUCTURE, paramMap, 'SOL', 4)}
                </div>
            </div>
        </details>
    `;
}

/**
 * トンネルモード用フィーチャーレンダラー（エクスポート）
 * GeoJSON の properties.SOLTrack[].SOLTunnel をそのまま使う
 */
export function renderTunnelModeFeature(properties) {
    // 1) tronçon 基本情報は共通
    let html = renderTronconBasicProperties(properties);

    const tracks = Array.isArray(properties.SOLTrack) ? properties.SOLTrack : [];
    const tracksWithTunnel = tracks.filter(t => t.SOLTunnel);

    if (tracksWithTunnel.length === 0) {
        html += '<div class="no-params">Aucun tunnel disponible pour cette section.</div>';
        return html;
    }

    // 2) voie ごとにトンネルブロックを出す（グルーピングしない）
    html += '<div class="tunnels-container nest-level-1">';
    tracksWithTunnel.forEach((track, idx) => {
        html += renderTunnelModeTrackBlock(track, idx);
    });
    html += '</div>';

    return html;
}

/**
 * フィーチャー全体をレンダリング（SOL）
 */
function renderFeatureProperties(properties) {
    console.log('[DEBUG] properties.SOLTrack[0]:', properties.SOLTrack?.[0]);
    let html = renderTronconBasicProperties(properties);

    const tracks = Array.isArray(properties.SOLTrack) ? properties.SOLTrack : [];
    if (tracks.length > 0) {
        html += `<div class="tracks-container nest-level-1">`;
        tracks.forEach((track, idx) => {
            html += renderTrackBlock(track, idx);
        });
        html += `</div>`;
    }

    return html;
}

/**
 * GeoJSON から SOL フィーチャーをレンダリング（入口）
 */
export function renderFeatureFromGeoProps(geoProps, tunnelMode = false) {
    if (tunnelMode) {
        return renderTunnelModeFeature(geoProps);
    }

    const fullProps = lookupSOL(geoProps);
    if (!fullProps) {
        return `
            <div class="no-data">
                Données introuvables pour cette section
                (${geoProps.SOLOPStart ?? '?'} → ${geoProps.SOLOPEnd ?? '?'})
            </div>`;
    }
    return renderFeatureProperties(fullProps);
}