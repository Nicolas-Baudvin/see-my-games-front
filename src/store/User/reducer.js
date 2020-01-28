import {
  IMPORT_GAMES,
  LOGIN,
  SIGNUP,
  LINK_STEAM_ACCOUNT,
  DISCONNECT,
  GET_GAMES,
  UPDATE_PASSWORD,
  DELETE_ACCOUNT,
  UPDATE_EMAIL,
  UPDATE_PROFIL
} from "./actions";

const userData = JSON.parse(localStorage.getItem('user_data')) || localStorage.getItem('user_data');
const token = localStorage.getItem('secure_token');

const initalState = {
  signupError: '',
  signupMessage: '',
  isConnected: userData && token ? true : false,
  isConnectedToSteam: userData ? userData.hasOwnProperty("steam_id") : false,
  loginError: '',
  loginMessage: '',
  userData: userData ? userData : '',
  usernameChanged: '',
  emailPassSent: '',
  emailSent: '',
};

export default (state = initalState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD: {
      return {
        ...state,
        emailPassSent: action.success,
      };
    }
    case DELETE_ACCOUNT: {
      return {
        ...state,
        isConnected: '',
        isConnectedToSteam: '',
        userData: '',
      };
    }
    case UPDATE_EMAIL: {
      return {
        ...state,
      };
    }
    case UPDATE_PROFIL: {
      return {
        ...state,
        usernameChanged: action.success,
        userData: action.user
      };
    }
    case GET_GAMES: {
      return {
        ...state,
      };
    }
    case LINK_STEAM_ACCOUNT: {
      return {
        ...state,
        steamSuccess: action.message,
        connectedToSteam: true,
      };
    }
    case DISCONNECT: {
      localStorage.clear();
      return {
        ...state,
        isConnected: '',
        isConnectedToSteam: '',
        userData: '',
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
