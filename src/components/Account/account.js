import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Icon, Form, Confirm, Popup, Divider
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { linkSteamAccount, importGames, updateProfil } from '../../store/User/actions';


const Account = () => {
  const dispatch = useDispatch();
  const { userData, isConnectedToSteam, usernameChanged } = useSelector((state) => state.user);
  const fileInput = React.createRef();
  const [open, setOpen] = useState(false);
  const [usernameValue, setUsername] = useState(userData.username);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleConfirm = (e) => {
    setOpen(false);
    if (usernameValue.length >= 4) {
      dispatch(updateProfil(usernameValue));
    }
  };

  const handleClicSteamBtn = () => {
    const popupWindow = window.open('http://localhost:5000/api/auth/steam/', '_blank', 'width=800, height=600');
    if (window.focus) popupWindow.focus();
  };

  const gamesImport = () => {
    dispatch(importGames());
  };

  const handleFileChange = (e) => {
  };

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== "http://localhost:5000") return;

      const { data, ok } = event.data;

      if (ok) {
        dispatch(linkSteamAccount(data));
      }
    });
  }, []);

  return (
    <div className="accountData">
      <div className="accountData-header">
        <Icon name="user" size="huge" color="black" />
        <h2 className="accountData-title">Mon Compte</h2>
      </div>
      <Form onSubmit={handleFormSubmit} className="accountData-form">
        <Form.Field className="accountData-input-group">
          <label htmlFor="username" className="accountData-label">Pseudonyme</label>
          <input onChange={(e) => setUsername(e.target.value)} name="username" className="accountData-input" placeholder="Votre pseudo" value={usernameValue} />
          <span className="success-message">{usernameChanged}</span>
        </Form.Field>
        <Button primary className="accountData-form-btn" type="submit">Envoyer</Button>
      </Form>
      <Divider />
      <div className="steam">
        <div className="steam-header">
          <h2 className="steam-title"><Icon className="steam-icon" name="steam" size="huge" />ton compte steam</h2>
          <small className="steam-title-desc">Pour accéder à tous tes jeux</small>
        </div>
        {
          !isConnectedToSteam && <div className="steam-nolink">
            <h2 className="steam-nolink-title">Tu n'as pas encore relié ton compte Steam. Clique sur le bouton ci-dessous !</h2>
            <Popup
              trigger={<img onClick={handleClicSteamBtn} className="steam-btn" src="/src/assets/steam-button.png" alt="bouton steam - clique pour relier ton compte" />}
              content="Connexion à steam (Nouvelle fenêtre)"
              inverted
              position="right center"
            />

          </div>
        }
        {
          isConnectedToSteam && <div className="steam-link">
            <p>Tu as lié ton compte steam à See My Games. Tu peux désormais accéder à tes jeux steam</p>
            {
              !userData.imported_games && <Button onClick={gamesImport} primary>
                Importer mes jeux steam
              </Button>
            }
            {
              userData.imported_games && <p>
                Tu as déjà importé tes jeux. Ils sont accessibles dans <Link to="/mes-jeux/">ta bibliothèque</Link>
              </p>
            }
          </div>
        }
      </div>
      <Confirm
        className="accountData-confirm"
        content="Etes vous sûr de vouloir changer ?"
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        cancelButton="Retour"
        confirmButton="Oui, Envoyer"
        size="tiny"
      />
    </div>
  );
};

export default Account;
