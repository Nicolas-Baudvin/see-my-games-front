import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const GameLibrary = () => {
  return (
    <div className="games">
      <div className="games-header">
        <Icon name="gamepad" size="huge" className="games-header-icon" />
        <h1 className="games-header-title">Bibliothèque de jeu</h1>
      </div>
    </div>
  )
};

export default GameLibrary;
