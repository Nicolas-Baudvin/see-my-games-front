import React, { useState } from 'react';
import {
  Input, Button, Icon, Confirm, Form
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from 'src/store/User/actions';


const Password = () => {
  const dispatch = useDispatch();
  const { emailPassSent, passChangeError } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [passValue, setPass] = useState('');
  const [confPassValue, setConfPass] = useState('');
  const [passError, setPassError] = useState('');
  const [confPassError, setConfPassError] = useState('');
  const handleConfirm = (e) => {
    setOpen(false);
    if (passValue === confPassValue) {
      if (passValue.length >= 6) {
        dispatch(updatePassword(passValue, confPassValue));
      }
      else {
        setPassError("Le mot de passe doit contenir 6 caractères minimum");
      }
    }
    else {
      setConfPassError("Les mots de passe doivent être identiques");
    }
  };
  return (
    <div className="passchange">
      <div className="passchange-header">
        <Icon className="passchange-icon" name="key" size="huge" color="black" />
        <h2 className="passchange-title">Changer de mot de passe</h2>
      </div>
      <Form onSubmit={() => setOpen(true)} className="passchange-form">
        <Form.Field className="passchange-inputgroup">
          <label className="passchange-label" htmlFor="pass">Nouveau mot de passe</label>
          <Input
            onChange={(e) => setPass(e.target.value)}
            value={passValue}
            className="passchange-input"
            type="password"
            placeholder="Nouveau mot de passe"
          />
          {
            passError && <div className="errors"> {passError} </div>
          }
          <small className="passchange-desc">6 caractères minimum. N'hésitez pas à utiliser des caractères spéciaux </small>
        </Form.Field>
        <Form.Field className="passchange-inputgroup">
          <label className="passchange-label" htmlFor="pass">Confirmer mot de passe</label>
          <Input
            onChange={(e) => setConfPass(e.target.value)}
            value={confPassValue}
            className="passchange-input"
            type="password"
            placeholder="Confirmer mot de passe"
          />
          {
            confPassError && <div className="errors"> {confPassError} </div>
          }
        </Form.Field>
        <small className="passchange-desc">Une fois le formulaire validé, vous recevrez un email de confirmation afin de valider le changement de mot de passe. Rendez vous donc dans votre boite mail et cliquez sur le liens proposé. </small>
        <Button content="Envoyer" primary className="passchange-form-btn" />
        {
          emailPassSent && <div className="success"> {emailPassSent} </div>
        }
        {
          passChangeError && <div className="errors"> {passChangeError} </div>
        }
      </Form>
      <Confirm
        className="accountData-confirm"
        content="Etes vous sûr de vouloir changer de mot de passe ?"
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

export default Password;
