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
  serverError: '',
  message: '',
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
      if (action.error) {
        if (action.error.status === 500) {
          return {
            ...state,
            serverError: "Le serveur a rencontré un problème, réessayez ou contacter l'administrateur",
          };
        }
        return {
          ...state,
          serverError: action.error
        };
      }
      return {
        ...state,
        games: action.games,
        message: action.message
      };
    }
    case DELETE_GAME: {
      if (action.error) {
        if (action.error.status === 500) {
          return {
            ...state,
            serverError: "Le serveur a rencontré un problème, réessayez ou contacter l'administrateur",
          };
        }
        return {
          ...state,
          serverError: action.error
        };
      }
      return {
        ...state,
        games: action.games,
        message: action.message
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
