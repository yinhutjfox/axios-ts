import { AxiosRequestConfig } from '../types';

const strats = Object.create(null);

function defaultStrat(val1: any, val2: any): any {
    return 'undefined' !== typeof val2 ? val2 : val1;
}

function fromVal2Strat(val1: any, val2: any): any {
    return val2;
}

function deepMergeStrat(val1: any, val2: any): any {

}

const stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysFromVal2.forEach(key => {
    strats[key] = fromVal2Strat;
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    const config = Object.create(null);
    if (!config2) {
        config2 = {}
    }

    for (let key in config2) {
        mergeField(key);
    }

    for (let key in config1) {
        if (!config2[key]) {
            mergeField(key);
        }
    }

    function mergeField(key: string): void {
        const strat = strats[key] || defaultStrat;
        config[key] = strat(config1[key], config2![key]);
    }

    return config;
}
