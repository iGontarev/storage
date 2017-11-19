# Storage

Simple storage service based on `localStorage`

## Getting Started

```js
import * as Storage from 'storage';

Storage.set('foo', 'bar');
Storage.get('foo'); // 'bar'
Storage.remove('foo');
Storage.get('foo', 'default'); // 'default'

const expiredDate = new Date();
expiredDate.setTime(expiredDate.getTime() + 3 * 1000);

Storage.set('foo', 'bar', expiredDate);

setTimeout(() => {
    get('foo'); // 'bar'
}, 2000);

setTimeout(() => {
    get('foo'); // undefined
}, 3000);
```

## Running the tests

```
npm test
```
```
✓ set and get object
✓ expired after 3 seconds
# tests 5
# pass  5
✓ ok
```
