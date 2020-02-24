import React, { useState } from 'react';
import {
  TextArea, Form, Button, Icon, Menu
} from 'semantic-ui-react';
import ClassNames from 'classnames';
import { Picker, Emoji, emojiIndex } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendMessage, sendMessageOther, sendMessageSteam, sendPrivateMessage
} from 'src/store/ChatRoom/actions';
import { fail } from 'src/store/Popup/actions';

/**
 * Components
 */
import MenuModal from '../modal';

export default ({ currentChan }) => {

  const initialState = {
    visible: false,
    menuVisible: false,
    modalVisible: false,
    text: '',
    gameSorted: [],
    canWrite: true,
  };

  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [msgArray, setMsgArray] = useState([]);
  const [searchEmojis, setSearchEmojis] = useState('');
  const [canWrite, setCanWrite] = useState(true);
  const { userData } = useSelector((GlobalState) => GlobalState.user);
  /**
   * @description Envoie le message du textArea dans le channel courant
   */
  const handleSubmitMessage = () => {
    if (!canWrite) {
      return dispatch(fail("Vous devez attendre 5 secondes avant de pouvoir réécrire un message."));
    }
    setCanWrite(false);
    switch (currentChan) {
      case "Général": {
        if (state.text) {
          dispatch(sendMessage(state.text));
        }
        break;
      }
      case "Autre": {
        if (state.text) {
          dispatch(sendMessageOther(state.text));
        }
        break;
      }
      case "Steam": {
        if (state.text) {
          dispatch(sendMessageSteam(state.text));
        }
        break;
      }
      default: {
        if (Array.isArray(currentChan)) {
          const message = {
            text: state.text,
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
    setTimeout(() => {
      setCanWrite(true);
    }, 5000);
    return setState({ ...state, text: '' });
  };

  /**
   * @description Ouvre une modal en fonction du menu selectionné
   * @param {string} menuName Nom du menu
   */
  const handleClickMenuItem = (menuName) => (e) => {
    switch (menuName) {
      case "share": {
        setState({ ...state, modalVisible: true });
        break;
      }
      default: {
        break;
      }
    }
  };

  /**
   * @description Gère le changement de valeur du TextArea
   * @param {event} e Event
   */
  const handleChangeTextArea = (e) => {
    const { target } = e;
    const msg = target.value;
    setState({ ...state, text: msg });
    if (msg.substring(msg.length - 1) === ":" && msg.charAt(msg.length - 2) !== " ") {
      const emoji = emojiIndex.search(msgArray[1]).map((o) => o.native);
      setState({ ...state, text: state.text.replace(`:${msgArray[1].replace(' ', '')}`, emoji[0]) });
      setMsgArray([]);
    }
    else {
      // eslint-disable-next-line no-lonely-if
      if (state.text.includes(':')) {
        setMsgArray(msg.split(':'));
        setSearchEmojis(msgArray[1]);
        setState({ ...state, visible: true });
      }
    }
  };

  /**
 * @description Rajoute l'émoji selectionné au text
 * @param {object} emoji Object emoji
 */
  const handleClickEmoji = (emoji) => {
    setState({ ...state, text: state.text + emoji.native });
  };

  return (
    <div className="chatroom-chat-textarea">
      <Button onClick={() => setState({ ...state, menuVisible: !state.menuVisible })} className="chatroom-chat-textarea-addfile" icon>
        <Icon name="paperclip" size="big" />
      </Button>
      <Menu className={ClassNames("chatroom-chat-textarea-menu", { menuVisible: state.menuVisible })}>
        <Menu.Item onClick={handleClickMenuItem("share")} className="chatroom-chat-textarea-menu__item">
          Partager un jeu de votre bibliothèque
        </Menu.Item>
      </Menu>
      <Form onSubmit={handleSubmitMessage}>
        <TextArea value={state.text} onChange={handleChangeTextArea} placeholder="écris ton message ici ..." />
        <Button content="Envoyer" primary size="big" />
      </Form>
      <div onClick={() => setState({ ...state, visible: !state.visible })} className="chatroom-chat-textarea-openemoji">
        <Emoji emoji="smiley" size={32} />
      </div>
      <div className={ClassNames("chatroom-chat-textarea-picker", { displayed: state.visible })}>
        <Picker
          emoji={searchEmojis}
          onSelect={handleClickEmoji}
          darkMode
          style={{ position: 'absolute', bottom: '100px', right: '100px' }}
        />
      </div>
      <MenuModal setState={setState} state={state} />
    </div>
  );
};
