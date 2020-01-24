/**
 * Imports de dépendances
 */
import React from 'react';
import {
 Link, BrowserRouter as Router, Switch, Route 
} from 'react-router-dom';

/**
 * Imports locaux
 */
// Composants React
import Footer from 'src/components/Footer/';
import Header from 'src/components/Header/';
import HomePage from 'src/components/HomePage/';
import Login from '../Login';
// Données
// Styles et assets
import './app.scss';
import Signup from '../Signup';

/**
 * Code
 */
const App = () => {
  return <Router>
    <div id="app">
      <div className="background">
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/connexion/">
            <Login visible />
          </Route>
          <Route exact path="/inscription/">
            <Signup visible />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>;
};

/**
 * Export
 */
export default App;
