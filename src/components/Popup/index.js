import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { closePopup } from '../../store/Popup/actions';
import './popup.scss';

const Popup = ({
  visible, isSuccess, message
}) => {
  const dispatch = useDispatch();
  const handleClickBtn = () => {
    dispatch(closePopup());
  };

  return (
    <div className={ClassNames('popup', { hidden: !visible })}>
      {
        isSuccess && <div className="popup-header-success">
          <h1 className="popup-mainTitle">Succès !</h1>
          <h2 className="popup-title">{message}</h2>
        </div>
      }
      {
        !isSuccess && <div className="popup-header-fail">
          <h1 className="popup-mainTitle">Echec !</h1>
          <h2 className="popup-title">{message}</h2>
        </div>
      }
      <div className="popup-action">
        <Button icon labelPosition="left" color="green" className="popup-action-btn" onClick={handleClickBtn}>
          <Icon name='checkmark' />
          Ok
        </Button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  visible: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default Popup;
