import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';

const movieStore = createStore(reducer,applyMiddleware(thunk));
console.log('Created STORE ==> [index.js]', movieStore);

const movieBrowserApp = (<Provider store={movieStore}><React.StrictMode><Routes /></React.StrictMode></Provider>);
ReactDOM.render(
  movieBrowserApp,
  document.getElementById('root')
);

