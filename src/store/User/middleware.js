import axios from 'axios';
import {
  CONNECT_TO_STEAM, DISCONNECT, LOGIN, SIGNUP, LINK_STEAM_ACCOUNT
} from './actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  const API_LINK = "http://localhost:5000/api";

  switch (action.type) {
    case LOGIN: {
      axios({
        method: 'POST',
        url: `${API_LINK}/auth/login/`,
        data: action.data
      })
        .then((res) => {
          console.log(res);
          action.userData = {
            username: res.data.username,
            id: res.data.userId,
            email: res.data.email
          };
          localStorage.setItem('secure_token', res.data.token); // TODO: Préférer mettre le token dans un cookie httpOnly
          localStorage.setItem('user_data', res.data.username);
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
      next(action);
      break;
    }
    case DISCONNECT: {
      next(action);
      break;
    }
    case CONNECT_TO_STEAM: {
      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
