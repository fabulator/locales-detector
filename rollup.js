const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const babelOptions = {
    presets: [
        [
            'es2015',
            {
                modules: false
            }
        ]
    ],
    plugins: [
        'external-helpers',
        'transform-flow-strip-types',
        'transform-object-rest-spread',
    ]
};

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        babel(babelOptions),
    ],
}).then((bundle) => {
    bundle.write({
        format: 'umd',
        dest: './dist/locales-detector.js',
        moduleName: 'LocalesDetector',
    });

    bundle.write({
        format: 'es',
        dest: './dist/locales-detector.es.js',
        moduleName: 'LocalesDetector',
    });
});

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        babel(babelOptions),
        uglify(),
    ],
}).then((bundle) => {
    bundle.write({
        format: 'umd',
        dest: './dist/locales-detector.min.js',
        moduleName: 'LocalesDetector',
    });
});
