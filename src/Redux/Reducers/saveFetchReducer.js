import { SAVE_FETCH_ACTION } from '../Actions';

const INITIAL_STATE = {
  result: [],
};
const maxItensForExibition = 12;

export const saveFetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_FETCH_ACTION:
    return {
      ...state,
      result: (action.payload.drinks && action.payload.drinks
        .slice(0, maxItensForExibition))
      || (action.payload.meals && action.payload.meals.slice(0, maxItensForExibition))
      || [],
    };
  default:
    return state;
  }
};
