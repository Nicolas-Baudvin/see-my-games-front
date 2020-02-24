import React, { useEffect, useState } from 'react';
import {
  Modal, Button, Icon, Input
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { displayGames } from '../../../store/Games/actions';
import { sendGameToChat } from '../../../store/ChatRoom/actions';

export default ({ state, setState }) => {
  const { games } = useSelector((GlobalState) => GlobalState.games);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (!games) {
      dispatch(displayGames());
    }
  }, [state.modalVisible]);

  const handleChangeInput = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      const newArray = state.games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
      setState({ ...state, gamesSorted: newArray });
    }
    else {
      setState({ ...state, gamesSorted: games });
    }
  };

  const handleGameClick = (game) => () => {
    console.log(game);
    dispatch(sendGameToChat(game));
  };

  useEffect(() => {
    if (games) {
      setState({
        ...state,
        games,
        gamesSorted: games,
        searchText: ''
      });
    }
  }, [games]);

  return (
    <Modal className="chat-menu" open={state.modalVisible}>
      <Modal.Header>
        <h2 className="chatroom-chat-textarea-modal__title">Choisissez le jeu que vous voulez partager</h2>
      </Modal.Header>
      <Modal.Content>

        <Input
          value={search}
          onChange={handleChangeInput}
          placeholder="Rechercher un jeu"
          icon="search"
        />

        {
          state.gamesSorted && state.gamesSorted.map((game) => (
            <div onClick={handleGameClick(game)} className="chat-menu-games">
              <div className="chat-menu-games-content">
                <img src={game.header_img} alt={`jeu ${game.name}`} />
                <h2> {game.name} </h2>
              </div>
            </div>
          ))
        }

      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setState({ ...state, modalVisible: false })} icon>
          <Icon name="close" />
          Retour
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
