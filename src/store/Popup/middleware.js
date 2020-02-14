import { SUCCESS, FAIL, closePopup } from "./actions";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SUCCESS: {
      next(action);
      setTimeout(() => {
        store.dispatch(closePopup());
      }, 5000);
      break;
    }
    case FAIL: {
      setTimeout(() => {
        store.dispatch(closePopup());
      }, 5000);
      next(action);
      break;
    }
    default: {
      next(action);
      break;
    }
  }
};
