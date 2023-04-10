import { RECIPE_TO_FAVORITE_ACTION, LOADING_FAVORITE_ACTION } from '../Actions';

const INITIAL_STATE = {
  id: '',
  type: '',
  nationality: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
  loading: false,
};

export const recipeDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPE_TO_FAVORITE_ACTION:
    return ({
      ...state,
      ...action.payload,
    });
  case LOADING_FAVORITE_ACTION:
    return ({
      ...state,
      loading: !state.loading,
    });
  default:
    return state;
  }
};
