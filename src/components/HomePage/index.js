import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default () => {
  const { isConnected } = useSelector((state) => state.user);

  const followCursor = (target) => (e) => {
    const buttonTooltip = document.querySelector('.button-tooltip');
    switch (target) {
      case "button": {
        buttonTooltip.style.display = "inline";
        buttonTooltip.style.left = `${e.pageX + 10}px`;
        buttonTooltip.style.top = `${e.pageY + 10}px`;
        break;
      }
      default: {
        break;
      }
    }
  };

  const hideTooltip = () => {
    const buttonTooltip = document.querySelector('.button-tooltip');
    buttonTooltip.style.display = "none";
  };

  return (
    <main className="homepage">
      <div className="title-container">
        <h1 className="homepage-title">See My Games</h1>
        <aside className="homepage-title-aside"><div className="title-text">beta</div></aside>
      </div>
      <span className="button-tooltip">Redirection vers la page inscription</span>
      <button onMouseLeave={hideTooltip} onMouseMove={followCursor("button")} type="button" className="homepage-button">
        {
          !isConnected && <Link to="/inscription/" className="button-link">
            commencer
          </Link>
        }
        {
          isConnected && <Link to="/mes-jeux/" className="button-link">
            Mes jeux
          </Link>
        }
      </button>

    </main>
  );
};
