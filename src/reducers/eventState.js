import {
    GET_EVENT_SUCCESS,
    EXIT_EVENT_SETTINGS,
    GET_EVENT,
    DEMO_EVENT_SELECTED
} from '../actions/eventActions';

import {
    DELETE_MANUAL_EVENT_SUCCESS
} from '../actions/manualEventActions';

const defaultState = {};

export default function eventState(state = defaultState, action) {
    switch (action.type) {
    case GET_EVENT:
        return Object.assign({}, state, { eventSettingsLoading: true });
    case GET_EVENT_SUCCESS:
        return Object.assign(
                {},
            {
                calendar_id: action.payload.eventDetail.calendar_id,
                uuid: action.payload.eventDetail.uuid,
                demoEventSelected: action.payload.eventDetail.demoCalendar,
                manualEventSelected: action.payload.eventDetail.manualEvent
            },
                { eventSettingsLoading: false },
                { filters: false },
                action.payload.responseBody
            );
    case DEMO_EVENT_SELECTED:
        return Object.assign({}, state, { demoEventSelected: true });
    case EXIT_EVENT_SETTINGS:
        return defaultState;
    case DELETE_MANUAL_EVENT_SUCCESS:
        return {};
    default:
        return state;
    }
}
