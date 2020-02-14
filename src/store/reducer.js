import { combineReducers } from 'redux';
import user from './User/reducer';
import games from './Games/reducer';
import popup from './Popup/reducer';


export default combineReducers({
  user,
  games,
  popup
});
