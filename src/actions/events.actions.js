// Esto crea las acciones relacionadas con la autenticicación. Importamos AuthService para hacer peticiones HTTP asincronas con trigger de uno o mas dispatches en el resultado

import {POST_EVENT_REQUEST, POST_EVENT_SUCCESS, POST_EVENT_FAIL, GET_EVENT_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAIL, DELETE_EVENT_REQUEST, 
    DELETE_EVENT_SUCCESS, DELETE_EVENT_FAIL, SET_MESSAGE, CLEAR_MESSAGE} from "./types";

import EventService from "../services/events.service";

export const addEvent = (event) => (dispatch) =>{
    dispatch({
        type: POST_EVENT_REQUEST
    });
    dispatch({
        type: SET_MESSAGE,
        payload: "Request para añadir evento solicitada"
    });

    return EventService.addEvent(event)
    .then((response) => {
        dispatch({
            type: POST_EVENT_SUCCESS,
            payload: response.event
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
            type: POST_EVENT_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })
}

export const updateEvent = (event) => (dispatch) =>{
    dispatch({
        type: POST_EVENT_REQUEST
    });
    dispatch({
        type: SET_MESSAGE,
        payload: "Request para update evento solicitada"
    });

    return EventService.updateEvent(event)
    .then((response) => {
        dispatch({
            type: POST_EVENT_SUCCESS
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
            type: POST_EVENT_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })
}

export const getElements = () => (dispatch) =>{
    dispatch({
        type: GET_EVENT_REQUEST
    });
    dispatch({
        type: SET_MESSAGE,
        payload: "Request para get eventos solicitada"
    });

    return EventService.getElementos()
    .then((response) => {
        
        dispatch({
            type: GET_EVENTS_SUCCESS,
            payload: response
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
            type: GET_EVENTS_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })
}

export const deleteEvent = (id) => (dispatch) =>{
    dispatch({
        type: DELETE_EVENT_REQUEST
    });
    dispatch({
        type: SET_MESSAGE,
        payload: "Request para delete evento solicitada"
    });

    return EventService.deleteEvent(id)
    .then((response) => {
        dispatch({
            type: DELETE_EVENT_SUCCESS,
            payload: id
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
            type: DELETE_EVENT_FAIL
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })
}




