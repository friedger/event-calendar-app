import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';

const cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');

import DashboardHeader from '../components/dashboardHeader';
import CalendarSelection from '../components/calendarSelection';
import CalendarCodeTextArea from '../components/calendarCodeTextArea';
import EventCal from '../components/eventCal';
import WelcomePageHeader from '../components/welcomePageHeader';
import BeginTrial from '../components/beginTrial';
import FirstTimeLinkMessage from '../components/firstTimeLinkMessage';

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
    _getFormInitialValues() {
        return Object.keys(this.props.appState.user.calendars).reduce((collection, current) => {
            collection[current] = this.props.appState.user.calendars[current].selected;
            return collection;
        }, {});
    },
    _getSelectedCalendars() {
        if (!this.props.form.calendarSelection) {
            return [];
        }

        return Object.keys(this.props.form.calendarSelection)
        .filter(key => key.charAt(0) !== '_')
        .reduce((collection, current) => {
            if (this.props.form.calendarSelection[current].value) {
                collection.push(current);
            }
            return collection;
        }, []);
    },
    render() {
        const {user} = this.props.appState;
        const authUrl = `${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`;
        return (
            <div className="container">
                {user && user.status === 'registered' ?
                    <div>
                         {user && user.calendarAuthorised ?
                             <div>
                                 <FirstTimeLinkMessage />
                                 <CalendarSelection onChange={this.props.putCalendars}
                                     initialValues={this._getFormInitialValues()}
                                     fields={Object.keys(this.props.appState.user.calendars)}
                                     calendars={this.props.appState.user.calendars}/>
                                 <EventCal userId={this.props.appState.user.userId} activeCalendars={this._getSelectedCalendars().length}/>
                                 <BeginTrial/>
                                 </div>
                                 :
                                 <div>
                                 <WelcomePageHeader />
                                 <a href={authUrl} className="start-trial">Link my calendar</a>
                             </div>
                         }
                     </div>
                     : false}
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
