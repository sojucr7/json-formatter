import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const userObject={  
  "employee": {  
      "name":       "sonoo",   
      "salary":      56000,   
      "married":    true  
  }  
}  
root.render(
  <React.StrictMode>
    <App json={userObject}/>
  </React.StrictMode>
);