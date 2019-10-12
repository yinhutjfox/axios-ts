import { isDate, isPlainObject } from './util'

function encode(val: string) {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']');
}

export function buildURL(url: string, params?: any): string {
    if (!params) {
        return url;
    }
    const parts: string[] = [];
    Object.keys(params).forEach(key => {
        const val = params[key];
        if (null === val || 'undefined' === val) {
            return;
        }
        let values = [];
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        } else {
            values = [val];
        }
        values.forEach(value => {
            if (isDate(value)) {
                value = value.toISOString();
            } else if (isPlainObject(value)) {
                value = JSON.stringify(value);
            }
            parts.push(`${encode(key)}=${encode(value)}`)
        });
    })
    let serializedParams = parts.join('&');
    if (serializedParams) {
        const markIndex = url.indexOf('#');
        if (-1 !== markIndex) {
            url = url.slice(0, markIndex);
        }
        url += (-1 === url.indexOf('?') ? '?' : '&') + serializedParams;
    }
    return url;
}
