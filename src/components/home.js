import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList,IonCol, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent, IonGrid, IonRow } from '@ionic/react';
import _ from 'lodash';

import { toJS } from 'mobx';
import Footer from '../components/footer'
import ModalEvents from '../pages/modals/newEventModal'
import {getElementos,deleteEvent,addComment,getComments, deleteComment} from '../services/home.service'
import {logout} from "../actions/auth";
import Comment from "../objects/comment";
import React, { Component, useState, useRef, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Home = (props) => {
        const {user: currentUser} = useSelector((state) => state.auth);
        const [elements,setElements] = useState([]);
        const [comments,setComments] = useState([]);
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

        const _getElements = () =>{
            getElementos()
            .then((elements) =>{
                setElements(elements);
            })
            .catch((err)=>{
                console.log("Error en getElements: " + err);
            });   
        }

        const _getComments = () =>{

            getComments()
            .then((comms) =>{
                setComments(comms);
            })
            .catch((err)=>{
                console.log("Error en getComments: " + err);
            });   
        }

        useEffect(() => {
            _getElements();
            _getComments(); 
        },[]);

        const _deleteElement = (id) =>{
            console.log(id);
            deleteEvent(id).then(()=>{
                setElements(_.filter(elements,function(el){
                    return el.idevent !== id;
                }));
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
                document.getElementById("cajacoment"+id).value = "";
                document.getElementById("contenido"+id).style.display = "none";
                document.getElementById("boton"+id).innerHTML = "Comentar"
            }
    

        }
    
        //debounce lodash
        //use callback para el filtro y useReducer 
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
                            let index = _.findIndex(elements, function(findelement){
                                return findelement.idevent === element.idevent;
                            })
                            console.log(updatedEvent,index);
                            elements[index] = _v.event;
                            console.log(updatedEvent,index,elements[index]);
                        }
                        else{
                            setElements([...elements,_v.event]);
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

        const doComment = (idevent,usuario) =>{
            
            const newComment = new Comment (_.random(100),idevent,usuario,document.getElementById("cajacoment"+idevent).value);
            console.log(newComment);
            toggleForm(idevent);
            addComment(newComment)
            .then((response) =>{
                console.log(response);
                const commentBD = new Comment (response.comment._id,response.comment.idevent,response.comment.author,response.comment.comment,response.comment.createdAt,response.comment.updatedAt);
                setComments([...comments,commentBD]);
            })
            .catch((err)=>{
                console.log("Error en addComment: " + err);
            }); 
        }

        const _deleteComment = (id) =>{
            console.log(id);
            deleteComment(id).then(()=>{
                setComments(_.filter(comments,function(comm){
                    return comm.idcomment !== id;
                }));
            })
        }



        const renderElements = () =>{
            let inputs = [];
            _.forEach(elements, function(element){
                let idboton = "boton"+element.idevent;
                let idcontenido = "contenido"+element.idevent;
                let idcajacomentario = "cajacoment"+element.idevent;
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

                            
                            

                            {(currentUser && (element.author === currentUser.user.username || currentUser.user.rango === "Administrador")) && (
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
                                        <IonRow id={idcontenido} style={{display:formVisibility}}>
                                        <IonTextarea id={idcajacomentario} disabled={false}></IonTextarea>
                                            <IonButton type="submit"
                                            onClick={()=>{
                                                doComment(element.idevent,currentUser.user.username);
                                            }}>
                                                Enviar comentario
                                            </IonButton>
                                        </IonRow>
                                    </IonCol>
                                </IonRow>
                                

                            )}

                            </IonCardContent>
                        </IonCard>  
                    );

                    
                    inputs.push(
                        <IonTitle key={_.random(1000)}>Comentarios</IonTitle>
                    )

                    _.forEach(comments, function(comment){
                        if(comment.idevent === element.idevent){
                            inputs.push(    
                                <IonItem key={comment.idcomment}>
                                    <IonCol>
                                        <IonLabel>{comment.comment}</IonLabel>
                                    </IonCol>
                                    <IonCol>
                                        <IonLabel>Posteado por {comment.author}</IonLabel>
                                    </IonCol>
                                    {(currentUser && (comment.author === currentUser.user.username || currentUser.user.rango === "Administrador")) && (
                                    <IonItem>
                                        <IonButton onClick={() => { 
                                            _deleteComment(comment.idcomment)  
                                        }}>
                                            Delete comment
                                        </IonButton>
                                        <IonButton>
                                            Update event
                                        </IonButton>
                                    </IonItem>
                                )}
                                </IonItem>
                            );
                        }
                    });  
                });
            return inputs;
        }
        

        return(
            <IonPage>
                {currentUser && (
                    <IonRow>
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
                        <IonButton>
                            <Link to={"/addevent"}>Register event new page</Link>
                        </IonButton>
                    </IonRow>


                )}
                
                {changeModalView()}
                <IonGrid>
                    {renderElements()}
                </IonGrid>
            </IonPage>
        )
}

export default Home;
