import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context,{ fireBaseContext} from './store/Contexts'
import {firebasedb} from './Firebase/config'
ReactDOM.render(
  <React.StrictMode>
    <fireBaseContext.Provider value={{ firebasedb }}>
    <Context>
    <App />    
    </Context>
    </fireBaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


