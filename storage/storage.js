// @flow

import { getProvider } from './providerFactory';

const provider = getProvider();

export function get(key: string, defaultValue: ?any): any {
    return provider.get(key, defaultValue);
}

export function set(key: string, value: any, expiredDate: ?Date): void {
    provider.set(key, value, expiredDate);
}

export function remove(key: string): void {
    provider.remove(key);
}
