import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types';
import { parseHeaders } from './helpers/headers';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType } = config;
        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType;
        }

        request.open(method.toUpperCase(), url, true);

        request.onreadystatechange = function handleLoad() {
            if (4 !== request.readyState) {
                return;
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders());
            const responseData = 'text' !== responseType ? request.response : request.responseText;
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request,
            }
            resolve(response);
        }

        Object.keys(headers).forEach(name => {
            if (null === data && 'content-type' === name.toLowerCase()) {
                delete headers[name];
            } else {
                request.setRequestHeader(name, headers[name]);
            }
        });

        request.send(data);
    })

}
