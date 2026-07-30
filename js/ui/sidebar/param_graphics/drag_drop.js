// ui/sidebar/param_graphics/drag_drop.js

export function setupDragAndDrop(container, modeId, setOrderOverrideFn, refreshStylesFn, scope, setupPanelFn) {
    let draggedElement = null;

    container.querySelectorAll('.mode-style-row[data-category]').forEach(row => {
        const dragHandle = row.querySelector('.drag-handle');
        if (!dragHandle) return;

        dragHandle.addEventListener('mousedown', (e) => {
            draggedElement = row;
            row.setAttribute('draggable', 'true');
            e.stopPropagation();
        });

        row.addEventListener('dragstart', (e) => {
            if (!draggedElement) return;
            e.dataTransfer.effectAllowed = 'move'; // ★ effectAllowed を明示
            e.dataTransfer.setData('text/plain', row.getAttribute('data-category'));
            row.classList.add('dragging');
        });

        row.addEventListener('dragend', () => {
            row.classList.remove('dragging');
            row.setAttribute('draggable', 'false');
            draggedElement = null;
        });
    });

    // ★ container ではなく document に登録
    const onDragOver = (e) => {
        if (!draggedElement) return;
        const targetRow = e.target.closest('.mode-style-row[data-category]');
        if (!targetRow) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move'; // ★ dropEffect を明示
        if (targetRow === draggedElement) return;
        const rect = targetRow.getBoundingClientRect();
        const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
        container.insertBefore(draggedElement, next ? targetRow.nextSibling : targetRow);
    };

    const onDrop = (e) => {
        if (!draggedElement) return;
        const targetRow = e.target.closest('.mode-style-row[data-category]');
        if (!targetRow) return;
        e.preventDefault();
        console.log('[DnD] drop fired');
        const newOrder = Array.from(container.querySelectorAll('.mode-style-row[data-category]'))
            .map(row => String(row.getAttribute('data-category')));
        setOrderOverrideFn(modeId, newOrder);
        refreshStylesFn();
        setupPanelFn?.(scope);
    };

    document.addEventListener('dragover', onDragOver);
    document.addEventListener('drop', onDrop);

    // ★ クリーンアップ用にコンテナに関数を保持
    container._dndCleanup = () => {
        document.removeEventListener('dragover', onDragOver);
        document.removeEventListener('drop', onDrop);
    };
}