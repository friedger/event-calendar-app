import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';

const cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');

import CalendarCodeTextArea from '../components/calendarCodeTextArea';
import RegisteredUser from '../components/registeredUser';

import {Row, Col} from 'react-bootstrap';

const mapState = ({appState, form}) => {
    return {
        appState,
        form
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions,
        ...calendarActions
    }, dispatch);
}

function addScriptToPage(userId) {
    addEventcalScript(userId);
}

var calendarHasBeenRendered;

const component = React.createClass({
    componentDidMount() {
        this.props.getUser();
        this.props.getCalendars();
    },
    render() {
        const {user} = this.props.appState;
        const authUrl = `${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`;
        return (
            <div className="container">
                {user && user.status === 'registered' &&
                    <RegisteredUser putCalendars={this.props.putCalendars}
                        user={this.props.appState.user}
                        calendarSelectionForm={this.props.form.calendarSelection}
                        authUrl={`${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`} />}
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)


// {this.props.appState.user &&
    // <CalendarSelection
    //     onChange={this.props.putCalendars}
    //     initialValues={this._getFormInitialValues()}
    //     fields={Object.keys(this.props.appState.user.calendars)}
    //     calendars={this.props.appState.user.calendars}/>}
//         {this.props.appState.user && !this.props.appState.user.calendarAuthorised ?
//             <div><a href={`${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`}>authroise</a></div>
//             : ''}
//             {this.props.appState.user && this.props.appState.user.calendarAuthorised ?
//                 <div>
//                     <CalendarCodeTextArea calendarBuildUrl={config.calendarBuildUrl} userId={this.props.appState.user.userId}/>
//                     <EventCal userId={this.props.appState.user.userId} activeCalendars={this._getSelectedCalendars().length}/>
//                 </div>
//                 :
//                 ''}
