import axios from 'axios';
import {
  IMPORT_GAMES,
  DISCONNECT,
  LOGIN,
  SIGNUP,
  LINK_STEAM_ACCOUNT,
  UPDATE_PROFIL,
  UPDATE_EMAIL,
  DELETE_ACCOUNT,
  UPDATE_PASSWORD,
  disconnect,
  NEW_AVATAR,
  CHECKING_SESSION
} from './actions';
import { success, fail } from '../Popup/actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case CHECKING_SESSION: {
      const token = localStorage.getItem("secure_token");
      axios({
        method: "get",
        url: `${process.env.API_URL}/auth/session-checker/${state.user.userData._id}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          // session ok
          next(action);
        })
        .catch((err) => {
          store.dispatch(disconnect());
          store.dispatch(fail("Votre session a expiré, veuillez vous reconnecter"));
          next(action);
        });
      next(action);
      break;
    }
    case NEW_AVATAR: {
      const token = localStorage.getItem('secure_token');
      const { avatar } = action;
      axios({
        method: 'post',
        url: `${process.env.API_URL}/auth/new-avatar/`,
        data: avatar,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((resp) => {
          const { user } = resp.data;
          localStorage.setItem('user_data', JSON.stringify(user));
          action.user = user;
          next(action);
        })
        .catch((err) => {
          action.error = err.response.data.message;
          store.dispatch(fail("L'upload de votre image n'a pas pu être effectué. Réessayez ou contacter l'administrateur. (ne fonctionne uniquement pour les images png, jpg, gif"))
          next(action);
        });
      break;
    }
    case UPDATE_PASSWORD: {
      const { password, confPassword } = action;
      const { userData } = state.user;
      const token = localStorage.getItem('secure_token');

      axios({
        method: 'post',
        url: `${process.env.API_URL}/auth/change-password/`,
        data: {
          password,
          confPassword,
          userId: userData._id
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.success = res.data.message;
          store.dispatch(success(res.data.message));
          next(action);
        })
        .catch((err) => {
          action.error = err.response.data.message;
          store.dispatch(success(err.response.data.message));
        });


      break;
    }
    case DELETE_ACCOUNT: {
      const { userData } = state.user;
      const token = localStorage.getItem('secure_token');

      axios({
        method: 'delete',
        url: `${process.env.API_URL}/auth/delete/`,
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
          action.success = res.data.message;
          store.dispatch(disconnect());
          store.dispatch(success(res.data.message));
          next(action);
        })
        .catch((err) => {
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

      axios({
        method: 'post',
        url: `${process.env.API_URL}/auth/change-email/`,
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
          action.success = res.data.message;
          next(action);
        })
        .catch((err) => {
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
        url: `${process.env.API_URL}/auth/update/`,
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
          localStorage.setItem('user_data', JSON.stringify(res.data.user));
          action.success = res.data.message;
          action.user = res.data.user;
          next(action);
        })
        .catch((err) => {
          action.error = err.response.data.message;
        });
      break;
    }
    case LOGIN: {
      axios({
        method: 'POST',
        url: `${process.env.API_URL}/auth/login/`,
        data: action.data
      })
        .then((res) => {
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
              action.error = data.message;
              next(action);
              break;
            }
            case 401: {
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
    case SIGNUP: {
      axios({
        method: 'POST',
        url: `${process.env.API_URL}/auth/signup/`,
        data: action.data,
      })
        .then((res) => {
          action.success = res.data.message;
          store.dispatch(success(res.data.message));
          next(action);
        })
        .catch((err) => {
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
              action.error = "Le serveur rencontre un problème. Réessayez ou prévenez l'administrateur du site.";
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
        url: `${process.env.API_URL}/steam/summaries/${steamid}/${userData._id}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      })
        .then((res) => {
          localStorage.setItem('user_data', JSON.stringify(res.data.user));
          action.userData = res.data.user;
          store.dispatch(success("Votre compte steam est désormais relié à votre compte SMG"));
          next(action);
        })
        .catch((err) => {
          action.error = err.response.data.message;
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
      const token = localStorage.getItem('secure_token');

      axios({
        method: "get",
        url: `${process.env.API_URL}/steam/games/${userData.steam_id}/${userData._id}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        localStorage.setItem('user_data', JSON.stringify(res.data.user));
        action.userData = res.data.user;
        store.dispatch(success("Vos jeux ont été importé !"));
        next(action);
      })
        .catch((err) => {
          action.err = err.response.data.message;
        });

      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
