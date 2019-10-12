import { isPlainObject } from './util';

export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}


export function transformResponse(data: any): any {
    if ('string' === typeof data) {
        try {
            data = JSON.parse(data);
        } catch (e) {
            // DO NOTHING
        }
    }
    return data;
}
