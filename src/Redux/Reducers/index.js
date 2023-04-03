import { combineReducers } from 'redux';
import { login } from './loginReducer';

const reducer = combineReducers({
  login,
});

export default reducer;
