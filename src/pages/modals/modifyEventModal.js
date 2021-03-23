import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent, IonModal, IonGrid, IonInput } from '@ionic/react';
import _ from 'lodash';
import React, { Component } from 'react';
import Event from '../../core/objects/event'
import {addEvent} from '../../core/actions'



class ModalEvents extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: true,
            event: undefined
        };
    }

    setShowModal(state){
        this.setState(() => ({ showModal: state }));
    }

    _doModifyEvent(){
        try {
			if (
				document.getElementById('title').value === '' ||
				document.getElementById('desc').value === '' ||
				document.getElementById('dur').value === '' ||
				document.getElementById('date').value === ''
			) {
				alert(
					'Los campos titulo, descripcion, duracion y fecha deben de estar rellenos'
				);
			} else {
                this.state.event = new Event(_.random(100),document.getElementById('title').value,document.getElementById('desc').value,document.getElementById('dur').value,document.getElementById('date').value);
                this.setState({event: this.state.event});
                console.log(this.state.event);
                addEvent(this.state.event).then((response) =>{
                    console.log(response)
                });
			}
		} catch (e) {
			this.setState(() => ({ showErrorToast: true, errMsg: e.message }));
		}
    }


    render(){
        return (<IonModal key={_.random(1000)}backdropDismiss="true" isOpen={this.props.showModal}>
                    <IonGrid>
                        <IonLabel>Titulo</IonLabel>
                        <IonInput id="title" value={this.props.event.title} type="text"></IonInput>

                        <IonLabel>Description</IonLabel>
                        <IonInput id="desc" value={this.props.event.description} type="text"></IonInput>

                        <IonLabel>Duration</IonLabel>
                        <IonInput id="dur" value={this.props.event.duration} type="number"></IonInput>
                        
                        <IonLabel>Date</IonLabel>
                        <IonInput id="date" value={this.props.event.date} type="date"></IonInput>

                        <IonButton onClick={()=>{
                            console.log("nuevo evento")
                            this._doModifyEvent();
                            this.setShowModal(false);
                            this.props.onDidDismiss({ state: this.state.showModal, event: this.state.event });
                        }}>Registrar Evento</IonButton>
                        <IonButton
                        onClick={()=>{
                            console.log("cancelar")
                            this.setShowModal(false);
                            this.props.onDidDismiss({ state: this.state.showModal });
                        }}>
                            Cancelar
                        </IonButton>

                    </IonGrid>
                </IonModal>
            );
    }
}


export default ModalEvents;

