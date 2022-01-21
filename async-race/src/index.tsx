import React from 'react';
import ReactDOM from 'react-dom';
import './scss/normalize.scss';
import './index.scss';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';

/* basename="/nikitakorevo-JSFE2021Q3/async-race" */
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
