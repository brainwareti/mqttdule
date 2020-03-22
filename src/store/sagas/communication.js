import {put, select, takeEvery, delay} from 'redux-saga/effects';
import {Types} from '../ducks/communication';

function* sendMessage() {
  const message = yield select(state => state.communication.message);
  const instance = yield select(state => state.connection.instance);

  const respostasTopic = yield select(
    state => state.communication.topics.respostas,
  );

  instance.publishMessage(respostasTopic, message);
}

function* sendMaterialMessage() {
  const message = yield select(state => state.communication.message);
  const instance = yield select(state => state.connection.instance);

  const materialTopic = yield select(
    state => state.communication.topics.materiais,
  );

  instance.publishMessage(materialTopic, message);
}

function* receiveAlert() {
  yield delay(3000);
  yield put({type: Types.CLEAN_ALERT});
}

export default function* saga() {
  yield takeEvery(Types.SEND_MESSAGE, sendMessage);
  yield takeEvery(Types.RECEIVE_ALERT, receiveAlert);
  yield takeEvery(Types.SEND_MATERIAL_MESSAGE, sendMaterialMessage);
}
