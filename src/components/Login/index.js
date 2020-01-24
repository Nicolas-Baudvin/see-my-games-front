import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Modal, Image, Input, Form
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './login.scss';


const Login = ({ visible }) => {
  const dispatch = useDispatch();
  const [usernameValue, setUsername] = useState('');
  const [passValue, setPass] = useState('');

  return (
    <Modal open={visible} dimmer="blurring" className="modal">

      <Modal.Content image className="modal-left">
        <Image
        className="modal-left-img"
          src="/src/assets/connexion-inscription-background.jpeg"
        />
        <h1 className="modal-left-title">vos jeux à portée de main</h1>
        <p className="modal-left-text">Gérez votre propre bibliothèque</p>
        <p className="modal-left-text">Importez vos jeux steam</p>
        <p className="modal-left-text"> Ou ajoutez les à la mains</p>
      </Modal.Content>
      <Modal.Content image className="modal-right">
        <img alt="logo du site see my games" src="/src/assets/logo-smg.png" className="modal-right-logo" />
        <h1 className="modal-right-title">See My Games</h1>
        <small className="modal-right-small">Se connecter</small>

        <Form className="modal-right-form">

          <Form.Field className="input-group">
            <label
              className="modal-right-label__username"
              htmlFor="username"
            >
              <span className="labels">Votre Pseudonyme</span>
              <Input
                value={usernameValue}
                onChange={(e) => setUsername(e.target.value)}
                size="large"
                className="modal-right-input__username"
                id="username"
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Votre pseudonyme"
              />
              <span className="modal-errors"></span> {/* TODO: Tooltip for error message */}
            </label>
          </Form.Field>

          <Form.Field className="input-group">
            <label
              className="modal-right-label__pass"
              htmlFor="pass"
            >
              <span className="labels">Votre mot de passe</span>
              <Input
                value={passValue}
                onChange={(e) => setPass(e.target.value)}
                size="large"
                className="modal-right-input__pass"
                id="pass"
                name="pass"
                icon="key"
                iconPosition="left"
                placeholder="Votre mot de passe"
              />
              <span className="modal-errors"></span> {/* TODO: Tooltip for error message */}
            </label>
          </Form.Field>

          <p className="modal-right-aside">Tu n'as pas encore de compte ?  <Link className="modal-right-aside__link" to="/inscription/"> Inscris toi !</Link></p>
          <p className="modal-right-aside">Tu as perdu ton mot de passe ?<Link className="modal-right-aside__link" to="/mot-de-passe-oublie/"> Récupère le ici </Link></p>

          <Button className="modal-right-button" size="huge" type="submit">Envoyer</Button>
          <Link className="back-link" to="/"><Button className="modal-right-button--back" size="huge" type="submit">Retour</Button></Link>

        </Form>
      </Modal.Content>

    </Modal>
  );
};

Login.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default Login;
