import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
const Link = require('react-router').Link;
import WeeblyIframe from '../components/weeblyIframe';
import WeeblyNoSubscriptionMessage from '../components/weeblyNoSubscriptionMessage';
import WeeblyWelcomeMessage from '../components/weeblyWelcomeMessage';

const mapState = ({appState}) => {
    return {appState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions,
        ...calendarActions
    }, dispatch);
}

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.props.getUser();
        this.props.getConnections();
    },
    displayMessage(messageType) {

        const {user, connections} = this.props.appState;

        if (!user) {
            return false;
        }

        const shouldMessageTypeBeDisplayed = {
            noSubscription: user.status === 'registered' && connections && connections.length > 0,
            welcome: connections && connections.length === 0
        };

        return shouldMessageTypeBeDisplayed[messageType];
    },
    render() {
        return (
            <div>
                {this.displayMessage('noSubscription') && <WeeblyNoSubscriptionMessage/>}
                {this.displayMessage('welcome') && <WeeblyWelcomeMessage/>}
                <WeeblyIframe/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
