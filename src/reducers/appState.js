import {
    GET_USER_SUCCESS,
    TOGGLE_SUGESSTIONS,
    EVENTCAL_REMOVED
} from '../actions';
import {
    PUT_CALENDARS,
    GET_CALENDARS_SUCCESS,
    GET_SETTINGS_SUCCESS,
    GET_CONNECTIONS_SUCCESS,
    DELETE_CALENDAR,
    GET_CALENDARS,
    PUT_CALENDARS_SUCCESS
} from '../actions/calendarActions';
import {
    GET_WIDGETS_SUCCESS
} from '../actions/widgetActions';

export function appState(state = {
    calendars: {},
    suggestions: false,
    widgets: []
}, action) {
    switch (action.type) {
    case EVENTCAL_REMOVED:
        return Object.assign({}, state, {
            suggestions: false
        });
    case TOGGLE_SUGESSTIONS:
        return Object.assign({}, state, {
            suggestions: !state.suggestions
        });
    case GET_USER_SUCCESS:
        return Object.assign({}, state, {
            user: action.payload.body
        });
    case GET_CALENDARS:
        return Object.assign({}, state, {
            calendarsLoading: true
        });
    case GET_CALENDARS_SUCCESS:
        return Object.assign({}, state, action.payload.res.body, {
            calendarsLoading: false
        });
    case GET_WIDGETS_SUCCESS:
        return Object.assign({}, state, {
            widgets: action.payload
        });
    case PUT_CALENDARS:
        return Object.assign({}, state, {
            calendarsLoading: true
        });
    case PUT_CALENDARS_SUCCESS:
        return Object.assign({}, state, {
            calendarsLoading: false
        });
    case GET_SETTINGS_SUCCESS:
        return Object.assign({}, state, action.payload.body);
    case GET_CONNECTIONS_SUCCESS:
        return Object.assign({}, state, {
            connections: action.payload
        });
    case DELETE_CALENDAR:
        return Object.assign({}, state, {
            connections: state.connections.map(connection => {

                if (connection.calendarId && (connection.calendarId === action.payload.calendarId)) {
                    connection.loading = true;
                }

                if (connection.cronofyAccessTokenId && (connection.cronofyAccessTokenId === action.payload.cronofyAccessTokenId)) {
                    connection.loading = true;
                }

                return connection;
            })
        });
    default:
        return state;
    }
}
