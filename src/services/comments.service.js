import Comment from "../objects/comment"
import axios from "axios";
import _ from 'lodash';

const API_URL = 'http://localhost:4000/';


const addComment = (comment) =>{axios.post(`${API_URL}comments/add`,comment).then((response) =>response.data);}

const getComments = () =>{
    axios.get(`${API_URL}comments/`)
    .then((response) => {
        const comments = _.map(response.data,function(single){return new Comment(single._id,single.idevent,single.author,single.comment,single.createdAt,single.updatedAt)})
        console.log(comments);
        localStorage.setItem("events",JSON.stringify(comments));
        return comments;
    });
}

const deleteComment = (id) =>{ axios.delete(`${API_URL}comments/${id}`).then((response) => response.data);}

export default{
    addComment,
    getComments,
    deleteComment,
}

