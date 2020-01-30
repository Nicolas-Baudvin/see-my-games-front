import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import Slick from 'react-slick';
import { displayGameInfo } from '../../store/Games/actions';

import './game.scss';
import LoadPage from '../LoadPage';

const GamePage = () => {
  const { appid } = useParams();
  const { gameInfo } = useSelector((state) => state.games);
  const dispatch = useDispatch();
  const parser = new DOMParser();
  let desc = "";
  let minRequirement = "";
  let recRequirement = "";
  let language = "";
  if (gameInfo) {
    desc = parser.parseFromString((gameInfo.detailed_description), "text/html");
    minRequirement = parser.parseFromString((gameInfo.pc_requirements.minimum), "text/html");
    recRequirement = parser.parseFromString((gameInfo.pc_requirements.recommended), "text/html");
    language = parser.parseFromString((gameInfo.supported_languages), "text/html");
  }
  const descHtml = { __html: desc.firstChild && desc.firstChild.innerHTML };
  const languageHtml = { __html: language.firstChild && language.firstChild.innerHTML };
  const minRequirementHtml = { __html: minRequirement.firstChild && minRequirement.firstChild.innerHTML };
  const recRequirementHtml = { __html: recRequirement.firstChild && recRequirement.firstChild.innerHTML };
  console.log(gameInfo);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
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

  useEffect(() => {
    const isSteam = query.get("isSteam");
    if (isSteam) {
      dispatch(displayGameInfo(appid, isSteam));
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);

  if (!gameInfo) {
    return (
      <LoadPage />
    );
  }

  return (
    <div className="gamepage">

      <div className="gamepage-header">
        <img src={gameInfo.header_image} alt={`entête du jeu ${gameInfo.name}`} className="gamepage-heade__img" />
        <h1 className="gamepage-header__title"> {gameInfo.name} </h1>
      </div>

      <div className="gamepage-desc">
        <h2 className="gamepage-desc-title">Description</h2>
        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={descHtml} className="gamepage-desc-text" />
      </div>

      <div className="gamepage-screenshots">

        <h2 className="gamepage-screenshots-title">Images</h2>
        {
          gameInfo.screenshots && <Slick
            {...settings}
          >
            {
              gameInfo && gameInfo.screenshots.map((item) => <div key={item.id} className="gamepage-carousel-screenshots-item">
                <img src={item.path_thumbnail} alt={`Screenshots du jeu ${gameInfo.name}`} className="gamepage-carousel-img" />
              </div>)
            }
          </Slick>
        }

      </div>

      {
        gameInfo.movies && <div className="gamepage-movies">

          <h2 className="gamepage-movies-title">Vidéos</h2>
          <Slick
            {...settings}
          >
            {
              gameInfo && gameInfo.movies.map((item) => <div key={item.id} className="gamepage-carousel-movies-item">
                <video src={item.webm[480]} type="video/webm" controls width={600} />
              </div>)
            }
          </Slick>

        </div>
      }

      <h2 className="gamepage-specs-title">Caractéristiques</h2>
      <div className="gamepage-specs">

        <div className="gamepage-specs-blocks">
          {
            gameInfo && <div className="gamepage-specs-requirement">
              <p dangerouslySetInnerHTML={minRequirementHtml} />
              <p dangerouslySetInnerHTML={recRequirementHtml} />
            </div>
          }
        </div>

        <div className="gamepage-specs-blocks">
          <div className="gamepage-specs-categories">
            <h3>Catégories :</h3>
            <ul>
              {
                gameInfo && gameInfo.categories.map((item) => <li>
                  <a key={item.id} href={`https://store.steampowered.com/search/?category2=${item.id}`} target="_blank" rel="noopener noreferrer">
                    {item.description}
                  </a>
                </li>)
              }
            </ul>
          </div>
          <div className="gamepage-specs-releaseDate">
            <h3>Date de parution : {gameInfo && gameInfo.release_date.date} </h3>
          </div>
          <div className="gamepage-specs-author">
            <h3 className="gamepage-specs-author-publishers"> Editeur : <span>{gameInfo && gameInfo.publishers[0]}</span>  </h3>
            <h3 className="gamepage-specs-author-developers"> Développeurs : <span>{gameInfo && gameInfo.developers[0]}</span>  </h3>
          </div>
          <div className="gamepage-specs-language">
            <h3>Langages supportés :</h3>
            <p dangerouslySetInnerHTML={languageHtml} />
          </div>
        </div>

      </div>

    </div>
  );
};

export default GamePage;
