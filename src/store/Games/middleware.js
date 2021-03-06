import axios from 'axios';
import { DISPLAY_GAMEINFO, DISPLAY_GAMES, DISPLAY_RECENT_GAMES, NEW_GAME, DELETE_GAME, GAME_HAND_INFO, UPDATE_GAME } from './actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  const { userData } = state.user;
  switch (action.type) {
    case UPDATE_GAME: {
      const { game } = action;
      const token = localStorage.getItem('secure_token');
      axios({
        method: 'PUT',
        url: `${process.env.API_URL}/games/update/${game.ownerId}`,
        data: game,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.success = res.data.message;
          axios({
            method: 'get',
            url: `${process.env.API_URL}/games/search/`,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
            .then((resp) => {
              action.games = resp.data.games;
              next(action);
            })
            .catch((err) => {
            })
        })
        .catch((err) => {
        });
      break;
    }
    case NEW_GAME: {
      const { game } = action;
      const token = localStorage.getItem('secure_token');
      game.ownerId = userData._id;
      axios({
        method: 'post',
        url: `${process.env.API_URL}/games/add/`,
        data: game,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.message = res.data.message;
          // mise à jour de la bibliothèque de jeu
          axios({
            method: 'get',
            url: `${process.env.API_URL}/games/search/${userData._id}`,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
            .then((resp) => {
              action.games = resp.data.games;
              next(action);
            })
            .catch((err) => {
              action.error = err.response.data.message || err;
            });
        })
        .catch((err) => {
          action.error = err.response.data.message || err;
        });
      break;
    }
    case DELETE_GAME: {
      const token = localStorage.getItem('secure_token');
      const { gameId } = action;

      axios({
        method: 'delete',
        url: `${process.env.API_URL}/games/delete/${gameId}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {

          action.message = res.data.message;

          axios({
            method: 'get',
            url: `${process.env.API_URL}/games/search/${userData._id}`,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
            .then((resp) => {

              action.games = resp.data.games;
              next(action);
            })
            .catch((err) => {
              action.error = err.response.data.message || err;
            });
        })
        .catch((err) => {
          action.error = err.response.data.message || err;
        });

      break;
    }
    case GAME_HAND_INFO: {
      next(action);
      break;
    }
    case DISPLAY_RECENT_GAMES: {
      const token = localStorage.getItem('secure_token');
      axios({
        method: 'get',
        url: `${process.env.API_URL}/steam/recent-games/${userData.steam_id}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.games = res.data.games;
          next(action);
        })
        .catch((err) => {
        });

      break;
    }
    case DISPLAY_GAMEINFO: {
      const { appid } = action;
      const token = localStorage.getItem('secure_token');
      axios({
        method: "get",
        url: `${process.env.API_URL}/steam/game/${appid}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.game = res.data.game.data;
          action.success = res.data.game.success;
          next(action);
        })
        .catch((err) => {
          action.error = err.response.data.message;
        });
      break;
    }
    case DISPLAY_GAMES: {
      const token = localStorage.getItem('secure_token');

      axios({
        method: 'get',
        url: `${process.env.API_URL}/games/search/${userData._id}/`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.games = res.data.games;
          next(action);
        })
        .catch((err) => {
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
