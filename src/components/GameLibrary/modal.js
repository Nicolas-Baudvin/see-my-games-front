import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Modal, Button, Header, Form, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { newGame } from '../../store/Games/actions';


const FormModal = ({ triggerRef, visible }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(visible);
  const [releaseDate, setReleaseDate] = useState('');
  const [platform, setPlatform] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const game = {
      name,
      desc,
      imageURI,
      platform,
      releaseDate,
    };

    dispatch(newGame(game));
  };

  useEffect(() => {
    console.log(visible);
    if (visible) {
      setOpen(true);
    }
  }, [visible]);


  return (
    <Modal size="large" triggerRef={triggerRef} open={open} className="games-modal">
      <Header icon="archive" content="Ajouter un jeu" />
      <Modal.Content>
        <Form onSubmit={handleSubmitForm} className="games-modal-form">
          <h2>Formulaire d'ajout de jeu</h2>

          <Form.Field className="games-modal-inputgroup">
            <label htmlFor="name" className="games-modal-form-label">Nom du jeu</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Nom du jeu" required />
          </Form.Field>

          <Form.Field className="games-modal-inputgroup">
            <label htmlFor="desc" className="games-modal-form-label">Description du jeu</label>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} name="desc" placeholder="Description du jeu" required />
          </Form.Field>

          <Form.Field className="games-modal-inputgroup">
            <label htmlFor="imageuri" className="games-modal-form-label">Image du jeu</label>
            <input value={imageURI} onChange={(e) => setImageURI(e.target.value)} name="imageuri" placeholder="Image du jeu" required />
          </Form.Field>

          <Form.Field className="games-modal-inputgroup">
            <label htmlFor="platform" className="games-modal-form-label">Plateforme de jeu</label>
            <input value={platform} onChange={(e) => setPlatform(e.target.value)} name="platform" placeholder="Plateforme de jeu" required />
          </Form.Field>

          <Form.Field className="games-modal-inputgroup">
            <label htmlFor="releasedate" className="games-modal-form-label">Date de sortie</label>
            <input value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} name="releasedate" placeholder="Date de sortie" required />
          </Form.Field>

        </Form>
      </Modal.Content>
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

FormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default FormModal;
