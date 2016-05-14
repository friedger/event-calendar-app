const express = require('express');
const app = require('express')();
const path = require('path');
const cookieParser = require('cookie-parser');
const url = require('url');
const renderConfig = require('./renderConfig');

const redirectIfLoggedIn = require('./middleware/redirectIfLoggedIn');
const notLoggedInRedirect = require('./middleware/notLoggedInRedirect');
const combileWebpack = require('./middleware/combileWebpack');

const renderApp = require('./routes/renderApp');
const renderDashboard = require('./routes/renderDashboard');

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico', function (req, res, next) {
    res.send('');
});

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    combileWebpack(app);
}

app.use('/login', redirectIfLoggedIn, renderApp);
app.use('/register', renderApp);
app.use('/dashboard', notLoggedInRedirect, renderDashboard);
app.use('/link-calendar', notLoggedInRedirect, renderApp);
app.use('/firsttime-link-calendar', notLoggedInRedirect, renderApp);
app.use('/$', function (req, res, next) {
    if (req.cookies['eventcal-admin']) {
        return res.render('./staticSite/index.hbs', {
            loggedIn:true
        });
    }
    res.render('./staticSite/index.hbs');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);

        if (err.status === 404) {
            return res.render('index', renderConfig);
        }

        res.render('index', {
            message: err.message,
            error: err,
            isError: true
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    if (err.status === 404) {
        return res.render('index', renderConfig);
    }
    res.render('index', {
        message: err.message,
        error: {},
        isError: true
    });
});

module.exports = app;
