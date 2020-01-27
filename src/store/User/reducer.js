import {
  IMPORT_GAMES, LOGIN, SIGNUP, LINK_STEAM_ACCOUNT, DISCONNECT, GET_GAMES
} from "./actions";

const userData = JSON.parse(localStorage.getItem('user_data')) || localStorage.getItem('user_data');
const token = localStorage.getItem('secure_token');

const initalState = {
  signupError: '',
  signupMessage: '',
  isConnected: userData && token ? true : false,
  isConnectedToSteam: typeof userData.steam_id !== 'undefined' || false,
  loginError: '',
  loginMessage: '',
  userData: userData ? userData : '',
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_GAMES: {
      break;
    }
    case LINK_STEAM_ACCOUNT: {
      return {
        ...state,
        steamSuccess: action.message,
        connectedToSteam: true,
      };
    }
    case DISCONNECT: {
      return {
        ...state,
      };
    }
    case LOGIN: {
      if (action.error) {
        return {
          ...state,
          loginError: action.error,
        };
      }
      return {
        ...state,
        userData: action.userData,
        isConnected: true,
      };
    }
    case SIGNUP: {
      if (action.error) {
        return {
          ...state,
          signupError: action.error
        };
      }
      return {
        ...state,
        signupMessage: action.success
      };
    }
    case IMPORT_GAMES: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
