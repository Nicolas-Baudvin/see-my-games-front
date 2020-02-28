import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import ClassNames from 'classnames';
import { accountMenu } from 'src/data/navs';
import './account.scss';

/**
 * Components
 */
import Account from './account';
import Password from './changePass';
import Email from './changeEmail';
import Delete from './delete';
import MyArticles from './myArticles';
import Privacy from './privacy';
import { newAvatar } from '../../store/User/actions';

export default () => {
  const { userData } = useSelector((state) => state.user);
  const [nav, setNav] = useState(accountMenu);
  const [view, setView] = useState('account');
  const fileInput = React.createRef();
  const dispatch = useDispatch();

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

  const handleFileChange = (e) => {
    console.log(fileInput.current.files[0]);
    const formData = new FormData();
    formData.append('avatar', fileInput.current.files[0]);
    dispatch(newAvatar(formData));
  };
  return (
    <div className="account">

      <div className="account-block">

        <div className="account-avatar">
          <img
            className="account-avatar-img"
            src={
              // eslint-disable-next-line no-nested-ternary
              userData.steam_avatarfull
                ? userData.steam_avatarfull
                : (userData.avatar.data
                  ? `data:image/png;base64,${btoa(String.fromCharCode.apply(null, userData.avatar.data.data))}`
                  : "https://www.seemygames.fr/src/assets/default-avatar.png")
            }
            alt="Votre avatar"
          />
          <div className="account-avatar-edit">
            <label className="account-editLabel" htmlFor="avatar">
              <Icon className="account-avatar-icon" name="photo" size="big" />
            </label>
            <form>
              <input encType="multipart/form-data" ref={fileInput} onChange={handleFileChange} className="edit-avatar" type="file" name="avatar" id="avatar" />
            </form>
          </div>
          <h2 className="account-avatar-title">Bonjour, {userData.username}</h2>
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

        {
          view === "account" && <Account />
        }
        {
          view === "pass" && <Password />
        }
        {
          view === "privacy" && <Privacy />
        }
        {
          view === "email" && <Email />
        }
        {
          view === "posts" && <MyArticles />
        }
        {
          view === "delete" && <Delete />
        }
      </div>

    </div>
  );
};
