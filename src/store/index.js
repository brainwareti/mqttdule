/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import '../config/ReactotronConfig';
import reducers from './ducks';

import sagas from './sagas';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const composer = __DEV__
  ? compose(applyMiddleware(sagaMiddleware), console.tron.createEnhancer())
  : compose(applyMiddleware(sagaMiddleware));

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
