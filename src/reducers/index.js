// Usamos un reducer composition

import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";

export default combineReducers({
    auth,
    message
});

