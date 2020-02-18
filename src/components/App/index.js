/**
 * Imports de dépendances
 */
import React from 'react';
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
import GameLibrary from 'src/components/GameLibrary';
import Login from '../Login';
import Signup from '../Signup';
import Account from '../Account';
import GamePage from '../GamePage';
import Popup from '../Popup';
import ChatRoom from '../ChatRoom';
// Données
// Styles et assets
import './app.scss';

/**
 * Code
 */
const App = () => {
  const { isConnected } = useSelector((state) => state.user);
  const { message, isSuccess, visible } = useSelector((state) => state.popup);

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
          <Route exact path="/mon-compte/">
            {
              !isConnected && <Redirect from="/mon-compte/" to="/" />
            }
            {
              isConnected && <Account />
            }
          </Route>
          <Route exact path="/mes-jeux/">
            {
              !isConnected && <Redirect from="/mes-jeux/" to="/" />
            }
            {
              isConnected && <GameLibrary />
            }
          </Route>
          <Route exact path="/mes-jeux/:appid">
            {
              !isConnected && <Redirect from="/mes-jeux/:appid" to="/" />
            }
            {
              isConnected && <GamePage />
            }
          </Route>
          <Route>
            {
              !isConnected && <Redirect from="/chatroom/" to="/" />
            }
            {
              isConnected && <ChatRoom />
            }
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
    <Popup visible={visible} isSuccess={isSuccess} message={message} />
  </Router>;
};

/**
 * Export
 */
export default App;
