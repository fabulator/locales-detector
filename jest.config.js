module.exports = require('@socifi/jest-config')(undefined, {
    transformIgnorePatterns: [
        '<rootDir>/dist',
    ],
    testURL: 'http://localhost/',
});
