import React from 'react';
import ReactDOM from 'react-dom';
import MovieList from './movieList';
import MovieDetail from './movieDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route exact path="/">
            <MovieList />
          </Route>
          <Route exact path="/details/:id">
            <MovieDetail />
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

