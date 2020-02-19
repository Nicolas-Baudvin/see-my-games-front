import React, { useState, useEffect } from 'react';
import './style.scss';
import ClassNames from 'classnames';
import {
  Input, Icon, Form, TextArea, Checkbox, Button
} from 'semantic-ui-react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji, emojiIndex } from 'emoji-mart';
import { chatChannels } from 'src/data/navs';
import { useDispatch, useSelector } from 'react-redux';
import { connectToChat, sendMessage } from '../../store/ChatRoom/actions';

export default () => {
  const [nav, setNav] = useState(chatChannels);
  const [currentChan, setCurrentChan] = useState('Général');
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [searchEmojis, setSearchEmojis] = useState('grinning');
  const [msgArray, setMsgArray] = useState([]);
  const dispatch = useDispatch();
  const { messages, steamMessages, otherMessages } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.user);

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

  const handleSubmitMessage = () => {
    if (text) {
      dispatch(sendMessage(text));
    }
  };

  const handleClickEmoji = (emoji) => {
    setText(text + emoji.native);
  };

  const playerProfil = () => {
    // get player profil
  };

  const handleChangeTextArea = (e) => {
    const { target } = e;
    const msg = target.value;
    setText(msg);
    console.log(msg.charAt(msg.length - 2));
    if (msg.substring(msg.length - 1) === ":" && msg.charAt(msg.length - 2) !== " ") {
      const emoji = emojiIndex.search(msgArray[1]).map((o) => o.native);
      setText(text.replace(`:${msgArray[1].replace(' ', '')}`, emoji[0]));
      setMsgArray([]);
    }
    else {
      if (text.includes(':')) {
        setMsgArray(msg.split(':'));
        setSearchEmojis(msgArray[1]);
        setVisible(true);
      }
    }
  };

  useEffect(() => {
    dispatch(connectToChat());
  }, []);

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

    <div className="chatroom-chat">
      <div className="chatroom-chat-header">
        <h2 className="chatroom-chat-header-title">{currentChan}</h2>
      </div>
      <div className="chatroom-chat-container">
        {/* TODO: discussion ici */}
        {
          currentChan === "Général" && messages && messages.map((mes) => (
            <div key={mes.message} className={ClassNames("message", { me: mes.user === userData.username })}>
              <div className="message-body">
                <img className="message-img" src={mes.avatar ? mes.avatar : "../src/assets/default-avatar.png"} alt="avatar" />
                <p className="message-text">
                  {mes.message}
                  <span className="message-date"><time>{mes.time}</time> par <span onClick={playerProfil} className="message-user">{mes.user}</span></span>
                </p>
              </div>
            </div>
          ))
        }
        {
          currentChan === "Steam" && !steamMessages.length && <h2 className="nomess">Il n'y a pas encore de message dans ce channel <Emoji emoji="cry" size={32} /></h2>
        }
        {
          currentChan === "Autre" && !otherMessages.length && <h2 className="nomess">Il n'y a pas encore de message dans ce channel <Emoji emoji="cry" size={32} /></h2>
        }
      </div>

      <div className="chatroom-chat-textarea">

        <Form onSubmit={handleSubmitMessage}>
          <TextArea value={text} onChange={handleChangeTextArea} placeholder="écris ton message ici ..." />
          <Button content="Envoyer" primary size="big" />
        </Form>
        <div onClick={() => setVisible(!visible)} className="chatroom-chat-textarea-openemoji">
          <Emoji emoji="smiley" size={32} />
        </div>
        <div className={ClassNames("chatroom-chat-textarea-picker", { displayed: visible })}>
          <Picker
            emoji={searchEmojis}
            onSelect={handleClickEmoji}
            darkMode
            style={{ position: 'absolute', bottom: '100px', right: '100px' }}
          />
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
