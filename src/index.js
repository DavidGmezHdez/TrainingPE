import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import { Provider } from 'mobx-react';
import App from './App';
import Core from './core/core';
import reportWebVitals from './reportWebVitals';
import BD from './core/bd';

let bd = new BD();
let core = new Core(bd);
ReactDOM.render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
