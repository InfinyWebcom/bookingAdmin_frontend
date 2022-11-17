import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import App from "App";
import './App.css';
import 'assets/styles/index.css';
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <BrowserRouter>
  <ToastProvider>  
  <App/>
  </ToastProvider>
    
  </BrowserRouter>,
  document.getElementById("root")
);
