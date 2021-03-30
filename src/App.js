import { IonApp, IonButton, IonContent, IonHeader, IonItem,IonLabel, IonNav, IonPage, IonToolbar } from '@ionic/react';
import React, { Component, useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";
import{Provider} from "react-redux";
import store from "./store";



import Login from "./components/login";
import Register from "./components/register";
import Home from './components/home';

import {history} from "./helpers/history";
import './assets/styles/App.css';
import AddEvent from './components/addEvent';

const App =() =>{

  const {user:currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /*useEffect(()=>{
    history.listen((location) => {
      dispatch(clearMessage());
    });
  },[dispatch]);
  */

  const doLogOut = (e) => {
    dispatch(logout());      
}

  return (
    <Provider store={store}>
      <IonApp>
        <Router>
            <IonToolbar>
            <IonButton>
              <Link to={"/home"}>Home</Link>
            </IonButton>
            
            {currentUser ? (
              <IonItem>
                <IonLabel>Bienvenido {currentUser.user.username}</IonLabel>
                <IonButton onClick={doLogOut}>
                  <a href="/login">Logout</a>
                  </IonButton>
              </IonItem>

            ):
              <IonItem>
                <IonButton>
                  <Link to={"/login"}>
                      Login
                  </Link>
                  </IonButton>
                  <IonButton>
                  <Link to={"/register"}>
                      Sign up
                  </Link>
                  </IonButton>
              </IonItem>
              
            }

          </IonToolbar>
          <Switch>
              <Route exact name="home" path={["/","/home"]} component={Home} />
              <Route name="login" exact path="/login" component={Login} />
              <Route name="register" exact path="/register" component={Register} />
              <Route name="addevent" exact path="/addevent" component={AddEvent} />
          </Switch>
        </Router>
      </IonApp>
    </Provider>

  );
	
}

export default App;

