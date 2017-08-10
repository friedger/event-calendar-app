import {
    GET_EVENT_SUCCESS,
    EXIT_EVENT_SETTINGS,
    GET_EVENT,
    DEMO_EVENT_SELECTED,
    RESET_EVENT
} from '../actions/eventActions';

export default function eventState(state = {}, action) {
    switch (action.type) {
    case GET_EVENT:
        return Object.assign({}, state, { eventSettingsLoading: true });
    case GET_EVENT_SUCCESS:
        return Object.assign(
                {},
                state,
            {
                calendar_id: action.payload.eventDetail.calendar_id,
                uuid: action.payload.eventDetail.uuid,
                demoEventSelected: action.payload.eventDetail.demoCalendar
            },
                { eventSettingsLoading: false },
                action.payload.responseBody
            );
    case DEMO_EVENT_SELECTED:
        return Object.assign({}, state, { demoEventSelected: true });
    case EXIT_EVENT_SETTINGS:
        return { eventSettingsLoading: false, demoEventSelected: false };
    case RESET_EVENT:
        return Object.assign(
                {},
            {
                calendar_id: action.payload.eventDetail.calendar_id,
                uuid: action.payload.eventDetail.uuid,
                demoEventSelected: action.payload.eventDetail.demoCalendar
            },
                { eventSettingsLoading: false }
            );
    default:
        return state;
    }
}
