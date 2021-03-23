import { IonCol, IonContent, IonFooter, IonLabel, IonTitle, IonToolbar,IonRow } from '@ionic/react';
//import logo from '../assets/images/logo.svg';
import React, { Component } from 'react';

class Footer extends React.Component {
    render() {
      return (
        <IonFooter>
            <IonToolbar>
                    <IonCol>
                    <IonLabel>
                        David Gomez
                    </IonLabel>
                    </IonCol>
                    <IonCol>
                    <IonLabel>
                        Who'd let the dogs out?
                    </IonLabel>

                    </IonCol>
            </IonToolbar>
        </IonFooter>
      );
    }
  }
export default Footer;