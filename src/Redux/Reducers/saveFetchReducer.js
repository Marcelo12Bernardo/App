import { SAVE_FETCH_ACTION } from '../Actions';

const INITIAL_STATE = {
  result: {},
};

export const saveFetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_FETCH_ACTION:
    return {
      ...state,
      result: action.payload,
    };
  default:
    return state;
  }
};
