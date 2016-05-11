if (typeof window !== 'undefined') {
    require('./globalStyles.scss');
}

import ReactDOM from 'react-dom';
import React from 'react'; //eslint-disable-line
import routes from './routes.jsx';
import {Router} from 'react-router';
import store from './store';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import ga from 'react-ga';

ga.initialize('UA-74477503-1');

browserHistory.listen(function (location) {
    ga.pageview(window.location.pathname);
});

ReactDOM.render(<Provider store={store}><Router history={browserHistory}>{routes}</Router></Provider>, document.getElementById('app'));
