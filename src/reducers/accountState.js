import {
    GET_PLAN,
    GET_PLAN_ERROR,
    GET_PLAN_SUCCESS,
    SUBMIT_STRIPE_PAYMENT_SUCCESS,
    SUBMIT_STRIPE_PAYMENT,
    SUBMIT_STRIPE_PAYMENT_ERROR,
    LEFT_ACCOUNT_PAGE,
    CHANGE_STRIPE_PAYMENT,
    CHANGE_STRIPE_PAYMENT_SUCCESS
} from '../actions/accountActions';

export default function appState(state = {}, action) {
    switch (action.type) {
    case LEFT_ACCOUNT_PAGE:
        return Object.assign({
            accountLoading: false,
            paymentLoading: false,
            paymentError: false,
            paymentSuccess: false
        });
    case GET_PLAN:
        return Object.assign({}, state, {
            accountLoading: true
        });
    case GET_PLAN_SUCCESS:
        return Object.assign({}, state, {
            plan: action.payload.body,
            accountLoading: false,
            userHasNoPlan: false
        });
    case GET_PLAN_ERROR:
        return Object.assign({}, state, {
            accountLoading: false,
            userHasNoPlan: true
        });
    case SUBMIT_STRIPE_PAYMENT:
        return Object.assign({}, state, {
            paymentLoading: true
        });
    case CHANGE_STRIPE_PAYMENT:
        return Object.assign({}, state, {
            paymentLoading: true
        });
    case CHANGE_STRIPE_PAYMENT_SUCCESS:
        return Object.assign({}, state, {
            paymentLoading: false
        });
    case SUBMIT_STRIPE_PAYMENT_SUCCESS:
        return Object.assign({}, state, {
            paymentSuccess: true,
            paymentLoading: false
        });
    case SUBMIT_STRIPE_PAYMENT_ERROR:
        return Object.assign({}, state, {
            paymentError: true,
            paymentLoading: false
        });
    default:
        return state;
    }
}
