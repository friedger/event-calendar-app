import { GET_FACEBOOK_PAGES_SUCCESS, GET_FACEBOOK_PAGES } from '../actions/facebookActions';

export default function eventState(state = {}, action) {
    switch (action.type) {
    case GET_FACEBOOK_PAGES:
        return Object.assign({}, state, { facebookPagesLoading: true });
    case GET_FACEBOOK_PAGES_SUCCESS:
        return Object.assign(
                {},
                state,
                { facebookPagesLoading: false },
                { pages: action.payload }
            );
    default:
        return state;
    }
}
