import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as onBoardingActions from '../actions/onBoardingActions';
import WeeblyIframe from '../components/weeblyIframe';
import WeeblyNoSubscriptionMessage from '../components/weeblyIframe/weeblyNoSubscriptionMessage';

function shouldDisplayNoSubscriptionMessage({ appState: { user, connections }, onBoardingState }) {
    return user &&
    (user.status === 'registered' || user.status === 'cancelled') &&
    connections &&
    onBoardingState &&
    (onBoardingState.linked_calendar || onBoardingState.selected_manual_events);
}

const mapState = (state) => {
    return {
        displayNoSubscriptionMessage: shouldDisplayNoSubscriptionMessage(state)
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions,
            ...onBoardingActions
        },
        dispatch
    );
};

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.props.getUser();
        this.props.getConnections();
        this.props.getOnboarding();
    },
    displayMessage(messageType) {
        const shouldMessageTypeBeDisplayed = {
            noSubscription: this.props.displayNoSubscriptionMessage
        };

        return shouldMessageTypeBeDisplayed[messageType];
    },
    render() {
        return (
            <div className="weebly-iframe">
                {this.displayMessage('noSubscription') && <WeeblyNoSubscriptionMessage />}
                <WeeblyIframe />
            </div>
        );
    }
});

export default connect(
    mapState,
    mapDispatch
)(component);
