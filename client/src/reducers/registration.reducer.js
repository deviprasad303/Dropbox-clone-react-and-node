/**
 * Created by devi on 10/1/2017.
 */

import { userConstants } from '../constants/index';

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}