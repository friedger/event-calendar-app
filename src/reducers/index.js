import {
    combineReducers
} from 'redux';
import {
    reducer as formReducer
} from 'redux-form';
import {
    POPULATE_REGISTER_FORM,
    BLOW_STATE
} from '../actions';
import appState from './appState';
import loginState from './loginState';
import eventCal from './eventcalState';

function initialRegisterState(state = {}, action) {
    if (action.type === POPULATE_REGISTER_FORM) {
        return Object.assign({}, state, action.payload);
    }
    return state;
}

const appReducer = combineReducers({
    appState: appState,
    form: formReducer,
    loginState: loginState,
    eventcalState: eventCal,
    initialRegisterState: initialRegisterState
});

export default (state, action) => {
    if (action.type === BLOW_STATE) {
        state = undefined;
    }

    return appReducer(state, action);
};
