import React from 'react';
import MovieList from './movieList';
import MovieDetail from './movieDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class Routes extends React.Component {
    render() {
      return(
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
      )
    }
  }
  
  export default Routes;

