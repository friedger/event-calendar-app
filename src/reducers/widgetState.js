import {
    GET_WIDGET_SUCCESS,
    PUT_WIDGET_SUCCESS,
    PUT_WIDGET_ERROR
} from '../actions/widgetActions';

export default function widgetState(state = { aliasSuccess: false, aliasFail: false, aliasInvalid: false }, action) {
    switch (action.type) {
    case GET_WIDGET_SUCCESS:
        return Object.assign({}, state, { widget: action.payload }, { lastKnownSuccessfulAlias: action.payload.alias });
    case PUT_WIDGET_SUCCESS:
        return Object.assign({}, state, { aliasSuccess: true, aliasFail: false, aliasInvalid: false }, { lastKnownSuccessfulAlias: action.successfulAlias });
    case PUT_WIDGET_ERROR:
        if (action.status === 422) {
            return Object.assign({}, state, { aliasSuccess: false, aliasFail: false, aliasInvalid: true });
        }
        return Object.assign({}, state, { aliasSuccess: false, aliasFail: true, aliasInvalid: false });
    default:
        return state;
    }
}
