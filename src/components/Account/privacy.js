import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';


const Privacy = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="privacy">
      <div className="privacy-header">
        <Icon className="privacy-icon" name="privacy" size="huge" color="black" />
        <h2 className="privacy-title">Mes données privées</h2>
      </div>
      <div className="privacy-data">
        {
          userData.hasOwnProperty("steam_id") && <div className="privacy-steamdata">
            <div className="privacy-data-header">
              <img className="privacy-avatar" src={userData.steam_avatarfull} alt="Votre avatar steam" />
            </div>
            <h3 className="privacy-steamdata-title">Mes données Steam </h3>
            <div className="privacy-datagroup">
              <input className="privacy-checkbox" type="checkbox" name="checkbox" id="checkbox" readOnly checked={userData.imported_games} />
              <h3 className="privacy-datagroup-title">Jeux STEAM importé</h3>
            </div>
            <div className="privacy-datagroup">
              <input className="privacy-checkbox" type="checkbox" name="checkbox" id="checkbox" readOnly checked={userData.imported_games} /> {/* TODO: répercuté le choix de l'utilisateur */}
              <h3 className="privacy-datagroup-title">L'avatar Steam remplace votre avatar See My Games</h3>
            </div>
            <div className="privacy-datagroup-profileurl">
              <a className="privacy-steamdata-profileurl" href={userData.steam_profileurl}>Mon profil Steam</a>
            </div>
          </div>
        }
      </div>
      <div className="privacy-newsletter">
        <a href="#"> Se désinscrire de la newsletter </a>
      </div>
    </div>
  );
};

export default Privacy;
