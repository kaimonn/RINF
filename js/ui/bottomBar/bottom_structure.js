// js/ui/bottomBar/bottom_structure.js

import { buildSolTreeData, buildOpTreeData, renderTreeHtml } from './renderers/renderers_structure.js';
import { renderNodeFlat }                  from './renderers/renderers_common.js';
import { renderTronconBasicProperties }    from './renderers/renderers_sol.js';
import {
    renderOpGeneralDetails,
    renderOpTrackBasicDetails,
    renderOpPlatformBasicDetails,
    renderOpTunnelBasicDetails,
    renderOpSidingBasicDetails,
} from './renderers/renderers_op.js';
import { formatParamValues } from '../sidebar/sidebar_utils.js'; 
import { lookupOP, lookupSOL  } from '/data/xml_loader.js'; 
import {
    highlightSolByOpPair,
    highlightSolLine,
    zoomSolByOpPair, 
    refreshLayerStyles,
} from '/js/map/layer_SOL.js';
import {
    getCurrentColorMode,
    getOpCurrentColorMode,
    setCurrentColorMode,
    setOpCurrentColorMode,
    setTunnelMode,   // SOLトンネルモードのsetter
    setOpSubMode,    // OPサブモードのsetter
} from '/js/state.js';
import { refreshOpStyles }    from '/js/map/layer_OP.js';
import { updateLegend }       from '/js/map/legend.js';
import { setupGraphicParametersPanel } from '../sidebar/graphic_parameters_panel.js';
import { showLoading, hideLoading } from '../loadingOverlay.js';
import {     renderAllComparisonTabsForSOL,  
    renderAllComparisonTabsForOP,
    renderComparisonTabsForSOLTunnels,
    renderComparisonTabsForOPSidings,
    renderComparisonTabsForOPTrackTunnels,
    renderComparisonTabsForOPPlatforms,
    renderComparisonTabsForOPSidingTunnels, } from '../comparison/comparison_panel.js';


// ── モジュールスコープの状態 ──────────────────────────────────────────────────
let currentTreeData = null;

// ── ユーティリティ ────────────────────────────────────────────────────────────

function findNodeById(nodes, id) {
    for (const node of nodes) {
        if (node.id === id) return node;
        const found = findNodeById(node.children ?? [], id);
        if (found) return found;
    }
    return null;
}

function highlightActiveColorParam() {
    const details = document.querySelector('.bottom-details');
    if (!details) return;

    // 既存ハイライトをリセット
    details.querySelectorAll('.param-row-active').forEach(el => {
        el.classList.remove('param-row-active');
    });

    // SOL / OP 両方のアクティブmodeIdを確認
    const solModeId = getCurrentColorMode?.();
    const opModeId  = getOpCurrentColorMode?.();

    [solModeId, opModeId].forEach(modeId => {
        if (!modeId) return;
        details.querySelectorAll(`.param-color-toggle-btn[data-mode-id="${modeId}"]`)
            .forEach(btn => {
                btn.closest('tr')?.classList.add('param-row-active');
            });
    });
}

function setupParamColorToggleHandler() {
    const details = document.querySelector('.bottom-details');
    if (!details) return;

    if (details._paramColorHandler) {
        details.removeEventListener('click', details._paramColorHandler);
    }

    let isProcessing = false; // ★ 連打ガード

    const handler = (e) => {
        const btn = e.target.closest('.param-color-toggle-btn');
        if (!btn) return;
        if (isProcessing) return; // ★ 処理中は無視

        const scope  = btn.dataset.scope;
        const modeId = btn.dataset.modeId;
        if (!modeId) return;

        isProcessing = true;
        showLoading('Application du mode couleur...');

        // ★ 1フレーム待ってオーバーレイを描画させてから重い処理を実行
        setTimeout(() => {
            try {
                if (scope === 'SOL') {
                    const needsTunnel = modeId.startsWith('Tunnel_');
                    setTunnelMode(needsTunnel);
                    setCurrentColorMode(modeId);
                    refreshLayerStyles();
                    setupGraphicParametersPanel('SOL');

                } else if (scope === 'OP') {
                    let subMode = null;
                    if      (modeId.startsWith('OP_Siding_'))   subMode = 'siding';
                    else if (modeId.startsWith('OP_Platform_')) subMode = 'platform';
                    else if (modeId.startsWith('OP_Tunnel_'))   subMode = 'tunnel';

                    setOpSubMode(subMode);
                    setOpCurrentColorMode(modeId);
                    refreshOpStyles();
                    setupGraphicParametersPanel('OP');
                }

                updateLegend();
            } finally {
                hideLoading();
                isProcessing = false; // ★ 処理完了後に解放
                highlightActiveColorParam(); 
            }
        }, 0);
    };

    details.addEventListener('click', handler);
    details._paramColorHandler = handler;
}

