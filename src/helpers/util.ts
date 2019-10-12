const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]';
}

export function isObject(val: any): val is Object {
    return null !== val && 'object' === typeof val;
}
/**
 * 判断是个普通对象
 * @param val
 */
export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]';
}
