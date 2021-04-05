// Esto crea las acciones relacionadas con la autenticicación. Importamos AuthService para hacer peticiones HTTP asincronas con trigger de uno o mas dispatches en el resultado

import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE} from "./types";

import AuthService from "../services/auth.service";

/* Register
*   Llama a AuthService.register(username,password,rol)
*   dispatch REGISTER_SUCCESS y SET_MESSAGE si ha sido correcto
*   dispatch REGISTER_FAIL y SET_MESSAGE si ha fallado
*/

export const register = (username,password,rol) => (dispatch) =>{

    return AuthService.register(username,password,rol)
    .then((response) =>{
            dispatch({
                type: REGISTER_SUCCESS
            });
            dispatch({
                type: SET_MESSAGE,
                payload: response.message
            });
            console.log(Promise);
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response || error.response.data || error.response.message || error.message || error.toString());
            dispatch({
                type: REGISTER_FAIL
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        }
    )
    .catch((err)=>{
        console.log("Error actions/auth.js: " + err); 
    })
};

/*  LOGIN
*   llama a AuthService.login con el username y el password
* dispatch si ha sido correcto o si ha fallado
*/
export const login = (username,password) => (dispatch) =>{
    return AuthService.login(username,password)
    .then(
        (data) =>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user:data}
            });
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response || error.response.data || error.response.message || error.message || error.toString());
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        }
    )
};

export const logout = () => (dispatch) =>{
    AuthService.logout();
    dispatch({
        type: LOGOUT
    });
};




