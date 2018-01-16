import { GET_ONBOARDING, GET_ONBOARDING_SUCCESS } from '../actions/onBoardingActions';

export default function onBoardingState(state = {}, action) {
    switch (action.type) {
    case GET_ONBOARDING:
        return Object.assign({}, state, { loading: true });
    case GET_ONBOARDING_SUCCESS:
        return Object.assign({}, state, action.payload, {
            loading: false,
            userHasNoOnboardingRecord: Object.keys(action.payload).length === 0
        });
    default:
        return state;
    }
}
