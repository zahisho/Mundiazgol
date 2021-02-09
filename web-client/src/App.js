import React from 'react';
import Parse from 'parse';
import {
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import Bet from './pages/Bet';
import Score from './pages/Score';
import Administration from './pages/Administration';
import store from './store';

const App = (props) => {
  if (!Parse.User.current()) {
    props.history.push('/login');
  }

  const logOut = () => {
    Parse.User.logOut().then(() => {
      store.dispatch({
        type: 'SET_BETTING_BOOK',
        bettingBook: null
      });
      store.dispatch({
        type: 'SET_BETTING_BOOKS',
        bettingBooks: []
      });
      store.dispatch({
        type: 'SET_VALID_BETS',
        users: []
      });
      store.dispatch({
        type: 'SET_ACTIVE_TEAMS',
        activeTeams: []
      });
      store.dispatch({
        type: 'SET_SCORE_TABLE',
        scoreTable: null
      });
      props.history.push('/login');
    });
  }

  return (
    <div>
      <Menu logOut={logOut} />
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/bet' component={Bet} />
          <Route exact path='/score' component={Score} />
          <Route exact path='/administration' component={Administration} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div >
  );
}

export default App;
