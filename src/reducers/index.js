import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import {LOGIN, LOGIN_SUCCESS, GET_USER_SUCCESS, GET_USER_FAILURE} from '../actions';

function appState(state = {}, action) {
    switch(action.type) {
        case GET_USER_SUCCESS:
        console.log(action.payload.body, 'payload')
        return Object.assign({}, state, {user: action.payload.body});
    }

    return state;
}

export default combineReducers({
    appState: appState,
    form: formReducer
});
