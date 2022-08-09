import { AUTH, SIGN_UP_FAILED } from '../constants/actionTypes';
import { formatError } from '../services/authServices';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        const errorMessage = formatError(error.response.data);
        dispatch({ type: SIGN_UP_FAILED, payload: errorMessage})
    }
}