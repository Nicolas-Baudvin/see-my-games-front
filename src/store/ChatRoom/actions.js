export const CONNECT_TO_CHAT_GENERAL = "action-chat/CONNECT_TO_CHAT_GENERAL";
export const CONNECT_TO_CHAT_STEAM = "action-chat/CONNECT_TO_CHAT_STEAM";
export const CONNECT_TO_CHAT_OTHER = "action-chat/CONNECT_TO_CHAT_OTHER";
export const DISCONNECT_FROM_CHAT = "action-chat/DISCONNECT_FROM_CHAT";
export const SEND_MESSAGE = "action-chat/SEND_MESSAGE";
export const SEND_MESSAGE_STEAM = "action-chat/SEND_MESSAGE_STEAM";
export const SEND_MESSAGE_OTHER = "action-chat/SEND_MESSAGE_OTHER";
export const NEW_MESSAGE_GENERAL = "action-chat/NEW_MESSAGE_GENERAL";
export const NEW_MESSAGE_STEAM = "action-chat/NEW_MESSAGE_STEAM";
export const NEW_MESSAGE_OTHER = "action-chat/NEW_MESSAGE_OTHER";
export const GET_MESSAGES = "action-chat/GET_MESSAGE";
export const GET_STEAM_MESSAGES = "action-chat/GET_STEAM_MESSAGES";
export const GET_OTHER_MESSAGES = "action-chat/GET_OTHER_MESSAGES";
export const UPDATE_USERLIST_GENERAL = "action-chat/UPDATE_USERLIST_GENERAL";
export const UPDATE_USERLIST_STEAM = "action-chat/";
export const UPDATE_USERLIST_OTHER = "action-chat/";

export const updateGeneralList = (list) => ({
  type: UPDATE_USERLIST_GENERAL,
  list
});

export const updateSteamList = (list) => ({
  type: UPDATE_USERLIST_STEAM,
  list
});

export const updateOtherList = (list) => ({
  type: UPDATE_USERLIST_OTHER,
  list
});

export const connectToChatGeneral = () => ({
  type: CONNECT_TO_CHAT_GENERAL,
});

export const connectToChatSteam = () => ({
  type: CONNECT_TO_CHAT_STEAM
});

export const connectToChatOther = () => ({
  type: CONNECT_TO_CHAT_OTHER
});

export const disconnectFromChat = (chat) => ({
  type: DISCONNECT_FROM_CHAT,
  chat
});

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message
});

export const sendMessageSteam = (message) => ({
  type: SEND_MESSAGE_STEAM,
  message
});

export const sendMessageOther = (message) => ({
  type: SEND_MESSAGE_OTHER,
  message
});

export const newMessageGeneral = (message) => ({
  type: NEW_MESSAGE_GENERAL,
  message
});

export const newMessageSteam = (message) => ({
  type: NEW_MESSAGE_STEAM,
  message
});

export const newMessageOther = (message) => ({
  type: NEW_MESSAGE_OTHER,
  message
});

export const getMessages = () => ({
  type: GET_MESSAGES
});

export const getMessagesFromSteam = () => ({
  type: GET_STEAM_MESSAGES
});

export const getMessagesFromOther = () => ({
  type: GET_OTHER_MESSAGES
});
