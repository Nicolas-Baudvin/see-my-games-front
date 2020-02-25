export const LOGIN = "action-user/LOGIN";
export const SIGNUP = "action-user/SIGNUP";
export const DISCONNECT = "action-user/DISCONNECT";
export const IMPORT_GAMES = "action-user/IMPORT_GAMES";
export const LINK_STEAM_ACCOUNT = "action-user/LINK_STEAM_ACCOUNT";
export const GET_GAMES = "action-user/GET_GAMES";
export const UPDATE_PROFIL = "action-user/UPDATE_PROFIL";
export const UPDATE_PASSWORD = "action-user/UPDATE_PASSWORD";
export const UPDATE_EMAIL = "action-user/UPDATE_EMAIL";
export const DELETE_ACCOUNT = "action-user/DELETE_ACCOUNT";
export const NEW_AVATAR = "action-user/NEW_AVATAR";

export const newAvatar = (avatar) => ({
  type: NEW_AVATAR,
  avatar
});

export const login = (username, password) => ({
  type: LOGIN,
  data: {
    username,
    password
  }
});
export const signUp = (username, password, confPassword, email) => ({
  type: SIGNUP,
  data: {
    username,
    password,
    confPassword,
    email
  }
});
export const disconnect = () => ({
  type: DISCONNECT,
});
export const importGames = () => ({
  type: IMPORT_GAMES,
});
export const linkSteamAccount = (data) => ({
  type: LINK_STEAM_ACCOUNT,
  data
});
export const updateProfil = (newUsername) => ({
  type: UPDATE_PROFIL,
  newUsername
});
export const updatePassword = (password, confPassword) => ({
  type: UPDATE_PASSWORD,
  password,
  confPassword
});
export const updateEmail = (email, confEmail) => ({
  type: UPDATE_EMAIL,
  email,
  confEmail
});
export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});
