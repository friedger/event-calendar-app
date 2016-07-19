import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, GET_USER_SUCCESS, GET_USER_FAILURE, POPULATE_REGISTER_FORM} from '../actions';
import {GET_CALENDARS_SUCCESS} from '../actions/calendarActions';

function appState(state = {}, action) {
    switch(action.type) {
        case GET_USER_SUCCESS:
        return Object.assign({}, state, {user: action.payload.body});
        case GET_CALENDARS_SUCCESS:
        return Object.assign({}, state, action.payload.body);
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
