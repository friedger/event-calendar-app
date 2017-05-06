module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    dev: process.env.NODE_ENV === 'development',
    secureDev: process.env.NODE_ENV === 'secureDev',
    isProd: process.env.NODE_ENV === 'production',
    loadApp: true
}
