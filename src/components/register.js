import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent, IonInput } from '@ionic/react';
import _ from 'lodash';

import React, { Component, useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Redirect, useHistory} from "react-router-dom";


import {register} from "../actions/auth.actions";

const required = (value) =>{
    if(!value){
        return(
            <div className="aler alert-danger" role="alert">Es necesario llenar este campo</div>
        );
    }
}

const Register = (props) =>{
    const {message} = useSelector(state => state.message);
    const [successful,setSuccessful] = useState(false);
    const history = useHistory();

    const dispatch = useDispatch();
    
    
    /*useEffect(()=>{
        if(successful){
            props.history.push("/login");
            window.location.reload();
            return <Redirect to="/login"/>;
        }
    },[]);
    */


    const doRegister = (e) =>{
        e.preventDefault();
        setSuccessful(false);

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let rol = "Usuario";

        dispatch(register(username,password,rol))
        .then(()=>{
            props.history.push("/login");
            window.location.reload();
            setSuccessful(true);
        })
        .catch((err)=>{
            console.log("Error: "+err);
            setSuccessful(false);
        });
    }

    return (
        <IonPage>
            <IonTitle>Bienvenido, por favor registrate</IonTitle>
            <form onSubmit={doRegister}>
                <IonLabel>Usuario</IonLabel>
                <IonInput type="text" className="form-control" id="username" name="username" validations={[required]}></IonInput>
                <IonLabel>Contraseña</IonLabel>
                <IonInput type="password" className="form-control" id ="password" name="password" validations={[required]}></IonInput>
                <IonButton type="submit">
                    <span>Registrarse</span>
                </IonButton>
                {message && (<IonItem className="alert alert-danger" role="alet">{message}</IonItem>)}
                
            </form>
        </IonPage>
    );
}

export default Register;