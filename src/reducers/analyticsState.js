import {
    GET_ANALYTICS,
    GET_ANALYTICS_SUCCESS,
    GET_ANALYTICS_ERROR
} from '../actions/analyticsActions';

const defaultState = { loading: true };

export default function eventState(state = defaultState, action) {
    switch (action.type) {
    case GET_ANALYTICS:
        return Object.assign({}, state, { loading: true });
    case GET_ANALYTICS_SUCCESS:
        return Object.assign({}, state, action.payload, { loading: false });
    case GET_ANALYTICS_ERROR:
        return Object.assign({}, state, { error: true });
    default:
        return state;
    }
}
