import { IonPage, IonContent, IonLoading,IonImg,IonHeader,IonButton,IonFooter,IonToolbar,IonLabel,IonItem,IonList, IonCardHeader,IonCard, IonCardTitle,IonTextarea, IonTitle, IonCardContent } from '@ionic/react';
import _ from 'lodash';

import { toJS } from 'mobx';
//import logo from '../assets/images/logo.svg';
import React, { Component } from 'react';
import Footer from '../components/footer'
import ModalEvents from '../pages/modals/newEventModal'
import {getElementos,deleteEvent} from '../services/home.service'
import {logout} from "../actions/auth";
import { useDispatch } from 'react-redux';

class Home extends Component {
	constructor(props) {
		super(props);
        this.isLoaded = false;
        this.state = {
			elementos: [],
            showLoading: true,
            showModal: false,
            modal: undefined,
            event: undefined,
        }
        this.elemento = 0;


	}
    
    componentDidMount() {
        this._getElements();
    }

    setShowModal(state) {
		this.setState(() => ({ showModal: state }));
	}

    aniadirElemento(){
        if(this.isLoaded){
            this.state.elementos.push(this.elemento);
            this.setState({elementos:this.state.elementos});
            this.elemento++;
        }
    }

    _getElements(){
        if(!this.isLoaded){
            getElementos().then((elements) =>{
                this.setState({elementos: elements});
            });
        }
    }

    _deleteElement(id){
        console.log(id);
        deleteEvent(id).then(()=>{
            this.setState({
                elementos: this.state.elementos.filter(el => el.idevent !== id)
            });
        })

    }
    //React native framework app mviles hibrida
    //MongoDB, robomongo, nodejs
//axios

    renderElementos(){
        let inputs = [];
            if(this.state.elementos){
                this.state.elementos.forEach(element => {
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
                                <IonButton onClick={() => { this._deleteElement(element.idevent)  }}>
                                    Delete event
                                </IonButton>
                                <IonButton onClick={() => { 		
                                this.setShowModal(true);
								this.selectModal(1,element);  }}>
                                    Update event
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                        
                    );
                });
            }

        return inputs;
    }

    setShowLoading(value) {
		this.setState({ showLoading: value });
	}

    selectModal(m,element) {
		this.setState(() => ({ modal: m, event:element}));
	}


    changeModalView() {
		switch (this.state.modal) {
			case 1:
				return <ModalEvents
                event = {this.state.event}
				showModal={this.state.showModal}
				onDidDismiss={(_v) => {
                    console.log(_v.event)
                    if(this.state.event){
                        console.log(this.state.event)
                        let updatedEvent = this.state.elementos.find(element => element.idevent === this.state.event.idevent);
                        let index = this.state.elementos.indexOf(updatedEvent);
                        console.log(updatedEvent,index);
                        this.state.elementos[index] = _v.event;
                    }
                    else{
                        this.state.elementos.push(_v.event);
                       
                    }
                    this.setState({elementos:this.state.elementos, event:undefined});

					this.setShowModal(false);
				  }}
           />;
			default:
				return null;
		}
	}

    doLogOut(){
        console.log("hola");
    }
    
    render() {
        return this.state.elementos ?(
            <IonPage>
                <IonButton
							class="pointerClass"
							key={'registerEvents'}
							onClick={() => {
								this.setShowModal(true);
								this.selectModal(1);
							}}
							>
                                Register Events
						</IonButton>
                {this.changeModalView()}
                {this.renderElementos()}
                <IonButton onClick={this.doLogOut()}>Logout</IonButton>
                <Footer />
            </IonPage>
        ):
        (
            <IonLoading
                isOpen={this.state.showLoading}
                onDidDismiss={() => this.setShowLoading(false)}
                duration={5000}
            />

        );
    }
}

export default Home;
