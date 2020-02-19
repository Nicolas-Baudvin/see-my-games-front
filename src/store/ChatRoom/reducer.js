import { CONNECT_TO_CHAT, DISCONNECT_FROM_CHAT, NEW_MESSAGE, SEND_MESSAGE, GET_MESSAGES } from "./actions";

const initialState = {
  isConnected: false,
  messages: [],
  steamMessages: [],
  otherMessages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_TO_CHAT: {
      return {
        ...state,
        isConnected: true
      };
    }
    case DISCONNECT_FROM_CHAT: {
      return {
        ...state,
      };
    }
    case NEW_MESSAGE: {
      console.log(action.message, state);
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    }
    case SEND_MESSAGE: {
      return {
        ...state,
      };
    }
    case GET_MESSAGES: {
      return {
        ...state,
        messages: action.messages || []
      };
    }
    default: {
      return state;
    }
  }
};
