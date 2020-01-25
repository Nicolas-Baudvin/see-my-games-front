import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import './account.scss';

export default () => {
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  return (
    <div className="account">

      <div className="account-block">

        <div className="account-avatar">
          <img className="account-avatar-img" src="" alt="Votre avatar" />
          <h2 className="account-avatar-title">Bonjour, {userData}</h2>
        </div>
        <div className="account-menu__container">
          <div className="account-menu__container--item">
            <Icon name="" size="small" className="account-menu-icons" />
            Mon compte
          </div>
          <div className="account-menu__container--item">
            <Icon name="" size="small" className="account-menu-icons" />
            Changer mot de passe
          </div>
          <div className="account-menu__container--item">
            <Icon name="" size="small" className="account-menu-icons" />
            Données privées
          </div>
          <div className="account-menu__container--item">
            <Icon name="" size="small" className="account-menu-icons" />
            Changer d'Email
          </div>
          <div className="account-menu__container--item">
            <Icon name="" size="small" className="account-menu-icons" />
            Mes articles
          </div>
          <div className="account-menu__container--item">
            <Icon name="" size="small" className="account-menu-icons" />
            Supprimer mon compte
          </div>
        </div>
      </div>

      <div className="account-block">
        my account
      </div>

    </div>
  );
};
