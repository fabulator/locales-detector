const config = require('@socifi/babel-config')(false);

module.exports = {
    presets: config.presets,
    plugins: config.plugins.filter(plugin => plugin !== '@babel/plugin-transform-runtime'),
};
