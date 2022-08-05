import { FETCH_ALL, FETCH_CONTACT, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, STOP_LOADING } from "../constants/actionTypes";

export default (state = { isLoading:true, contacts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading:true };
        case STOP_LOADING:
            return { ...state, isLoading:false };
        case FETCH_ALL:
            return {
                ...state,
                contacts: action.payload.contacts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_CONTACT:
            return { ...state, contact: action.payload };
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