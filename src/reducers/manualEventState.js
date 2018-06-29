import {
    POST_MANUAL_EVENT,
    POST_MANUAL_EVENT_SUCCESS,
    POST_DUPLICATE_MANUAL_EVENT_SUCCESS,
    POST_DUPLICATE_MANUAL_EVENT_ERROR,
    POST_DUPLICATE_MANUAL_EVENT,
    RESET_DUPLICATE_MANUAL_EVENT_STATUS,
    ADD_NEW_EVENT,
    OPEN_NEW_EVENT_FORM,
    CLOSE_NEW_EVENT_FORM
} from '../actions/manualEventActions';

import {
    GET_ONBOARDING_SUCCESS
} from '../actions/onBoardingActions';

export default function manualEventState(state = {}, action) {
    switch (action.type) {
    case POST_DUPLICATE_MANUAL_EVENT:
        return Object.assign({}, state, { duplicatingEvent: true, eventDuplicationError: false });
    case POST_DUPLICATE_MANUAL_EVENT_SUCCESS:
        return Object.assign({}, state, { eventDuplicationSuccess: true, eventDuplicationError: false, duplicatingEvent: false });
    case POST_DUPLICATE_MANUAL_EVENT_ERROR:
        return Object.assign({}, state, { eventDuplicationError: true, duplicatingEvent: false });
    case POST_MANUAL_EVENT:
        return Object.assign({}, state, { postingEvent: true });
    case RESET_DUPLICATE_MANUAL_EVENT_STATUS:
        return Object.assign({}, state, { eventDuplicationSuccess: false });
    case POST_MANUAL_EVENT_SUCCESS:
        return Object.assign(
                {},
                state,
            {
                calendarId: action.payload.calendarId,
                uuid: action.payload.uuid,
                postingEvent: false,
                postedEvent: true,
                displayAddEventTip: false
            }
            );
    case ADD_NEW_EVENT:
        return Object.assign(
            {},
            state,
            {
                postingEvent: false,
                postedEvent: false
            }
        );
    case GET_ONBOARDING_SUCCESS:
        if (action.payload.selected_manual_events && !action.payload.added_an_event) {
            return Object.assign({}, state, {
                displayAddEventScreen: true,
                displayAddEventTip: true
            });
        }

        return state;
    case OPEN_NEW_EVENT_FORM:
        return Object.assign({}, state, {
            displayAddEventScreen: true
        });
    case CLOSE_NEW_EVENT_FORM:
        return Object.assign({}, state, {
            displayAddEventScreen: false
        });
    default:
        return state;
    }
}
