module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/bad-feeling/'
        : '/',
    outputDir: "docs"
}