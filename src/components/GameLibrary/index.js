import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Input, Button, Transition, Dropdown, Item } from 'semantic-ui-react';
import Slider from "react-slick";
import ScrollAnimation from 'react-animate-on-scroll';
import ClassNames from 'classnames';

import './games.scss';
import { displayGames, displayRecentGames, deleteGame, updateGame } from '../../store/Games/actions';

import LoadPage from '../LoadPage';
import FormModal from './modal';
import UpdateModal from './updateModal';


const GameLibrary = () => {
  const dispatch = useDispatch();
  const { games, recentGames } = useSelector((state) => state.games);
  const [searchValue, setSearch] = useState('');
  const [allGames, setAllGames] = useState(games);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [currentGameId, setCurrentGameId] = useState('');
  const trigger = React.createRef();
  const updateTrigger = React.createRef();

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

  const showMenu = (gameId) => {
    setShow(true);
    setCurrentGameId(gameId);
  };

  const Games = () => (
    <div className="games-steam">
      {
        allGames.map((game) => {
          if (game.hand_added) {
            return (
              <ScrollAnimation
                animateIn="fadeIn"
                className="games-steam-game-link"
                key={game._id}
              >
                <div className="games-nosteam-menu">
                  <Icon ref={updateTrigger} onClick={() => showMenu(game._id)} className="games-nosteam-menu-icons" name="edit" size="big" />
                  <Icon onClick={() => dispatch(deleteGame(game._id))} className="games-nosteam-menu-icons" name="trash" size="big" />
                </div>
                <UpdateModal triggerRef={updateTrigger} visible={show} currentGame={game} currentGameId={currentGameId} />
                <Link className="games-steam-game-link" to="/mes-jeux/"> {/* TODO: page différente pour jeu ajouté à la main */}
                  <div className="games-steam-game">
                    <img className="games-steam-game-img" src={game.header_img} alt={`jeu ${game.name}`} />
                    <h2 className="games-steam-game-title"> {game.name} </h2>
                  </div>
                </Link>
              </ScrollAnimation>
            );
          }
          if (game.playtime_forever > 120) {
            return (
              <ScrollAnimation
                animateIn="fadeIn"
                className="games-steam-game-link"
                key={game._id}
              >
                <Link className="games-steam-game-link" to={`/mes-jeux/${game.appid}?isSteam=${game.platform === "steam"}`}>
                  <div className="games-steam-game">
                    <img className="games-steam-game-img" src={game.header_img} alt={`jeu ${game.name}`} />
                    <h2 className="games-steam-game-title"> {game.name} </h2>
                  </div>
                </Link>
              </ScrollAnimation>
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
    document.documentElement.scrollTop = 0;
  };

  const handleSortClick = (sort) => e => {
    setAllGames([...games]);
    switch (sort) {
      case "steam": {
        const unsortedGames = allGames;
        const sortedGames = unsortedGames.filter((game) => game.platform === "steam");
        setAllGames([...sortedGames]);
        break;
      }
      case "nosteam": {
        const unsortedGames = allGames;
        const sortedGames = unsortedGames.filter((game) => game.platform !== "steam");
        setAllGames([...sortedGames]);
        break;
      }
      case "alphab": {
        const unsortedGames = allGames;
        const sortedGames = unsortedGames.sort((a, b) => (
          (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
        ));
        setAllGames([...sortedGames]);
        break;
      }
      case "cancel": {
        const unsortedGames = games;
        const sortedGames = unsortedGames.sort((a, b) => (
          (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)
        ));
        setAllGames([...sortedGames]);
        break;
      }
      default: {
        console.log(games);
        break;
      }
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
    timer = window.setTimeout(() => setVisible(false), 3000);
    console.log(visible);
  };

  useEffect(() => {
    dispatch(displayGames());
    dispatch(displayRecentGames());
  }, []);

  useEffect(() => {
    console.log('refresh');
    if (games) {
      setAllGames(games);
    }
  }, [games]);

  if (!allGames) {
    return (
      <LoadPage />
    );
  }

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
                <Link key={game.appid} to={`/mes-jeux/${game.appid}?isSteam=${game.platform === "steam"}`}>
                  <div className="carousel-item">
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
        <div className="games-sort-sortBtns">
          <Button onClick={handleSortClick("steam")} size="big" icon className="games-sort-sortBtn" primary>
            <Icon name="steam" />
            Jeu Steam
          </Button>
          <Button onClick={handleSortClick("nosteam")} size="big" icon className="games-sort-sortBtn" primary>
            <Icon name="hand paper" />
            Jeu non steam
          </Button>
          <Button onClick={handleSortClick("alphab")} size="big" icon className="games-sort-sortBtn" primary>
            <Icon name="sort alphabet down" />
            Ordre Alphabétique
          </Button>
          <Button color="red" onClick={handleSortClick("cancel")} size="big" icon className="games-sort-sortBtn" primary>
            <Icon name="cancel" />
            Annuler le tri
          </Button>
        </div>
        <Button ref={trigger} onClick={handleOpenModal} className="games-sort-btn" size="big" content="Ajouter un jeu" primary />
      </div>
      {
        allGames && <Games />
      }
      <Button className="backtopBtn" primary content="Retour haut de page" onClick={backToTop} />
      <FormModal triggerRef={trigger} visible={visible} />
    </div>
  );
};

export default GameLibrary;
