import { combineReducers } from 'redux';
import { authentication } from './auth.reducers';
import { alert } from './alert.reducers';

const rootReducer = combineReducers({
  authentication,
  alert,
});

export default rootReducer;
