export function set(key, value, expiredDate) {
    localStorage.setItem(key, makeDataRaw(value, expiredDate));
}

export function get(key, defaultValue) {
    const dataRaw = localStorage.getItem(key);

    if (dataRaw === null) {
        return defaultValue;
    }

    const data = parseData(dataRaw);

    if (isExpired(data.expired)) {
        remove(key);
        return defaultValue;
    }

    return data.value;
}

export function remove(key) {
    localStorage.removeItem(key);
}

function makeDataRaw(value, expiredDate) {
    const expired = expiredDate === undefined
        ? getDefaultExpired()
        : expiredDate.toString();

    return JSON.stringify({
        value,
        expired,
    })
}

function parseData(dataRaw) {
    const data = JSON.parse(dataRaw);

    ['value', 'expired'].map((key) => {
        if (!data.hasOwnProperty(key)) {
            throw new Error(`storage doesn't have the ${key} property`);
        }
    });

    if (!Date.parse(data.expired)) {
        throw new Error(`storage has invalid the expired property`);
    }

    return data;
}

function getDefaultExpired() {
    const now = new Date;
    now.setDate(now.getDate() + 1);

    return now.toString();
}

function isExpired(dateString) {
    const diffSeconds = (Date.parse(dateString) - Date.now()) / 1000;

    return Math.ceil(diffSeconds) <= 0;
}