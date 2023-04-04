import { combineReducers } from 'redux';
import { searchBar } from './searchBarReducer';
import { pushReducer } from './pushReducer';
import { saveFetchReducer } from './saveFetchReducer';

const reducer = combineReducers({
  pushReducer,
  searchBar,
  saveFetchReducer,
});

export default reducer;
