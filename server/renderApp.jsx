import ReactDOM from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../src/routes';
import React from 'react';
import { Provider } from 'react-redux'
import store from '../src/store';

module.exports = (req, res, next) => {

    if (req.cookies['eventcal-admin'] && req.url === '/login') {
        return res.redirect('/dashboard');
    }

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {

        res.render('index.hbs', {NODE_ENV: process.env.NODE_ENV, isDev: process.env.NODE_ENV === 'development'});
    });

}
