import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import CancellationModal from '../components/account/cancellationModal';
import * as analyticsActions from '../actions/analyticsActions';

const mapState = ({ analyticsState, appState }) => {
    return {
        analyticsState,
        appState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators({ ...analyticsActions }, dispatch);
};

const component = React.createClass({
    render() {
        return (
            this.props.appState.user && (
                <CancellationModal
                    subscriberCount={
                        this.props.analyticsState.subscriberCount &&
                        this.props.analyticsState.subscriberCount[
                            this.props.analyticsState.subscriberCount.length - 1
                        ]
                    }
                    widgetViews={
                        this.props.analyticsState.widgetViews &&
                        this.props.analyticsState.widgetViews[
                            this.props.analyticsState.widgetViews.length - 1
                        ]
                    }
                    shopifyUser={this.props.appState.user.shopifyUser}
                    getAnalyticsAction={this.props.getAnalytics}
                    loading={this.props.analyticsState.loading}
                />
            )
        );
    }
});

export default connect(mapState, mapDispatch)(component);
