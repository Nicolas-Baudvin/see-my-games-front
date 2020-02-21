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
import { fail } from "src/store/Popup/actions";
import {
  connectToChatGeneral,
  sendMessage,
  connectToChatSteam,
  connectToChatOther,
  sendMessageOther,
  sendMessageSteam,
  sendPrivateMessage,
  connectToPrivateChat
} from '../../store/ChatRoom/actions';

export default () => {
  const [nav, setNav] = useState(chatChannels);
  const [currentChan, setCurrentChan] = useState('Général');
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [searchEmojis, setSearchEmojis] = useState('');
  const [msgArray, setMsgArray] = useState([]);
  const dispatch = useDispatch();
  const {
    messages,
    steamMessages,
    otherMessages,
    usersConnectedSteam,
    usersConnectedOther,
    usersConnectedGeneral,
    privateMessages
  } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.user);
  console.log(privateMessages);
  /**
   * @description Gère le changement du channel courant
   * @param {string} chanName - nom du channel
   */
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
   * @description Envoie le message du textArea dans le channel courant
   */
  const handleSubmitMessage = () => {
    switch (currentChan) {
      case "Général": {
        if (text) {
          dispatch(sendMessage(text));
        }
        break;
      }
      case "Autre": {
        if (text) {
          dispatch(sendMessageOther(text));
        }
        break;
      }
      case "Steam": {
        if (text) {
          dispatch(sendMessageSteam(text));
        }
        break;
      }
      default: {
        if (Array.isArray(currentChan)) {
          const message = {
            text,
            to: currentChan[1],
            socketId: currentChan[0],
            from: userData.username,
            avatar: userData.steam_avatar
          };
          dispatch(sendPrivateMessage(message));
        }
        break;
      }
    }
    setText('');
  };

  /**
   * @description Rajoute l'émoji selectionné au text
   * @param {object} emoji Object emoji
   */
  const handleClickEmoji = (emoji) => {
    setText(text + emoji.native);
  };

  /**
   * @description Ouvre une nouvelle fenêtre de communication privée.
   * @param {string} socketId Socket de l'utilisateur selectionné
   * @param {string} username Pseudo de l'utilisateur selectionné
   * @returns dispatch || void
   */
  const handleClickOnUser = (socketId, username) => {
    console.log(socketId);
    // if (userData.username === username) {
    //   return dispatch(fail("Vous ne pouvez pas vous envoyer un message à vous même..."));
    // }
    for (let i = 0; i < nav.length; i++) {
      if (nav[i].title === username) {
        return dispatch(fail("Vous avez déjà ouvert une conversation avec cet utilisateur"));
      }
    }
    const newNavEntry = { title: username, isSelected: false, socketId };
    const newNav = nav;
    newNav.push(newNavEntry);
    setNav([...newNav]);
  };

  /**
   * @description Gère le changement de valeur du TextArea
   * @param {event} e Event
   */
  const handleChangeTextArea = (e) => {
    const { target } = e;
    const msg = target.value;
    setText(msg);
    if (msg.substring(msg.length - 1) === ":" && msg.charAt(msg.length - 2) !== " ") {
      const emoji = emojiIndex.search(msgArray[1]).map((o) => o.native);
      setText(text.replace(`:${msgArray[1].replace(' ', '')}`, emoji[0]));
      setMsgArray([]);
    }
    else {
      // eslint-disable-next-line no-lonely-if
      if (text.includes(':')) {
        setMsgArray(msg.split(':'));
        setSearchEmojis(msgArray[1]);
        setVisible(true);
      }
    }
  };

  /**
   * @description Se connecte au channel courant en fonction du... channel courant.
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

  useEffect(() => {
    const lastPrivateMessage = privateMessages[privateMessages.length - 1];

    if (lastPrivateMessage.from !== userData.username) {
      const newNavEntry = {
        title: lastPrivateMessage.from,
        isSelected: false,
        socketId: lastPrivateMessage.fromSocketId
      };
      const newNav = nav;

      newNav.push(newNavEntry);
      setNav([...newNav]);
    }
  }, [privateMessages]);


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
        <h2 className="chatroom-chat-header-title">{Array.isArray(currentChan) ? currentChan[1] : currentChan}</h2>
      </div>
      <div className="chatroom-chat-container">
        {/* TODO: discussion ici */}
        {
          currentChan === "Général" && messages && messages.map((mes) => (
            <div key={mes._id} className={ClassNames("message", { me: mes.user === userData.username })}>
              <div className="message-body">
                <img className="message-img" src={mes.avatar ? mes.avatar : "../src/assets/default-avatar.png"} alt="avatar" />
                <p className="message-text">
                  {mes.message}
                  <span className="message-date"><time>{mes.time}</time> par <span onClick={() => handleClickOnUser(mes.socketId, mes.user)} className="message-user">{mes.user}</span></span>
                </p>
              </div>
            </div>
          ))
        }
        {
          currentChan === "Steam" && steamMessages && steamMessages.map((mes) => (
            <div key={mes._id} className={ClassNames("message", { me: mes.user === userData.username })}>
              <div className="message-body">
                <img className="message-img" src={mes.avatar ? mes.avatar : "../src/assets/default-avatar.png"} alt="avatar" />
                <p className="message-text">
                  {mes.message}
                  <span className="message-date"><time>{mes.time}</time> par <span onClick={() => handleClickOnUser(mes.socketId, mes.user)} className="message-user">{mes.user}</span></span>
                </p>
              </div>
            </div>
          ))
        }
        {
          currentChan === "Autre" && otherMessages && otherMessages.map((mes) => (
            <div key={mes._id} className={ClassNames("message", { me: mes.user === userData.username })}>
              <div className="message-body">
                <img className="message-img" src={mes.avatar ? mes.avatar : "../src/assets/default-avatar.png"} alt="avatar" />
                <p className="message-text">
                  {mes.message}
                  <span className="message-date"><time>{mes.time}</time> par <span onClick={() => handleClickOnUser(mes.socketId, mes.user)} className="message-user">{mes.user}</span></span>
                </p>
              </div>
            </div>
          ))
        }
        {
          Array.isArray(currentChan) && privateMessages.length > 0 && (currentChan[1] === privateMessages[0].to || currentChan[1] === privateMessages[0].from) && privateMessages.map((mes) => (
            <div key={mes.id} className={ClassNames("message", { me: mes.from === userData.username })}>
              <div className="message-body">
                <img className="message-img" src={mes.avatar ? mes.avatar : "../src/assets/default-avatar.png"} alt="avatar" />
                <p className="message-text">
                  {mes.text}
                  <span className="message-date"><time>{mes.date}</time> par <span onClick={() => handleClickOnUser(mes.fromSocketId, mes.from)} className="message-user">{mes.from}</span></span>
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
        {
          currentChan === "Général" && !messages.length && <h2 className="nomess">Il n'y a pas encore de message dans ce channel <Emoji emoji="cry" size={32} /></h2>
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
    <div className="chatroom-users">
      <div className="chatroom-users-header">
        <h2 className="chatroom-users-title">
          <Icon name="users" size="big" />
          Utilisateurs en ligne
        </h2>
      </div>
      {
        currentChan === "Général" && usersConnectedGeneral.length && usersConnectedGeneral.map((user) => (
          <div onClick={() => handleClickOnUser(user.globalSocketId, user.username)} key={user.username} className="chatroom-users-user">
            <img className="chatroom-users-user-avatar" src={user.avatar} alt="avatar" />
            <div className="chatroom-users-user-online" />
            <h2 className="chatroom-users-user-username"> {user.username} </h2>
          </div>
        ))
      }
      {
        currentChan === "Steam" && usersConnectedSteam.length && usersConnectedSteam.map((user) => (
          <div onClick={() => handleClickOnUser(user.globalSocketId, user.username)} key={user.username} className="chatroom-users-user">
            <img className="chatroom-users-user-avatar" src={user.avatar} alt="avatar" />
            <div className="chatroom-users-user-online" />
            <h2 className="chatroom-users-user-username"> {user.username} </h2>
          </div>
        ))
      }
      {
        currentChan === "Autre" && usersConnectedOther.length && usersConnectedOther.map((user) => (
          <div onClick={() => handleClickOnUser(user.globalSocketId, user.username)} key={user.username} className="chatroom-users-user">
            <img className="chatroom-users-user-avatar" src={user.avatar} alt="avatar" />
            <div className="chatroom-users-user-online" />
            <h2 className="chatroom-users-user-username"> {user.username} </h2>
          </div>
        ))
      }
    </div>
  </div>
  );
};
