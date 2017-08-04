import { GET_EVENT_SUCCESS, EXIT_EVENT_SETTINGS, GET_EVENT } from '../actions/eventActions';

export default function eventState(state = {}, action) {
    console.log(action.type);
    switch (action.type) {
    case GET_EVENT:
        return Object.assign({}, state, { eventSettingsLoading: true });
    case GET_EVENT_SUCCESS:
        return Object.assign(
                {},
                state,
            {
                calendar_id: action.payload.eventDetail.calendar_id,
                uuid: action.payload.eventDetail.uuid
            },
                { eventSettingsLoading: false },
                action.payload.responseBody
            );
    case EXIT_EVENT_SETTINGS:
        return { eventSettingsLoading: false };
    default:
        return state;
    }
}
