import axios from 'axios';
import {
  IMPORT_GAMES, DISCONNECT, LOGIN, SIGNUP, LINK_STEAM_ACCOUNT, GET_GAMES, UPDATE_PROFIL, UPDATE_EMAIL, DELETE_ACCOUNT, UPDATE_PASSWORD, disconnect
} from './actions';
import { success, fail } from '../Popup/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  const API_LINK = "http://localhost:5000/api";

  switch (action.type) {
    case UPDATE_PASSWORD: {
      const { password, confPassword } = action;
      const { userData } = state.user;
      const token = localStorage.getItem('secure_token');
      console.log(userData);

      axios({
        method: 'post',
        url: `${API_LINK}/auth/change-password/`,
        data: {
          password,
          confPassword,
          userId: userData._id
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          action.success = res.data.message;
          store.dispatch(success(res.data.message));
          next(action);
        })
        .catch((err) => {
          console.log(err.response);
          action.error = err.response.data.message;
          store.dispatch(success(err.response.data.message));
        });


      break;
    }
    case DELETE_ACCOUNT: {
      const { userData } = state.user;

      axios({
        method: 'delete',
        url: `${API_LINK}/auth/delete/`,
        data: {
          userId: userData._id,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          action.success = res.data.message;
          store.dispatch(disconnect());
          store.dispatch(success(res.data.message));
          next(action);
        })
        .catch((err) => {
          console.log(err);
          action.error = err.response.data.message;
          store.dispatch(success(err.response.data.message));
          next(action);
        });

      break;
    }
    case UPDATE_EMAIL: {
      const { email, confEmail } = action;
      const { userData } = state.user;
      const token = localStorage.getItem('secure_token');
      console.log(userData);

      axios({
        method: 'post',
        url: `${API_LINK}/auth/change-email/`,
        data: {
          email,
          confEmail,
          userId: userData._id
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          action.success = res.data.message;
          next(action);
        })
        .catch((err) => {
          console.log(err.response);
          action.error = err.response.data.message;
        });
      break;
    }
    case UPDATE_PROFIL: {
      const { newUsername } = action;
      const { userData } = state.user;
      const token = localStorage.getItem('secure_token');
      axios({
        method: 'post',
        url: `${API_LINK}/auth/update/`,
        data: {
          newUsername,
          id: userData._id
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem('user_data', JSON.stringify(res.data.user));
          action.success = res.data.message;
          action.user = res.data.user;
          next(action);
        })
        .catch((err) => {
          console.log(err.response);
          action.error = err.response.data.message;
        });
      break;
    }
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
          store.dispatch(success("Vous êtes désormais connecté"));
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
          store.dispatch(success(res.data.message));
          next(action);
        })
        .catch((err) => {
          console.log(err.response.status);
          const { status, data } = err.response;
          switch (status) {
            case 400: {
              action.error = "Ce pseudo ou cet email existe déjà";
              store.dispatch(fail(action.error));
              next(action);
              break;
            }
            case 403: {
              action.error = data.message;
              store.dispatch(fail(action.error));
              next(action);
              break;
            }
            case 500: {
              action.error = "Le serveur rencontre un problème. Réessayez ou prévenez l'administrateur du site.";
              store.dispatch(fail(action.error));
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
      store.dispatch(success("Vous avez été déconnecté avec succès."));
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
