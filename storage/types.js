// @flow

export type ProviderType = {
    get(key: string, defaultValue: any): any,
    set(key: string, value: any, expiredDate: ?Date): void,
    remove(key: string): void
};
