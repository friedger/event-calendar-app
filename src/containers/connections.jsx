import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as calendarActions from '../actions/calendarActions';
import Header from '../components/header';
import Connections from '../components/connections';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';
import StripePaymentStatus from '../components/account/stripePaymentStatus';
import AccountNavigation from '../components/account/accountNavigation';

const hasCronofyConnection = state => {
    if (!state.appState.connections) {
        return false;
    }

    if (state.appState.connections) {
        return state.appState.connections.find(connection => connection.type === 'cronofy');
    }
};

const groupedConnectionsIntoTypes = state => {
    if (!state.appState.connections) {
        return false;
    }
    return state.appState.connections.reduce((collection, current) => {
        if (!collection[current.type]) {
            collection[current.type] = [];
        }
        collection[current.type].push({ name: current.name, calendarId: current.calendarId });
        return collection;
    }, {});
};

const mapState = state => {
    return {
        facebookState: state.facebookState,
        cronofyConnection: hasCronofyConnection(state),
        groupedConnections: groupedConnectionsIntoTypes(state),
        loading: state.appState.connectionsLoading,
        deletingCalendar: state.appState.connectionsLoading
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...calendarActions
        },
        dispatch
    );
};

const ConnectionsContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return { loading: false };
    },
    componentDidMount() {
        this.props.getConnections();
    },
    disconnectCronofy(cronofy) {
        this.props.deleteCalendar(cronofy);
    },
    icsAddedAction() {
        this.props.getConnections();
    },
    render() {
        return (
            <div style={{ background: '#f5f5f5', height: '100%', overflow: 'auto' }}>
                <Header loggedIn={true} useFluidContainer={true} />
                <div className="container-fluid">
                    <div className="row">
                        <AccountNavigation selected={'connections'} />
                        <div className="col-md-9 account__container">
                            <div className="row account__header account__header--purple">
                                <div className="col-md-12">
                                    <h2>Connections</h2>
                                    <span className="account__header__subtitle">
                                        Manage where Event Calendar App gets your events
                                    </span>
                                </div>
                            </div>
                            {(this.props.loading || this.state.loading || this.props.deletingCalendar) &&
                                <StripePaymentStatus accountLoading={true} />}
                            {!this.props.loading &&
                                <Connections
                                    disconnectCronofy={this.disconnectCronofy}
                                    cronofyConnection={this.props.cronofyConnection}
                                    authUrl={getCronofyAuthUrl()}
                                    groupedConnections={this.props.groupedConnections}
                                    deleteCalendar={this.props.deleteCalendar}
                                    icsAddedAction={this.icsAddedAction}
                                />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(ConnectionsContainer);
