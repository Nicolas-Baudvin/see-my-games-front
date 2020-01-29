import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './games.scss';


const GameLibrary = () => {
  return (
    <div className="games">
      <div className="games-header">
        <Icon name="gamepad" size="huge" />
        <h1 className="games-header-title">Votre Bibliothèque</h1>
      </div>
    </div>
  );
};

export default GameLibrary;
