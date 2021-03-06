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
import eventState from './eventState';
import accountState from './accountState';
import facebookState from './facebookState';
import manualEventState from './manualEventState';
import onBoardingState from './onBoarding';
import passwordResetState from './passwordResetState';
import filterState from './filterState';
import notificationState from './notificationsState';
import eventSavingState from './eventSavingState';
import analyticsState from './analyticsState';
import widgetState from './widgetState';

function initialRegisterState(state = {}, action) {
    if (action.type === POPULATE_REGISTER_FORM) {
        return Object.assign({}, state, action.payload);
    }
    return state;
}

const appReducer = combineReducers({
    appState: appState,
    form: formReducer,
    account: accountState,
    loginState: loginState,
    eventcalState: eventCal,
    eventState: eventState,
    manualEventState: manualEventState,
    facebookState: facebookState,
    initialRegisterState: initialRegisterState,
    onBoardingState: onBoardingState,
    passwordResetState: passwordResetState,
    filterState: filterState,
    notificationState: notificationState,
    eventSavingState: eventSavingState,
    analyticsState: analyticsState,
    widgetState: widgetState
});

export default (state, action) => {
    if (action.type === BLOW_STATE) {
        const analyticsCurrentState = Object.assign({}, state.analyticsState);
        state = {};
        state.analyticsState = analyticsCurrentState;
    }

    return appReducer(state, action);
};
