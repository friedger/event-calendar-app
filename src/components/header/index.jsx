require('./style.scss');

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import get from 'lodash.get';

import * as appActions from '../../actions/index';
import * as onBoardingActions from '../../actions/onBoardingActions';
import * as accountActions from '../../actions/accountActions';

import shouldDisplayNextStepBanner from '../../utils/shouldDisplayNextStepBanner';

const mapState = ({ onBoardingState, account, appState }) => {
    return { onBoardingState, account, appState };
};

const mapDispatch = dispatch => {
    return bindActionCreators({ ...onBoardingActions, ...appActions, ...accountActions }, dispatch);
};

var component = React.createClass({
    componentDidMount() {
        if (!this.props.userIsLoggedOut) {
            this.props.getOnboarding();
            this.props.getUser();
            this.props.getPlan();
        }
    },
    render() {
        const userClickedAddedScript = this.props.onBoardingState.user_clicked_added_script;
        const plan = this.props.account.plan;
        const user = get(this, 'props.appState.user');
        const displayNextStepBanner = shouldDisplayNextStepBanner(this.props.account, this.props.onBoardingState, user);
        return (
            <div className="navigation-container">
                <div className={this.props.useFluidContainer ? 'container-fluid' : 'container'}>
                    <div
                        className={
                            this.props.useFluidContainer ? 'navigation navigation--extra-padding row' : 'navigation row'
                        }
                    >
                        <div className="col-md-12">
                            <div className="navigation__logo">
                                {!this.props.loggedIn ? (
                                    <a className="svg" href="/">
                                        <object className="logo" data="/images/logo/logo.svg" type="image/svg+xml" />
                                    </a>
                                ) : (
                                    <a className="svg" href="/dashboard">
                                        <object className="logo" data="/images/logo/logo.svg" type="image/svg+xml" />
                                    </a>
                                )}
                            </div>
                            <div className="navigation__links">
                                {!this.props.loggedIn ? (
                                    <ul>
                                        <li>
                                            <a href="https://support.eventcalendarapp.com" target="_blank">
                                                Help
                                            </a>
                                        </li>
                                        <li>
                                            <NavLink className="bold" activeClassName="active" to="/login">
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a href="/register" className="secondary" style={{ display: 'inline' }}>
                                                Get Started
                                            </a>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="logged-in">
                                        {!this.props.doNotDisplayDashboardLink && (
                                            <li>
                                                <NavLink activeClassName="active" to="/dashboard">
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                        )}
                                        <li>
                                            <NavLink activeClassName="active" to="/account">
                                                Account
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a href="https://support.eventcalendarapp.com" target="_blank">
                                                Help
                                            </a>
                                        </li>
                                        <li
                                            onClick={e => {
                                                e.preventDefault();
                                                appActions.logOut();
                                            }}
                                        >
                                            <a href="#">Log Out</a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    {displayNextStepBanner && (
                        <Link to="/editor">
                            <div className="row next-step">
                                <div className="col-md-12">
                                    <strong>🚧 Next step:</strong> Add your Event Calendar to your website.
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
});

export default connect(
    mapState,
    mapDispatch
)(component);
