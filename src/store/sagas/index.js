import {fork, all} from 'redux-saga/effects';

import connection from './connection';

function* rootSaga() {
  yield all([fork(connection)]);
}

export default rootSaga;
