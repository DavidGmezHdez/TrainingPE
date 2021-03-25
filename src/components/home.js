import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent } from '@ionic/react';
import _ from 'lodash';

import { toJS } from 'mobx';
import Footer from '../components/footer'
import ModalEvents from '../pages/modals/newEventModal'
import {getElementos,deleteEvent} from '../services/home.service'
import {logout} from "../actions/auth";
import React, { Component, useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Home = (props) => {
        const {user: currentUser} = useSelector((state) => state.auth);
        
        const dispatch = useDispatch();

        if(!currentUser){
            return <Redirect to="/login"/>
        }
        
        
        const doLogOut = (e) => {
            dispatch(logout());
            props.history.push("/login");
            window.location.reload();
            /*.then(()=>{
                console.log("adios logueado")
                props.history.push("/login");
                window.location.reload();
            })
            .catch((err)=>{
                console.log("Error en components/home.js: " + err)
            })*/
            
            
        }

        return(
            <IonPage>
                <IonHeader>
                    Hola, estas en el home
                </IonHeader>
                <IonButton onClick={doLogOut}>Logout</IonButton>
            </IonPage>

        )
    
}

export default Home;





        /*useEffect(() => {
            _getElements();
        });



        const aniadirElemento = () =>{
            if(isLoaded){
                setElementos(elementos);
            }
        }

        const _getElements = () =>{
            if(!isLoaded){
                getElementos().then((elements) =>{
                    setElementos(elements)
                });
            }
        }

        const _deleteElement = (id) =>{
            console.log(id);
            deleteEvent(id).then(()=>{
                setElementos(elementos.filter(el => el.idevent !== id));
            })
        }


    
        const selectModal = (m,element) =>{
            setModal(m);
            setEvent(element)
        }
    
    
        const changeModalView = () =>{
            switch (modal) {
                case 1:
                    return <ModalEvents
                    event = {event}
                    showModal={showModal}
                    onDidDismiss={(_v) => {
                        console.log(_v.event)
                        if(event){
                            console.log(event)
                            let updatedEvent = elementos.find(element => element.idevent === event.idevent);
                            let index = elementos.indexOf(updatedEvent);
                            console.log(updatedEvent,index);
                            elementos[index] = _v.event;
                        }
                        else{
                            elementos.push(_v.event);
                           
                        }
                        setElementos(elementos);
                        setEvent(undefined);
                        setShowModal(false);
                      }}
               />;
                default:
                    return null;
            }
        }
    
    

        if (!isLoggedIn){
            return <Redirect to="/login"/>;
        }

        const renderElementos = () =>{
            let inputs = [];
                if(elementos){
                    elementos.forEach(element => {
                        inputs.push(
                            <IonCard key={element.idevent}>
                                <IonCardHeader>
                                    <IonCardHeader>
                                        <IonCardTitle>{element.title}</IonCardTitle>
                                        </IonCardHeader>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonLabel>Description</IonLabel>
                                    <IonTextarea disabled={true}>{element.description}</IonTextarea>
                                    <IonButton onClick={() => { _deleteElement(element.idevent)  }}>
                                        Delete event
                                    </IonButton>
                                    <IonButton onClick={() => { 		
                                    setShowModal(true);
                                    selectModal(1,element);  }}>
                                        Update event
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                            
                        );
                    });
                }
    
            return inputs;
        }

        return elementos ?(
            <IonPage>
                <IonButton
							class="pointerClass"
							key={'registerEvents'}
							onClick={() => {
								setShowModal(true);
								selectModal(1);
							}}
							>
                                Register Events
						</IonButton>
                {changeModalView()}
                {renderElementos()}
                <IonButton onClick={doLogOut()}>Logout</IonButton>
                <Footer />
            </IonPage>
        ):
        (
            <IonLoading
                isOpen={showLoading()}
                onDidDismiss={() => setShowLoading(false)}
                duration={5000}
            />

        );
        */
