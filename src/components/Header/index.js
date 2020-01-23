import React, { useState } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { headerNav } from 'src/data/navs';
import {
  Icon, Menu, Sidebar,
} from 'semantic-ui-react';
import './header.scss';

export default () => {
  const [nav, setNav] = useState(headerNav);
  const [navSelected, setSelected] = useState('');
  const [isConnected, setConnected] = useState(false); // temporaire
  const [visible, setVisible] = useState(false);

  const handleLinkClick = (name) => (e) => {
    const newNav = nav.filter((item) => {
      if (name !== navSelected) {
        if (item.title === name) {
          item.isSelected = true;
        }
        if (item.title === navSelected) {
          item.isSelected = false;
        }
      }
      return item;
    });
    setNav(newNav);
    setSelected(name);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/src/assets/logo-smg-transparent.png" alt="Logo du site" />
      </Link>
      <div className="responsive">
        <Icon onClick={() => setVisible(!visible)} className="responsive-icon" name="bars" size="big" color="" />
      </div>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin"
      >
        <Menu.Item as="a">
          <Link to="/" className="logo">
            <img src="/src/assets/logo-smg-transparent.png" alt="Logo du site" />
          </Link>
        </Menu.Item>
        {
          nav.map((item) => {
            if (item.title === "connexion" || item.title === "inscription") {
              return !isConnected && <Menu.Item as="div">
                <Link to={item.path} className="sidemenu-item">
                  <Icon name={item.title === "connexion" ? "user" : "user plus"} size="big" />
                  <h3 className="sidemenu-title">{item.title}</h3>
                </Link>
              </Menu.Item>;
            }

            if (item.title === "mon compte" || item.title === "mes jeux") {
              return isConnected && <Menu.Item as="div">
                <Link to={item.path} className="sidemenu-item">
                  <Icon name={item.title === "mon compte" ? "address book" : "gamepad"} size="big" />
                  <h3 className="sidemenu-title">{item.title}</h3>
                </Link>
              </Menu.Item>;
            }

            return <Menu.Item as="div">
              <Link to={item.path} className="sidemenu-item">
                <Icon name={item.title === "articles" ? "newspaper" : "chat"} size="big" />
                <h3 className="sidemenu-title">{item.title}</h3>
              </Link>
            </Menu.Item>;
          })
        }

      </Sidebar>

      <nav className="header-nav">
        <ul className="header-nav__ul">
          {
            nav.map((item) => {
              if (item.title === "connexion" || item.title === "inscription") {
                return !isConnected && <Link
                  key={item.title}
                  onClick={handleLinkClick(item.title)}
                  to={item.path}
                  className={ClassNames('header-nav__ul--item', { selected: item.isSelected })}
                >
                  {item.title}
                </Link>;
              }

              if (item.title === "mon compte" || item.title === "mes jeux") {
                return isConnected && <Link
                  key={item.title}
                  onClick={handleLinkClick(item.title)}
                  to={item.path}
                  className={ClassNames('header-nav__ul--item', { selected: item.isSelected })}
                >
                  {item.title}
                </Link>;
              }

              return <Link
                key={item.title}
                onClick={handleLinkClick(item.title)}
                to={item.path}
                className={ClassNames('header-nav__ul--item', { selected: item.isSelected })}
              >
                {item.title}
              </Link>;
            })
          }
        </ul>
      </nav>
    </header>
  );
};
