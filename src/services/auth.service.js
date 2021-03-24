
import axios from 'axios';
const API_URL = 'http://localhost:4000/users/';

// Este servicio hará las requests HTTP y el Local Storage para la informacion del usuario y el JWT

const register = async (username,password,rol) =>{
    return axios.post(API_URL + 'register',{
        username,password,rol
    }) 
    .then((response) => console.log(response.data));
}

const login = async (username,password) =>{
    console.log(username,password);
    return axios.post(API_URL + 'login',{
        username,password
    }) 
    .then((response) => {
        if (response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data));
        return response.data;
    });
}

const logout = async (id) =>{
    localStorage.removeItem("user");
}

export default{
    register,
    login,
    logout,
}
