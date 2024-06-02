import React from "react"
import ReactDOM from 'react-dom/client';
import App from "./App.js"
import axios from "axios"
import {Provider} from "react-redux"
import store from "../src/redux/store/store.js";
import {positions,Provider as AlertProvider, transitions} from "react-alert";
import AlertTempate from "react-alert-template-basic"
axios.defaults.withCredentials = true;

 
const options = {
  timeout: 5000 ,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTempate} {...options} >

    <App />

    </AlertProvider>
    
  </Provider>
);