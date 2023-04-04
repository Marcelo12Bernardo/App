import { PUSH_ACTION } from '../Actions';

const INITIAL_STATE = {
  pushFunction: '',
};

export const pushReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PUSH_ACTION:
    return {
      ...state,
      pushFunction: action.payload,
    };

  default:
    return state;
  }
};
