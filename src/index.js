import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Store from "./hooks/store";

function StrechApp() {

  return (
    <Store>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Store>
  )
}
ReactDOM.render(<StrechApp />, document.getElementById('root'));

reportWebVitals()
serviceWorker.unregister();