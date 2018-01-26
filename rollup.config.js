import babel from 'rollup-plugin-babel';
import packpage from './package.json';

export default {
    input: './src/index.js',
    output: [ {
        file: 'dist/locales-detector.es.js',
        format: 'es',
    }, {
        file: 'dist/locales-detector.js',
        format: 'umd',
        name: 'LocalesDetector',
    } ],
    treeshake: {
        propertyReadSideEffects: false,
    },
    plugins: [
        babel({
            presets: [
                [
                    'env',
                    {
                        modules: false,
                        targets: {
                            browsers: packpage.browserslist,
                        },
                    },
                ],
                'flow',
            ],
            plugins: [
                'external-helpers',
                'transform-object-rest-spread',
            ],
        }),
    ],
};
