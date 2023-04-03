import { combineReducers } from 'redux';
import { searchBar } from './searchBarReducer';

const reducer = combineReducers({
  searchBar,
});

export default reducer;
