// Este reducer se encarga de actualizar el isLoggedIn y el user state de la aplicacion
import {POST_COMMENT_REQUEST, POST_COMMENT_SUCCESS, POST_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAIL, DELETE_COMMENT_REQUEST, 
    DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL, SET_MESSAGE, CLEAR_MESSAGE} from "../actions/types";

const comments = JSON.parse(localStorage.getItem("comments"));
const initialState = comments ? {commentsRetrieved: true, comments} : {commentsRetrieved: false, comments:null};

export default function (state = initialState, action){
    const {type,payload} = action;

    switch (type){
        case POST_COMMENT_SUCCESS:
            return {...state,comments:payload.comments};
        
        case POST_COMMENT_FAIL:
            return {...state};

        case GET_COMMENTS_SUCCESS:
            return {...state,comments:payload.comments};
        
        case GET_COMMENTS_SUCCESS:
            return {...state,comments:null};
        
        case DELETE_COMMENT_SUCCESS:
            return {...state};
        
        case DELETE_COMMENT_FAIL:
            return {...state};

        default:
            return state;
    }
}