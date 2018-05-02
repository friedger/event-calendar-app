import {
    GET_ANALYTICS,
    GET_ANALYTICS_SUCCESS,
    GET_ANALYTICS_ERROR
} from '../actions/analyticsActions';

const defaultState = { loading: true, error: false };

export default function eventState(state = defaultState, action) {
    switch (action.type) {
    case GET_ANALYTICS:
        return Object.assign({}, state, { loading: true, error: false });
    case GET_ANALYTICS_SUCCESS:
        return Object.assign({}, state, action.payload, { loading: false });
    case GET_ANALYTICS_ERROR:
        return Object.assign({}, state, { error: true, loading: false });
    default:
        return state;
    }
}
