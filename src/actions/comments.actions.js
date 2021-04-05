// Esto crea las acciones relacionadas con la autenticicación. Importamos AuthService para hacer peticiones HTTP asincronas con trigger de uno o mas dispatches en el resultado

import {POST_COMMENT_REQUEST, POST_COMMENT_SUCCESS, POST_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAIL, DELETE_COMMENT_REQUEST, 
    DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL, SET_MESSAGE, CLEAR_MESSAGE} from "./types";

import CommentService from "../services/comments.service";

export const addComment = (comment) => (dispatch) =>{
    dispatch({
        type: POST_COMMENT_REQUEST
    });
    dispatch({
        type: SET_MESSAGE,
        payload: "Request para añadir comentario solicitada"
    });

    return CommentService.addEvent(comment)
    .then((response) => {
        dispatch({
            type: POST_COMMENT_SUCCESS
        });
        dispatch({
            type: SET_MESSAGE,
            payload: response.message
        });
        console.log(Promise);
        return Promise.resolve();
    },
    (error) => {
        const message =  error.response?.data || error.response?.message;
        dispatch({
            type: POST_COMMENT_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })
}

export const getComments = () => (dispatch) =>{
    dispatch({
        type: GET_COMMENT_REQUEST
    });
    dispatch({
        type: SET_MESSAGE,
        payload: "Request para get comentarios solicitada"
    });

    return CommentService.getComments()
    .then((response) => {
        dispatch({
            type: GET_COMMENTS_SUCCESS
        });
        dispatch({
            type: SET_MESSAGE,
            payload: response.message
        });
        console.log(Promise);
        return Promise.resolve();
    },
    (error) => {
        console.exception(error);
        const message =  error.response?.data || error.response?.message;
        dispatch({
            type: GET_COMMENTS_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })
}

export const deleteComment = (id) => (dispatch) =>{
    dispatch({
        type: DELETE_COMMENT_REQUEST
    });
    dispatch({
        type: SET_MESSAGE,
        payload: "Request para delete evento solicitada"
    });

    return CommentService.deleteComment(id)
    .then((response) => {
        dispatch({
            type: DELETE_COMMENT_SUCCESS
        });
        dispatch({
            type: SET_MESSAGE,
            payload: response.message
        });
        console.log(Promise);
        return Promise.resolve();
    },
    (error) => {
        const message =  error.response?.data || error.response?.message;
        dispatch({
            type: DELETE_COMMENT_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })
}




