// js/ui/bottomBar/comparison/comparison_panel.js

import { buildComparisonMatrix, matrixToCsv } from './comparison_utils.js';
import { renderTronconBasicProperties } from '../bottomBar/renderers/renderers_sol.js';
import { renderOpGeneralDetails, renderOpTrackBasicDetails,
    renderOpSidingBasicDetails, } from '../bottomBar/renderers/renderers_op.js';

const TAB_DETAILS_ID = 'cp-tab-details';
const TAB_VOIES_ID   = 'cp-tab-voies';

// ── 親行定義（汎用） ──────────────────────────────────────────────────────────
const PARENT_ROW_DEFS = [
    { key: '_parentSOL',    label: 'Tronçon (SOL)'           },
    { key: '_parentOP',     label: 'Point opérationnel (OP)' },
    { key: '_parentVoie',   label: 'Voie parente'            },
    { key: '_parentSiding', label: 'Voie de service'         },
];

// ── 公開 API ──────────────────────────────────────────────────────────────────

export function renderComparisonTabs(container, fullProps) {
    _renderTabShell(container, {
        detailsHtml: renderTronconBasicProperties(fullProps),
        tracks:      fullProps.SOLTrack,
        identKey:    'SOLTrackIdentification',
        paramKey:    'SOLTrackParameter',
        label:       _buildSolLabel(fullProps),
    });
}

export function renderComparisonTabsForOP(container, op) {
    _renderTabShell(container, {
        detailsHtml: renderOpGeneralDetails(op),
        tracks:      op.OPTrack,
        identKey:    'OPTrackIdentification',
        paramKey:    'OPTrackParameter',
        label:       op.OPName || op.UniqueOPID || 'OP',
    });
}

// ── 汎用内部関数 ──────────────────────────────────────────────────────────────

function _renderTabShell(container, { detailsHtml, tracks, identKey, paramKey, label, tabLabel = 'Voies' }) {
    container.innerHTML = `
        <div class="cp-tabs" role="tablist">
            <button class="cp-tab-btn cp-tab-btn--active"
                    id="${TAB_DETAILS_ID}" role="tab" aria-selected="true"
                    data-target="cp-panel-details">Détails</button>
            <button class="cp-tab-btn"
                    id="${TAB_VOIES_ID}" role="tab" aria-selected="false"
                    data-target="cp-panel-voies">
                ${tracks.length > 1
                    ? `${tabLabel} <span class="cp-tab-count">${tracks.length}</span>`
                    : tabLabel}
            </button>
        </div>
        <div class="cp-panel cp-panel--active" id="cp-panel-details"></div>
        <div class="cp-panel" id="cp-panel-voies" hidden></div>
    `;

    container.querySelector('#cp-panel-details').innerHTML = detailsHtml;
    _renderComparisonTable(
        container.querySelector('#cp-panel-voies'),
        tracks, identKey, paramKey, label
    );

    container.querySelectorAll('.cp-tab-btn').forEach(btn =>
        btn.addEventListener('click', () => _activateTab(container, btn.id))
    );
}

