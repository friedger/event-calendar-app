import {
    CHECK_DETAILS,
    CHECK_DETAILS_SUCCESS,
    CHECK_DETAILS_ERROR
} from '../actions/passwordResetActions';

export default function passwordResetState(state = {}, action) {
    switch (action.type) {
    case CHECK_DETAILS:
        return Object.assign({}, state, { loading: true });
    case CHECK_DETAILS_SUCCESS:
        return Object.assign({}, state, { codeValid: true });
    case CHECK_DETAILS_ERROR:
        return Object.assign({}, state, { codeInvalid: true });
    default:
        return state;
    }
}
