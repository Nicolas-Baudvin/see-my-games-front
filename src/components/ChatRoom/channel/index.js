import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import {
  connectToPrivateChat, connectToChatGeneral, connectToChatSteam, connectToChatOther
} from '../../../store/ChatRoom/actions';

export default ({
  chatChannels,
  state,
  changeChan,
  setState,
  currentChan
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  /**
   * @description Se connecte au channel courant
   */
  useEffect(() => {
    dispatch(connectToPrivateChat());
    switch (currentChan) {
      case "Général": {
        dispatch(connectToChatGeneral());
        break;
      }
      case "Steam": {
        dispatch(connectToChatSteam());
        break;
      }
      case "Autre": {
        dispatch(connectToChatOther());
        break;
      }
      default: {
        break;
      }
    }
  }, [currentChan]);

  const handleSearchInputChange = (e) => {
    const text = e.target.value;
    setSearch(text);
    const newNav = state.nav.filter((item) => {
      if (item.title.includes(text)) {
        return item;
      }
    });
    setState({ ...state, nav: newNav });
    if (text.length === 0) {
      setState({ ...state, nav: chatChannels });
    }
  };

  return (
    <div className="chatroom-channels">
      <div className="chatroom-channels-header">
        <h1 className="chatroom-channels-header-title">SMG - Liste des Chaînes</h1>
        <Input value={search} onChange={handleSearchInputChange} icon="search" placeholder="Chercher un channel..." />
      </div>

      <div className="chatroom-channels-menu">
        <h2 className="chatroom-channels-menu-title">Les Chaînes</h2>
        <ul className="chatroom-channels-frstMenu">
          {
            state.nav.map((chan) => (
              <li
                key={chan.title}
                onClick={() => changeChan(chan.title)}
              >
                <Checkbox checked={chan.isSelected} />
                {chan.title}
              </li>
            ))
          }
        </ul>

        <h2 className="chatroom-channels-menu-scdMenu">Vos discussion récentes</h2>
        <ul className="chatroom-channels-scdMenu">
          {/* TODO: Discussion/Channels récents */}
        </ul>
      </div>
    </div>
  );
};
