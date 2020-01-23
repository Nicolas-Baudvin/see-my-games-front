import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';

export default () => {

  return (
    <main className="homepage">
      <div className="title-container">
        <h1 className="homepage-title">See My Games</h1>
        <aside className="homepage-title-aside"><div className="title-text">beta</div></aside>
      </div>
      <button type="button" className="homepage-button"><Link to="/inscription"> commencer </Link></button>
    </main>
  );
};
