module.exports = (config) => {
    config.set({
        preprocessors: {
            'test/**/*.js': ['babel', 'commonjs'],
            'node_modules/**/index.js': ['commonjs'],
            'src/**/*.js': ['babel', 'commonjs'],
        },
        coverageReporter: {
            type: 'html',
            reporters: [
                { type: 'cobertura', dir: './tests/coverage/cobertura', subdir: '.' },
                { type: 'html', dir: './tests/coverage/html', subdir: '.' },
                { type: 'lcov', dir: './tests/coverage/lcov', subdir: '.' },
                { type: 'json', dir: './tests/coverage/json', subdir: '.' },
                { type: 'text' },
            ],
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                plugins: [
                    'istanbul',
                    'transform-es2015-modules-commonjs',
                    'transform-flow-strip-types',
                    'transform-object-rest-spread',
                ],
            },
        },
        plugins: [
            'karma-coverage',
            'karma-junit-reporter',
            'karma-babel-preprocessor',
            'karma-commonjs',
            'karma-jasmine',
            'karma-phantomjs-launcher',
        ],
        basePath: '',
        frameworks: ['jasmine', 'commonjs'],
        files: [
            'node_modules/query-string/index.js',
            'node_modules/strict-uri-encode/index.js',
            'node_modules/object-assign/index.js',
            'node_modules/decode-uri-component/index.js',
            { pattern: 'src/**/*.js' },
            { pattern: 'test/**/*.js' },
        ],
        exclude: [
            'src/app.js',
        ],
        reporters: [
            'progress',
            'junit',
            'coverage',
        ],
        junitReporter: {
            outputDir: './tests/unit',
            outputFile: 'test.xml',
            useBrowserName: false,
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity,
    });
};
