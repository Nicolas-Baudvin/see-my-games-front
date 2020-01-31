export const DISPLAY_GAMES = "action-games/DISPLAY_GAMES";
export const DISPLAY_GAMEINFO = "action-games/DISPLAY_GAMEINFO";
export const DISPLAY_RECENT_GAMES = "action-games/DISPLAY_RECENT_GAMES";
export const NEW_GAME = "action-games/NEW_GAME";
export const DELETE_GAME = "action-games/DELETE_GAME";
export const UPDATE_GAME = "action-games/UPDATE_GAME";
export const GAME_HAND_INFO = "action-games/GAME_HAND_INFO";

export const displayGames = () => ({
  type: DISPLAY_GAMES
});

export const displayGameInfo = (appid, isSteam) => ({
  type: DISPLAY_GAMEINFO,
  appid,
  isSteam
});

export const displayRecentGames = () => ({
  type: DISPLAY_RECENT_GAMES,
});

export const newGame = (game) => ({
  type: NEW_GAME,
  game
});

export const deleteGame = (gameId) => ({
  type: DELETE_GAME,
  gameId
});

export const updateGame = (game) => ({
  type: UPDATE_GAME,
  game
});

export const gameHandInfo = (gameId) => ({
  type: GAME_HAND_INFO,
  gameId,
});
