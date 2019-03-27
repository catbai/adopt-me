import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './css/index.css';
import Result from './Result';
import Details from './Details'
import * as serviceWorker from './serviceWorker';
import SearchParams from "./SearchParams";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Result} exact />
    <Route path="/details/:id" component={Details} exact />
    <Route path="/search-params" component={SearchParams} exact />
  </BrowserRouter >, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
