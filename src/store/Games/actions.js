export const DISPLAY_GAMES = "action-games/DISPLAY_GAMES";
export const DISPLAY_GAMEINFO = "action-games/DISPLAY_GAMEINFO";
export const DISPLAY_RECENT_GAMES = "action-games/DISPLAY_RECENT_GAMES";

export const displayGames = () => ({
  type: DISPLAY_GAMES
});

export const displayGameInfo = (gameId) => ({
  type: DISPLAY_GAMEINFO,
  gameId
});

export const displayRecentGames = () => ({
  type: DISPLAY_RECENT_GAMES,
});
