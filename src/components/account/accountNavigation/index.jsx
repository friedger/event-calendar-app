require('./style.scss');

import React from 'react';
import { browserHistory } from 'react-router';
import { withRouter } from "react-router-dom";

const AccountNavigation = React.createClass({
    render() {
        return (
            <div className="col-md-3 account-navigation">
                <div className="row account__header account__header--gray">
                    <div className="col-md-12">
                        <h2>Settings</h2>
                    </div>
                </div>
                <ul>
                    <li onClick={() => this.props.history.push('/account')} className={this.props.selected === 'account' ? 'selected' : ''}>😊 Account</li>
                    <li onClick={() => this.props.history.push('/connections')} className={this.props.selected === 'connections' ? 'selected' : ''}>📅 Calendar Connections</li>
                    <li onClick={() => this.props.history.push('/notifications')} className={this.props.selected === 'notifications' ? 'selected' : ''}>🔔 Notifications</li>
                </ul>
            </div>
        )
    }
});

export default withRouter(AccountNavigation);
