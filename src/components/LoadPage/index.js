import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import './load.scss';

const LoadPage = () => {
  return (
    <div className="loadpage">
      <Icon size="huge" className="loadpage-icon" loading name='spinner' />
      <h2 className="loadpage-message">Chargement ...</h2>
    </div>
  );
};

export default LoadPage;
