import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';

import Header from '../components/header';
import WelcomePageHeader from '../components/welcomePageHeader';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';
import AddIcsCalendarForm from '../components/addIcsCalendarForm';
import ProgressBar from '../components/progressBar';
import intercom from '../utils/intercom';

import { browserHistory } from 'react-router';

const mapState = ({appState}) => {
    return {
        appState
    }
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
    getInitialState() {
        return {
            displayIcsForm: false
        }
    },
    backToLinkOptions() {
        const {user} = this.props.appState;
        if (user) {
            intercom.trackEvent('Clicked back to link options');
            intercom.update({user_id: user.userId});
        }
        this.setState({displayIcsForm: false});
    },
    render() {
        const {user} = this.props.appState;
        return (
            <div className="here">
                <div>
                    <ProgressBar></ProgressBar>
                </div>
                <div>
                    {this.state.displayIcsForm ?
                        <div className="row">
                            <div className="col-md-12">
                                <h2 style={{'paddingBottom': '12px', 'fontWeight': 'bold'}}>Connect your ICS feed</h2>
                                <AddIcsCalendarForm selectIcsFeedAutomatically={true} calendarAdded={() => {window.location.href='/editor'}}/>
                                <a href="#" onClick={() => this.backToLinkOptions()}>
                                    Back to link options
                                </a>
                            </div>
                        </div>
                    :
                    <WelcomePageHeader
                        user={user}
                        clickIcsConnect={() => {this.setState({displayIcsForm: true})}}
                        clickBack={() => {this.setState({displayIcsForm: false})}}
                        authUrl={getCronofyAuthUrl()}
                        />}
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
