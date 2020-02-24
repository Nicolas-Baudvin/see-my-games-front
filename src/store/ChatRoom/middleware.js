import axios from 'axios';
import socketIoClient from 'socket.io-client';
import {
  CONNECT_TO_CHAT_GENERAL,
  DISCONNECT_FROM_CHAT,
  SEND_MESSAGE,
  newMessageGeneral,
  GET_MESSAGES,
  getMessages,
  CONNECT_TO_CHAT_STEAM,
  CONNECT_TO_CHAT_OTHER,
  newMessageSteam,
  newMessageOther,
  getMessagesFromOther,
  getMessagesFromSteam,
  SEND_MESSAGE_STEAM,
  SEND_MESSAGE_OTHER,
  GET_STEAM_MESSAGES,
  GET_OTHER_MESSAGES,
  updateGeneralList,
  updateOtherList,
  updateSteamList,
  UPDATE_USERLIST_OTHER,
  SEND_PRIVATE_MESSAGE,
  CONNECT_TO_PRIVATE_CHAT,
  newPrivateMessage,
  SEND_GAME_TO_CHAT,
  newGameReceived
} from './actions';
import { success, fail } from "../Popup/actions";

let general;
let other;
let steam;
let io;
export default (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {
    case SEND_GAME_TO_CHAT: {
      switch (state.chat.currentChan) {
        case "Général": {
          general.emit("exchange_steamgame", {
            game: action.game,
            from: state.user.userData.username,
            avatar: state.user.userData.steam_avatar,
            chan: state.chat.currentChan
          });
          break;
        }
        case "Steam": {
          steam.emit("exchange_steamgame", { game: action.game, from: state.user.userData.username });
          break;
        }
        case "Autre": {
          other.emit("exchange_steamgame", { game: action.game, from: state.user.userData.username });
          break;
        }
        default: {
          break;
        }
      }
      next(action);
      break;
    }
    case SEND_PRIVATE_MESSAGE: {
      console.log(io.io);
      io.emit('private', action.message);
      next(action);
      break;
    }
    case CONNECT_TO_PRIVATE_CHAT: {
      io = socketIoClient(process.env.SOCKET_URL_PRIVATE);
      io.on("private", (message) => {
        store.dispatch(newPrivateMessage(message));
        next(action);
      });
      break;
    }
    /**
     * Connection au channel Général du chat
     */
    case CONNECT_TO_CHAT_GENERAL: {
      if (other) {
        other.disconnect();
      }
      if (steam) {
        steam.disconnect();
      }
      general = socketIoClient(process.env.SOCKET_URL_GENERAL);
      general.emit(
        "new_user",
        {
          username: state.user.userData.username,
          avatar: state.user.userData.steam_avatar,
        }
      );
      general.on("exchange_message", (message) => {
        store.dispatch(newMessageGeneral(message));
        next(action);
      });

      general.on("welcome_message", (message) => {
        store.dispatch(success(message));
        store.dispatch(getMessages());
        next(action);
      });

      general.on("error_message", (message) => {
        store.dispatch(fail(message));
        next(action);
      });

      general.on("update_userlist", (userlist) => {
        store.dispatch(updateGeneralList(userlist));
        next(action);
      });

      general.on("exchange_steamgame", (data) => {
        store.dispatch(newGameReceived(data));
        next(action);
      });
      break;
    }
    /**
     * Connection au channel Steam du chat
     */
    case CONNECT_TO_CHAT_STEAM: {
      if (other) {
        other.disconnect();
      }
      if (general) {
        general.disconnect();
      }
      steam = socketIoClient(process.env.SOCKET_URL_STEAM);
      steam.emit(
        "new_user",
        {
          username: state.user.userData.username,
          avatar: state.user.userData.steam_avatar,
        }
      );
      steam.on("exchange_message", (message) => {
        store.dispatch(newMessageSteam(message));
        next(action);
      });

      steam.on("welcome_message", (message) => {
        store.dispatch(success(message));
        store.dispatch(getMessagesFromSteam());
        next(action);
      });

      steam.on("error_message", (message) => {
        store.dispatch(fail(message));
        next(action);
      });

      steam.on("update_userlist", (userlist) => {
        store.dispatch(updateSteamList(userlist));
        next(action);
      });

      steam.on("exchange_steamgame", (data) => {
        store.dispatch(newGameReceived(data));
        next(action);
      });
      break;
    }
    /**
     * Connection au channel Other du chat
     */
    case CONNECT_TO_CHAT_OTHER: {
      if (general) {
        general.disconnect();
      }
      if (steam) {
        steam.disconnect();
      }
      other = socketIoClient(process.env.SOCKET_URL_OTHER);
      other.emit(
        "new_user",
        {
          username: state.user.userData.username,
          avatar: state.user.userData.steam_avatar,
        }
      );
      other.on("exchange_message", (message) => {
        store.dispatch(newMessageOther(message));
        next(action);
      });

      other.on("welcome_message", (message) => {
        store.dispatch(success(message));
        store.dispatch(getMessagesFromOther());
        next(action);
      });

      other.on("error_message", (message) => {
        store.dispatch(fail(message));
        next(action);
      });

      other.on("update_userlist", (userlist) => {
        store.dispatch(updateOtherList(userlist));
        next(action);
      });

      other.on("exchange_steamgame", (data) => {
        store.dispatch(newGameReceived(data));
        next(action);
      });
      break;
    }
    case UPDATE_USERLIST_OTHER: {
      next(action);
      break;
    }
    /**
     * Déconnexion du chat
     */
    case DISCONNECT_FROM_CHAT: {
      switch (action.chat) {
        case "Général": {
          general.disconnect();
          break;
        }
        case "Steam": {
          steam.disconnect();
          break;
        }
        case "Other": {
          other.disconnect();
          break;
        }
        default: {
          break;
        }
      }
      break;
    }
    case SEND_MESSAGE: {
      general.emit("exchange_message", {
        message: action.message,
        user: state.user.userData.username,
        avatar: state.user.userData.steam_avatar,
        chan: "Général"
      });
      next(action);
      break;
    }
    case SEND_MESSAGE_STEAM: {
      steam.emit("exchange_message", {
        message: action.message,
        user: state.user.userData.username,
        avatar: state.user.userData.steam_avatar,
        chan: "Steam"
      });
      next(action);
      break;
    }
    case SEND_MESSAGE_OTHER: {
      other.emit("exchange_message", {
        message: action.message,
        user: state.user.userData.username,
        avatar: state.user.userData.steam_avatar,
        chan: "Autre"
      });
      break;
    }
    case GET_MESSAGES: {
      const token = localStorage.getItem('secure_token');
      axios({
        url: `${process.env.API_URL}/chat/messages/`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.messages = res.data.messages;
          next(action);
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(fail(err.response.data.message));
        });
      break;
    }
    case GET_STEAM_MESSAGES: {
      const token = localStorage.getItem('secure_token');
      axios({
        url: `${process.env.API_URL}/chat/messages-steam/`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.messages = res.data.messages;
          next(action);
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(fail(err.response.data.message));
        });
      break;
    }
    case GET_OTHER_MESSAGES: {
      const token = localStorage.getItem('secure_token');
      axios({
        url: `${process.env.API_URL}/chat/messages-other/`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          action.messages = res.data.messages;
          next(action);
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(fail(err.response.data.message));
        });
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
