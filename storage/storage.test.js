import test from 'tape';
import { get, set, remove } from './storage';

test('set and get object', (t) => {
    set('foo', { a: null });
    
    t.deepEqual(get('foo'), { a: null });
    
    remove('foo');
    
    t.equal(get('foo'), undefined);
    t.deepEqual(get('foo', { a: null }), { a: null });

    t.end();
});

test('expired after 3 seconds', (t) => {
    const expiredDate = new Date();
    expiredDate.setTime(expiredDate.getTime() + 3 * 1000);

    set('foo', 'bar', expiredDate);

    setTimeout(() => {
        t.equal(get('foo'), 'bar');
    }, 2000);

    setTimeout(() => {
        t.equal(get('foo'), undefined);
        t.end();
    }, 3000);
});
