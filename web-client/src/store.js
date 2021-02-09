import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { bettingBook, bettingBooks, users } from './reducers/BettingBookReducers';
import { scoreTable } from './reducers/ScoreReducers';
import { activeTeams } from './reducers/TeamReducers';

export default createStore(
  combineReducers({
    bettingBook,
    bettingBooks,
    scoreTable,
    activeTeams,
    users
  }),
  applyMiddleware(thunk)
);