import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as notificationActions from '../actions/notificationActions';

import AccountNavigation from '../components/account/accountNavigation';
import NotificationsForm from '../components/account/notificationsForm';

import Header from '../components/header';

const mapState = ({ appState, notificationState }) => {
    return { appState, notificationState };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...notificationActions
        },
        dispatch
    );
};

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.props.getNotifications();
    },
    render() {
        return (
            <div
                style={{
                    height: '100%',
                    background: '#f5f5f5',
                    overflow: 'auto'
                }}
            >
                <Header loggedIn={true} useFluidContainer={true} />
                <div className="container-fluid">
                    <div className="row">
                        <AccountNavigation selected={'account'} />
                        <div
                            className="col-md-9 account__container"
                            style={{ 'minHeight': 'calc(100vh - 74px)', height: '100%' }}
                        >
                            <div className="row account__header">
                                <div className="col-md-12">
                                    <h2>Notifications</h2>
                                    <span className="account__header__subtitle">
                                        Manage your notifications
                                    </span>
                                </div>
                            </div>
                            <div className="row account__content">
                                <div className="col-md-12">
                                    {!this.props.notificationState.loading && <NotificationsForm putNotificationsAction={this.props.putNotifications}></NotificationsForm>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
