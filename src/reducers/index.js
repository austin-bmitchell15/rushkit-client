import { combineReducers } from "redux";

import contacts from './contacts.js';
import auth from "./auth.js";

export default combineReducers({
    contacts, auth
});