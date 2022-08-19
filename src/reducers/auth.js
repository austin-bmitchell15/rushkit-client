import { AUTH, LOGOUT, SIGN_UP_FAILED } from "../constants/actionTypes";

const authReducer =  (state={ authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null};
        case SIGN_UP_FAILED:
            return { ...state, errorMessage: action.payload.message, errorType: action.payload.type };
        default: 
            return state;
    }
};

export default authReducer;