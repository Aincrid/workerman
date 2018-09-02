module.exports = {
    outputDir: process.env.outputDir,
    assetsDir: '../src/assets',
    baseUrl: '/',
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
    }
}