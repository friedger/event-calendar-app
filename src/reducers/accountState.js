import {
    GET_PLAN_SUCCESS,
    SUBMIT_STRIPE_PAYMENT_SUCCESS,
    SUBMIT_STRIPE_PAYMENT,
    SUBMIT_STRIPE_PAYMENT_ERROR
} from '../actions/accountActions';

export default function appState(state = {}, action) {
    switch (action.type) {
    case GET_PLAN_SUCCESS:
        return Object.assign({}, state, {
            plan: action.payload.body
        });
    case SUBMIT_STRIPE_PAYMENT:
        return Object.assign({}, state, {
            paymentLoading: true
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
