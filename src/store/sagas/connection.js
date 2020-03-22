import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import MqttService from '../../services/mqtt';
import {Types} from '../ducks/connection';

function* mqttConnected() {
  console.info('saga', 'connectado');
}

function* connectMqtt() {
  console.info('reload');

  yield put({
    type: Types.CHANGE_CONNECTION_DATAS_CONCLUDED,
    payload: {
      instance: new MqttService(),
    },
  });

  yield put({type: Types.RELOAD_MQTT});
}

function* connect() {
  console.info('connect instance to mqtt');
}

function* sendMessage() {
  const message = yield select(state => state.connection.message);
  const instance = yield select(state => state.connection.instance);
  instance.publishMessage('maia/status', message);
}

function* receiveAlert() {
  yield delay(3000);
  yield put({type: Types.CLEAN_ALERT});
}

export default function* saga() {
  yield takeLatest(Types.CHANGE_CONNECTION_STATUS, mqttConnected);
  yield takeEvery(Types.CHANGE_CONNECTION_DATAS, connectMqtt);
  yield takeLatest(Types.RELOAD_MQTT, connect);
  yield takeEvery(Types.SEND_MESSAGE, sendMessage);
  yield takeEvery(Types.RECEIVE_ALERT, receiveAlert);
}
