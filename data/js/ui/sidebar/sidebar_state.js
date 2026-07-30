// ui/sidebar/sidebar_state.js
/**
 * サイドバーの展開状態とスクロール位置を管理するモジュール
 */

// 展開状態を保持するオブジェクト
const sidebarState = {
    openNodes: new Set(),           // 通常のノードの展開状態
    voieStates: new Map(),          // Voieごとの展開状態（Voie名をキーに）
    voieContentStates: new Map(),   // Voie内のコンテンツの展開状態（Voie名をキーに）
    scrollTop: 0,                   // スクロール位置
    currentMode: null,              // 'SOL' または 'OP'（どのモード用か）
};

/**
 * 現在のサイドバーモード（SOLまたはOP）を設定
 */
export function setSidebarMode(mode) {
    sidebarState.currentMode = mode;  // 'SOL' or 'OP'
}

/**
 * 現在のサイドバーモードを取得
 */
export function getSidebarMode() {
    return sidebarState.currentMode;
}

/**
 * 現在の展開状態とスクロール位置を保存
 */
export function saveSidebarState() {
    const detailsElements = document.querySelectorAll('#sidebar-content details[open]');
    const currentOpenNodes = new Set();
    const currentVoieStates = new Map();
    const currentVoieContentStates = new Map();

    detailsElements.forEach(el => {
        const nodeId = el.dataset.nodeId;
        const trackId = el.dataset.trackId;

        // 通常のノード
        if (nodeId) {
            currentOpenNodes.add(nodeId);
        }

        // Voie（トラック）ノード（SOLまたはOP track）
        if (trackId) {
            currentVoieStates.set(trackId, true);
        }

        // Voie内のコンテンツノード（STIブロックなど）
        if (nodeId && nodeId.startsWith('sti-')) {
            const voieElement = el.closest('.track-block');
            if (voieElement) {
                const voieId = voieElement.dataset.trackId;
                if (voieId) {
                    if (!currentVoieContentStates.has(voieId)) {
                        currentVoieContentStates.set(voieId, new Set());
                    }
                    currentVoieContentStates.get(voieId).add(nodeId);
                }
            }
        }

        // OP track 内のコンテンツ（op-platform など）
        if (nodeId && (nodeId.startsWith('op-platform-') || nodeId.startsWith('op-tunnel-'))) {
            const opTrackElement = el.closest('.track-block[data-track-id^="op-track-"]');
            if (opTrackElement) {
                const opTrackId = opTrackElement.dataset.trackId;
                if (opTrackId) {
                    if (!currentVoieContentStates.has(opTrackId)) {
                        currentVoieContentStates.set(opTrackId, new Set());
                    }
                    currentVoieContentStates.get(opTrackId).add(nodeId);
                }
            }
        }

        // OP siding（op-siding-*）
        if (nodeId && nodeId.startsWith('op-siding-')) {
            currentOpenNodes.add(nodeId);
        }
    });

    // スクロール位置を保存
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebarState.scrollTop = sidebar.scrollTop;
    }

    // 状態を更新
    sidebarState.openNodes = currentOpenNodes;
    sidebarState.voieStates = currentVoieStates;
    sidebarState.voieContentStates = currentVoieContentStates;
}

/**
 * 保存された展開状態とスクロール位置を復元
 * @param {Array} currentVoies - 現在のVoieリスト（OPの場合は省略可）
 */
