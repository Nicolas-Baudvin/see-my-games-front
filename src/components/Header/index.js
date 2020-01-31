import React, { useState, useEffect, Fragment } from 'react';
import ClassNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { headerNav } from 'src/data/navs';
import {
  Icon, Menu, Sidebar,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import './header.scss';
import { disconnect } from '../../store/User/actions';

export default () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [nav, setNav] = useState(headerNav);
  const [navSelected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);
  const { isConnected } = useSelector((state) => state.user);

  const handleLinkClick = (name) => (e) => {
    const newNav = nav.filter((item) => {
      if (name !== navSelected) {
        if (item.title === name) {
          item.isSelected = true;
        }
        if (item.title === navSelected) {
          item.isSelected = false;
        }
        if (name === "home") {
          setNav(headerNav);
          setSelected('');
        }
      }
      return item;
    });
    setNav(newNav);
    setSelected(name);
  };

  const followCursor = (target) => (e) => {
    const tooltip = document.querySelector('.logo-tooltip');
    const headerTltip = document.querySelectorAll('.header-tooltip');
    switch (target) {
      case "logo": {
        tooltip.style.left = `${e.pageX + 5}px`;
        tooltip.style.top = `${e.pageY + 5}px`;
        break;
      }
      case "articles": {
        headerTltip[0].style.left = `${e.pageX + 5}px`;
        headerTltip[0].style.top = `${e.pageY + 5}px`;
        break;
      }
      case "forum": {
        headerTltip[1].style.left = `${e.pageX + 5}px`;
        headerTltip[1].style.top = `${e.pageY + 5}px`;
        break;
      }
      case "connexion": {
        headerTltip[2].style.left = `${e.pageX + 5}px`;
        headerTltip[2].style.top = `${e.pageY + 5}px`;
        break;
      }
      case "inscription": {
        headerTltip[3].style.left = `${e.pageX + 5}px`;
        headerTltip[3].style.top = `${e.pageY + 5}px`;
        break;
      }
      case "mon compte": {
        headerTltip[2].style.left = `${e.pageX + 5}px`;
        headerTltip[2].style.top = `${e.pageY + 5}px`;
        break;
      }
      case "mes jeux": {
        headerTltip[3].style.left = `${e.pageX + 5}px`;
        headerTltip[3].style.top = `${e.pageY + 5}px`;
        break;
      }
      case "déconnexion": {
        headerTltip[4].style.left = `${e.pageX + 5}px`;
        headerTltip[4].style.top = `${e.pageY + 5}px`;
        break;
      }
      default: {
        break;
      }
    }
  };

  const disconnectUser = () => {
    dispatch(disconnect());
  };

  useEffect(() => {
    if (pathname === "/") {
      const newNav = nav.filter((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
        return item;
      });
      setNav(newNav);
    }
  }, [pathname]);

  return (
    <header className="header">
      <Link onClick={handleLinkClick("home")} to="/" className="logo">
        <img onMouseMove={followCursor("logo")} src="/src/assets/logo-smg-transparent.png" alt="Logo du site" />
        <span className="logo-tooltip">Retour page d'acceuil</span>
      </Link>
      <div className="responsive">
        <Icon onClick={() => setVisible(!visible)} className="responsive-icon" name="bars" size="big" />
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
        <Menu.Item as="div">
          <Link to="/" className="logo">
            <img src="/src/assets/logo-smg-transparent.png" alt="Logo du site" />
          </Link>
        </Menu.Item>
        {
          nav.map((item) => {
            if (item.title === "connexion" || item.title === "inscription") {
              return !isConnected && <Menu.Item key={item.title} as="div">
                <Link to={item.path} className="sidemenu-item">
                  <Icon name={item.title === "connexion" ? "user" : "user plus"} size="big" />
                  <h3 className="sidemenu-title">{item.title}</h3>
                </Link>
              </Menu.Item>;
            }

            if (item.title === "déconnexion") {
              return isConnected && <Menu.Item onClick={disconnectUser} key={item.title} as="div">
                <Icon name="log out" size="huge" />
                <h3 className="sidemenu-title">{item.title}</h3>
              </Menu.Item>;
            }

            if (item.title === "mon compte" || item.title === "mes jeux") {
              return isConnected && <Menu.Item key={item.title} as="div">
                <Link to={item.path} className="sidemenu-item">
                  <Icon name={item.title === "mon compte" ? "address book" : "gamepad"} size="big" />
                  <h3 className="sidemenu-title">{item.title}</h3>
                </Link>
              </Menu.Item>;
            }

            return <Menu.Item key={item.title} as="div">
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
                  onMouseMove={followCursor(item.title)}
                  key={item.title}
                  onClick={handleLinkClick(item.title)}
                  to={item.path}
                  className={ClassNames('header-nav__ul--item', { selected: item.isSelected })}
                >
                  {item.title}
                  <span className="header-tooltip">Page {item.title}</span>
                </Link>;
              }

              if (item.title === "déconnexion") {
                return isConnected && <div key={item.title} className="header-nav__ul--item logout">
                  <Icon onMouseMove={followCursor(item.title)} key={item.title} onClick={disconnectUser} name="log out" size="big" className="disconnect-icon" />
                  <span className="header-tooltip">Déconnexion</span>
                </div>;
              }

              if (item.title === "mon compte" || item.title === "mes jeux") {
                return isConnected && <Link
                  onMouseMove={followCursor(item.title)}
                  key={item.title}
                  onClick={handleLinkClick(item.title)}
                  to={item.path}
                  className={ClassNames('header-nav__ul--item', { selected: item.isSelected })}
                >
                  {item.title}
                  <span className="header-tooltip">Page {item.title} </span>
                </Link>;
              }

              return <Link
                onMouseMove={followCursor(item.title)}
                key={item.title}
                onClick={handleLinkClick(item.title)}
                to={item.path}
                className={ClassNames('header-nav__ul--item', { selected: item.isSelected })}
              >
                {item.title}
                <span className="header-tooltip">Page {item.title} </span>
              </Link>;
            })
          }
        </ul>
      </nav>
    </header>
  );
};
