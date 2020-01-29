import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Input, Button, Transition } from 'semantic-ui-react';
import Slider from "react-slick";

import './games.scss';
import { displayGames, displayRecentGames } from '../../store/Games/actions';


const GameLibrary = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { games, recentGames } = useSelector((state) => state.games);
  const [searchValue, setSearch] = useState('');
  const [allGames, setAllGames] = useState(games);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    centerMode: true,
    centerPadding: "60px",
    className: "center",
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1634,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const Games = () => (
    <div className="games-steam">
      {
        allGames.map((game) => {
          if (game.playtime_forever > 120) {
            return (
              <Link key={game._id} className="games-steam-game-link" to={`/mes-jeux/${game.appid}`}>
                <div className="games-steam-game">
                  <img className="games-steam-game-img" src={game.header_img} alt={`jeu ${game.name}`} />
                  <h2 className="games-steam-game-title"> {game.name} </h2>
                </div>
              </Link>
            );
          }
        })
      }
    </div>
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const gamesSorted = allGames.filter((game) => {
      if (game.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return game;
      }
    });
    if (!e.target.value.length) {
      setAllGames(games);
    }
    else {
      setAllGames(gamesSorted);
    }
  };

  const backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  useEffect(() => {
    dispatch(displayGames());
    dispatch(displayRecentGames());
  }, []);

  useEffect(() => {
    if (games) {
      setAllGames(games);
    }
  }, [games]);

  return (
    <div className="games">
      <div className="games-header">
        <Icon name="gamepad" size="huge" />
        <h1 className="games-header-title">Votre Bibliothèque</h1>
      </div>
      {
        recentGames && <div className="carousel-container">
          <h2 className="carousel-title">Récemment joué</h2>
          <Slider className="carousel" {...settings}>
            {
              recentGames.map((game) => (
                <Link to={`/mes-jeux/${game.appid}`}>
                  <div key={game.appid} className="carousel-item">
                    <div className="carousel-item-img-container">
                      <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg?t=1571756795`} alt={`Jeu ${game.name}`} className="carousel-item-img" />
                    </div>
                    <h2 className="carousel-item-title">{game.name}</h2>
                    <small className="carousel-item-desc">Vous y avez joué {game.playtime_2weeks} minutes ces deux dernières semaines</small>
                  </div>
                </Link>
              ))
            }
          </Slider>
        </div>
      }
      <div className="games-sort">
        <Input
          className="games-sort-input"
          icon={<Icon name="search" inverted circular link />}
          placeholder="Rechercher un jeu..."
          size="big"
          onChange={handleSearchChange}
          value={searchValue}
        />
        <Button className="games-sort-btn" size="big" content="Ajouter un jeu" primary />
      </div>
      {
        allGames && <Games />
      }
      <Button className="backtopBtn" primary content="Retour haut de page" onClick={backToTop} />
    </div>
  );
};

export default GameLibrary;
