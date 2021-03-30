
import Event from "../objects/event"
import Comment from "../objects/comment"
import authHeader from "./auth-headers";
import axios from "axios";

const API_URL = 'http://localhost:4000/';



// Este servicio nos permitira realizar todo el CRUD de los eventos almacenados en nuestra BD.

export const getElementos = async () =>{
    return axios.get(API_URL+'events/',{
        headers: authHeader()
    })
    .then((response) => {
        let events = [];
        response.data.map((single) =>{
            const eventObject = new Event(single._id,single.title,single.author,single.description,single.duration,single.date,single.createdAt,single.updatedAt);
            events.push(eventObject);
        })
        return events;
    })
}

export const addEvent = async (event) =>{
    console.log(event);
    return axios.post(API_URL+'events/add',event)
    .then((response) => response.data);
}

export const deleteEvent = async (id) =>{
    return axios.delete(API_URL+'events/'+id)
    .then((response) => response.data);
}

export const updateEvent = async (id,event) =>{
    console.log(event)
    return axios.post(API_URL + 'events/update/'+id,event)
    .then((response) => response.data);
}

export const addComment = async (comment) =>{
    console.log(comment);
    return axios.post(API_URL+'comments/add',comment)
    .then((response) =>response.data);
}

export const getComments = async (id) =>{
    console.log(id);
    return axios.get(API_URL+'comments/')
    .then((response) => {
        let comments = [];
        response.data.forEach((single) =>{
            const commentObject = new Comment(single._id,single.idevent,single.author,single.comment,single.createdAt,single.updatedAt);
            comments.push(commentObject);
        })
        console.log(comments);
        return comments;
    })
}

export const deleteComment = async (id) =>{
    return axios.delete(API_URL+'comments/'+id)
    .then((response) => response.data);
}

