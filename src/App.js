import { IonApp } from '@ionic/react';
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

const App =() =>{

  const {user:currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /*useEffect(()=>{
    history.listen((location) => {
      dispatch(clearMessage());
    });
  },[dispatch]);
  */

  const logOut = () =>{
    dispatch(logout());
  }


  return (
    <Provider store={store}>
      <IonApp>
        <Router>
          <Switch>
              <Route name="home" path="/home" component={Home} />
              <Route name="login" exact path="/login" component={Login} />
              <Route name="register" exact path="/register" component={Register} />
          </Switch>

        </Router>
      </IonApp>
    </Provider>

  );
	
}

export default App;

