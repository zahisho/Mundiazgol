import React from 'react';

import store from '../store';
import { loadBettingBooks } from '../actions/BettingBookActions';
import BettingBookSelector from '../components/BettingBookSelector';
import BetAdministration from '../components/BetAdministration';

class Administration extends React.Component {

  componentDidMount() {
    store.dispatch(loadBettingBooks());
  }

  render = () => {
    return (
      <div className='bet-body'>
        <div className='bet-selector-container my-card'>
          <BettingBookSelector />
        </div>
        <BetAdministration users={this.users} />
      </div >
    );
  }
}

export default Administration;