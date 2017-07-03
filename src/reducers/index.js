import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, GET_USER_SUCCESS, GET_USER_FAILURE, POPULATE_REGISTER_FORM, TOGGLE_SUGESSTIONS, EVENTCAL_REMOVED} from '../actions';
import {GET_CALENDARS_SUCCESS, GET_SETTINGS_SUCCESS, GET_CONNECTIONS_SUCCESS, DELETE_CALENDAR, GET_CALENDARS} from '../actions/calendarActions';

function appState(state = {calendars: {}, suggestions: false}, action) {
    switch(action.type) {
        case EVENTCAL_REMOVED:
        return Object.assign({}, state, {suggestions: false})
        case TOGGLE_SUGESSTIONS:
        return Object.assign({}, state, {suggestions: !state.suggestions})
        case GET_USER_SUCCESS:
        return Object.assign({}, state, {user: action.payload.body});
        case GET_CALENDARS:
        return Object.assign({}, state, {calendarsLoading: true})
        case GET_CALENDARS_SUCCESS:
        return Object.assign({}, state, action.payload.body, {calendarsLoading: false});
        case GET_SETTINGS_SUCCESS:
        return Object.assign({}, state, action.payload.body);
        case GET_CONNECTIONS_SUCCESS:
        return Object.assign({}, state, {connections: action.payload})
        case DELETE_CALENDAR:
        const connections = state.connections.map(connection => {

            if (connection.calendarId && (connection.calendarId === action.payload.calendarId)) {
                connection.loading = true;
            }

            if (connection.cronofyAccessTokenId && (connection.cronofyAccessTokenId === action.payload.cronofyAccessTokenId)){
                connection.loading = true;
            }

            return connection;
        });
        return Object.assign({}, state, {connections})

    }
    return state;
}

function loginState(state = {}, action) {
    switch(action.type) {
        case LOGIN_ERROR:
        let message;
        if (action.error.status === 401) {
            message = 'This user and password does not exist';
        }
        return Object.assign({}, state, {error: message ? message : 'There has been a problem logging you in'});
    }
    return state;
}

function initialRegisterState(state={}, action) {
    if (action.type === POPULATE_REGISTER_FORM) {
        return Object.assign({}, state, action.payload)
    }
    return state;
}

export default combineReducers({
    appState: appState,
    form: formReducer,
    loginState: loginState,
    initialRegisterState: initialRegisterState
});
