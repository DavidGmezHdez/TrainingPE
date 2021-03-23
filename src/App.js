import { IonApp } from '@ionic/react';
import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Redirect,
	Route,
} from 'react-router-dom';

import Home from './pages/home'

import './assets/styles/App.css';

class App extends Component {
	render() {
    return (
      <IonApp>
        <Router>
							<Route name="home" path="/home" component={Home} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
        </Router>
      </IonApp>
    );
	}
}

export default App;

