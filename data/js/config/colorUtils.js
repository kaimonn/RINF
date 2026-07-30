// config/colorUtils.js

// パラメータID → コード → 色 の共有キャッシュ
const sharedColorCache = new Map();

/**
 * パラメータIDとコードから共有色を取得・生成
 * @param {string} paramId - パラメータID（例: 'ILL_Gauging'）
 * @param {string} code - 属性値（例: 'GB1'）
 * @param {function} colorGenerator - 色生成関数（例: colorFromCode）
 * @returns {string} 色コード
 */
export function getSharedColor(paramId, code, colorGenerator) {
    if (!paramId || !code) return '#cccccc'; // デフォルト色

    // パラメータID用のキャッシュがなければ作成
    if (!sharedColorCache.has(paramId)) {
        sharedColorCache.set(paramId, new Map());
    }
    const paramCache = sharedColorCache.get(paramId);

    // コードの色がキャッシュされていなければ生成
    if (!paramCache.has(code)) {
        paramCache.set(code, colorGenerator(code));
    }

    return paramCache.get(code);
}