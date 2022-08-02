import * as api from '../api';
import { FETCH_ALL, UPDATE, CREATE, DELETE } from '../constants/actionTypes';

//Action Creators
export const getContacts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchContacts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createContact = (contact) => async (dispatch) => {
    try {
        const { data } = await api.createContacts(contact);

        dispatch({ type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateContact = (id, contact) => async (dispatch) => {
    try {
        const { data } = await api.updateContact(id, contact);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteContact = (id) => async (dispatch) => {
    try {
        await api.deleteContact(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const hotContact = (id) => async (dispatch) => {
    try {
        const { data } = await api.hotContact(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}