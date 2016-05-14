if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

module.exports = React.createClass({
    render() {
        return (
            <div className="navigation">
                <div className="container">
                    <div className="navigation__logo">
                        <a href="/">ECA</a>
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
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                        </ul>
                        }
                    </div>
                </div>
            </div>
        )
    }
});
