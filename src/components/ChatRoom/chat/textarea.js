import React, { useState, useEffect } from 'react';
import { TextArea, Form, Button } from 'semantic-ui-react';
import ClassNames from 'classnames';
import { Picker, Emoji, emojiIndex } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendMessage, sendMessageOther, sendMessageSteam, sendPrivateMessage
} from '../../../store/ChatRoom/actions';

export default ({ currentChan }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [msgArray, setMsgArray] = useState([]);
  const [searchEmojis, setSearchEmojis] = useState('');
  const { userData } = useSelector((state) => state.user);
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
 * @description Rajoute l'émoji selectionné au text
 * @param {object} emoji Object emoji
 */
  const handleClickEmoji = (emoji) => {
    setText(text + emoji.native);
  };

  return (
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
  );
};
