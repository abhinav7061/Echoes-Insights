import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from "react-router-dom";
import { UserContext } from './context/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContext>
    <BrowserRouter >
      <App />
    </BrowserRouter >
  </UserContext>
)