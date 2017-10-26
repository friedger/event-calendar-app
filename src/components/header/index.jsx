require('./style.scss');

import React from 'react';

import * as appActions from '../../actions/index';
const Link = require('react-router').Link;
import InlineSVG from 'svg-inline-react';

module.exports = React.createClass({
    render() {
        const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 531.37 68.99"><defs><style>.cls-1,.cls-5{fill:#fff;}.cls-1{opacity:0.1;}.cls-2{fill:#e4e4e4;}.cls-3{fill:#6787ab;}.cls-4{fill:#d92c64;}.cls-5{font-size:60px;font-family:OpenSans-Bold, Open Sans;letter-spacing:-0.03em;}.cls-6{font-weight:700;}.cls-7{font-family:OpenSans-Light, Open Sans;}</style></defs><title>Untitled-1</title><g id="Layer_2" data-name="Layer 2"><rect class="cls-1" x="0.08" y="16.53" width="10.71" height="38.35"/><rect class="cls-2" y="15.79" width="36.67" height="9.46" rx="0.5" ry="0.5"/><rect class="cls-3" y="30.98" width="36.67" height="9.46" rx="0.5" ry="0.5"/><rect class="cls-4" y="46.17" width="36.67" height="9.46" rx="0.5" ry="0.5"/></g><g id="Layer_3" data-name="Layer 3"><text class="cls-5" transform="translate(44.45 51.42)"><tspan class="cls-6">event</tspan><tspan class="cls-7" x="161.51" y="0">calendar</tspan><tspan class="cls-6" x="380.13" y="0">app</tspan></text></g></svg>`;

        return (
            <div className="navigation-container">
                <div className={this.props.useFluidContainer ? 'container-fluid' : 'container'}>
                    <div className={this.props.useFluidContainer ? 'navigation navigation--extra-padding row' : 'navigation row'}>
                        <div className="col-md-12">
                            <div className="navigation__logo">
                                {!this.props.loggedIn ? (
                                    <a href="/"><InlineSVG element='div' src={svgSource} /></a>
                                ) : (
                                    <a href="/dashboard"><InlineSVG element='div' src={svgSource} /></a>
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
