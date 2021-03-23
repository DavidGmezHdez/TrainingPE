import { buildQueries } from '@testing-library/dom';
import React, { Component } from 'react';


export class Core {
    constructor(bd){
        this.nombre = "Hola";
        this.bd = bd;
    }

    async getElemento (id){
        try {
            let elementos;
            if(id.isInteger()){
                elementos = await this.bd.getElemento(id)
                return elementos;
            }
			    
            else{
                alert("El id pasado no es un entero");
            }
		} catch (err) {
			console.error(err);
			return err;
		}
    }

    async getElementos(){
        try {
            let elementos = await this.bd.getElementos()
            return elementos;
		} catch (err) {
			console.error(err);
			return err;
		}
    }
}

export default Core;