import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                contacts: action.payload.contacts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, contacts: action.payload.contacts };
        case CREATE:
        case LIKE:
            return { ...state, contacts: [ ...state.contacts, action.payload] };
        case UPDATE:
            return { ...state, contacts: state.contacts.map((contact) => (contact._id === action.payload._id ? action.payload : contact)) };
        case DELETE:
            return { ...state, contacts: state.contacts.filter((contact) => contact._id !== action.payload) };
        default:
            return state;
    }
}