import {
    PUT_EVENT,
    EVENT_SAVED
} from '../actions/eventActions';

import {
    PUT_CALENDARS,
    PUT_SETTINGS,
    MANUALLY_TRIGGERED_REFRESH
} from '../actions/calendarActions';

import {
    WIDGET_REFRESHING,
    WIDGET_REFRESHING_FINISHED
} from '../actions/widgetActions';

const defaultState = {};

export default function eventState(state = defaultState, action) {
    switch (action.type) {
    case WIDGET_REFRESHING:
        return Object.assign({}, state, { savingEvent: true });
    case WIDGET_REFRESHING_FINISHED:
        return Object.assign({}, state, { savingEvent: false });
    default:
        return state;
    }
}
