import React from 'react';

import BettingBook from '../components/BettingBook';
import store from '../store';
import { loadBettingBooks } from '../actions/BettingBookActions';
import BettingBookSelector from '../components/BettingBookSelector';
import { loadActiveTeams } from '../actions/TeamActions';

class Bet extends React.Component {
  componentDidMount() {
    store.dispatch(loadBettingBooks());
    store.dispatch(loadActiveTeams());
  }

  render = () => {
    return (
      <div className='bet-body'>
        <div className='bet-selector-container my-card'>
          <BettingBookSelector />
        </div>
        <BettingBook />
      </div >
    );
  }
}

export default Bet;