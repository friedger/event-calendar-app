import { GET_AVAILABLE_FILTERS, GET_AVAILABLE_FILTERS_SUCCESS, ASSIGN_FILTERS_SUCCESS } from '../actions/filterActions';

export default function eventState(state = {}, action) {
    switch (action.type) {
    case GET_AVAILABLE_FILTERS_SUCCESS:
        return Object.assign({}, state, { availableFilters: action.payload.body });
    default:
        return state;
    }
}
