import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout } = config;
        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType;
        }

        if (timeout) {
            // 不传默认为零，就是永不超时
            request.timeout = timeout;
        }

        request.open(method.toUpperCase(), url!, true);

        request.onreadystatechange = function handleLoad() {
            if (4 !== request.readyState) {
                return;
            }

            if (0 === request.status) {
                // 网络错误和超时错误是0，下面已经有处理了，这里就不管了
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
            handleResponse(response);
        }

        request.onerror = function handleError() {
            // 网络错误(比如网络不通)
            reject(createError('Network Error', config, null, request));
        }

        request.ontimeout = function handleTimeout() {
            reject(createError(`Timeout of ${request.timeout} ms exceeded!`, config, 'ECONNABORTED', request));
        }

        Object.keys(headers).forEach(name => {
            if (null === data && 'content-type' === name.toLowerCase()) {
                delete headers[name];
            } else {
                request.setRequestHeader(name, headers[name]);
            }
        });

        request.send(data);

        function handleResponse(response: AxiosResponse): void {
            if (200 <= response.status && 300 > response.status) {
                resolve(response);
            } else {
                reject(createError(`Request failed with status code ${response.status}`, config, null, request, response));
            }
        }
    })

}