function _activateTab(container, tabId) {
    container.querySelectorAll('.cp-tab-btn').forEach(btn => {
        const isActive = btn.id === tabId;
        btn.classList.toggle('cp-tab-btn--active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
    });
    const targetId = container.querySelector(`#${tabId}`)?.dataset.target;
    container.querySelectorAll('.cp-panel').forEach(panel => {
        const isActive = panel.id === targetId;
        panel.hidden = !isActive;
        panel.classList.toggle('cp-panel--active', isActive);
    });
}

function _renderComparisonTable(container, tracks, identKey, paramKey, label) {
    const matrix    = buildComparisonMatrix(tracks, { identKey, paramKey });
    const diffCount = matrix.rows.filter(r => r.hasDiff).length;

    const header = document.createElement('div');
    header.className = 'comparison-header';
    header.innerHTML = `
        <span class="comparison-title"><strong>${label}</strong></span>
        <div class="comparison-actions">
            <label class="comparison-filter-label">
                <input type="checkbox" id="comparison-diff-only">
                Différences uniquement
            </label>
            <button class="comparison-export-btn" title="Exporter en CSV">⬇ CSV</button>
        </div>
    `;
    container.appendChild(header);

    const badge = document.createElement('div');
    badge.className   = diffCount > 0 ? 'comparison-diff-badge' : 'comparison-same-badge';
    badge.textContent = diffCount > 0
        ? `${diffCount} paramètre${diffCount > 1 ? 's diffèrent' : ' diffère'} entre les voies`
        : 'Toutes les voies ont des valeurs identiques';
    container.appendChild(badge);

    const wrapper = document.createElement('div');
    wrapper.className = 'comparison-table-wrapper';

    const table  = document.createElement('table');
    table.className = 'comparison-table';

    const trHead = table.createTHead().insertRow();
    _th(trHead, 'Paramètre', 'comparison-param-col');
    matrix.headers.forEach(h => _th(trHead, h));

    const tbody = table.createTBody();

    // ★ 親行：PARENT_ROW_DEFS 順で存在するものだけ先頭に表示・colspan 結合
    PARENT_ROW_DEFS.forEach(({ key, label: rowLabel }) => {
        if (!tracks.some(t => t[key] != null)) return;

        const tr = tbody.insertRow();
        tr.dataset.hasDiff = '0';
        tr.classList.add('comparison-row-sol-header');
        _td(tr, rowLabel, 'comparison-param-col');

        const groups = [];
        tracks.forEach(t => {
            const val = t[key] ?? '—';
            if (!groups.length || groups[groups.length - 1].label !== val) {
                groups.push({ label: val, count: 1 });
            } else {
                groups[groups.length - 1].count++;
            }
        });

        groups.forEach(({ label: groupLabel, count }) => {
            const td = document.createElement('td');
            td.textContent = groupLabel;
            td.colSpan = count;
            td.classList.add('comparison-cell-sol-group');
            if (count > 1) td.classList.add('comparison-cell-sol-group--merged');
            tr.appendChild(td);
        });
    });

    matrix.rows.forEach(row => {
        const tr = tbody.insertRow();
        tr.dataset.hasDiff = row.hasDiff ? '1' : '0';
        if (row.hasDiff) tr.classList.add('comparison-row-diff');

        _td(tr, row.paramId, 'comparison-param-col');
        row.values.forEach((v, i) => {
            const td = document.createElement('td');
            td.textContent = v ?? '—';
            if (v === null)      td.classList.add('comparison-cell-missing');
            if (row.cellDiff[i]) td.classList.add('comparison-cell-diff');
            tr.appendChild(td);
        });
    });

    wrapper.appendChild(table);
    container.appendChild(wrapper);
    makeColumnsResizable(table);

    container.querySelector('#comparison-diff-only').addEventListener('change', e => {
        tbody.querySelectorAll('tr').forEach(tr => {
            tr.style.display = (e.target.checked && tr.dataset.hasDiff === '0') ? 'none' : '';
        });
    });

    container.querySelector('.comparison-export-btn').addEventListener('click', () => {
        _downloadCsv(
            `voies_${label.replace(/[^a-zA-Z0-9]/g, '_')}.csv`,
            matrixToCsv(label, matrix)
        );
    });
}

// ── SOL ──────────────────────────────────────────────────────────────────────

export function renderComparisonTabsForSOLTunnels(container, sol) {
    const tunnels = (sol.SOLTrack || []).flatMap(track => {
        const t = track.SOLTunnel;
        if (!t) return [];
        return Array.isArray(t) ? t : [t];
    });
    _renderTabShell(container, {
        detailsHtml: renderTronconBasicProperties(sol),
        tracks:      tunnels,
        identKey:    'SOLTunnelIdentification',
        paramKey:    'SOLTunnelParameter',
        label:       _buildSolLabel(sol),
        tabLabel:    'Tunnels',
    });
}

// ── OP – Voies de service ─────────────────────────────────────────────────────

export function renderComparisonTabsForOPSidings(container, op) {
    const sidings = Array.isArray(op.OPSiding) ? op.OPSiding : [];
    _renderTabShell(container, {
        detailsHtml: renderOpGeneralDetails(op),
        tracks:      sidings,
        identKey:    'OPSidingIdentification',
        paramKey:    'OPSidingParameter',
        label:       op.OPName || op.UniqueOPID || 'OP',
        tabLabel:    'Voies de service',
    });
}

// ── OP – Tunnels d'une voie ───────────────────────────────────────────────────

export function renderComparisonTabsForOPTrackTunnels(container, track, label) {
    const tunnels = Array.isArray(track.OPTrackTunnel) ? track.OPTrackTunnel : [];
    _renderTabShell(container, {
        detailsHtml: renderOpTrackBasicDetails(track),
        tracks:      tunnels,
        identKey:    'OPTrackTunnelIdentification',
        paramKey:    'OPTrackTunnelParameter',
        label,
        tabLabel:    'Tunnels',
    });
}

// ── OP – Quais d'une voie ─────────────────────────────────────────────────────

export function renderComparisonTabsForOPPlatforms(container, track, label) {
    const platforms = Array.isArray(track.OPTrackPlatform) ? track.OPTrackPlatform : [];
    _renderTabShell(container, {
        detailsHtml: renderOpTrackBasicDetails(track),
        tracks:      platforms,
        identKey:    'OPTrackPlatformIdentification',
        paramKey:    'OPTrackPlatformParameter',
        label,
        tabLabel:    'Quais',
    });
}

// ── OP – Tunnels d'une voie de service ───────────────────────────────────────

export function renderComparisonTabsForOPSidingTunnels(container, siding, label) {
    const tunnels = Array.isArray(siding.OPSidingTunnel)
        ? siding.OPSidingTunnel
        : (siding.OPSidingTunnel ? [siding.OPSidingTunnel] : []);
    _renderTabShell(container, {
        detailsHtml: renderOpSidingBasicDetails(siding),
        tracks:      tunnels,
        identKey:    'OPSidingTunnelIdentification',
        paramKey:    'OPSidingTunnelParameter',
        label,
        tabLabel:    'Tunnels',
    });
}

// ── マルチタブシェル ──────────────────────────────────────────────────────────

function _renderMultiTabShell(container, { detailsHtml, tabs }) {
    const activeTabs = tabs.filter(t => t.items?.length > 0);

    const btnHtml = activeTabs.map(tab => {
        const badge = tab.items.length > 1
            ? `<span class="cp-tab-count">${tab.items.length}</span>` : '';
        return `<button class="cp-tab-btn"
                        id="cp-tab-${tab.id}" role="tab" aria-selected="false"
                        data-target="cp-panel-${tab.id}">
                    ${tab.tabLabel}${badge}
                </button>`;
    }).join('');

    const panelsHtml = activeTabs.map(tab =>
        `<div class="cp-panel" id="cp-panel-${tab.id}" hidden></div>`
    ).join('');

    container.innerHTML = `
        <div class="cp-tabs" role="tablist">
            <button class="cp-tab-btn cp-tab-btn--active"
                    id="${TAB_DETAILS_ID}" role="tab" aria-selected="true"
                    data-target="cp-panel-details">Détails</button>
            ${btnHtml}
        </div>
        <div class="cp-panel cp-panel--active" id="cp-panel-details"></div>
        ${panelsHtml}
    `;

    container.querySelector('#cp-panel-details').innerHTML = detailsHtml;

    container.querySelectorAll('.cp-tab-btn').forEach(btn =>
        btn.addEventListener('click', () => _activateTab(container, btn.id))
    );

    activeTabs.forEach(tab => {
        const panel = container.querySelector(`#cp-panel-${tab.id}`);
        if (!panel) return;
        try {
            _renderComparisonTable(panel, tab.items, tab.identKey, tab.paramKey, tab.label);
        } catch (err) {
            console.error(`[ERROR] _renderComparisonTable (${tab.id}):`, err);
            panel.innerHTML = `<p class="placeholder">Données non disponibles.</p>`;
        }
    });
}

export function renderAllComparisonTabsForSOL(container, sol) {
    const tracks = Array.isArray(sol.SOLTrack) ? sol.SOLTrack
        : (sol.SOLTrack ? [sol.SOLTrack] : []);

    // ★ Tunnels に _parentVoie を注入
    const tunnels = tracks.flatMap(t => {
        const tu = t.SOLTunnel;
        if (!tu) return [];
        const voieLabel = t.SOLTrackIdentification ?? '?';
        return (Array.isArray(tu) ? tu : [tu]).map(tunnel => ({
            ...tunnel,
            _parentVoie: voieLabel,
        }));
    });

    console.log('[DEBUG] renderAllComparisonTabsForSOL', {
        tracks: tracks.length,
        tunnels: tunnels.length,
        hasTunnelKey: tracks.map(t => 'SOLTunnel' in t),
    });

    const label = _buildSolLabel(sol);

    _renderMultiTabShell(container, {
        detailsHtml: renderTronconBasicProperties(sol),
        tabs: [
            { id: 'voies',   tabLabel: 'Voies',  label, items: tracks,  identKey: 'SOLTrackIdentification',  paramKey: 'SOLTrackParameter'  },
            { id: 'tunnels', tabLabel: 'Tunnels', label, items: tunnels, identKey: 'SOLTunnelIdentification', paramKey: 'SOLTunnelParameter'  },
        ],
    });
}

export function renderAllComparisonTabsForOP(container, op) {
    const tracks  = Array.isArray(op.OPTrack)  ? op.OPTrack  : (op.OPTrack  ? [op.OPTrack]  : []);
    const sidings = Array.isArray(op.OPSiding) ? op.OPSiding : (op.OPSiding ? [op.OPSiding] : []);

    // ★ 子要素に _parentVoie / _parentSiding を注入
    const platforms = tracks.flatMap(t => {
        const pf = t.OPTrackPlatform;
        if (!pf) return [];
        const voieLabel = t.OPTrackIdentification ?? '?';
        return (Array.isArray(pf) ? pf : [pf]).map(p => ({ ...p, _parentVoie: voieLabel }));
    });
    const trackTunnels = tracks.flatMap(t => {
        const tu = t.OPTrackTunnel;
        if (!tu) return [];
        const voieLabel = t.OPTrackIdentification ?? '?';
        return (Array.isArray(tu) ? tu : [tu]).map(tunnel => ({ ...tunnel, _parentVoie: voieLabel }));
    });
    const sidingTunnels = sidings.flatMap(s => {
        const tu = s.OPSidingTunnel;
        if (!tu) return [];
        const sidingLabel = s.OPSidingIdentification ?? '?';
        return (Array.isArray(tu) ? tu : [tu]).map(tunnel => ({ ...tunnel, _parentSiding: sidingLabel }));
    });

    const label = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP';

    _renderMultiTabShell(container, {
        detailsHtml: renderOpGeneralDetails(op),
        tabs: [
            { id: 'voies',          tabLabel: 'Voies',            label, items: tracks,        identKey: 'OPTrackIdentification',        paramKey: 'OPTrackParameter'         },
            { id: 'quais',          tabLabel: 'Quais',            label, items: platforms,     identKey: 'OPTrackPlatformIdentification', paramKey: 'OPTrackPlatformParameter'  },
            { id: 'tunnels',        tabLabel: 'Tunnels',          label, items: trackTunnels,  identKey: 'OPTrackTunnelIdentification',   paramKey: 'OPTrackTunnelParameter'    },
            { id: 'sidings',        tabLabel: 'Voies de service', label, items: sidings,       identKey: 'OPSidingIdentification',        paramKey: 'OPSidingParameter'         },
            { id: 'siding-tunnels', tabLabel: 'Tunnels (VS)',     label, items: sidingTunnels, identKey: 'OPSidingTunnelIdentification',  paramKey: 'OPSidingTunnelParameter'   },
        ],
    });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function _buildSolLabel(props) {
    const parts = [];
    if (props.SOLLineIdentification) parts.push(props.SOLLineIdentification);
    if (props.SOLOPStart && props.SOLOPEnd) parts.push(`${props.SOLOPStart} → ${props.SOLOPEnd}`);
    return parts.join(' — ') || 'SOL';
}

function _th(tr, text, className = '') {
    const th = document.createElement('th');
    th.textContent = text;
    if (className) th.className = className;
    tr.appendChild(th);
}

function _td(tr, text, className = '') {
    const td = document.createElement('td');
    td.textContent = text;
    if (className) td.className = className;
    tr.appendChild(td);
}

function _downloadCsv(filename, content) {
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
}

function makeColumnsResizable(table) {
    const ths = Array.from(table.querySelectorAll('thead th'));
    if (ths.length < 2) return;

    ths.slice(1).forEach(th => {
        const handle = document.createElement('div');
        handle.className = 'col-resize-handle';
        th.appendChild(handle);

        handle.addEventListener('mousedown', e => {
            e.preventDefault();
            e.stopPropagation();

            if (!table.dataset.resizeInit) {
                table.dataset.resizeInit = '1';
                ths.slice(1).forEach(t => { t.style.width = `${t.offsetWidth}px`; });
                table.style.width = `${table.offsetWidth}px`;
            }

            const startX          = e.pageX;
            const startWidth      = parseInt(th.style.width);
            const startTableWidth = parseInt(table.style.width);

            handle.classList.add('col-resize-handle--active');

            const onMove = e => {
                const newWidth = Math.max(60, startWidth + (e.pageX - startX));
                th.style.width    = `${newWidth}px`;
                table.style.width = `${startTableWidth + (newWidth - startWidth)}px`;
            };

            const onUp = () => {
                handle.classList.remove('col-resize-handle--active');
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    });
}

// ── Cross-entity comparison helpers ──────────────────────────────────────────

function _solToParamMap(sol) {
    const m = new Map();
    m.set('Ligne',          sol.SOLLineIdentification ?? null);
    m.set('Nature',         sol.SOLNature             ?? null);
    m.set('Longueur (m)',   sol.SOLLength != null ? String(sol.SOLLength) : null);
    m.set('Code IM',        sol.SOLIMCode             ?? null);
    m.set('Validité début', sol.ValidityDateStart     ?? null);
    m.set('Validité fin',   sol.ValidityDateEnd       ?? null);
    m.set('Nb. voies',      String((sol.SOLTrack ?? []).length));
    m.set('Nb. tunnels',    String(
        (sol.SOLTrack ?? []).flatMap(t => {
            const tu = t.SOLTunnel;
            return !tu ? [] : Array.isArray(tu) ? tu : [tu];
        }).length
    ));
    return m;
}

function _opToParamMap(op) {
    const m = new Map();
    m.set('Type',               op.OPType                        ?? null);
    m.set('Code TAF/TAP',       op.OPTafTapCode?.Value           ?? null);
    m.set('Changement gabarit', op.OPTypeGaugeChangeover?.Value  ?? null);
    m.set('Validité début',     op.ValidityDateStart             ?? null);
    m.set('Validité fin',       op.ValidityDateEnd               ?? null);
    m.set('Nb. voies',          String((op.OPTrack  ?? []).length));
    m.set('Nb. VS',             String((op.OPSiding ?? []).length));
    return m;
}

function _buildFlatMatrix(entities, getHeader, getParams) {
    const headers   = entities.map(getHeader);
    const paramMaps = entities.map(getParams);

    const allParamIds = [];
    const seen = new Set();
    paramMaps.forEach(m => m.forEach((_, id) => {
        if (!seen.has(id)) { seen.add(id); allParamIds.push(id); }
    }));

    const rows = allParamIds.map(paramId => {
        const values  = paramMaps.map(m => m.get(paramId) ?? null);
        const nonNull = values.filter(v => v !== null);
        const hasDiff = nonNull.length > 1 && new Set(nonNull).size > 1;
        const majority = hasDiff
            ? [...new Set(nonNull)].sort((a, b) =>
                values.filter(v => v === b).length - values.filter(v => v === a).length
              )[0]
            : null;
        const cellDiff = values.map(v => hasDiff && v !== majority);
        return { paramId, values, hasDiff, cellDiff };
    });

    return { headers, rows };
}

function _renderFlatComparisonTable(container, matrix, label) {
    const diffCount = matrix.rows.filter(r => r.hasDiff).length;

    const header = document.createElement('div');
    header.className = 'comparison-header';
    header.innerHTML = `
        <span class="comparison-title"><strong>${label}</strong></span>
        <div class="comparison-actions">
            <label class="comparison-filter-label">
                <input type="checkbox" class="cross-diff-only">
                Différences uniquement
            </label>
            <button class="comparison-export-btn" title="Exporter en CSV">⬇ CSV</button>
        </div>
    `;
    container.appendChild(header);

    const badge = document.createElement('div');
    badge.className   = diffCount > 0 ? 'comparison-diff-badge' : 'comparison-same-badge';
    badge.textContent = diffCount > 0
        ? `${diffCount} paramètre${diffCount > 1 ? 's diffèrent' : ' diffère'} entre les entités`
        : 'Toutes les entités ont des valeurs identiques';
    container.appendChild(badge);

    const wrapper = document.createElement('div');
    wrapper.className = 'comparison-table-wrapper';

    const table = document.createElement('table');
    table.className = 'comparison-table';

    const trHead = table.createTHead().insertRow();
    _th(trHead, 'Paramètre', 'comparison-param-col');
    matrix.headers.forEach(h => _th(trHead, h));

    const tbody = table.createTBody();
    matrix.rows.forEach(row => {
        const tr = tbody.insertRow();
        tr.dataset.hasDiff = row.hasDiff ? '1' : '0';
        if (row.hasDiff) tr.classList.add('comparison-row-diff');
        _td(tr, row.paramId, 'comparison-param-col');
        row.values.forEach((v, i) => {
            const td = document.createElement('td');
            td.textContent = v ?? '—';
            if (v === null)      td.classList.add('comparison-cell-missing');
            if (row.cellDiff[i]) td.classList.add('comparison-cell-diff');
            tr.appendChild(td);
        });
    });

    wrapper.appendChild(table);
    container.appendChild(wrapper);
    makeColumnsResizable(table);

    container.querySelector('.cross-diff-only').addEventListener('change', e => {
        tbody.querySelectorAll('tr').forEach(tr => {
            tr.style.display = (e.target.checked && tr.dataset.hasDiff === '0') ? 'none' : '';
        });
    });
    container.querySelector('.comparison-export-btn').addEventListener('click', () => {
        _downloadCsv(
            `cross_${label.replace(/[^a-zA-Z0-9]/g, '_')}.csv`,
            matrixToCsv(label, matrix)
        );
    });
}

// ── Cross-entity public API ───────────────────────────────────────────────────

export function renderCrossSOLComparison(container, solList) {
    if (!solList?.length) {
        container.innerHTML = `<p class="placeholder">Aucun tronçon sélectionné.</p>`;
        return;
    }

    // ★ tracks に _parentSOL を注入
    const allTracks = solList.flatMap(sol => {
        const solLabel = _buildSolLabel(sol);
        const tracks = Array.isArray(sol.SOLTrack) ? sol.SOLTrack : (sol.SOLTrack ? [sol.SOLTrack] : []);
        return tracks.map(t => ({ ...t, _parentSOL: solLabel }));
    });

    // ★ tunnels に _parentSOL + _parentVoie を注入
    const allTunnels = solList.flatMap(sol => {
        const solLabel = _buildSolLabel(sol);
        const tracks = Array.isArray(sol.SOLTrack) ? sol.SOLTrack : (sol.SOLTrack ? [sol.SOLTrack] : []);
        return tracks.flatMap(track => {
            const voieLabel = track.SOLTrackIdentification ?? '?';
            const tu = track.SOLTunnel;
            if (!tu) return [];
            return (Array.isArray(tu) ? tu : [tu]).map(tunnel => ({
                ...tunnel,
                _parentSOL:  solLabel,
                _parentVoie: voieLabel,
            }));
        });
    });

    const hasVoies   = allTracks.length > 0;
    const hasTunnels = allTunnels.length > 0;

    container.innerHTML = `
        <div class="cp-tabs" role="tablist">
            <button class="cp-tab-btn cp-tab-btn--active"
                    id="cross-tab-sol" role="tab" aria-selected="true"
                    data-target="cross-panel-sol">
                SOL <span class="cp-tab-count">${solList.length}</span>
            </button>
            ${hasVoies ? `
            <button class="cp-tab-btn"
                    id="cross-tab-voies" role="tab" aria-selected="false"
                    data-target="cross-panel-voies">
                Voies <span class="cp-tab-count">${allTracks.length}</span>
            </button>` : ''}
            ${hasTunnels ? `
            <button class="cp-tab-btn"
                    id="cross-tab-tunnels" role="tab" aria-selected="false"
                    data-target="cross-panel-tunnels">
                Tunnels <span class="cp-tab-count">${allTunnels.length}</span>
            </button>` : ''}
        </div>
        <div class="cp-panel cp-panel--active" id="cross-panel-sol"></div>
        ${hasVoies   ? `<div class="cp-panel" id="cross-panel-voies"   hidden></div>` : ''}
        ${hasTunnels ? `<div class="cp-panel" id="cross-panel-tunnels" hidden></div>` : ''}
    `;

    container.querySelectorAll('.cp-tab-btn').forEach(btn =>
        btn.addEventListener('click', () => _activateTab(container, btn.id))
    );

    _renderFlatComparisonTable(
        container.querySelector('#cross-panel-sol'),
        _buildFlatMatrix(solList, sol => _buildSolLabel(sol), _solToParamMap),
        'Comparaison SOL'
    );

    if (hasVoies) {
        _renderComparisonTable(
            container.querySelector('#cross-panel-voies'),
            allTracks,
            'SOLTrackIdentification',
            'SOLTrackParameter',
            'Toutes les voies'
        );
    }

    if (hasTunnels) {
        _renderComparisonTable(
            container.querySelector('#cross-panel-tunnels'),
            allTunnels,
            'SOLTunnelIdentification',
            'SOLTunnelParameter',
            'Tous les tunnels'
        );
    }
}

export function renderCrossOPComparison(container, opList) {
    if (!opList?.length) {
        container.innerHTML = `<p class="placeholder">Aucun OP sélectionné.</p>`;
        return;
    }

    // ★ 全子要素に親情報を注入
    const allTracks = opList.flatMap(op => {
        const opLabel = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP';
        const tracks = Array.isArray(op.OPTrack) ? op.OPTrack : (op.OPTrack ? [op.OPTrack] : []);
        return tracks.map(t => ({ ...t, _parentOP: opLabel }));
    });

    const allSidings = opList.flatMap(op => {
        const opLabel = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP';
        const sidings = Array.isArray(op.OPSiding) ? op.OPSiding : (op.OPSiding ? [op.OPSiding] : []);
        return sidings.map(s => ({ ...s, _parentOP: opLabel }));
    });

    const allPlatforms = opList.flatMap(op => {
        const opLabel = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP';
        const tracks = Array.isArray(op.OPTrack) ? op.OPTrack : (op.OPTrack ? [op.OPTrack] : []);
        return tracks.flatMap(track => {
            const voieLabel = track.OPTrackIdentification ?? '?';
            const pf = track.OPTrackPlatform;
            if (!pf) return [];
            return (Array.isArray(pf) ? pf : [pf]).map(p => ({
                ...p,
                _parentOP:   opLabel,
                _parentVoie: voieLabel,
            }));
        });
    });

    const allTrackTunnels = opList.flatMap(op => {
        const opLabel = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP';
        const tracks = Array.isArray(op.OPTrack) ? op.OPTrack : (op.OPTrack ? [op.OPTrack] : []);
        return tracks.flatMap(track => {
            const voieLabel = track.OPTrackIdentification ?? '?';
            const tu = track.OPTrackTunnel;
            if (!tu) return [];
            return (Array.isArray(tu) ? tu : [tu]).map(t => ({
                ...t,
                _parentOP:   opLabel,
                _parentVoie: voieLabel,
            }));
        });
    });

    const allSidingTunnels = opList.flatMap(op => {
        const opLabel = (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP';
        const sidings = Array.isArray(op.OPSiding) ? op.OPSiding : (op.OPSiding ? [op.OPSiding] : []);
        return sidings.flatMap(siding => {
            const sidingLabel = siding.OPSidingIdentification ?? '?';
            const tu = siding.OPSidingTunnel;
            if (!tu) return [];
            return (Array.isArray(tu) ? tu : [tu]).map(t => ({
                ...t,
                _parentOP:     opLabel,
                _parentSiding: sidingLabel,
            }));
        });
    });

    const tabs = [
        { id: 'op',             label: `OP <span class="cp-tab-count">${opList.length}</span>`,                              show: true                       },
        { id: 'voies',          label: `Voies <span class="cp-tab-count">${allTracks.length}</span>`,                        show: allTracks.length > 0       },
        { id: 'quais',          label: `Quais <span class="cp-tab-count">${allPlatforms.length}</span>`,                     show: allPlatforms.length > 0    },
        { id: 'tunnels',        label: `Tunnels <span class="cp-tab-count">${allTrackTunnels.length}</span>`,                show: allTrackTunnels.length > 0 },
        { id: 'sidings',        label: `VS <span class="cp-tab-count">${allSidings.length}</span>`,                          show: allSidings.length > 0      },
        { id: 'siding-tunnels', label: `Tunnels (VS) <span class="cp-tab-count">${allSidingTunnels.length}</span>`,         show: allSidingTunnels.length > 0},
    ].filter(t => t.show);

    const btnHtml   = tabs.map((t, i) => `
        <button class="cp-tab-btn ${i === 0 ? 'cp-tab-btn--active' : ''}"
                id="cross-tab-${t.id}" role="tab" aria-selected="${i === 0}"
                data-target="cross-panel-${t.id}">${t.label}</button>
    `).join('');
    const panelHtml = tabs.map((t, i) => `
        <div class="cp-panel ${i === 0 ? 'cp-panel--active' : ''}"
             id="cross-panel-${t.id}" ${i !== 0 ? 'hidden' : ''}></div>
    `).join('');

    container.innerHTML = `<div class="cp-tabs" role="tablist">${btnHtml}</div>${panelHtml}`;
    container.querySelectorAll('.cp-tab-btn').forEach(btn =>
        btn.addEventListener('click', () => _activateTab(container, btn.id))
    );

    _renderFlatComparisonTable(
        container.querySelector('#cross-panel-op'),
        _buildFlatMatrix(opList, op => (op.OPName?.Value ?? op.OPName) || op.UniqueOPID || 'OP', _opToParamMap),
        'Comparaison OP'
    );
    if (allTracks.length)
        _renderComparisonTable(container.querySelector('#cross-panel-voies'),          allTracks,        'OPTrackIdentification',        'OPTrackParameter',        'Toutes les voies');
    if (allPlatforms.length)
        _renderComparisonTable(container.querySelector('#cross-panel-quais'),          allPlatforms,     'OPTrackPlatformIdentification', 'OPTrackPlatformParameter', 'Tous les quais');
    if (allTrackTunnels.length)
        _renderComparisonTable(container.querySelector('#cross-panel-tunnels'),        allTrackTunnels,  'OPTrackTunnelIdentification',   'OPTrackTunnelParameter',   'Tous les tunnels');
    if (allSidings.length)
        _renderComparisonTable(container.querySelector('#cross-panel-sidings'),        allSidings,       'OPSidingIdentification',        'OPSidingParameter',        'Toutes les VS');
    if (allSidingTunnels.length)
        _renderComparisonTable(container.querySelector('#cross-panel-siding-tunnels'), allSidingTunnels, 'OPSidingTunnelIdentification',  'OPSidingTunnelParameter',  'Tunnels des VS');
}