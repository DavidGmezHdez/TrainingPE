import { IonApp } from '@ionic/react';
import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Redirect,
	Route,
} from 'react-router-dom';

import Login from "./components/login"
import Home from './pages/home'

import './assets/styles/App.css';

class App extends Component {
	render() {
    return (
      <IonApp>
        <Router>
							<Route name="home" path="/home" component={Home} />
              <Route name="login" path="/login" component={Login} />
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
        </Router>
      </IonApp>
    );
	}
}

export default App;

