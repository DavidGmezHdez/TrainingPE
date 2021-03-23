
import Event from "../core/objects/event"

const axios = require('axios');

export const getElementos = async (id) =>{
    return axios.get('http://localhost:4000/events/')
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
    return axios.post('http://localhost:4000/events/add',event)
    .then((response) => console.log(response.data));
}

export const deleteEvent = async (id) =>{
    return axios.delete('http://localhost:4000/events/'+id)
    .then((response) => console.log(response.data));
}

export const updateEvent = async (id,event) =>{
    console.log(event)
    return axios.post('http://localhost:4000/events/update/'+id,event)
    .then((response) => console.log(response.data));
}



