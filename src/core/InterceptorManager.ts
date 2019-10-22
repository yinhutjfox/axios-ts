import { ResolvedFn, RejectedFn } from '../types';

interface Interceptor<T> {
    resolved: ResolvedFn<T>;
    rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T> | null>;

    constructor() {
        this.interceptors = [];
    }

    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        });
        return this.interceptors.length - 1;
    }

    /**
     * 因为id和数组长度有关，所以这个id的处理不能用数组删除的方式，否则其他地方拿到的id就乱了。
     * @param id 拦截器id
     */
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }

    forEach(callback: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(interceptor => {
            if (null !== interceptor) {
                callback(interceptor);
            }
        });
    }
}
