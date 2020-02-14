export const SUCCESS = "action-popup/SUCCESS";
export const FAIL = "action-popup/FAIL";
export const CLOSE = "action-popup/CLOSE";


export const success = (message) => ({
  type: SUCCESS,
  message
});

export const fail = (message) => ({
  type: FAIL,
  message
});

export const closePopup = () => ({
  type: CLOSE
});
