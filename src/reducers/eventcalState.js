import {
    GET_CALENDARS_SUCCESS,
    PUT_CALENDARS_SUCCESS
} from '../actions/calendarActions';

export function eventCal(state = {
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

    return state;
}
