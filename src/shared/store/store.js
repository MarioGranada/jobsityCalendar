import { createStore, combineReducers } from 'redux';
import remindersReducer from './reducers/reminders';

const rootReducer = combineReducers({
  reminders: remindersReducer
});

const store = createStore(rootReducer);

export default store;
