import {
  DISPLAY_GAMEINFO,
  DISPLAY_GAMES,
  DISPLAY_RECENT_GAMES,
  NEW_GAME,
  DELETE_GAME,
  GAME_HAND_INFO
} from './actions';

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
    case NEW_GAME: {
      return {
        ...state,
      };
    }
    case DELETE_GAME: {
      return {
        ...state,
      };
    }
    case GAME_HAND_INFO: {
      return {
        ...state,
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
