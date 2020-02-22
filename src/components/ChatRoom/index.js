import React, { useState, useEffect } from 'react';
import './style.scss';
import 'emoji-mart/css/emoji-mart.css';
import { chatChannels } from 'src/data/navs';
import { useDispatch, useSelector } from 'react-redux';
import { fail } from "src/store/Popup/actions";

/**
 * Components
 */
import Discussion from './chat/discussion';
import Channel from './channel';
import UsersOnline from './users';
import { changeCurrentChan } from '../../store/ChatRoom/actions';

export default () => {
  const {
    messages,
    steamMessages,
    otherMessages,
    usersConnectedSteam,
    usersConnectedOther,
    usersConnectedGeneral,
    privateMessages,
    currentChan
  } = useSelector((globalState) => globalState.chat);
  const initialState = {
    nav: chatChannels,
    currentChan,
    count: 0,
    search: '',
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const { userData } = useSelector((globalState) => globalState.user);
  // console.log(privateMessages);

  /**
   * @description Ouvre une nouvelle fenêtre de communication privée.
   * @param {string} socketId Socket de l'utilisateur selectionné
   * @param {string} username Pseudo de l'utilisateur selectionné
   * @returns dispatch || void
   */
  const handleClickOnUser = (socketId, username) => {
    console.log(socketId);
    if (userData.username === username) {
      return dispatch(fail("Vous ne pouvez pas vous envoyer un message à vous même..."));
    }
    for (let i = 0; i < state.nav.length; i++) {
      if (state.nav[i].title === username) {
        return dispatch(fail("Vous avez déjà ouvert une conversation avec cet utilisateur"));
      }
    }
    const newNavEntry = { title: username, isSelected: false, socketId };
    const newNav = state.nav;
    newNav.push(newNavEntry);
    return setState({ ...state, nav: newNav });
  };

  /**
   * @description Change le channel courant
   * @param {string} chanName Nom du channel
   */
  const changeChan = (chanName) => {
    const newNav = state.nav.map((chan) => {
      if (chan.title === chanName) {
        chan.isSelected = true;
        if (chan.socketId) {
          dispatch(changeCurrentChan([chan.socketId, chanName]));
        }
        else {
          dispatch(changeCurrentChan(chanName));
        }
      }
      else {
        chan.isSelected = false;
      }
      return chan;
    });
    setState({ ...state, nav: [...newNav] });
  };

  /**
   * @description Rajoute un channel dès qu'on reçoit un nouveau message privé avec le nom de l'expéditeur
   */
  useEffect(() => {
    if (privateMessages.length > 0) {
      const lastPrivateMessage = privateMessages[privateMessages.length - 1];
      setState({ ...state, count: state.count++ });

      if (lastPrivateMessage.from !== userData.username) {
        const newNavEntry = {
          title: lastPrivateMessage.from,
          isSelected: false,
          socketId: lastPrivateMessage.fromSocketId
        };
        const newNav = state.nav;

        newNav.push(newNavEntry);
        setState({ ...state, nav: newNav });
      }
    }
  }, [privateMessages]);


  return (<div className="chatroom">
    <Channel
      currentChan={currentChan}
      chatChannels={chatChannels}
      state={state}
      changeChan={changeChan}
      setState={setState}
    />

    <Discussion
      currentChan={currentChan}
      messages={messages}
      steamMessages={steamMessages}
      otherMessages={otherMessages}
      privateMessages={privateMessages}
      userData={userData}
      handleClickOnUser={handleClickOnUser}
      state={state}
    />

    <UsersOnline
      currentChan={currentChan}
      usersConnectedSteam={usersConnectedSteam}
      usersConnectedOther={usersConnectedOther}
      usersConnectedGeneral={usersConnectedGeneral}
      handleClickOnUser={handleClickOnUser}
    />
  </div>
  );
};
