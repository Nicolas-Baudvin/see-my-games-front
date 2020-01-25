import {
  CONNECT_TO_STEAM, LOGIN, SIGNUP, LINK_STEAM_ACCOUNT, DISCONNECT
} from "./actions";

const userData = localStorage.getItem('user_data');
const token = localStorage.getItem('secure_token');

const initalState = {
  signupError: '',
  signupMessage: '',
  isConnected: userData && token ? true : false,
  loginError: '',
  loginMessage: '',
  userData: userData ? userData : '',
};

export default (state = initalState, action) => {
  switch (action.type) {
    case LINK_STEAM_ACCOUNT: {
      return {
        ...state,
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
    case CONNECT_TO_STEAM: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
