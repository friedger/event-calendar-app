if (typeof window !== 'undefined') {
    require('./globalStyles.scss');
    require('./dashboard.scss');
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

    if (location.pathname === '/dashboard/transaction-complete') {
        window.google_trackConversion({
            google_conversion_id: 1023858504,
            google_conversion_label: "4MSoCIXN3GkQyK6b6AM",  // if provided, remove this line if not provided
            google_remarketing_only: false,
            google_conversion_language: "en",
            google_conversion_format: "3",
            google_conversion_color: "ffffff"
        });
        console.log('tracking conversion')
    }

    ga.pageview(window.location.pathname);
});

ReactDOM.render(<Provider store={store}><Router history={browserHistory}>{routes(store)}</Router></Provider>, document.getElementById('app'));
