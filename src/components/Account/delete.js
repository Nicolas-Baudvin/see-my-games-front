import React, { useState } from 'react';
import { Input, Button, Icon, Confirm } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAccount } from '../../store/User/actions';


const Delete = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    dispatch(deleteAccount());
    setOpen(false);
  };

  return (
    <div className="delete">
      <div className="delete-header">
        <Icon className="delete-icon" name="delete" size="huge" color="black" />
        <h2 className="delete-title">Supprimer mon compte</h2>
      </div>
      <Button className="delete-deletebtn" onClick={() => setOpen(true)} color="red" content="Supprimer mon compte" />
      <Confirm
        className="accountData-confirm"
        content="Voulez vous vraiment suppprimer votre compte ? cette action est irréversible !"
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        cancelButton="Retour"
        confirmButton="Oui, Supprimer"
        size="tiny"
      />
    </div>
  );
};

export default Delete;
