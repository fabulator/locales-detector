module.exports = {
    extends: [
        'socifi',
    ],
    rules: {
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'class-methods-use-this': 0,
    },
    root: true,
};
