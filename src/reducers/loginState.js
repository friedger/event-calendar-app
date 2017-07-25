import {
    LOGIN_ERROR
} from '../actions';

export default function loginState(state = {}, action) {
    switch (action.type) {
    case LOGIN_ERROR:
        if (action.error.status === 401) {
            return Object.assign({}, state, {
                error: 'This user and password does not exist'
            });
        }
        return Object.assign({}, state, {
            error: 'There has been a problem logging you in'
        });
    default:
        return state;
    }
}
