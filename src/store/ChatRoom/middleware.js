import axios from 'axios';
import socketIoClient from 'socket.io-client';
import {
  CONNECT_TO_CHAT, DISCONNECT_FROM_CHAT, SEND_MESSAGE, NEW_MESSAGE, newMessage, GET_MESSAGES, getMessages
} from './actions';
import { success, fail } from "../Popup/actions";

let socket;
export default (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {
    case CONNECT_TO_CHAT: {
      socket = socketIoClient(process.env.SOCKET_URL);
      socket.emit(
        "new_user",
        {
          username: state.user.userData.username,
        }
      );
      socket.on("exchange_message", (message) => {
        store.dispatch(newMessage(message));
        next(action);
      });

      socket.on("welcome_message", (message) => {
        store.dispatch(success(message));
        store.dispatch(getMessages());
        next(action);
      });

      socket.on("error_message", (message) => {
        store.dispatch(fail(message));
        next(action);
      });
      break;
    }
    case DISCONNECT_FROM_CHAT: {
      socket.disconnect();
      next(action);
      break;
    }
    case NEW_MESSAGE: {
      next(action);
      break;
    }
    case SEND_MESSAGE: {
      socket.emit("exchange_message", {
        message: action.message,
        user: state.user.userData.username,
        avatar: state.user.userData.steam_avatar
      });
      next(action);
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
          console.log(res.data.messages);
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
