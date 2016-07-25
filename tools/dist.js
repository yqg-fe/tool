/**
 * @author zhangpeng
 * @date 16/7/25-下午3:57
 * @file dist
 */

// system modules
import fs from 'fs';

// node modules
import del from 'del';
import babel from 'rollup-plugin-babel';
const rollup = require('rollup');

// our modules
import pkg from '../package.json';

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel
for (const format of ['es', 'cjs', 'umd']) {
    promise = promise.then(() => rollup.rollup({
        entry: 'src/main.js',
        external: Object.keys(pkg.dependencies),
        plugins: [babel(Object.assign({}, pkg.babel, {
            babelrc: false,
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            presets: pkg.babel.presets.map(x => (x === 'es2015' ? 'es2015-rollup' : x))
        }))]
    }).then(bundle => bundle.write({
        dest: `dist/${format === 'cjs' ? 'index' : `index.${format}`}.js`,
        format,
        sourceMap: true,
        moduleName: format === 'umd' ? pkg.name : void 0
    })));
}

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
    delete pkg.babel;
    delete pkg.devDependencies;
    delete pkg.scripts;
    pkg.main = 'index.js';
    fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
    fs.writeFileSync('dist/LICENSE', fs.readFileSync('LICENSE', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
