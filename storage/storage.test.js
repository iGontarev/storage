import { LocalStorage } from 'node-localstorage';
import { expect } from 'chai';
import { get, set, remove } from './storage';

global.localStorage = new LocalStorage('./');

describe('Storage', () => {
    it(`set and get object`, () => {
        set('foo', { a: null });
        expect(get('foo')).to.deep.equal({ a: null });
        remove('foo');
        expect(get('foo')).to.equal(undefined);
        expect(get('foo', { a: null })).to.deep.equal({ a: null });
    });

    it(`expired after 3 seconds`, function(done) {
        this.timeout(10000);
        const expiredDate = new Date();
        expiredDate.setTime(expiredDate.getTime() + 3 * 1000);

        set('foo', 'bar', expiredDate);

        setTimeout(() => {
            expect(get('foo')).to.equal('bar');
        }, 2000);

        setTimeout(() => {
            expect(get('foo')).to.equal(undefined);
            done();
        }, 3000);
        
    });
});