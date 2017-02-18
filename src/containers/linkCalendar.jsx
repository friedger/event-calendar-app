import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';

import Header from '../components/header';
import WelcomePageHeader from '../components/welcomePageHeader';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';
import AddIcsCalendarForm from '../components/addIcsCalendarForm';

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
    render() {
        return (
            <div>
                <div className='container'>
                    {this.state.displayIcsForm ?
                        <div className="row">
                            <div className="col-md-12">
                                <h2 style={{'padding-bottom': '12px', 'font-weight': 'bold'}}>Connect your ICS feed</h2>
                                <AddIcsCalendarForm calendarAdded={() => {window.location.href='/dashboard'}}/>
                                <a href="#" onClick={() => {this.setState({displayIcsForm: false})}}>
                                    Back to link options
                                </a>
                            </div>
                        </div>
                    :
                    <WelcomePageHeader
                        clickIcsConnect={() => {this.setState({displayIcsForm: true})}}
                        clickBack={() => {this.setState({displayIcsForm: false})}}
                        />}
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
