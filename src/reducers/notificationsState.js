import { GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS } from '../actions/notificationActions';

export default function notificationState(state = { loading: true }, action) {
    switch (action.type) {
    case GET_NOTIFICATIONS:
        return Object.assign({}, { loading: true });
    case GET_NOTIFICATIONS_SUCCESS:
        return Object.assign({}, action.payload.body, { loading: false });
    default:
        return state;
    }
}
