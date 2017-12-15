import { GET_ONBOARDINGSTATUS, GET_ONBOARDINGSTATUS_SUCCESS } from '../actions/index';

export default function onBoardingState(state = {}, action) {
    switch (action.type) {
    case GET_ONBOARDINGSTATUS:
        return Object.assign({}, state, { loading: true });
    case GET_ONBOARDINGSTATUS_SUCCESS:
        return Object.assign({}, state, action.payload, {
            loading: false,
            userHasNoOnboardingRecord: Object.keys(action.payload).length === 0
        });
    default:
        return state;
    }
}
