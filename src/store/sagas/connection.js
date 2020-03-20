import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
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

export default function* saga() {
  yield takeLatest(Types.CHANGE_CONNECTION_STATUS, mqttConnected);
  yield takeEvery(Types.CHANGE_CONNECTION_DATAS, connectMqtt);
  yield takeEvery(Types.RELOAD_MQTT, connect);
}
