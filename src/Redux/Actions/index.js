export const SEARCH_BAR_ACTION = 'SEARCH_BAR_ACTION';
export const PUSH_ACTION = 'PUSH_ACTION';
export const SAVE_FETCH_ACTION = 'SAVE_FETCH_ACTION';

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
