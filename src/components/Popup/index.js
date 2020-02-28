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
    <div className={ClassNames('popupWindow', { hidden: !visible })}>
      {
        isSuccess && <div className="popupWindow-header-success">
          <h1 className="popupWindow-mainTitle">Succès !</h1>
          <h2 className="popupWindow-title">{message}</h2>
        </div>
      }
      {
        !isSuccess && <div className="popup-header-fail">
          <h1 className="popupWindow-mainTitle">Echec !</h1>
          <h2 className="popupWindow-title">{message}</h2>
        </div>
      }
      <div className="popupWindow-action">
        <Button icon labelPosition="left" color="green" className="popupWindow-action-btn" onClick={handleClickBtn}>
          <Icon name="checkmark" />
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