/**
 * .bottom-details への書き込み先を解決する。
 * タブが存在する場合 → Détails タブをアクティブにして #cp-panel-details を返す。
 * タブが存在しない場合 → .bottom-details 自身を返す。
 */
function getWriteTarget() {
    const details = document.querySelector('.bottom-details');
    if (!details) return null;

    const panel = details.querySelector('#cp-panel-details');
    if (!panel) return details; // タブなし → 通常通り

    // Détails タブをアクティブ化
    details.querySelectorAll('.cp-tab-btn').forEach(btn => {
        const isActive = btn.dataset.target === 'cp-panel-details';
        btn.classList.toggle('cp-tab-btn--active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
    });
    details.querySelectorAll('.cp-panel').forEach(p => {
        const isActive = p.id === 'cp-panel-details';
        p.hidden = !isActive;
        p.classList.toggle('cp-panel--active', isActive);
    });

    return panel;
}

/**
 * 詳細パネルの末尾に、*-section 型の子ノードへのボタンを追加する
 */
function _appendChildSectionNav(container, node) {
    if (!node?.children?.length) return;
    const sectionChildren = node.children.filter(c => c.type?.endsWith('-section'));
    if (!sectionChildren.length) return;

    const nav = document.createElement('div');
    nav.className = 'child-section-nav';
    sectionChildren.forEach(child => {
        const btn = document.createElement('button');
        btn.className = 'child-section-btn';
        btn.dataset.nodeId = child.id;
        btn.innerHTML = child.label;  // ← 絵文字ラベルをそのまま使用
        nav.appendChild(btn);
    });
    container.appendChild(nav);
}

function setupChildSectionNavHandler() {
    const details = document.querySelector('.bottom-details');
    if (!details) return;

    if (details._childSectionHandler) {
        details.removeEventListener('click', details._childSectionHandler);
    }

    const handler = (e) => {
        const btn = e.target.closest('.child-section-btn');
        if (!btn || !currentTreeData) return;
        renderDetails(findNodeById(currentTreeData, btn.dataset.nodeId));
    };

    details.addEventListener('click', handler);
    details._childSectionHandler = handler;
}

// ── SOL ローカルヘルパー ──────────────────────────────────────────────────────

function renderSolTrackBasicDetails(track) {
    const title = track.SOLTrackIdentification || 'Voie';

    // ← formatParamValues で変換
    const directionDisplay = track.SOLTrackDirection
        ? formatParamValues('SOLTrackDirection', track.SOLTrackDirection)
        : '-';

    return `
        <h3 class="track-basic-title">${title}</h3>
        <table class="basic-properties-table">
            <tr>
                <td class="param-name">Identification</td>
                <td class="param-value">${track.SOLTrackIdentification || '-'}</td>
            </tr>
            <tr>
                <td class="param-name">Direction</td>
                <td class="param-value">${directionDisplay}</td>
            </tr>
            <tr>
                <td class="param-name">ValidityDateStart</td>
                <td class="param-value">${track.ValidityDateStart || '-'}</td>
            </tr>
            <tr>
                <td class="param-name">ValidityDateEnd</td>
                <td class="param-value">${track.ValidityDateEnd || '-'}</td>
            </tr>
        </table>`;
}


function renderSolTunnelBasicDetails(tunnel) {
    const identRaw = tunnel.SOLTunnelIdentification;
    let title;

    if (identRaw && typeof identRaw === 'object') {
        // XML 由来の { Value: ... } に対応
        title = identRaw.Value || 'Tunnel';
    } else {
        title = identRaw || 'Tunnel';
    }

    return `
        <h3 class="section-title">🚇 ${title}</h3>
        <table class="basic-properties-table">
            <tr><td class="param-name">Code IM</td>
                <td class="param-value">${tunnel.SOLTunnelIMCode || '-'}</td></tr>
            <tr><td class="param-name">Km début</td>
                <td class="param-value">${tunnel.SOLTunnelStart?.Kilometer ?? '-'}</td></tr>
            <tr><td class="param-name">Km fin</td>
                <td class="param-value">${tunnel.SOLTunnelEnd?.Kilometer ?? '-'}</td></tr>
            <tr><td class="param-name">ValidityDateStart</td>
                <td class="param-value">${tunnel.ValidityDateStart || '-'}</td></tr>
            <tr><td class="param-name">ValidityDateEnd</td>
                <td class="param-value">${tunnel.ValidityDateEnd || '-'}</td></tr>
        </table>`;
}


function autoExpandFirstAccordion(structureEl) {
    // 子を持つ最初のノードを探す
    const firstToggle = structureEl.querySelector('.tree-toggle');
    if (!firstToggle || firstToggle.textContent.trim() === '') return;

    const nodeEl = firstToggle.closest('.tree-node');
    if (!nodeEl) return;

    const childrenEl = structureEl.querySelector(
        `.tree-children[data-parent="${nodeEl.dataset.nodeId}"]`
    );
    if (!childrenEl) return;

    // 既に展開済みなら何もしない
    if (childrenEl.style.display !== 'none') return;

    childrenEl.style.display = 'block';
    firstToggle.textContent  = '▼';
}

const SECTION_PANEL_MAP = {
    'sol-tunnels-section':        'cp-panel-tunnels',
    'op-sidings-section':         'cp-panel-sidings',
    'op-track-tunnels-section':   'cp-panel-tunnels',
    'op-track-platforms-section': 'cp-panel-quais',
    'op-siding-tunnels-section':  'cp-panel-siding-tunnels',
};

function _activateTabByPanelId(container, panelId) {
    container.querySelectorAll('.cp-tab-btn').forEach(btn => {
        const active = btn.dataset.target === panelId;
        btn.classList.toggle('cp-tab-btn--active', active);
        btn.setAttribute('aria-selected', String(active));
    });
    container.querySelectorAll('.cp-panel').forEach(p => {
        const active = p.id === panelId;
        p.hidden = !active;
        p.classList.toggle('cp-panel--active', active);
    });
}

// ── 右カラム更新 ──────────────────────────────────────────────────────────────

function renderDetails(node) {
    if (!node) return;

    // ★ セクションノードは getWriteTarget() を呼ぶ前に処理する
    const panelId = SECTION_PANEL_MAP[node.type];
    if (panelId) {
        const detailsEl = document.querySelector('.bottom-details');
        if (detailsEl) _activateTabByPanelId(detailsEl, panelId);
        return;
    }

    const details = getWriteTarget();
    if (!details) return;

    switch (node.type) {
        case 'line-general': {
            const { lineCode, summaryHtml } = node.payload;
            if (lineCode) highlightSolLine(lineCode);
            details.innerHTML = summaryHtml || '';
            break;
        }
        case 'sol-general': {
            const p = node.payload.properties;
            if (p?.SOLOPStart && p?.SOLOPEnd) {
                highlightSolByOpPair(p.SOLOPStart, p.SOLOPEnd);
            }
            // ★ 追加：比較タブをそのSOLで再描画
            const detailsEl = document.querySelector('.bottom-details');
            if (detailsEl) renderAllComparisonTabsForSOL(detailsEl, p);
            // getWriteTarget() は renderAllComparisonTabsForSOL の後に呼ぶ必要がある
            break;
        }
        case 'track-basic':
            details.innerHTML = renderSolTrackBasicDetails(node.payload.track);
            _appendChildSectionNav(details, node);
            break;
        case 'sol-tunnel':
            details.innerHTML = renderSolTunnelBasicDetails(node.payload.tunnel);
            break;
        case 'sol-sti':
        case 'sol-sti-section':
        case 'sol-tunnel-sti':
        case 'sol-tunnel-sti-section': {
            const target = node.payload.section ?? node.payload.sti;
            details.innerHTML = `<h3 class="flat-node-title">${node.label}</h3>` +
                renderNodeFlat(target, node.payload.paramMap, 'SOL');
            break;
        }
        case 'op-general':
            details.innerHTML = renderOpGeneralDetails(node.payload.op);
            break;
        case 'op-track-basic':
            details.innerHTML = renderOpTrackBasicDetails(node.payload.track);
            _appendChildSectionNav(details, node);
            break;
        case 'op-platform':
            details.innerHTML = renderOpPlatformBasicDetails(node.payload.platform);
            break;
        case 'op-tunnel':
        case 'op-siding-tunnel':
            details.innerHTML = renderOpTunnelBasicDetails(node.payload.tunnel);
            break;
        case 'op-siding':
            details.innerHTML = renderOpSidingBasicDetails(node.payload.siding);
            _appendChildSectionNav(details, node);
            break;
        case 'op-sti':
        case 'op-sti-section':
        case 'op-platform-sti':
        case 'op-platform-sti-section':
        case 'op-tunnel-sti':
        case 'op-tunnel-sti-section':
        case 'op-siding-sti':
        case 'op-siding-sti-section':
        case 'op-siding-tunnel-sti':
        case 'op-siding-tunnel-sti-section': {
            const target = node.payload.section ?? node.payload.sti;
            details.innerHTML = `<h3 class="flat-node-title">${node.label}</h3>` +
                renderNodeFlat(target, node.payload.paramMap, 'OP');
            break;
        }
        default:
            details.innerHTML = `<p class="placeholder">Sélectionnez un élément dans l'arbre.</p>`;
    }
    highlightActiveColorParam();
}

// ── ツリー操作 ────────────────────────────────────────────────────────────────

function setupTreeInteraction(structureEl) {
    if (structureEl._treeClickHandler) {
        structureEl.removeEventListener('click', structureEl._treeClickHandler);
    }

    const handler = (e) => {

        // ★ セクションナビボタン（.bottom-details 内のボタン）
        const sectionBtn = e.target.closest('.child-section-btn');
        if (sectionBtn) {
            const nodeId = sectionBtn.dataset.nodeId;
            if (currentTreeData) {
                renderDetails(findNodeById(currentTreeData, nodeId));
            }
            return;
        }

        const nodeEl = e.target.closest('.tree-node');
        if (!nodeEl) return;

        // ▶/▼ 開閉
        const toggle = e.target.closest('.tree-toggle');
        if (toggle?.textContent.trim()) {
            const childrenEl = structureEl.querySelector(
                `.tree-children[data-parent="${nodeEl.dataset.nodeId}"]`
            );
            if (childrenEl) {
                const isOpen = childrenEl.style.display !== 'none';
                childrenEl.style.display = isOpen ? 'none' : 'block';
                toggle.textContent = isOpen ? '▶' : '▼';
            }
        }

        // アクティブ状態 + 右カラム更新
        structureEl.querySelectorAll('.tree-node.active').forEach(n => n.classList.remove('active'));
        nodeEl.classList.add('active');

        if (currentTreeData) {
            renderDetails(findNodeById(currentTreeData, nodeEl.dataset.nodeId));
        }
    };

    structureEl.addEventListener('click', handler);
    structureEl._treeClickHandler = handler;
}


// ── 路線モード用：構造ツリー ──────────────────────────────────────────────

// OP → その路線に対する PK を取得
function getKmForLine(opId, lineCode) {
    if (!opId || !lineCode) return null;
    const opData = lookupOP(opId);
    if (!opData) return null;

    const raw = opData.OPRailwayLocation;
    if (!raw) return null;
    const locations = Array.isArray(raw) ? raw : [raw];

    const loc = locations.find(l => String(l.NationalIdentNum ?? '') === String(lineCode));
    if (!loc || loc.Kilometer == null) return null;

    const km = parseFloat(loc.Kilometer);
    return Number.isNaN(km) ? null : km;
}

const formatPk = (km) => (km == null ? '?' : `PK ${km}`);

// ── 公開 API ──────────────────────────────────────────────────────────────────
export function renderLineBottomBar(lineCode, sections, summaryHtml) {
    const structure = document.querySelector('.bottom-structure');
    if (!structure) return;

    const propsList = sections
        .map(layer => layer.feature?.properties || null)
        .filter(p => p);

    const root = {
        id:      'line-general',
        label:   `Ligne ${lineCode}`,
        type:    'line-general',
        payload: { lineCode, summaryHtml },
        children: [],
    };

    function prefixNodeIds(nodes, prefix) {
        return nodes.map(node => ({
            ...node,
            id:       `${prefix}-${node.id}`,
            children: prefixNodeIds(node.children ?? [], prefix),
        }));
    }

    const tronconNodes = [];

    propsList.forEach((p, idx) => {
        const fullProps = lookupSOL(p);
        if (!fullProps) return;

        const line    = fullProps.SOLLineIdentification ?? lineCode;
        const startPk = getKmForLine(fullProps.SOLOPStart, line);
        const endPk   = getKmForLine(fullProps.SOLOPEnd,   line);
        const opStart = fullProps.SOLOPStart;
        const opEnd   = fullProps.SOLOPEnd;

        const labelText = `Tronçon ${line} : PK ${formatPk(startPk)} → PK ${formatPk(endPk)}`;
        const labelHtml = `
            <span class="tree-label-main">${labelText}</span>
            <button type="button"
                    class="tree-zoom-icon"
                    data-op-start="${opStart}"
                    data-op-end="${opEnd}"
                    title="Zoom sur ce tronçon">🔍</button>
        `;

        const solTree       = buildSolTreeData(fullProps);
        const solRoot       = solTree[0];
        const uniqueChildren = prefixNodeIds(solRoot?.children ?? [], `troncon-${idx}`);

        tronconNodes.push({
            id:      `line-troncon-${idx}`,
            label:   labelHtml,
            type:    'sol-general',
            badge:   solRoot?.badge ?? null,
            payload: { properties: fullProps, startPk, opStart, opEnd },
            children: uniqueChildren,
        });
    });

    tronconNodes.sort((a, b) => {
        const pkA = a.payload.startPk;
        const pkB = b.payload.startPk;
        if (pkA === null || pkA === undefined) return 1;
        if (pkB === null || pkB === undefined) return -1;
        return pkA - pkB;
    });

    root.children.push(...tronconNodes);

    currentTreeData     = [root];
    structure.innerHTML = renderTreeHtml(currentTreeData);

    setupTreeInteraction(structure);

    // ★ 既存ハンドラを除去して二重登録を防ぐ
    if (structure._zoomClickHandler) {
        structure.removeEventListener('click', structure._zoomClickHandler);
    }

    let isZooming = false; // 連打ガード

    const zoomHandler = (e) => {
        const btn = e.target.closest('.tree-zoom-icon');
        if (!btn) return;

        e.stopPropagation();
        if (isZooming) return;

        const opStart = btn.dataset.opStart;
        const opEnd   = btn.dataset.opEnd;
        if (!opStart || !opEnd) return;

        isZooming = true;
        showLoading('Zoom en cours...');

        setTimeout(() => {
            try {
                zoomSolByOpPair(opStart, opEnd);
            } finally {
                hideLoading();
                isZooming = false;
            }
        }, 0);
    };

    structure.addEventListener('click', zoomHandler);
    structure._zoomClickHandler = zoomHandler; // ★ 参照を保持

    autoExpandFirstAccordion(structure);
    setupParamColorToggleHandler();
}

export function renderSolBottomBar(fullProps) {
    const structure = document.querySelector('.bottom-structure');
    const details   = document.querySelector('.bottom-details');
    if (!structure || !details) return;

    currentTreeData     = buildSolTreeData(fullProps);
    structure.innerHTML = renderTreeHtml(currentTreeData);

    // ↓ 変更：複数 Track → タブ表示
    renderAllComparisonTabsForSOL(details, fullProps);

    structure.querySelector('.tree-node')?.classList.add('active');
    setupTreeInteraction(structure);
    autoExpandFirstAccordion(structure);
    setupParamColorToggleHandler();
    setupChildSectionNavHandler(); 
}

export function renderOpBottomBar(op) {
    const structure = document.querySelector('.bottom-structure');
    const details   = document.querySelector('.bottom-details');
    if (!structure || !details) return;

    currentTreeData     = buildOpTreeData(op);
    structure.innerHTML = renderTreeHtml(currentTreeData);

    // ↓ 変更：複数 Track → タブ表示
    renderAllComparisonTabsForOP(details, op);

    structure.querySelector('.tree-node')?.classList.add('active');
    setupTreeInteraction(structure);
    autoExpandFirstAccordion(structure);
    setupParamColorToggleHandler();
    setupChildSectionNavHandler(); 
}

/**
 * ボトムバーをクリア
 * @param {string} detailsMsg - 右カラムに表示するメッセージ（任意）
 */
export function clearBottomBar(detailsMsg = '') {
    const structure = document.querySelector('.bottom-structure');
    const details   = document.querySelector('.bottom-details');
    currentTreeData = null;
    if (structure) structure.innerHTML = '';
    if (details)   details.innerHTML   = detailsMsg
        ? `<p class="placeholder">${detailsMsg}</p>` : '';
}