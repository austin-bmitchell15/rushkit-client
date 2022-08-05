import * as api from '../api';
import { FETCH_ALL, FETCH_CONTACT, FETCH_BY_SEARCH, UPDATE, CREATE, DELETE, START_LOADING, STOP_LOADING } from '../constants/actionTypes';

//Action Creators
export const getContacts = (page) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data } = await api.fetchContacts(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type:STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getContact = (id) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data } = await api.fetchContact(id);
        dispatch({ type: FETCH_CONTACT, payload: data });
        dispatch({ type:STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getContactsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data } = await api.fetchContactsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type:STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createContact = (contact) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data } = await api.createContacts(contact);

        dispatch({ type: CREATE, payload: data});
        dispatch({ type:STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const updateContact = (id, contact) => async (dispatch) => {
    try {
        const { data } = await api.updateContact(id, contact);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteContact = (id) => async (dispatch) => {
    try {
        await api.deleteContact(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
};

export const hotContact = (id) => async (dispatch) => {
    try {
        const { data } = await api.hotContact(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
};