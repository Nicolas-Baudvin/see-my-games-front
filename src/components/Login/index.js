import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Modal, Image, Input, Form
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './login.scss';


const Login = ({ visible }) => {
  return (
    <Modal open={visible} dimmer="blurring" className="modal">

      <Modal.Content image className="modal-left">
        <Image
          wrapped
          src="/src/assets/connexion-inscription-background.jpeg"
        />
        <h1 className="modal-left-title">vos jeux à portée de main</h1>
        <p className="modal-left-text">Gérez votre propre bibliothèque</p>
        <p className="modal-left-text">Importez vos jeux steam</p>
        <p className="modal-left-text"> Ou ajoutez les à la mains</p>
      </Modal.Content>
      <Modal.Content image className="modal-right">
        <img alt="logo du site see my games" src="/src/assets/logo-smg.png" wrapped className="modal-right-logo" />
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

          <Button className="modal-right-button" size="huge" type="submit">Envoyer</Button>

        </Form>

        <p className="modal-right-aside">Tu n'as pas encore de compte ?  <Link className="modal-right-aside__link" to="/inscription/"> Inscris toi !</Link></p>
      </Modal.Content>

    </Modal>
  );
};

Login.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default Login;
