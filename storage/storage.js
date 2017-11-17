import { getProvider } from './providerFactory';

const provider = getProvider();

export function get(key, defaultValue) {
    return provider.get(key, defaultValue);
}

export function set(key, value, expiredDate) {
    provider.set(key, value, expiredDate);
}

export function remove(key) {
    provider.remove(key);
}
