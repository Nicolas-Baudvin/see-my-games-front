import axios from 'axios';
import {
  IMPORT_GAMES, DISCONNECT, LOGIN, SIGNUP, LINK_STEAM_ACCOUNT, GET_GAMES
} from './actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  const API_LINK = "http://localhost:5000/api";

  switch (action.type) {
    case GET_GAMES: {
      next(action);
      break;
    }
    case LOGIN: {
      axios({
        method: 'POST',
        url: `${API_LINK}/auth/login/`,
        data: action.data
      })
        .then((res) => {
          console.log(res);
          action.userData = {
            ...res.data
          };
          localStorage.setItem('secure_token', res.data.token); // TODO: Préférer mettre le token dans un cookie httpOnly
          localStorage.setItem('user_data', JSON.stringify(action.userData));
          next(action);
        })
        .catch((err) => {
          const { status, data } = err.response;
          switch (status) {
            case 400: {
              action.error = data;
              next(action);
              break;
            }
            case 401: {
              action.error = data;
              next(action);
              break;
            }
            case 500: {
              action.error = "Le serveur rencontre un problème. Réessayez ou prévenez l'administrateur du site.";
              next(action);
              break;
            }
            default: {
              next(action);
              break;
            }
          }
        });

      break;
    }
    case SIGNUP: {
      axios({
        method: 'POST',
        url: `${API_LINK}/auth/signup/`,
        data: action.data,
      })
        .then((res) => {
          console.log(res);
          action.success = res.data.message;
          next(action);
        })
        .catch((err) => {
          console.log(err.response.status);
          const { status, data } = err.response;
          switch (status) {
            case 400: {
              action.error = "Ce pseudo ou cet email existe déjà";
              next(action);
              break;
            }
            case 403: {
              action.error = data.message;
              next(action);
              break;
            }
            case 500: {
              action.error = "Le serveur rencontre un problème. Réessayez ou prévenez l'administrateur du site.";
              next(action);
              break;
            }
            default: {
              next(action);
              break;
            }
          }
        });
      break;
    }
    case LINK_STEAM_ACCOUNT: {
      const steamid = action.data;
      const { userData } = state.user;
      axios({
        method: 'get',
        url: `${API_LINK}/steam/summaries/${steamid}/${userData._id}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('user_data', JSON.stringify(res.data.user));
          action.message = res.data.message;
          next(action);
        })
        .catch((err) => {
          console.log(err);
        });

      break;
    }
    case DISCONNECT: {
      next(action);
      break;
    }
    case IMPORT_GAMES: {
      const { userData } = state.user;

      axios({
        method: "get",
        url: `${API_LINK}/steam/games/${userData.steam_id}/${userData._id}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      }).then((res) => {
        console.log(res);
        localStorage.setItem('user_data', JSON.stringify(res.data.user));
        next(action);
      })
        .catch((err) => {
          console.log(err);
        });

      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
