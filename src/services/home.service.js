
import Event from "../objects/event"

const API_URL = 'http://localhost:4000/events/';


// Este servicio nos permitira realizar todo el CRUD de los eventos almacenados en nuestra BD.

const axios = require('axios');

export const getElementos = async () =>{
    return axios.get(API_URL)
    .then((response) => {
        let events = [];
        response.data.map((single) =>{
            const eventObject = new Event(single._id,single.title,single.description,single.duration,single.date,single.createdAt,single.updatedAt);
            events.push(eventObject);
        })
        return events;
    })
}

export const addEvent = async (event) =>{
    return axios.post(API_URL+'add',event)
    .then((response) => console.log(response.data));
}

export const deleteEvent = async (id) =>{
    return axios.delete(API_URL+'events/'+id)
    .then((response) => console.log(response.data));
}

export const updateEvent = async (id,event) =>{
    console.log(event)
    return axios.post(API_URL + '/update/'+id,event)
    .then((response) => console.log(response.data));
}




