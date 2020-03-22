import {fork, all} from 'redux-saga/effects';

import connection from './connection';
import communication from './communication';

function* rootSaga() {
  yield all([fork(connection), fork(communication)]);
}

export default rootSaga;
