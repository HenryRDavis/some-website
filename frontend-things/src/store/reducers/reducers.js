import {
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    LOG_ON_START,
    LOG_ON_SUCCESS,
    LOG_ON_FAIL,
    LOAD_START,
    LOAD_SUCCESS,
    LOAD_FAILURE,
    UPDATE_USER,
} from '../'

const initialState = {
    user : {
        userID: "",
        username: "",
        password: "",
        email: "",
        isLoggedIn: false,
    },
    loading: false,
    error: ""
}

export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SIGN_UP_START: 
        case LOG_ON_START:
        case LOAD_START : 
            return { ...state, loading: true, }
        case SIGN_UP_SUCCESS:
            return {
                user: {
                    ...state.user,
                    ...payload,
                    isLoggedIn: true
                },
                loading: false
            }
        case LOG_ON_SUCCESS:
            return { ...state, 
            user: { username: payload.username,
                password: payload.password,
                    isLoggedIn: true }, 
            loading: false }
        case LOAD_SUCCESS:
            console.log("LOADING PAYLOAD: ", payload)
            return { ...state,
                user: {
                    ...payload
                },
                error: initialState.error,
                loading: false 
            }
        case UPDATE_USER:
            console.log("UPDATE USER REDUCER", payload);
			return {
				...state,
				user: {
                    ...state.user,
                    ...payload
				},
			};
        case LOG_ON_FAIL:
        case SIGN_UP_FAIL :
        case LOAD_FAILURE:
            return { ...state, error : payload, loading: false };
        default:
            return state
        }
}
