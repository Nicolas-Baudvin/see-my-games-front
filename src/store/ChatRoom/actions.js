export const CONNECT_TO_CHAT = "action-chat/CONNECT_TO_CHAT";
export const DISCONNECT_FROM_CHAT = "action-chat/DISCONNECT_FROM_CHAT";
export const SEND_MESSAGE = "action-chat/SEND_MESSAGE";
export const NEW_MESSAGE = "action-chat/NEW_MESSAGE";
export const GET_MESSAGES = "action-chat/GET_MESSAGE";

export const connectToChat = (url) => ({
  type: CONNECT_TO_CHAT,
  url
});

export const disconnectFromChat = () => ({
  type: DISCONNECT_FROM_CHAT,
});

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message
});

export const newMessage = (message) => ({
  type: NEW_MESSAGE,
  message
});

export const getMessages = () => ({
  type: GET_MESSAGES
});
