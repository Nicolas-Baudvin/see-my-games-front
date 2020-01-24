import {
  CONNECT_TO_STEAM, LOGIN, SIGNUP, LINK_STEAM_ACCOUNT, DISCONNECT
} from "./actions";

const initalState = {

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
      return {
        ...state,
      };
    }
    case SIGNUP: {
      return {
        ...state,
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
