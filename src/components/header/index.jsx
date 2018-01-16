require('./style.scss');

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/index';
const Link = require('react-router').Link;
import * as onBoardingActions from '../../actions/onBoardingActions';
import get from 'lodash.get';
import * as accountActions from '../../actions/accountActions';

const mapState = ({ onBoardingState, account, appState }) => {
    return { onBoardingState, account, appState };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        { ...onBoardingActions, ...appActions, ...accountActions },
        dispatch
    );
};

var component = React.createClass({
    componentDidMount() {
        this.props.getOnboarding();
        this.props.getUser();
        this.props.getPlan();
    },
    conditionsToDisplayAddScriptNextStep() {

    },
    render() {
        const userClickedAddedScript = this.props.onBoardingState.user_clicked_added_script;
        const plan = this.props.account.plan;
        const user = get(this, 'props.appState.user');
        console.log(userClickedAddedScript, 'status')
        return (
            <div className="navigation-container">
                <div className={this.props.useFluidContainer ? 'container-fluid' : 'container'}>
                    <div className={this.props.useFluidContainer ? 'navigation navigation--extra-padding row' : 'navigation row'}>
                        <div className="col-md-12">
                            <div className="navigation__logo">
                                {!this.props.loggedIn ? (
                                    <a className="svg" href="/"><object className="logo" data="/images/logo/logo.svg" type="image/svg+xml"></object></a>
                                ) : (
                                    <a className="svg" href="/dashboard"><object className="logo" data="/images/logo/logo.svg" type="image/svg+xml"></object></a>
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
                                            <a href="/register" className="secondary" style={{ display: 'inline' }}>
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
                    {plan && userClickedAddedScript === false && user && !user.weeblyUser && <Link to="/editor"><div className="row next-step">
                        <div className="col-md-12">
                            <strong>🚧 Next step:</strong> Add your Event Calendar to your website.
                        </div>
                    </div></Link>}
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
