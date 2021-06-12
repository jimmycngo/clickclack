import { combineReducers } from 'redux';

import wordReducer from './wordReducer';

const reducers = combineReducers({
  reducer: wordReducer,
});


export default reducers;

