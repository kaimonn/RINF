// data/data_loader.js
// 渡されたパスの拡張子が .nt なら NT バックエンド、それ以外は XML バックエンドへ委譲。

import * as XML from './xml_loader.js';
import * as NT  from './nt_loader.js';

let _backend = null; // 'xml' | 'nt'

/**
 * RINF データを読み込みインデックスを構築する。
 * 拡張子 .nt → NT バックエンド、それ以外 → XML バックエンド。
 */
export async function initRINFLoader(dataPath) {
    const ext = dataPath.split('?')[0].split('.').pop().toLowerCase();
    _backend  = (ext === 'nt') ? 'nt' : 'xml';
    console.log(`[data_loader] backend="${_backend}"  path="${dataPath}"`);
    return (_backend === 'nt')
        ? NT.initNTLoader(dataPath)
        : XML.initXMLLoader(dataPath);
}

export function lookupSOL(geoProps) {
    return _backend === 'nt'  ? NT.lookupSOL(geoProps)
         : _backend === 'xml' ? XML.lookupSOL(geoProps)
         : (console.warn('[data_loader] lookupSOL: not initialised'), null);
}

export function lookupOP(uniqueOPID) {
    return _backend === 'nt'  ? NT.lookupOP(uniqueOPID)
         : _backend === 'xml' ? XML.lookupOP(uniqueOPID)
         : (console.warn('[data_loader] lookupOP: not initialised'), null);
}

export function lookupTunnel(imCode, identification) {
    return _backend === 'nt'  ? NT.lookupTunnel(imCode, identification)
         : _backend === 'xml' ? XML.lookupTunnel(imCode, identification)
         : (console.warn('[data_loader] lookupTunnel: not initialised'), null);
}

/** デバッグ用：現在のバックエンド名を返す ('xml' | 'nt' | null) */
export function getBackend() { return _backend; }
