import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import ClassNames from 'classnames';
import { accountMenu } from 'src/data/navs';
import './account.scss';

export default () => {
  const { userData } = useSelector((state) => state.user);
  const [nav, setNav] = useState(accountMenu);
  const [view, setView] = useState('account');
  console.log(userData);

  const changeView = (viewName) => (e) => {
    if (view !== viewName) {
      const newNav = nav.filter((item) => {
        if (item.view !== viewName) {
          item.isSelected = false;
        }
        else {
          item.isSelected = true;
        }
        return item;
      });
      setView(viewName);
      setNav(newNav);
    }
  };

  return (
    <div className="account">

      <div className="account-block">

        <div className="account-avatar">
          <img className="account-avatar-img" src="/src/assets/default-avatar.png" alt="Votre avatar" />
          <div className="account-avatar-edit">
            <Icon className="account-avatar-icon" name="photo" size="big" />
          </div>
          <h2 className="account-avatar-title">Bonjour, {userData}</h2>
          <Button className="account-btn" color="teal" animated="vertical">
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon name="edit" />
            </Button.Content>
          </Button>
        </div>
        <div className="account-menu">
          {
            nav.map((item) => (
              <div onClick={changeView(item.view)} key={item.title} className="account-menu--item">
                <div className={ClassNames("account-menu-iconContainer", { "icon-selected": item.isSelected })}>
                  <Icon name={item.icon} size="large" className="account-menu-icons" />
                </div>
                <span className={ClassNames("account-menu--item-text", { "text-selected": item.isSelected })}>{item.title}</span>
                <Icon className={ClassNames("account-menu-arrow", { "arrow-selected": item.isSelected })} name="angle right" size="large" />
              </div>
            ))

          }
        </div>
      </div>

      <div className="account-block">
        my account
      </div>

    </div>
  );
};