export function restoreSidebarState(currentVoies) {
    const voies = Array.isArray(currentVoies) ? currentVoies : [];

    setTimeout(() => {
        // 1. 通常のノードの展開状態を復元
        sidebarState.openNodes.forEach(nodeId => {
            const element = document.querySelector(`details[data-node-id="${nodeId}"]`);
            if (element) {
                element.open = true;
            }
        });

        // 2. Voieの展開状態を復元（SOL トラックの場合）
        voies.forEach((voie, index) => {
            const voieId = voie.SOLTrackIdentification || voie.trackId || `track-${index}`;
            if (sidebarState.voieStates.has(voieId)) {
                const voieElement = document.querySelector(`details[data-track-id="${voieId}"]`);
                if (voieElement) {
                    voieElement.open = true;

                    // 3. Voie内のコンテンツの展開状態を復元
                    if (sidebarState.voieContentStates.has(voieId)) {
                        sidebarState.voieContentStates.get(voieId).forEach(contentNodeId => {
                            const contentElement = voieElement.querySelector(`details[data-node-id="${contentNodeId}"]`);
                            if (contentElement) {
                                contentElement.open = true;
                            }
                        });
                    }
                }
            }
        });

        // 4. OP track の展開状態を復元（OPサイドバーの場合）
        sidebarState.voieStates.forEach((_, opTrackId) => {
            const opTrackElement = document.querySelector(`details[data-track-id="${opTrackId}"]`);
            if (opTrackElement && opTrackId.startsWith('op-track-')) {
                opTrackElement.open = true;

                // OP track 内のコンテンツ（Platform / Tunnel）の展開状態を復元
                if (sidebarState.voieContentStates.has(opTrackId)) {
                    sidebarState.voieContentStates.get(opTrackId).forEach(contentNodeId => {
                        const contentElement = opTrackElement.querySelector(`details[data-node-id="${contentNodeId}"]`);
                        if (contentElement) {
                            contentElement.open = true;
                        }
                    });
                }
            }
        });

        // 5. スクロール位置を復元
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebarState.scrollTop > 0) {
            sidebar.scrollTop = sidebarState.scrollTop;
        }
    }, 100);
}

/**
 * イベントリスナーを設定
 */
export function setupSidebarEventListeners() {
    const sidebarContent = document.getElementById('sidebar-content');

    if (sidebarContent) {
        // 既存のリスナーを削除（重複防止）
        const oldListener = sidebarContent._toggleListener;
        if (oldListener) {
            sidebarContent.removeEventListener('toggle', oldListener, true);
        }

        // 新しいリスナーを設定
        const toggleListener = (event) => {
            if (event.target.tagName === 'DETAILS') {
                const nodeId = event.target.dataset.nodeId;
                const trackId = event.target.dataset.trackId;

                // 通常のノード
                if (nodeId) {
                    if (event.target.open) {
                        sidebarState.openNodes.add(nodeId);
                    } else {
                        sidebarState.openNodes.delete(nodeId);
                    }
                }

                // Voieノード
                if (trackId) {
                    if (event.target.open) {
                        sidebarState.voieStates.set(trackId, true);
                    } else {
                        sidebarState.voieStates.delete(trackId);
                    }
                }

                // Voie内のコンテンツノード（STI, Platform, Tunnel）
                if (nodeId && (nodeId.startsWith('sti-') || nodeId.startsWith('op-platform-') || nodeId.startsWith('op-tunnel-'))) {
                    // SOL の場合（trackBlock で closest）
                    let voieElement = event.target.closest('.track-block');
                    let voieId = voieElement?.dataset.trackId;

                    if (voieId) {
                        if (!sidebarState.voieContentStates.has(voieId)) {
                            sidebarState.voieContentStates.set(voieId, new Set());
                        }

                        if (event.target.open) {
                            sidebarState.voieContentStates.get(voieId).add(nodeId);
                        } else {
                            sidebarState.voieContentStates.get(voieId).delete(nodeId);
                        }
                    }
                }

                // OP siding ノード
                if (nodeId && nodeId.startsWith('op-siding-')) {
                    if (event.target.open) {
                        sidebarState.openNodes.add(nodeId);
                    } else {
                        sidebarState.openNodes.delete(nodeId);
                    }
                }
            }
        };

        sidebarContent.addEventListener('toggle', toggleListener, true);
        sidebarContent._toggleListener = toggleListener;
    }
}

/**
 * 状態をクリア
 */
export function clearSidebarState() {
    sidebarState.openNodes.clear();
    sidebarState.voieStates.clear();
    sidebarState.voieContentStates.clear();
    sidebarState.scrollTop = 0;
    sidebarState.currentMode = null;
}

/**
 * デバッグ用: 現在の状態を取得
 */
export function getSidebarState() {
    return {
        openNodes: Array.from(sidebarState.openNodes),
        voieStates: Array.from(sidebarState.voieStates.entries()),
        voieContentStates: Object.fromEntries(
            Array.from(sidebarState.voieContentStates.entries()).map(
                ([voieId, nodes]) => [voieId, Array.from(nodes)]
            )
        ),
        scrollTop: sidebarState.scrollTop,
        currentMode: sidebarState.currentMode
    };
}