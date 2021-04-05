import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent, IonInput } from '@ionic/react';
import _ from 'lodash';

import React, { Component, useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Redirect} from "react-router-dom";
import {login} from "../actions/auth.actions";

const required = (value) =>{
    if(!value){
        return(
            <div className="aler alert-danger" role="alert">Es necesario llenar este campo</div>
        );
    }
}

const Login = (props) => {
        const {isLoggedIn} = useSelector(state => state.auth);
        const {message} = useSelector(state => state.message);

        const dispatch = useDispatch();

        const doLogin = (e) => {
            e.preventDefault();

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            
            dispatch(login(username,password))
            .then(()=>{
                console.log("hola logueado")
                props.history.push("/home");
                window.location.reload();
            })
            .catch((err)=>{
                console.log("Error components/login: "+ err);
            });
        }


        return (
            <IonPage>
                <IonTitle>Bienvenido, por favor logueate</IonTitle>
                <form onSubmit={doLogin}>
                    <IonLabel>Usuario</IonLabel>
                    <IonInput type="text" className="form-control" id="username" name="username" validations={[required]}></IonInput>
                    <IonLabel>Contraseña</IonLabel>
                    <IonInput type="password" className="form-control" id ="password" name="password" validations={[required]}></IonInput>
                    <IonButton type="submit">
                        <span>Login</span>
                    </IonButton>
                    {message && (<IonItem className="alert alert-danger" role="alet">{message}</IonItem>)}
                </form>
            </IonPage>
        );
    
}

export default Login;