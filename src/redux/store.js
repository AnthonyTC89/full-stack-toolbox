import { createStore, combineReducers } from 'redux';
import data from './reducers/data';

const reducer = combineReducers({
  data,
});

const store = createStore(reducer);

export default store;
