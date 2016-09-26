import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
const Link = require('react-router').Link;
import WeeblyIframe from '../components/weeblyIframe';
import WeeblyNoSubscriptionMessage from '../components/weeblyNoSubscriptionMessage';


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
    render() {
        return (
            <div>
                {this.props.appState && this.props.appState.user && this.props.appState.user.status === 'registered' && <WeeblyNoSubscriptionMessage/>}
                <WeeblyIframe/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
