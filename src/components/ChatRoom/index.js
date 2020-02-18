import React from 'react';
import './style.scss';
import {
  Input, Icon, Form, TextArea
} from 'semantic-ui-react';

export default () => {

  return (
    <div className="chatroom">
      <div className="chatroom-channels">

        <h1 className="chatroom-channels-title">SMG - Liste des Chaînes</h1>
        <Input icon="search" placeholder="Chercher un channel..." />

        <div className="chatroom-channels-chans">
          <h2 className="chatroom-channels-chans-title">Les Chaînes</h2>
        </div>

        <div className="disconnectBtn">
          <Icon name="log out" size="big" color="teal" />
        </div>

      </div>

      <div className="chatroom-chat">

        <h2 className="chatroom-chat-title">Nom du channel en cours</h2>
        <div className="chatroom-chat-container">
          {/* TODO: discussion ici */}
        </div>

        <div className="chatroom-chat-textarea">

          <Form>
            <TextArea placeholder="écris ton message ici ..." />
          </Form>

        </div>

      </div>
      <div className="chatroom-friends">

      </div>
    </div>
  );
};
