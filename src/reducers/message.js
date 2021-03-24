import {SET_MESSAGE, CLEAR_MESSAGE} from "../actions/types"

// Este reducer actualiza el estado del mensaje cuando una accion dispatch desde cualquier parte de la aplicacion

const initialState = {};

export default function (state = initialState, action){
    const {type,payload} = action;

    switch(type){
        case SET_MESSAGE:
            return {message: payload};
        
        case CLEAR_MESSAGE:
            return {message: ""};
        
        default:
            return state;
    }
}

