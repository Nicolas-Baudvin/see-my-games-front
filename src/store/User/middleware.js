import axios from 'axios';
import {
  CONNECT_TO_STEAM, DISCONNECT, LOGIN, SIGNUP, LINK_STEAM_ACCOUNT
} from './actions';

export default (store) => (next) => (action) => {
  const state = store.getState();
  const API_LINK = "http://localhost:5000/api";
  axios.defaults.baseURL = API_LINK;

  switch (action.type) {
    case LOGIN: {
      next(action);
      break;
    }
    case SIGNUP: {
      const data = action.data;
      axios({
        method: 'POST',
        url: `${API_LINK}/auth/signup/`,
        data,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      next(action);
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
