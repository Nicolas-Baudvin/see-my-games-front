import React, { useState } from 'react';
import { Input, Button, Icon, Confirm, Form } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail } from '../../store/User/actions';


const Email = () => {
  const dispatch = useDispatch();
  const { emailSent, updateEmailError } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [confEmailValue, setConfEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confEmailError, setConfEmailError] = useState('');

  const handleConfirm = () => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (reg.test(emailValue)) {
      if (emailValue === confEmailValue) {
        dispatch(updateEmail(emailValue, confEmailValue));
        setOpen(false);
      }
      else {
        setConfEmailError("Les emails ne correspondent pas !");
        setOpen(false);
      }
    }
    else {
      setEmailError("L'email que vous avez saisi est invalide !");
      setOpen(false);
    }
  };

  return (
    <div className="emailchange">
      <div className="emailchange-header">
        <Icon className="emailchange-icon" name="at" size="huge" color="black" />
        <h2 className="emailchange-title">Changer de mot de passe</h2>
      </div>
      <Form onSubmit={() => setOpen(true)} className="emailchange-form">
        <Form.Field className="emailchange-inputgroup">
          <label className="emailchange-label" htmlFor="pass">Nouvel email</label>
          <Input
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            className="emailchange-input"
            type="password"
            placeholder="Nouvel l'email"
          />
          {
            emailError && <div className="errors"> {emailError} </div>
          }
          <small className="emailchange-desc">L'email doit être valide </small>
        </Form.Field>
        <Form.Field className="emailchange-inputgroup">
          <label className="emailchange-label" htmlFor="pass">Confirmer votre email</label>
          <Input
            onChange={(e) => setConfEmail(e.target.value)}
            value={confEmailValue}
            className="emailchange-input"
            type="password"
            placeholder="Confirmer l'email"
          />
          {
            confEmailError && <div className="errors"> {confEmailError} </div>
          }
        </Form.Field>
        <small className="emailchange-desc">Une fois le formulaire validé, vous recevrez un email de confirmation afin de valider le changement d'Email. Rendez vous donc dans votre ancienne boîte mail et cliquez sur le liens proposé. </small>
        <Button content="Envoyer" primary className="emailchange-form-btn" />
        {
          emailSent && <div className="success"> {emailSent} </div>
        }
        {
          updateEmailError && <div className="errors"> {updateEmailError} </div>
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

export default Email;
