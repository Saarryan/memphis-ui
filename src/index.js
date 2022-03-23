import './style.scss';

import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

import reportWebVitals from './reportWebVitals';
import Store from './hooks/store';
import App from './App';

function StrechApp() {
    return (
        <Store>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Store>
    );
}
ReactDOM.render(<StrechApp />, document.getElementById('root'));

reportWebVitals();
