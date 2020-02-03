import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Input, Button, Modal, Dropdown, Menu
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const UpdateModal = ({ visible, currentGame, currentGameId, triggerRef }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(visible);
  const [release_date, setReleaseDate] = useState('');
  const [platform, setPlatform] = useState('');
  const [header_img, setImageURI] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(visible);
    if (visible) {
      setOpen(true);
    }
  }, [visible]);

  return (
    <Modal open={open}>
      <Modal.Header>
        <h2>Modification du jeu</h2>
      </Modal.Header>
      <Modal.Content>
        <Form />
      </Modal.Content>
    </Modal>
  );
};

UpdateModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentGame: PropTypes.object.isRequired,
  currentGameId: PropTypes.string.isRequired
};

export default UpdateModal;
