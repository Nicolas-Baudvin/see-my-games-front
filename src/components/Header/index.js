import React, { useState } from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { headerNav } from 'src/data/navs';

import './header.scss';

export default () => {
  const [nav, setNav] = useState(headerNav);
  const [navSelected, setSelected] = useState('');

  const handleLinkClick = (name) => e => {
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
      <nav className="header-nav">
        <ul className="header-nav__ul">
          {
            nav.map((item) => {
              return <Link
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
