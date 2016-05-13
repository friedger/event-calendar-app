module.exports = function (req, res, next) {
    if (req.cookies['eventcal-admin']) {
        return res.redirect('/dashboard');
    }
    next();
}
