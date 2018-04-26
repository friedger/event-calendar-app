import {
    PUT_EVENT,
    EVENT_SAVED
} from '../actions/eventActions';

const defaultState = {};

export default function eventState(state = defaultState, action) {
    switch (action.type) {
    case PUT_EVENT:
        return Object.assign({}, state, { savingEvent: true });
    case EVENT_SAVED:
        return Object.assign({}, state, { savingEvent: false });
    default:
        return state;
    }
}
