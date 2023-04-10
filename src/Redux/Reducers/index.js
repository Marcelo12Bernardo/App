import { combineReducers } from 'redux';
import { searchBar } from './searchBarReducer';
import { pushReducer } from './pushReducer';
import { saveFetchReducer } from './saveFetchReducer';
import { recipeDetailsReducer } from './favoriteRecipeDetailsReducer';

const reducer = combineReducers({
  pushReducer,
  searchBar,
  saveFetchReducer,
  recipeDetailsReducer,
});

export default reducer;
