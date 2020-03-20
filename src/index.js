import React, {Component} from 'react';

import Main from './pages/Main';

import initialize from './config/InitialConfig';

import {Provider} from 'react-redux';
import store from './store';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class App extends Component {
  componentDidMount() {
    initialize();
  }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
