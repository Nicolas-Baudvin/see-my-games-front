import { SUCCESS, FAIL, CLOSE } from "./actions";

const initialState = {
  message: "",
  isSuccess: false,
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        message: action.message,
        visible: true
      };
    }
    case FAIL: {
      return {
        ...state,
        isSuccess: false,
        message: action.message,
        visible: true
      };
    }
    case CLOSE: {
      return {
        ...state,
        visible: false,
        message: ''
      };
    }
    default: {
      return state;
    }
  }
};
