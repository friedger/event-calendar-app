if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import * as appActions from '../../actions/index';
const Link = require('react-router').Link;

module.exports = React.createClass({
    render() {
        return (
            <div className="navigation-container">
                <div className={this.props.useFluidContainer ? 'container-fluid' : 'container'}>
                    <div className={this.props.useFluidContainer ? 'navigation navigation--extra-padding row' : 'navigation row'}>
                        <div className="col-md-12">
                            <div className="navigation__logo">
                                {!this.props.loggedIn ? (
                                    <a href="/">ECA</a>
                                ) : (
                                    <a href="/dashboard">ECA</a>
                                )}
                            </div>
                            <div className="navigation__links">
                                {!this.props.loggedIn ? (
                                    <ul>
                                        <li>
                                            <a
                                                href="https://support.eventcalendarapp.com"
                                                target="_blank"
                                            >
                                                Help
                                            </a>
                                        </li>
                                        <li>
                                            <Link
                                                className="bold"
                                                activeClassName="active"
                                                to="/login"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="/register" className="bold primary-color">
                                                Get Started
                                            </a>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="logged-in">
                                        {!this.props.doNotDisplayDashboardLink && (
                                            <li>
                                                <Link activeClassName="active" to="/dashboard">
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <Link activeClassName="active" to="/account">
                                                Account
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="https://support.eventcalendarapp.com"
                                                target="_blank"
                                            >
                                                Help
                                            </a>
                                        </li>
                                        <li onClick={() => appActions.logOut()}>
                                            <a href="#">Log Out</a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
