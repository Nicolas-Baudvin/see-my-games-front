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

export default () => {
  const [nav, setNav] = useState(chatChannels);
  const [currentChan, setCurrentChan] = useState('Général');
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
    for (let i = 0; i < nav.length; i++) {
      if (nav[i].title === username) {
        return dispatch(fail("Vous avez déjà ouvert une conversation avec cet utilisateur"));
      }
    }
    const newNavEntry = { title: username, isSelected: false, socketId };
    const newNav = nav;
    newNav.push(newNavEntry);
    return setNav([...newNav]);
  };

  /**
   * @description Rajoute un channel dès qu'on reçoit un nouveau message privé
   */
  useEffect(() => {
    if (privateMessages.length > 0) {
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
    }
  }, [privateMessages]);


  return (<div className="chatroom">
    <Channel
      nav={nav}
      setNav={setNav}
      setCurrentChan={setCurrentChan}
      currentChan={currentChan}
      chatChannels={chatChannels}
    />

    <Discussion
      currentChan={currentChan}
      messages={messages}
      steamMessages={steamMessages}
      otherMessages={otherMessages}
      privateMessages={privateMessages}
      userData={userData}
      handleClickOnUser={handleClickOnUser}
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
