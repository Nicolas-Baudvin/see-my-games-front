import axios from 'axios';
import { DISPLAY_GAMEINFO, DISPLAY_GAMES, DISPLAY_RECENT_GAMES } from './actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  const API_LINK = "http://localhost:5000/api";
  const { userData } = state.user;
  switch (action.type) {
    case DISPLAY_RECENT_GAMES: {
      axios({
        method: 'get',
        url: `${API_LINK}/steam/recent-games/${userData.steam_id}`
      })
        .then((res) => {
          console.log(res);
          action.games = res.data.games;
          next(action);
        })
        .catch((err) => {
          console.log(err);
        });

      break;
    }
    case DISPLAY_GAMEINFO: {
      next(action);
      break;
    }
    case DISPLAY_GAMES: {
      console.log('Affichage de jeux en cours ...', userData.steam_id);
      const token = localStorage.getItem('secure_token');

      axios({
        method: 'get',
        url: `${API_LINK}/games/search/${userData._id}/`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          action.games = res.data.games;
          next(action);
        })
        .catch((err) => {
          console.log(err.response);
          action.error = err.response.data.message;
        });

      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
