/**
 * Imports de dépendances
 */
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';

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

  const { isConnected } = useSelector((state) => state.user);
  useEffect(() => {

  }, []);
  return <Router>
    <div id="app">
      <div className="background">
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/connexion/">
            {
              isConnected && <Redirect from="/connexion/" to="/" />
            }
            {
              !isConnected && <Login visible />
            }
          </Route>
          <Route exact path="/inscription/">
            {
              isConnected && <Redirect from="/inscription/" to="/" />
            }
            {
              !isConnected && <Signup visible />
            }
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
