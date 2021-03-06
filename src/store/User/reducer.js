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
  UPDATE_PROFIL,
  NEW_AVATAR,
  CHECKING_SESSION
} from "./actions";

export const userData = JSON.parse(localStorage.getItem('user_data')) || localStorage.getItem('user_data');
export const token = localStorage.getItem('secure_token');

const initalState = {
  signupError: '',
  signupMessage: '',
  isConnected: !!(userData && token),
  isConnectedToSteam: userData ? userData.hasOwnProperty("steam_id") : false,
  loginError: '',
  loginMessage: '',
  userData: userData || '',
  usernameChanged: '',
  emailPassSent: '',
  emailSent: '',
};

export default (state = initalState, action) => {
  switch (action.type) {
    case NEW_AVATAR: {
      return {
        ...state,
        userData: action.user
      };
    }
    case CHECKING_SESSION: {
      if (action.err) {
        return {
          ...state,
          isConnected: false
        };
      }
      return state;
    }
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
        isConnected: false,
        isConnectedToSteam: false,
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
        isConnectedToSteam: true,
        userData: action.userData
      };
    }
    case DISCONNECT: {
      localStorage.clear();
      return {
        ...state,
        isConnected: false,
        isConnectedToSteam: false,
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
        isConnectedToSteam: "steam_id" in action.userData
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
