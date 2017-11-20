// @flow

import { localStorageProvider } from './providers';
import type { ProviderType } from './types';

export function getProvider(providerName: ?string): ProviderType {
    switch (providerName) {
        // case 'someProvider': return someProvider;
        default:
            return localStorageProvider;
    }
}
