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
                                <a href="/help">Help</a>
                            </li>
                            <li>
                                <a className="bold" href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/register" className="bold primary-color">Get Started</a>
                            </li>
                        </ul>
                        :
                        <ul className="logged-in">
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                            <li>
                                <a href="/help">Help</a>
                            </li>
                            <li onClick={() => appActions.logOut()}>
                                <a className="bold" href=''>Log Out</a>
                            </li>
                        </ul>
                        }
                    </div>
                </div>
            </div>
        )
    }
});
