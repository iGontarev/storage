import { localStorageProvider } from './providers';

export function getProvider(providerName) {
    switch (providerName) {
        // case 'someProvider': return someProvider;
        default:
            return localStorageProvider;
    }
}
