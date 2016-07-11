if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import * as appActions from '../../actions/index';

module.exports = React.createClass({
    render() {
        return (
            <div className="navigation">
                <div className="container">
                    <div className="navigation__logo">
                        {!this.props.loggedIn ?
                        <a href="/">ECA</a>
                        :
                        <a href="/dashboard">ECA</a>
                        }
                    </div>
                    <div className="navigation__links">
                        {!this.props.loggedIn ?
                        <ul>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/register" className="primary-color">Get Started</a>
                            </li>
                        </ul>
                        :
                        <ul className="logged-in">
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                            <li onClick={() => appActions.logOut()}>
                                <a href=''>Log Out</a>
                            </li>
                        </ul>
                        }
                    </div>
                </div>
            </div>
        )
    }
});
