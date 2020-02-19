import React, { useState, useEffect } from 'react';
import './style.scss';
import {
  Input, Icon, Form, TextArea, Checkbox, Button
} from 'semantic-ui-react';
import { Picker, Emoji } from 'emoji-mart';
import { chatChannels } from 'src/data/navs';
import { useDistpach, useSelector } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css';


export default () => {
  const [nav, setNav] = useState(chatChannels);
  const [currentChan, setCurrentChan] = useState('général');

  const changeChan = (chanName) => (e) => {
    const newNav = nav.map((chan) => {
      if (chan.title === chanName) {
        chan.isSelected = true;
        setCurrentChan(chanName);
      }
      else {
        chan.isSelected = false;
      }
      return chan;
    });
    setNav(newNav);
  };

  useEffect(() => {

  });

  return (<div className="chatroom">
    <div className="chatroom-channels">
      <div className="chatroom-channels-header">
        <h1 className="chatroom-channels-header-title">SMG - Liste des Chaînes</h1>
        <Input icon="search" placeholder="Chercher un channel..." />
      </div>

      <div className="chatroom-channels-menu">
        <h2 className="chatroom-channels-menu-title">Les Chaînes</h2>
        <ul className="chatroom-channels-frstMenu">
          {
            nav.map((chan) => {
              return (
                <li onClick={changeChan(chan.title)}><Checkbox checked={chan.isSelected} />{chan.title}</li>
              );
            })
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

    <div className="chatroom-chat">
      <div className="chatroom-chat-header">
        <h2 className="chatroom-chat-header-title">{currentChan}</h2>
      </div>
      <div className="chatroom-chat-container">
        {/* TODO: discussion ici */}
      </div>

      <div className="chatroom-chat-textarea">

        <Form>
          <TextArea placeholder="écris ton message ici ..." />
          <Button content="Envoyer" primary size="big" />
        </Form>
        <div className="chatroom-chat-textarea-openemoji">
          <Emoji emoji="smiley" size={32} />
        </div>
        <div className="chatroom-chat-textarea-picker">
          <Picker darkMode style={{ position: 'absolute', bottom: '20px', right: '20px' }} />
        </div>
      </div>

    </div>
    <div className="chatroom-friends">
      <div className="chatroom-friends-header">
        <h2 className="chatroom-friends-title">
          <Icon name="users" size="big" />
          Vos amis
        </h2>
      </div>
    </div>
  </div>
  );
};
