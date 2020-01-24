export const LOGIN = "action-user/LOGIN";
export const SIGNUP = "action-user/SIGNUP";
export const DISCONNECT = "action-user/";
export const CONNECT_TO_STEAM = "action-user/";
export const LINK_STEAM_ACCOUNT = "action-user/";

export const login = (username, pass) => ({
  type: LOGIN,
  data: {
    username,
    pass
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
export const connectToSteam = () => ({
  type: CONNECT_TO_STEAM,
});
export const linkSteamAccount = (data) => ({
  type: LINK_STEAM_ACCOUNT,
  data
});
