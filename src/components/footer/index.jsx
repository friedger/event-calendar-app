if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import * as appActions from '../../actions/index';
const Link = require('react-router').Link;

module.exports = React.createClass({
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="col-md-12">
                        <div><Link to="/terms-of-use">Terms of Use</Link> | <Link to="/privacy-policy">Privacy Policy</Link></div>
                        <div>© 2017 - EVENTCALENDARAPP</div>
                    </div>
                </div>
            </div>
        )
    }
});
