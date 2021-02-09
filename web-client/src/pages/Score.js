import React from 'react';

import store from '../store';
import { loadBettingBooks } from '../actions/BettingBookActions';
import BettingBookSelector from '../components/BettingBookSelector';
import ScoreTable from '../components/ScoreTable';

class Score extends React.Component {

  componentDidMount() {
    store.dispatch(loadBettingBooks());
  }

  render = () => {
    return (
      <div className='bet-body'>
        <div className='bet-selector-container my-card'>
          <BettingBookSelector />
        </div>
        <ScoreTable />
      </div >
    );
  }
}

export default Score;