import {
    PUT_EVENT,
    EVENT_SAVED
} from '../actions/eventActions';

import {
    PUT_CALENDARS,
    PUT_SETTINGS,
    MANUALLY_TRIGGERED_REFRESH
} from '../actions/calendarActions';

const defaultState = {};

export default function eventState(state = defaultState, action) {
    switch (action.type) {
    case PUT_CALENDARS:
        return Object.assign({}, state, { savingEvent: true });
    case PUT_EVENT:
        return Object.assign({}, state, { savingEvent: true });
    case PUT_SETTINGS:
        return Object.assign({}, state, { savingEvent: true });
    case MANUALLY_TRIGGERED_REFRESH:
        return Object.assign({}, state, { savingEvent: true });
    case EVENT_SAVED:
        return Object.assign({}, state, { savingEvent: false });
    default:
        return state;
    }
}
