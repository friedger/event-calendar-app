require('../components/dashboard/style.scss');

import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';
import * as appActions from '../actions/index';
import * as analyticsActions from '../actions/analyticsActions';

import Header from '../components/header';
import NewWidgetButton from '../components/dashboard/newWidgetButton';
import WidgetButton from '../components/dashboard/widgetButton';
import Statistic from '../components/dashboard/statistic';
import { Modal } from 'react-bootstrap';
import get from 'lodash.get';

const mapState = ({ appState, analyticsState }) => {
    return {
        appState,
        analyticsState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...widgetActions,
            ...appActions,
            ...analyticsActions
        },
        dispatch
    );
};

const component = React.createClass({
    componentDidMount() {
        this.props.getWidgets();
        this.props.getUser();
        if (!this.props.analyticsState.widgetViews) {
            this.props.getAnalytics();
        }
    },
    disableAnalytics() {
        const status = this.props.appState.user && this.props.appState.user.status;
        return status === 'registered' || status === 'cancelled';
    },
    render() {
        if (this.props.children) {
            return <div style={{ height: '100%' }}>{this.props.children}</div>;
        }
        return (
            <div style={{ height: '100%' }}>
                <Modal
                    show={this.props.appState.widgetCreationError}
                    onHide={this.props.widgetErrorAcknowledged}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Unable to add any more calendars</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            Your current plan does not allow any more calendars. Upgrade to add
                            more.
                        </div>
                    </div>
                </Modal>
                <Header loggedIn={true} useFluidContainer={true} />
                <div className="container-fluid analytics-section">
                    <div className="row" style={{ padding: '0 30px' }}>
                        <div className="col-md-12">
                            <h3>Analytics</h3>
                        </div>
                        <Statistic
                            loading={
                                this.disableAnalytics() ? false : this.props.analyticsState.loading
                            }
                            data={
                                this.disableAnalytics()
                                    ? [5762, 6242, 6745, 7396, 7813]
                                    : this.props.analyticsState.subscriberCount
                            }
                            color="#9556bf"
                            value="292"
                            error={this.props.analyticsState.error}
                            name="❤️ Subscribers"
                            displayUpgradeMessage={this.disableAnalytics()}
                            disabled={this.disableAnalytics()}
                            tryAgainButtonAction={() => this.props.getAnalytics()}
                        />
                        <Statistic
                            loading={
                                this.disableAnalytics() ? false : this.props.analyticsState.loading
                            }
                            data={
                                this.disableAnalytics()
                                    ? [53, 60, 65, 68, 100]
                                    : this.props.analyticsState.widgetViews
                            }
                            color="#6787ab"
                            value="10,232"
                            error={this.props.analyticsState.error}
                            name="📊 Event Calendar Views"
                            disabled={this.disableAnalytics()}
                            tryAgainButtonAction={() => this.props.getAnalytics()}

                        />
                    </div>
                </div>
                <div className="container-fluid event-calendar-section">
                    <div className="row" style={{ padding: '0 30px' }}>
                        <div className="col-md-12">
                            <h3>Event Calendars</h3>
                        </div>
                        {this.props.appState.user && (
                            <NewWidgetButton
                                weeblyUser={get(this, 'props.appState.user.weeblyUser')}
                                onClick={this.props.postWidgets}
                            />
                        )}
                        {this.props.appState.widgets.map((widget, index, fullArr) => {
                            if (fullArr.length === 1) {
                                return <WidgetButton widget={widget} number={index + 1} />;
                            }
                            return (
                                <WidgetButton
                                    deleteAction={this.props.deleteWidget}
                                    widget={widget}
                                    number={index + 1}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
