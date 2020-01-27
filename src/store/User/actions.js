export const LOGIN = "action-user/LOGIN";
export const SIGNUP = "action-user/SIGNUP";
export const DISCONNECT = "action-user/DISCONNECT";
export const IMPORT_GAMES = "action-user/IMPORT_GAMES";
export const LINK_STEAM_ACCOUNT = "action-user/LINK_STEAM_ACCOUNT";
export const GET_GAMES = "action-user/GET_GAMES";

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
export const getGames = () => ({
  type: GET_GAMES
});
