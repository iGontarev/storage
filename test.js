const browserify = require('browserify');
const babelify = require("babelify");
const faucet = require('faucet');
const tapeRun = require('tape-run');
const glob = require('glob');

glob('storage/**/*.test.js', {}, (err, files) => {
    if (err) {
        throw err;
    }

    browserify({ entries: files })
        .transform(babelify)
        .bundle()
        .pipe(tapeRun())
        .pipe(faucet())
        .pipe(process.stdout);
});
