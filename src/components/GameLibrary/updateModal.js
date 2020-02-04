import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Input, Button, Modal, Dropdown, Menu, Icon
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { updateGame } from '../../store/Games/actions';

const UpdateModal = ({ visible, currentGame, currentGameId, triggerRef }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(visible);
  const [release_date, setReleaseDate] = useState(currentGame.release_date);
  const [platform, setPlatform] = useState(currentGame.platform);
  const [header_img, setImageURI] = useState(currentGame.header_img);
  const [desc, setDesc] = useState(currentGame.desc);
  const [name, setName] = useState(currentGame.name);
  const [error, setError] = useState('');
  const [view, setView] = useState('name');

  const options = [
    { key: 1, text: 'Changer le nom', value: 0 },
    { key: 2, text: 'Changer la description', value: "desc" },
    { key: 3, text: 'Changer la date de parution', value: "date" },
    { key: 4, text: "Changer l'adresse de l'image", value: "image" },
    { key: 5, text: 'Changer la plateforme', value: "platform" },
  ];

  const handleSubmitForm = () => {
    if (desc || name || header_img || platform || release_date) {
      const data = {
        desc,
        name,
        header_img,
        platform,
        release_date,
        ownerId: currentGameId
      };
      dispatch(updateGame(data));
    }
  };

  const handleDropdownChange = (e) => {
    setView(e.target.innerText);
  };

  useEffect(() => {
    if (visible) {
      setOpen(true);
    }
  }, [visible]);

  return (
    <Modal triggerRef={triggerRef} className="updategame" open={open}>
      <Modal.Header>
        <h2>Modification du jeu</h2>
      </Modal.Header>
      <Modal.Content>
        <Menu compact>
          <Dropdown onChange={handleDropdownChange} text="Chosir l'élément du jeu à modifier..." options={options} simple item />
        </Menu>
      </Modal.Content>
      {
        view === "Changer le nom" && <Input value={name} className="updategame-input" placeholder="Le nom du jeu" onChange={(e) => setName(e.target.value)} />
      }
      {
        view === "Changer la description" && <Input value={desc} className="updategame-input" placeholder="La Description du jeu" onChange={(e) => setDesc(e.target.value)} />
      }
      {
        view === "Changer la date de parution" && <Input value={release_date} className="updategame-input" placeholder="Le date de parution du jeu" onChange={(e) => setReleaseDate(e.target.value)} />
      }
      {
        view === "Changer l'adresse de l'image" && <Input value={release_date} className="updategame-input" placeholder="L'image du jeu" onChange={(e) => setImageURI(e.target.value)} />
      }
      {
        view === "Changer la plateforme" && <Input value={platform} className="updategame-input" placeholder="La plateforme du jeu" onChange={(e) => setPlatform(e.target.value)} />
      }
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} color="red">
          <Icon name="remove" /> Retour
        </Button>
        <Button onClick={handleSubmitForm} color="green">
          <Icon name="checkmark" /> Envoyer
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

UpdateModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentGame: PropTypes.object.isRequired,
  currentGameId: PropTypes.string.isRequired
};

export default UpdateModal;
