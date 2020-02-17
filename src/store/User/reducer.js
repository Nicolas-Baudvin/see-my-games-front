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
      if (action.error) {
        return {
          ...state,
          passChangeError: action.error
        };
      }
      return {
        ...state,
        emailPassSent: action.success,
      };
    }
    case DELETE_ACCOUNT: {
      if (action.error) {
        return {
          ...state,
          deleteAccountError: action.error
        };
      }
      return {
        ...state,
        isConnected: '',
        isConnectedToSteam: '',
        userData: '',
      };
    }
    case UPDATE_EMAIL: {
      if (action.error) {
        return {
          ...state,
          updateEmailError: action.error
        };
      }
      return {
        ...state,
        emailSent: action.success
      };
    }
    case UPDATE_PROFIL: {
      if (action.error) {
        return { 
          ...state,
          updateProfilError: action.error
        };
      }
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
        userData: action.userData
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
        isConnectedToSteam: action.userData.hasOwnProperty("steam_id")
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
        userData: action.userData,
      };
    }
    default: {
      return state;
    }
  }
};
