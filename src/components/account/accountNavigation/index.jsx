require('./style.scss');

import React from 'react';
import { browserHistory } from 'react-router';

export default React.createClass({
    render() {
        return (
            <div className="col-md-3 account-navigation">
                <div className="row account__header account__header--gray">
                    <div className="col-md-12">
                        <h2>Settings</h2>
                    </div>
                </div>
                <ul>
                    <li onClick={() => browserHistory.push('/account')} className={this.props.selected === 'account' ? 'selected' : ''}>😊 Account</li>
                    <li onClick={() => browserHistory.push('/connections')} className={this.props.selected === 'connections' ? 'selected' : ''}>📅 Calendar Connections</li>
                </ul>
            </div>
        )
    }
});
