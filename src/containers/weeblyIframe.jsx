import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
const Link = require('react-router').Link;
import WeeblyIframe from '../components/weeblyIframe';
import WeeblyNoSubscriptionMessage from '../components/weeblyNoSubscriptionMessage';
import WeeblyWelcomeMessage from '../components/weeblyWelcomeMessage';

const mapState = ({appState}) => {
    return {appState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.props.getUser();
    },
    displayMessage(messageType) {

        const user = this.props.appState.user;

        if (!user) {
            return false;
        }

        const shouldMessageTypeBeDisplayed = {
            noSubscription: user.status === 'registered' && user.calendarAuthorised,
            welcome: !user.calendarAuthorised
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
