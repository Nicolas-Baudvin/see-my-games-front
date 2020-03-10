import {
  CONNECT_TO_CHAT_GENERAL,
  DISCONNECT_FROM_CHAT,
  NEW_MESSAGE_GENERAL,
  SEND_MESSAGE,
  GET_MESSAGES,
  CONNECT_TO_CHAT_OTHER,
  CONNECT_TO_CHAT_STEAM,
  SEND_MESSAGE_STEAM,
  SEND_MESSAGE_OTHER,
  NEW_MESSAGE_STEAM,
  NEW_MESSAGE_OTHER,
  GET_STEAM_MESSAGES,
  GET_OTHER_MESSAGES,
  UPDATE_USERLIST_GENERAL,
  UPDATE_USERLIST_STEAM,
  UPDATE_USERLIST_OTHER,
  NEW_PRIVATE_MESSAGE,
  SEND_PRIVATE_MESSAGE,
  CHANGE_CHAN,
  SEND_GAME_TO_CHAT,
  NEW_GAME_RECEIVED
} from "./actions";

const initialState = {
  messages: [],
  steamMessages: [],
  otherMessages: [],
  usersConnectedGeneral: [],
  usersConnectedOther: [],
  usersConnectedSteam: [],
  privateMessages: [],
  currentChan: 'Général'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME_RECEIVED: {
      switch (state.currentChan) {
        case "Général": {
          return {
            ...state,
            messages: [...state.messages, action.data]
          };
        }
        case "Steam": {
          return {
            ...state,
            steamMessages: [...state.steamMessages, action.data],
          };
        }
        case "Autre": {
          return {
            ...state,
            otherMessages: [...state.otherMessages, action.data]
          };
        }
        default: {
          return state;
        }
      }
    }
    case SEND_GAME_TO_CHAT: {
      return {
        ...state,
      };
    }
    case CHANGE_CHAN: {
      return {
        ...state,
        currentChan: action.chanName
      };
    }
    case SEND_PRIVATE_MESSAGE: {
      return {
        ...state,
        privateMessages: [...state.privateMessages, action.message]
      };
    }
    case NEW_PRIVATE_MESSAGE: {
      return {
        ...state,
        privateMessages: [...state.privateMessages, action.message]
      };
    }
    case CONNECT_TO_CHAT_GENERAL: {
      return {
        ...state,
        isConnectedToGeneral: true
      };
    }
    case CONNECT_TO_CHAT_OTHER: {
      return {
        ...state,
        isConnectedToOther: true,
      };
    }
    case CONNECT_TO_CHAT_STEAM: {
      return {
        ...state,
        isConnectedToSteam: true,
      };
    }
    case DISCONNECT_FROM_CHAT: {
      return {
        ...state,
      };
    }
    case NEW_MESSAGE_GENERAL: {
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    }
    case NEW_MESSAGE_STEAM: {
      return {
        ...state,
        steamMessages: [...state.steamMessages, action.message]
      };
    }
    case NEW_MESSAGE_OTHER: {
      return {
        ...state,
        otherMessages: [...state.otherMessages, action.message]
      };
    }
    case SEND_MESSAGE: {
      return {
        ...state,
      };
    }
    case SEND_MESSAGE_STEAM: {
      return {
        ...state,
      };
    }
    case SEND_MESSAGE_OTHER: {
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
    case GET_STEAM_MESSAGES: {
      return {
        ...state,
        steamMessages: action.messages || []
      };
    }
    case GET_OTHER_MESSAGES: {
      return {
        ...state,
        otherMessages: action.messages || []
      };
    }
    case UPDATE_USERLIST_GENERAL: {
      return {
        ...state,
        usersConnectedGeneral: action.list
      };
    }
    case UPDATE_USERLIST_STEAM: {
      return {
        ...state,
        usersConnectedSteam: action.list
      };
    }
    case UPDATE_USERLIST_OTHER: {
      return {
        ...state,
        usersConnectedOther: action.list
      };
    }
    default: {
      return state;
    }
  }
};
