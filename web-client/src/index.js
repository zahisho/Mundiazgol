import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Parse from 'parse';
import {
  Switch,
  Route,
  HashRouter
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './styles.css';

import enviroment from './enviroment';

import App from './App';
import Login from './pages/Login';

Parse.initialize(enviroment.appName);
Parse.serverURL = enviroment.serverURL + '/parse';

ReactDOM.render(
  <Provider store={store}>
    <div className='body'>
      <HashRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route component={App} />
        </Switch>
      </HashRouter>
    </div>
  </Provider >,
  document.getElementById('root')
);
