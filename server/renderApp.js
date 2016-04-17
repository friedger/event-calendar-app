module.exports = (req, res, next) => {

    if (req.cookies['eventcal-admin'] && req.url === '/login') {
        return res.redirect('/dashboard');
    }

    res.render('index.hbs', {
        NODE_ENV: process.env.NODE_ENV,
        isDev: process.env.NODE_ENV === 'development',
        isProd: process.env.NODE_ENV === 'production'
    });
}
