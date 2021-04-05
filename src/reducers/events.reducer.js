// Este reducer se encarga de actualizar el isLoggedIn y el user state de la aplicacion
import {POST_EVENT_REQUEST, POST_EVENT_SUCCESS, POST_EVENT_FAIL, GET_EVENT_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAIL, DELETE_EVENT_REQUEST, 
    DELETE_EVENT_SUCCESS, DELETE_EVENT_FAIL, SET_MESSAGE, CLEAR_MESSAGE} from "../actions/types";

import _ from 'lodash';

const events = JSON.parse(localStorage.getItem("events"));
const initialState = events ? {eventsRetrieved: true, events} : {eventsRetrieved: false, events:null};

export default function (state = initialState, action){
    const {type,payload} = action;

    switch (type){
        case POST_EVENT_SUCCESS:
            const newEvents = state.events.push(payload.event);
            console.log(newEvents);
            return {...state,event:newEvents};
        
        case POST_EVENT_FAIL:
            return {...state};

        case GET_EVENTS_SUCCESS:
            return {...state,events:payload};
        
        case GET_EVENTS_FAIL:
            return state;
        
        case DELETE_EVENT_REQUEST:
            return state;    

        case DELETE_EVENT_SUCCESS:
            const id = payload;
            const filtered = _.filter(state.events,el => el._id !== id);
            return {...state,events:filtered};
        
        case DELETE_EVENT_FAIL:
            return {...state};

        default:
            return state;
    }
}