// main.js
import { initMap } from './map/initMap.js'; 
import { loadGeojson, getAllFeatures, configureSolLayerUrls } from './map/layer_SOL.js';
import { loadOPLayer, configureOpLayerUrl } from './map/layer_OP.js';
import { addLegend } from './map/legend.js';
import { initSearch } from './ui/search/search_Ligne.js';          
import { initSolKmSearch } from './ui/search/search_SOL.js';        
import { initUniqueOPIDSearch, refreshOpSearchIndex } from './ui/search/search_OP.js'; 
import { initSearchSwitcher } from './ui/search/search_switcher.js'; 
import { setupSidebarResizer } from './ui/sidebar/sidebar_resizer.js';
import { setupBottomResizer } from './ui/bottomBar/bottom_resizer.js';
import { setupBottomSplit } from './ui/bottomBar/bottom_split.js';
import { initRINFLoader } from '../data/data_loader.js';
import { showLoading, hideLoading, updateLoadingMessage } from './ui/loadingOverlay.js';
// ★ 追加
import { initComparisonToggle } from './ui/comparison/comparison_toggle.js';
import { renderCrossSOLComparison, renderCrossOPComparison } from './ui/comparison/comparison_panel.js';

// ★ DOMContentLoaded は1つだけ
document.addEventListener('DOMContentLoaded', async () => {  
    setupSidebarResizer();
    setupBottomResizer();
    setupBottomSplit();
    const map = initMap();

    configureSolLayerUrls({
        solUrl:    'data/RINF_SOL_Geometrie_RFN.geojson',
        tunnelUrl: 'data/RINF_Tunnel.geojson',
    });
    configureOpLayerUrl('data/RINF_OP.geojson');

    showLoading('Chargement des données RINF...');

    try {
        //await initRINFLoader('data/RINF_Sp92v2.xml');    
        await initRINFLoader('https://pub-a50a894fa5b3496ca51afa88da6aaa12.r2.dev/rinf-20260707-141059_RDF.nt');    
        console.log('XML RINF chargé et indexé.');

        updateLoadingMessage('Chargement des sections SOL...');
        await loadGeojson();

        updateLoadingMessage('Chargement des points opérationnels OP...');
        await loadOPLayer();
        refreshOpSearchIndex();
        console.log('GeoJSON chargé.');
        console.log('allFeatures count:', getAllFeatures().length);
        console.log('first feature:', getAllFeatures()[0]?.properties);

        updateLoadingMessage("Initialisation de l'interface...");
        addLegend();
        initSearch();
        initSolKmSearch(); 
        initUniqueOPIDSearch();
        initSearchSwitcher();

        initComparisonToggle({
            mountTarget: document.querySelector('#bottom-toolbar'),
            onCompare: (buffer) => {
                const details = document.querySelector('.bottom-details');
                if (!details || !buffer.length) return;
                const type = buffer[0]?.type;
                if (type === 'SOL') {
                    renderCrossSOLComparison(details, buffer.map(b => b.data));
                } else if (type === 'OP') {
                    renderCrossOPComparison(details, buffer.map(b => b.data));
                }
            },
        });
    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        alert('Échec du chargement des données (GeoJSON ou RINF).');
    } finally {
        hideLoading();
    }
});
