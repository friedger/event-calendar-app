import {
    GET_CALENDARS_SUCCESS,
    PUT_CALENDARS_SUCCESS
} from '../actions/calendarActions';

import {
    POST_MANUAL_EVENT_SUCCESS,
} from '../actions/manualEventActions';

import {
    WIDGET_HAS_EVENTS
} from '../actions';

export default function eventCal(state = {
    eventcalHasNoEvents: false
}, action) {

    if (action.type === WIDGET_HAS_EVENTS) {
        return Object.assign({}, state, {
            eventcalHasNoEvents: !action.payload
        });
    }

    return state;
}
