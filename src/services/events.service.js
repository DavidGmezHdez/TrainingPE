import Event from "../objects/event"
import authHeader from "./auth-headers";
import axios from "axios";
import _ from 'lodash';

const API_URL = 'http://localhost:4000/';



// Este servicio nos permitira realizar todo el CRUD de los eventos almacenados en nuestra BD.

const getElementos = () =>axios.get(`${API_URL}events/`,{headers: authHeader()}).then((response) => response.data);

const addEvent = (event) =>axios.post(`${API_URL}events/add`,event).then((response) => response.data);

const deleteEvent = (id) => axios.delete(`${API_URL}events/${id}`).then((response) => response.data);

const updateEvent = async (id,event) =>{axios.post(`${API_URL}events/${id}`,event).then((response) => response.data);}

export default{
    getElementos,
    addEvent,
    deleteEvent,
    updateEvent,
}