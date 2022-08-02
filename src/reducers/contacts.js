import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

export default (contacts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
        case LIKE:
            return [ ...contacts, action.payload];
        case UPDATE:
            return contacts.map((contacts) => (contacts._id === action.payload._id ? action.payload : contacts));
        case DELETE:
            return contacts.filter((contacts) => contacts._id !== action.payload);
        default:
            return contacts;
    }
}