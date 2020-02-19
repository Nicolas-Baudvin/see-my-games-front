import { combineReducers } from 'redux';
import user from './User/reducer';
import games from './Games/reducer';
import popup from './Popup/reducer';
import chat from './ChatRoom/reducer';


export default combineReducers({
  user,
  games,
  popup,
  chat
});
