require('./globalStyles.scss');
require('./dashboard.scss');

import ReactDOM from 'react-dom';
import React from 'react'; //eslint-disable-line
import Routes from './routes.jsx';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import ga from 'react-ga';
require('es6-promise').polyfill();
require('es6-object-assign').polyfill();
import * as Sentry from '@sentry/browser';

if (window.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://85bd9ddf5ee24ecf8bf218a41b09a3bf@sentry.io/1299008'
    });
}

ga.initialize('UA-74477503-1');

const withTracker = (WrappedComponent) => {
    const trackPage = page => {
        ga.pageview(page);
        if (window.Intercom) {
            window.Intercom('update');
        }
    };

    const HOC = React.createClass({
        componentDidMount() {
            const page = this.props.location.pathname;
            trackPage(page);
        },

        componentWillReceiveProps(nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        },

        render() {
            return <WrappedComponent {...this.props} />;
        }
    });

    return HOC;
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={withTracker(Routes)} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
