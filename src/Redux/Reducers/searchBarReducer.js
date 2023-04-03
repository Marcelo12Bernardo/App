import { SEARCH_BAR_ACTION } from '../Actions';

const INITIAL_STATE = {
  active: false,
};

export const searchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_BAR_ACTION:
    return {
      ...state,
      active: action.payload,
    };
  default:
    return state;
  }
};
