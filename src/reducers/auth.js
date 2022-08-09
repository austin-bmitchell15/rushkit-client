import { AUTH, LOGOUT, SIGN_UP_FAILED } from "../constants/actionTypes";

const authReducer =  (state={ authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null};
        case SIGN_UP_FAILED:
            return { ...state, errorMessage: action.payload, errorType: action.type };
        default: 
            return state;
    }
};

export default authReducer;