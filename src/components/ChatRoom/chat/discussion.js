import React from 'react';
import { Emoji } from 'emoji-mart';
import ClassNames from 'classnames';
import ChatTextArea from './textarea';

export default ({
  state,
  messages,
  steamMessages,
  userData,
  otherMessages,
  privateMessages,
  handleClickOnUser,
  currentChan
}) => {
  console.log(messages)
  return (
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

      <ChatTextArea currentChan={currentChan} />

    </div>
  );

}
