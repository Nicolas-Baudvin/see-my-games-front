import { DISPLAY_GAMEINFO, DISPLAY_GAMES, DISPLAY_RECENT_GAMES } from './actions';

const initialState = {
  games: '',
  gameInfo: '',
  recentGames: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_RECENT_GAMES: {
      return {
        ...state,
        recentGames: action.games
      };
    }
    case DISPLAY_GAMES: {
      return {
        ...state,
        games: action.games,
      };
    }
    case DISPLAY_GAMEINFO: {
      return {
        ...state,
        gameInfo: action.game,
      };
    }
    default: {
      return state;
    }
  }
};
