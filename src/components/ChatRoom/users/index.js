import React from 'react';
import { Icon } from 'semantic-ui-react';

export default ({
  currentChan,
  usersConnectedSteam,
  usersConnectedOther,
  usersConnectedGeneral,
  handleClickOnUser
}) => {

  return (
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
            <img className="chatroom-users-user-avatar" src={user.avatar ? user.avatar : "http://localhost:3000/src/assets/default-avatar.png"} alt="avatar" />
            <div className="chatroom-users-user-online" />
            <h2 className="chatroom-users-user-username"> {user.username} </h2>
          </div>
        ))
      }
      {
        currentChan === "Steam" && usersConnectedSteam.length && usersConnectedSteam.map((user) => (
          <div onClick={() => handleClickOnUser(user.globalSocketId, user.username)} key={user.username} className="chatroom-users-user">
            <img className="chatroom-users-user-avatar" src={user.avatar ? user.avatar : "http://localhost:3000/src/assets/default-avatar.png"} alt="avatar" />
            <div className="chatroom-users-user-online" />
            <h2 className="chatroom-users-user-username"> {user.username} </h2>
          </div>
        ))
      }
      {
        currentChan === "Autre" && usersConnectedOther.length && usersConnectedOther.map((user) => (
          <div onClick={() => handleClickOnUser(user.globalSocketId, user.username)} key={user.username} className="chatroom-users-user">
            <img className="chatroom-users-user-avatar" src={user.avatar ? user.avatar : "http://localhost:3000/src/assets/default-avatar.png"} alt="avatar" />
            <div className="chatroom-users-user-online" />
            <h2 className="chatroom-users-user-username"> {user.username} </h2>
          </div>
        ))
      }
    </div>
  );

}
