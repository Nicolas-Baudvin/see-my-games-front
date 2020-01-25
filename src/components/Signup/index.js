import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Modal, Image, Input, Form
} from 'semantic-ui-react';
import './signup.scss';
import { signUp } from 'src/store/User/actions';

const Signup = ({ visible }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [usernameValue, setUsername] = useState('');
  const [passValue, setPass] = useState('');
  const [passConfValue, setPassconf] = useState('');
  const [emailValue, setEmail] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [passConfError, setPassConfError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [globalError, setGlobalError] = useState('');

  const { signupMessage, signupError } = useSelector((state) => state.user);

  const hideErrors = () => {
    setGlobalError('');
    setUsernameError('');
    setPassConfError('');
    setPassError('');
    setEmailError('');
  };
  const handleFormSubmit = () => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log('submit');
    if (usernameValue && passValue && passConfValue && emailValue) {
      if (passValue.length >= 6) {
        if (emailReg.test(emailValue)) {
          if (passValue === passConfValue) {
            dispatch(signUp(usernameValue, passValue, passConfValue, emailValue));
            hideErrors();
          }
          else {
            setPassError("Les mots de passes sont différents");
            setPassConfError("Les mots de passes sont différents");
          }
        }
        else {
          setEmailError("L'email envoyé est invalide.");
        }
      }
      else {
        setUsernameError("Le mot de passe doit contenir 6 caractères minimums");
      }
    }
    else {
      setGlobalError("Tous les champs sont obligatoires");
    }
  };

  const goToConnection = (e) => {
    e.preventDefault();
    history.push('/connexion/');
  };

  return (
    <Modal className="modal" open={visible} dimmer="blurring" className="modal">

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
        <small className="modal-right-small">Créer un compte</small>

        <Form className="modal-right-form">

          <Form.Field className="input-group">
            <label
              className="modal-right-label__username"
              htmlFor="username"
            >
              <span className="labels">Votre Pseudonyme</span>
              <Input
                type="text"
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
              <span className="modal-errors"> {usernameError} </span> {/* TODO: Tooltip for error message */}
            </label>
          </Form.Field>

          <Form.Field className="input-group">
            <label
              className="modal-right-label__email"
              htmlFor="username"
            >
              <span className="labels">Votre Email</span>
              <Input
                type="email"
                value={emailValue}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
                className="modal-right-input__email"
                id="email"
                name="email"
                icon="at"
                iconPosition="left"
                placeholder="Votre email"
              />
              <span className="modal-errors"> {emailError} </span> {/* TODO: Tooltip for error message */}
            </label>
          </Form.Field>

          <Form.Field className="input-group">
            <label
              className="modal-right-label__pass"
              htmlFor="pass"
            >
              <span className="labels">Votre mot de passe</span>
              <Input
                type="password"
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
              <span className="modal-errors">{passError}</span> {/* TODO: Tooltip for error message */}
            </label>
          </Form.Field>

          <Form.Field className="input-group">
            <label
              className="modal-right-label__pass"
              htmlFor="pass"
            >
              <span className="labels">Confirmez votre mot de passe</span>
              <Input
                type="password"
                value={passConfValue}
                onChange={(e) => setPassconf(e.target.value)}
                size="large"
                className="modal-right-input__pass"
                id="passConf"
                name="passConf"
                icon="key"
                iconPosition="left"
                placeholder="Tapez de nouveau votre mot de passe"
              />
              <span className="modal-errors"> {passConfError} </span> {/* TODO: Tooltip for error message */}
              {
                signupMessage && <span className="modal-success"> {signupMessage} <a onClick={goToConnection} href="#">Connecte toi</a> </span>
              }
              {
                signupError && <span className="modal-errors"> {signupError} </span>
              }
            </label>
          </Form.Field>
          <span className="modal-errors"> {globalError} </span>
          <p className="modal-right-aside">Tu as déjà un compte ?  <Link className="modal-right-aside__link" to="/connexion/"> Connecte toi !</Link></p>

          <Button onClick={handleFormSubmit} className="modal-right-button" size="huge" type="submit">Envoyer</Button>
          <Link className="back-link" to="/"><Button className="modal-right-button--back" size="huge" type="submit">Retour</Button></Link>

        </Form>
      </Modal.Content>

    </Modal>
  );
};

Signup.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Signup;
