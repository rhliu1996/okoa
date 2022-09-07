const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default
module.exports = {
    parallel: false,
    configureWebpack: {
        plugins: [
            ScriptSetup({ reactivityTransform: true }),
        ],
    },
    chainWebpack(config) {
        // disable type check and let `vue-tsc` handles it
        config.plugins.delete('fork-ts-checker')
    },
}