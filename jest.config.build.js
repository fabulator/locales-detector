module.exports = require('@socifi/jest-config')('build', {
    transformIgnorePatterns: [
        '<rootDir>/dist',
    ],
    testURL: 'http://localhost/',
});
