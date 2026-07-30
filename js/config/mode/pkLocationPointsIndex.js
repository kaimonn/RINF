// config/mode/pkLocationPointsIndex.js

let allFeatures = null;           // GeoJSON 内の全ポイント
let allLoadingPromise = null;     // 一度だけ fetch するための Promise
const pkIndexMap = new Map();     // parameter_id → Map<tronçonKey, Feature[]>

function makeCompositeKey(solLineId, solOPStart, solOPEnd) {
    return `${solLineId}|${solOPStart}|${solOPEnd}`;
}

// GeoJSON 全体のロード（1回だけ）
async function ensureAllLoaded() {
    if (allFeatures) return allFeatures;
    if (allLoadingPromise) return allLoadingPromise;

    allLoadingPromise = (async () => {
        const resp = await fetch('data/RINF_PK_Location_PointsV10.geojson');
        if (!resp.ok) {
            console.error('[structureCheckPointsIndex] load failed:', resp.status, resp.statusText);
            allFeatures = [];
            return allFeatures;
        }

        const geojson = await resp.json();
        allFeatures = Array.isArray(geojson.features) ? geojson.features : [];
        console.log('[structureCheckPointsIndex] loaded features:', allFeatures.length);
        return allFeatures;
    })();

    return allLoadingPromise;
}

// parameter_id ごとのインデックスを作成（必要になったときだけ）
async function getIndexForParameter(parameterId) {
    if (pkIndexMap.has(parameterId)) {
        return pkIndexMap.get(parameterId);
    }

    const features = await ensureAllLoaded();
    const index = new Map();

    for (const f of features) {
        const p = f.properties || {};
        if ((p.parameter_id || '').trim() !== parameterId) continue;

        const lineId  = p.SOLLineIdentification;
        const opStart = p.SOLOPStart;
        const opEnd   = p.SOLOPEnd;
        if (!lineId || !opStart || !opEnd) continue;

        const key = makeCompositeKey(lineId, opStart, opEnd);
        if (!index.has(key)) index.set(key, []);
        index.get(key).push(f);
    }

    console.log(`[structureCheckPointsIndex] ${parameterId}: indexed tronçons:`, index.size);
    pkIndexMap.set(parameterId, index);
    return index;
}

/**
 * トロンソン上のポイント一覧を返す（parameterId で種類を切り替え）
 * 戻り値: Promise<Array<Feature>>
 */
export async function getPointsForTroncon(
    properties,
    parameterId = 'IPP_StructureCheckLoc'   // デフォルトは既存モード
) {
    if (!properties) return [];

    const solLineId  = properties.SOLLineIdentification;
    const solOPStart = properties.SOLOPStart;
    const solOPEnd   = properties.SOLOPEnd;
    if (!solLineId || !solOPStart || !solOPEnd) return [];

    const index = await getIndexForParameter(parameterId);
    const key = makeCompositeKey(solLineId, solOPStart, solOPEnd);
    const list = index.get(key) || [];

    // pk_value_km があれば昇順ソート
    return [...list].sort((a, b) => {
        const ak = a.properties?.pk_value_km;
        const bk = b.properties?.pk_value_km;
        if (ak == null) return 1;
        if (bk == null) return -1;
        return ak - bk;
    });
}