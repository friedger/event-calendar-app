import {
    GET_PLAN,
    GET_PLAN_ERROR,
    GET_PLAN_SUCCESS,
    SUBMIT_STRIPE_PAYMENT_SUCCESS,
    SUBMIT_STRIPE_PAYMENT,
    SUBMIT_STRIPE_PAYMENT_ERROR,
    LEFT_ACCOUNT_PAGE,
    CHANGE_STRIPE_PAYMENT,
    CHANGE_STRIPE_PAYMENT_SUCCESS,
    UPDATE_STRIPE_DETAILS,
    UPDATE_STRIPE_DETAILS_SUCCESS
} from '../actions/accountActions';

const defaultState = {
    accountLoading: false,
    paymentLoading: false,
    paymentError: false,
    paymentSuccess: false,
    updatingPaymentDetails: false,
    updatedPaymentDetails: false
};

export default function appState(state = {}, action) {
    switch (action.type) {
    case LEFT_ACCOUNT_PAGE:
        return Object.assign({}, state, defaultState);
    case GET_PLAN:
        return Object.assign({}, state, defaultState, {
            accountLoading: true
        });
    case GET_PLAN_SUCCESS:
        const userHasAPlan = action.payload.body.hasPlan !== false;
        return Object.assign({}, state, {
            plan: userHasAPlan && action.payload.body,
            accountLoading: false,
            userHasNoPlan: !userHasAPlan
        });
    case GET_PLAN_ERROR:
        return Object.assign({}, state, {
            accountLoading: false,
            userHasNoPlan: true
        });
    case UPDATE_STRIPE_DETAILS:
        return Object.assign({}, state, defaultState, {
            updatingPaymentDetails: true
        });
    case UPDATE_STRIPE_DETAILS_SUCCESS:
        return Object.assign({}, state, {
            updatingPaymentDetails: false,
            updatedPaymentDetails: true
        });
    case SUBMIT_STRIPE_PAYMENT:
        return Object.assign({}, state, defaultState, {
            paymentLoading: true
        });
    case CHANGE_STRIPE_PAYMENT:
        return Object.assign({}, state, defaultState, {
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
