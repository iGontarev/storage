// @flow

type StorageDataType = {
    value: any,
    expired: string
};

export function set(key: string, value: any, expiredDate: ?Date): void {
    localStorage.setItem(key, makeDataRaw(value, expiredDate));
}

export function get(key: string, defaultValue: any): any {
    const dataRaw = localStorage.getItem(key);

    if (dataRaw === null || dataRaw === undefined) {
        return defaultValue;
    }

    const data: StorageDataType = parseData(dataRaw);

    if (isExpired(data.expired)) {
        remove(key);
        return defaultValue;
    }

    return data.value;
}

export function remove(key: string): void {
    localStorage.removeItem(key);
}

function makeDataRaw(value: any, expiredDate: ?Date): string {
    const expired = expiredDate instanceof Date
        ? expiredDate.toString()
        : getDefaultExpired();

    return JSON.stringify({
        value,
        expired,
    })
}

function parseData(dataRaw: string): StorageDataType {
    const data: StorageDataType = JSON.parse(dataRaw);

    ['value', 'expired'].map((key) => {
        if (!data.hasOwnProperty(key)) {
            throw new Error(`storage doesn't have the ${key} property`);
        }
    });

    if (!Date.parse(data.expired)) {
        throw new Error('storage has invalid the expired property');
    }

    return data;
}

function getDefaultExpired(): string {
    const now = new Date;
    now.setDate(now.getDate() + 1);

    return now.toString();
}

function isExpired(dateString: string): boolean {
    const diffSeconds = (Date.parse(dateString) - Date.now()) / 1000;

    return Math.ceil(diffSeconds) <= 0;
}