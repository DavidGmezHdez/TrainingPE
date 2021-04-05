// Usamos un reducer composition

import {combineReducers} from "redux";
import auth from "./auth.reducer";
import events from "./events.reducer";
import comments from "./comments.reducer";
import message from "./message";

export default combineReducers({
    events,
    comments,
    auth,
    message
});

