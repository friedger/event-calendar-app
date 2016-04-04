import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import {LOGIN, LOGIN_SUCCESS, GET_USER_SUCCESS, GET_USER_FAILURE} from '../actions';
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

export default combineReducers({
    appState: appState,
    form: formReducer
});
