import { combineReducers } from 'redux';
import { searchBar } from './searchBarReducer';
import { pushReducer } from './pushReducer';

const reducer = combineReducers({
  pushReducer,
  searchBar,
});

export default reducer;
