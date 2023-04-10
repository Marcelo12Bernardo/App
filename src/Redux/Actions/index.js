export const SEARCH_BAR_ACTION = 'SEARCH_BAR_ACTION';
export const PUSH_ACTION = 'PUSH_ACTION';
export const SAVE_FETCH_ACTION = 'SAVE_FETCH_ACTION';
export const RECIPE_TO_FAVORITE_ACTION = 'RECIPE_TO_FAVORITE_ACTION';
export const LOADING_FAVORITE_ACTION = 'LOADING_FAVORITE_ACTION';

export const searchBarAction = (payload) => ({
  type: SEARCH_BAR_ACTION,
  payload,
});

export const pushAction = (payload) => ({
  type: PUSH_ACTION,
  payload,
});

export const saveFetchAction = (payload) => ({
  type: SAVE_FETCH_ACTION,
  payload,
});

export const favoriteRecipeDetails = (payload) => ({
  type: RECIPE_TO_FAVORITE_ACTION,
  payload,
});

export const loadingFavoriteAction = (payload) => ({
  type: LOADING_FAVORITE_ACTION,
  payload,
});
