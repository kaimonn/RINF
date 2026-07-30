// ui/sidebar/sidebar_utils.js

import {rinfParams} from '/../../../data/rinf_parameters_final.js';

// ★★★ 日付解析とフォーマット関数 ★★★
export function parseAndFormatDate(dateString) {
    if (!dateString || dateString === '-' || dateString === '') return '-';

    let date;

    // ISO 8601 形式を試す: YYYY-MM-DD または YYYY-MM-DDTHH:mm:ss
    if (dateString.includes('-')) {
        date = new Date(dateString);
    }
    // DD/MM/YYYY 形式を試す
    else if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            date = new Date(year, month - 1, day);
        }
    }

    // 日付が有効かチェック
    if (date && !isNaN(date.getTime())) {
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // フォーマットできない場合はそのまま返す
    console.warn('Unable to parse date:', dateString);
    return dateString;
}


// パラメータラベルを取得する関数（rinf_parameters_final.json を使用）
export function getParamLabel(paramId, mode = 'SOL') {
    const rinfEntry = rinfParams[paramId];

    if (!rinfEntry) {
        // RINF に無い場合は fallback
        return { label: paramId, reference: null, url: null };
    }

    const label = rinfEntry.title || paramId;

    let reference = null;
    if (Array.isArray(rinfEntry.numbers) && rinfEntry.numbers.length > 0) {
        // SOL: 1.1.* を優先 / OP: 1.2.* を優先
        const prefix = mode === 'OP' ? '1.2.' : '1.1.';
        const filtered = rinfEntry.numbers.filter(num => num.startsWith(prefix));

        if (filtered.length > 0) {
            reference = filtered[0];
        } else {
            // 対応する prefix が無い場合はとりあえず先頭を使う（完全に無表示にしないため）
            reference = rinfEntry.numbers[0];
        }
    }

    const url = rinfEntry.url || null;

    return { label, reference, url };
}



/**
 * rinf_parameters_final.js のメタデータを使って
 * コード値 → ラベル に変換する共通ヘルパー
 */
function mapSingleValueWithRinf(paramId, raw) {
    if (raw === null || raw === undefined) return '';
    const entry = rinfParams[paramId];
    if (!entry) return String(raw);

    const { data_presentation, values } = entry;
    const code = String(raw).trim();

    // 1. Enumeration 型の場合 → values からラベルを探す
    if (data_presentation === 'Enumeration' || data_presentation === 'Concept') {
        if (Array.isArray(values)) {
            const found = values.find(v => v.code === code || v.value === code);
            if (found) return found.value || found.title || code;
        }
    }

    // 2. Boolean 型の場合 → 'true'/'false' を 'Oui'/'Non' に変換
    if (data_presentation === 'Boolean') {
        if (code === 'true' || code === '1') return 'Oui';
        if (code === 'false' || code === '0') return 'Non';
    }

    // 3. Double / Integer 型の場合 → 数値としてフォーマット
    if (data_presentation === 'Double' || data_presentation === 'Integer') {
        const num = Number(code);
        if (!Number.isNaN(num)) {
            if (data_presentation === 'Double') return num.toFixed(3);
            return String(Math.round(num));
        }
    }

    // 4. その他の型 → そのまま表示
    return code;
}

/**
 * 任意の Value（配列/オブジェクト/スカラー）を、
 * rinf メタデータに基づいて表示文字列に変換する
 */
export function formatParamValues(paramId, rawValue) {
    if (rawValue === null || rawValue === undefined) return '';

    // 既に param オブジェクトを渡してしまった場合に備えて Value を掘る
    if (typeof rawValue === 'object' && !Array.isArray(rawValue) && 'Value' in rawValue) {
        return formatParamValues(paramId, rawValue.Value);
    }

    // 配列値（列挙の複数選択など）
    if (Array.isArray(rawValue)) {
        const parts = rawValue
            .map(v => mapSingleValueWithRinf(paramId, v))
            .filter(s => s !== '');
        return parts.join(', ');
    }

    // その他のオブジェクトはざっくり連結
    if (typeof rawValue === 'object') {
        const parts = Object.values(rawValue)
            .map(v => (v === null || v === undefined) ? '' : String(v))
            .filter(s => s !== '');
        return parts.join(' / ');
    }

    // スカラー値（コード値など）
    return mapSingleValueWithRinf(paramId, rawValue);
}