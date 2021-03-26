import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList,IonCol, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent, IonGrid, IonRow } from '@ionic/react';
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
        const [elements,setElements] = useState([]);
        const [showButtons,setShowButtons] = useState(false);
        const [showModal,setShowModal] = useState(false);
        const [element,setElement] = useState("");
        const [modal,setModal] = useState(0);
        const [formVisibility,setFormVisibility] = useState("none");

        const dispatch = useDispatch();


        useEffect(() => {
            if(currentUser){
                setShowButtons(currentUser.user.rango==="Administrador");
            }

        },[currentUser]);

        useEffect(() => {
            _getElements(); 
        },[]);


        const _getElements = () =>{
            getElementos()
            .then((elements) =>{
                    setElements(elements);
            })
            .catch((err)=>{
                console.log("Error en getElements: " + err);
            });   
        }

        const _deleteElement = (id) =>{
            console.log(id);
            deleteEvent(id).then(()=>{
                setElements(elements.filter(el => el.idevent !== id));
            })
        }


        const selectModal = (m,element) =>{
            setModal(m);
            setElement(element)
        }

        const toggleForm = (id) =>{
            if(document.getElementById("contenido"+id).style.display === "none"){
                document.getElementById("contenido"+id).style.display = "block";
                document.getElementById("boton"+id).innerHTML = "Ocultar"
            }
            else if(document.getElementById("contenido"+id).style.display === "block"){
                document.getElementById("contenido"+id).style.display = "none";
                document.getElementById("boton"+id).innerHTML = "Comentar"
            }
    

        }
    
    
        const changeModalView = () =>{
            switch (modal) {
                case 1:
                    return <ModalEvents
                    event = {element}
                    author = {currentUser.user.username}
                    showModal={showModal}
                    onDidDismiss={(_v) => {
                        console.log(_v.event)
                        if(element){
                            console.log(element)
                            console.log(_v.event)
                            let updatedEvent = elements.find(findelement => findelement.idevent === element.idevent);
                            let index = elements.indexOf(updatedEvent);
                            console.log(updatedEvent,index);
                            elements[index] = _v.event;
                        }
                        else{
                            elements.push(_v.event);
                        }
                        setElements(elements);
                        setElement(undefined);
                        setShowModal(false);
                      }}
               />;
                default:
                    return null;
            }
        }

        const renderElements = () =>{
            let inputs = [];
                elements.forEach(element => {
                        let idboton = "boton"+element.idevent;
                        let idcontenido = "contenido"+element.idevent;
                        console.log(element);
                        inputs.push(
                            <IonCard key={element.idevent}>
                                <IonCardHeader>
                                    <IonCardHeader>
                                        <IonCardTitle>{element.title}</IonCardTitle>
                                        </IonCardHeader>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonItem>
                                        <IonLabel>Description</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonTextarea disabled={true}>{element.description}</IonTextarea>
                                    </IonItem>
                                        
                                   
                                    
                                    <IonItem>
                                        <IonLabel>Duracion</IonLabel>
                                        <IonLabel>{element.duration} horas</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Fecha</IonLabel>
                                        <IonLabel>{element.date} horas</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Posteado por {element.author}</IonLabel>
                                    </IonItem>

                                    
                                    

                                    {(showButtons || (currentUser && element.author === currentUser.user.username)) && (
                                        <IonItem>
                                            <IonButton onClick={() => { 
                                                _deleteElement(element.idevent)  
                                            }}>
                                                Delete event
                                            </IonButton>
                                            <IonButton onClick={() => { 		
                                            setShowModal(true);
                                            selectModal(1,element);  
                                            }}>
                                                Update event
                                            </IonButton>
                                        </IonItem>
                                    )}

                                    {currentUser && (
                                        <IonRow>
                                            <IonCol>
                                                <IonButton
                                                id={idboton}
                                                onClick={() => { 		
                                                    toggleForm(element.idevent);
                                                    }}
                                                >
                                                    Comentar
                                                </IonButton>
                                            </IonCol>
                                            <IonCol>
                                                <form id={idcontenido} style={{display:formVisibility}}>
                                                <IonTextarea id="text-area-comentario"disabled={false}></IonTextarea>
                                                    <IonButton type="submit">Enviar comentario</IonButton>
                                                </form>
                                            </IonCol>
                                        </IonRow>
                                       

                                    )}

                                </IonCardContent>
                            </IonCard>
                            
                        );
                    });
            return inputs;
        }
        

        return(
            <IonPage>
                {currentUser && (
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
                )}
                
                {changeModalView()}
                <IonGrid>
                    {renderElements()}
                </IonGrid>
            </IonPage>
        )
}

export default Home;
