// config/mode/pkLocationPointsOnClick.js

/* global L */

import { getPointsForTroncon } from './pkLocationPointsIndex.js';

let activeLayer = null;

// 同一座標の重なりを少しずつずらす
function offsetDuplicates(features) {
    const map = new Map();

    features.forEach(f => {
        const [lng, lat] = f.geometry.coordinates;
        const key = `${lat.toFixed(6)},${lng.toFixed(6)}`;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(f);
    });

    map.forEach(group => {
        if (group.length <= 1) return;

        const radius = 0.00008;  // 約10m弱
        const step = (2 * Math.PI) / group.length;

        group.forEach((f, idx) => {
            const [lng, lat] = f.geometry.coordinates;
            const angle = step * idx;
            f.geometry.coordinates = [
                lng + radius * Math.cos(angle),
                lat + radius * Math.sin(angle),
            ];
        });
    });

    return features;
}

export function clearStructureLabels(map) {
    if (!map || !activeLayer) return;
    if (map.hasLayer(activeLayer)) {
        map.removeLayer(activeLayer);
    }
    activeLayer = null;
}

// geometry から始点・終点を取り出す（LineString / MultiLineString 両対応）
function flattenLineCoords(geometry) {
    if (!geometry) return null;
    if (geometry.type === 'LineString') {
        return geometry.coordinates;
    }
    if (geometry.type === 'MultiLineString') {
        const all = geometry.coordinates.flat();
        return [all[0], all[all.length - 1]];
    }
    return null;
}

// 端点クランプ：始点・終点のうち近い方を返す
function clampToEndpoints(pointCoords, lineCoords) {
    const start = lineCoords[0];
    const end   = lineCoords[lineCoords.length - 1];

    const distToStart = Math.hypot(pointCoords[0] - start[0], pointCoords[1] - start[1]);
    const distToEnd   = Math.hypot(pointCoords[0] - end[0],   pointCoords[1] - end[1]);

    return distToStart <= distToEnd ? [...start] : [...end];
}

/**
 * トロンソン上のポイントを表示
 * @param {string} parameterId - 'IPP_StructureCheckLoc' / 'ILL_GradProfile' など
 */
export async function showStructureLabelsForTroncon(
    map,
    properties,
    geometry = null,
    parameterId = 'IPP_StructureCheckLoc'   // デフォルトは既存通り
) {
    if (!map) return;
    clearStructureLabels(map);

    const lineCoords = flattenLineCoords(geometry);

    const points = await getPointsForTroncon(properties, parameterId);
    if (!points.length) return;

    const adjusted = points.map(f => {
        const p = f.properties || {};
        if (p.is_clamped && lineCoords && lineCoords.length >= 2) {
            const clamped = clampToEndpoints(f.geometry.coordinates, lineCoords);
            return {
                ...f,
                geometry: { ...f.geometry, coordinates: clamped },
            };
        }
        return f;
    });

    const features = offsetDuplicates(adjusted);

    const markers = features.map(f => {
        const p = f.properties || {};
        const [lng, lat] = f.geometry.coordinates;

        const marker = L.circleMarker([lat, lng], {
            radius: 5,
            // クランプされた点は色を変えて区別
            fillColor: p.is_clamped ? '#0078ff' : '#ff7800',
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.9,
        });

        const label = `${p.SOLTrackIdentification || ''} ${p.pk_value_original || ''}`.trim();
        marker.bindTooltip(label, {
            permanent: true,
            direction: 'top',
            offset: [0, -8],
            className: 'structure-point-label',
        });

        return marker;
    });

    activeLayer = L.layerGroup(markers).addTo(map);
}