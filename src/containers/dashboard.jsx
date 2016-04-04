import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
const cookieUtil = require('../utils/cookieUtil').default;

import CalendarSelection from '../components/calendarSelection';

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

function addScriptToPage(userId) {

    window.eventCalId = userId;

    var mainScript = document.createElement('script');
    mainScript.setAttribute('src','http://localhost:3000/calendar-build/main.js');
    document.head.appendChild(mainScript);

    var stylesheet = document.createElement('link');
    stylesheet.setAttribute('href','http://localhost:3000/calendar-build/styles.css');
    stylesheet.setAttribute('rel','stylesheet');
    document.head.appendChild(stylesheet);

    var googleMaps = document.createElement('script');
    googleMaps.setAttribute('src','https://maps.googleapis.com/maps/api/js');
    document.head.appendChild(googleMaps);

    var fontAwesome = document.createElement('link');
    fontAwesome.setAttribute('href','https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
    fontAwesome.setAttribute('rel','stylesheet');
    document.head.appendChild(fontAwesome);
}

const component = React.createClass({
    componentDidMount() {
        this.props.getUser();
        this.props.getCalendars();
    },
    componentWillReceiveProps(props) {
        if (props.appState.user && props.appState.user.calendarAuthorised) {
            addScriptToPage(props.appState.user.userId);
        }
    },
    render() {
        return (
            <div className="container">
                this is the dashboard
                {this.props.appState.calendars && <CalendarSelection calendars={this.props.appState.user.calendars}/>}
                {this.props.appState.user && !this.props.appState.user.calendarAuthorised ?
                    <div><a href={`http://localhost:3000/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`}>authroise</a></div>
                : ''}
                <div id="app-container"></div>
                {this.props.appState.user && this.props.appState.user.calendarAuthorised ?
                <textarea defaultValue={'window.eventCalId='+ this.props.appState.user.userId +';var mainScript=document.createElement("script");mainScript.setAttribute("src","http://localhost:3000/calendar-build/main.js"),document.head.appendChild(mainScript);var stylesheet=document.createElement("link");stylesheet.setAttribute("href","http://localhost:3000/calendar-build/styles.css"),stylesheet.setAttribute("rel","stylesheet"),document.head.appendChild(stylesheet);var googleMaps=document.createElement("script");googleMaps.setAttribute("src","https://maps.googleapis.com/maps/api/js"),document.head.appendChild(googleMaps);var fontAwesome=document.createElement("link");fontAwesome.setAttribute("href","https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"),fontAwesome.setAttribute("rel","stylesheet"),document.head.appendChild(fontAwesome);'} />
                :
                ''}
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
