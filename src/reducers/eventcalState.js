import {
    GET_CALENDARS_SUCCESS,
    PUT_CALENDARS_SUCCESS
} from '../actions/calendarActions';

import {
    POST_MANUAL_EVENT_SUCCESS,
} from '../actions/manualEventActions';

export default function eventCal(state = {
    eventcalHasNoEvents: false
}, action) {
    if (action.type === GET_CALENDARS_SUCCESS || action.type === PUT_CALENDARS_SUCCESS) {
        if (action.payload.hasEvents) {
            return Object.assign({}, state, {
                eventcalHasNoEvents: false
            });
        }
        return Object.assign({}, state, {
            eventcalHasNoEvents: true
        });
    }

    if (action.type === POST_MANUAL_EVENT_SUCCESS) {
        return Object.assign({}, state, {
            eventcalHasNoEvents: false
        });
    }

    return state;
}
