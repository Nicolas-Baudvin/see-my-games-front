import { combineReducers } from 'redux';
import user from './User/reducer';
import games from './Games/reducer';


export default combineReducers({
  user,
  games,
});
