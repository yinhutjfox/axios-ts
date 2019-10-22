import { AxiosInstance } from './types';
import Axios from './core/Axios';
import { extend } from './helpers/util';

function createInstance(): AxiosInstance {
    const context = new Axios();
    console.log(context)
    const instance = Axios.prototype.request.bind(context);
    extend(instance, context);
    return instance as AxiosInstance;
}

const axios = createInstance();

class Test {
    a() {
        console.log(this);
    }

    b() {
        console.log('123');
    }
}

let test = new Test();
for (const key in test) {
    console.log(key);
}

export default axios;
