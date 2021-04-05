import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent, IonInput } from '@ionic/react';
import _ from 'lodash';

import React, { Component, useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Redirect} from "react-router-dom";
import {addEvent} from '../actions/events.actions'

const required = (value) =>{
    if(!value){
        return(
            <div className="aler alert-danger" role="alert">Es necesario llenar este campo</div>
        );
    }
}

const AddEvent = (props) => {
        const {message} = useSelector(state => state.message);
        const {user: currentUser} = useSelector((state) => state.auth);
        const dispatch = useDispatch();

        const doRegisterEvent = (e) => {
            const newEv = {"title": document.getElementById('title').value,"author": currentUser.user.username, "description": document.getElementById('desc').value, "duration": document.getElementById('dur').value, "date": document.getElementById('date').value};
            dispatch(addEvent(newEv))
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
                    <IonButton type="submit" >
                        <span>Register new event</span>
                    </IonButton>
                </form>
            </IonPage>
        );
    
}

export default AddEvent;