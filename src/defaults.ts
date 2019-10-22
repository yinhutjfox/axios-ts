import { AxiosRequestConfig } from './types';
import { processHeaders } from './helpers/headers';
import { transformRequest, transformResponse } from './helpers/data';

const defaults: AxiosRequestConfig = {
    method: 'GET',

    timeout: 0,

    headers: {
        common: {
            Accept: 'application/json, text/plain, */*',
        }
    },

    transforRequest: [
        function (data: any, headers?: any) {
            processHeaders(data, headers);
            return transformRequest(data);
        }
    ],

    transformResponse: [
        function (data: any): any {
            return transformResponse(data);
        }
    ]
}

const methodNoData = ['delete', 'get', 'head', 'options'];

methodNoData.forEach(method => {
    defaults.headers[method] = {}
});

const methodWithData = ['post', 'put', 'patch'];

methodWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export default defaults;
