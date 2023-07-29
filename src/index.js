import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const userObject=[{
  name:'soju',
  age:32,
  contact:[{
    gmail:true,
    yahoo:false
  }]
}]
root.render(
  <React.StrictMode>
    <App json={userObject}/>
  </React.StrictMode>
);