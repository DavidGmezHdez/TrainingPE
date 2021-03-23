import { buildQueries } from '@testing-library/dom';
import React, { Component } from 'react';


class BD extends Component{
    constructor(props){
        super(props);
    }


    getElemento(id){
        fetch('https://jsonplaceholder.typicode.com/posts/'+id)
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    getElementos(id){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

}

export default BD;