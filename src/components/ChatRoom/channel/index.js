import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import {
  connectToPrivateChat, connectToChatGeneral, connectToChatSteam, connectToChatOther
} from '../../../store/ChatRoom/actions';

export default ({
  nav, setNav, setCurrentChan, currentChan, chatChannels
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const changeChan = (chanName) => (e) => {
    const newNav = nav.map((chan) => {
      if (chan.title === chanName) {
        chan.isSelected = true;
        if (chan.socketId) {
          setCurrentChan([chan.socketId, chanName]);
        }
        else {
          setCurrentChan(chanName);
        }
      }
      else {
        chan.isSelected = false;
      }
      return chan;
    });
    setNav(newNav);
  };

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
    const text = e.target.value
    setSearch(text);
    const newNav = nav.filter((item) => {
      if (item.title.includes(text)) {
        return item;
      }
    });
    setNav(newNav);
    if (text.length === 0) {
      setNav(chatChannels);
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
            nav.map((chan) => (
              <li
                key={chan.title}
                onClick={changeChan(chan.title)}
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

      <div className="chatroom-channels-disconnectBtn">
        <Icon name="log out" size="big" color="teal" />
        <span>Déconnexion du chat</span>
      </div>

    </div>
  );
};
