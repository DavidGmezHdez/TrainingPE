import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent, IonInput } from '@ionic/react';
import _ from 'lodash';

import React, { Component, useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Redirect} from "react-router-dom";
import {addEvent} from '../services/home.service'

const required = (value) =>{
    if(!value){
        return(
            <div className="aler alert-danger" role="alert">Es necesario llenar este campo</div>
        );
    }
}

const AddEvent = (props) => {

        const doRegisterEvent = (e) => {
            console.log("hola");

            const newEvent = new Event(_.random(100),document.getElementById('title').value,this.props.author,document.getElementById('desc').value,document.getElementById('dur').value,document.getElementById('date').value);
            addEvent(newEvent)
            .then((response) =>{
                console.log(response);
                //props.history.push("/home");
                //window.location.reload();   
            })
            .catch((err)=>{
                console.log("Error components/addevent: "+ err);
            });
        }


        return (
            <IonPage>
                <IonTitle>Inserte los datos del nuevo evento</IonTitle>
                <form onSubmit={doRegisterEvent}>
                    <IonLabel>Titulo</IonLabel>
                    <IonInput id="title" type="text"></IonInput>
                    <IonLabel>Description</IonLabel>
                    <IonInput id="desc" type="text"></IonInput>
                    <IonLabel>Duration</IonLabel>
                    <IonInput id="dur" type="number"></IonInput>
                    <IonLabel>Date</IonLabel>
                    <IonInput id="date" type="date"></IonInput>
                    <IonButton type="submit">
                        <span>Register new event</span>
                    </IonButton>
                </form>
            </IonPage>
        );
    
}

export default AddEvent;