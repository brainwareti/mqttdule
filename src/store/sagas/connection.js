import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import MqttService from '../../services/mqtt';
import {Types} from '../ducks/connection';

function* mqttConnected() {
  console.info('saga', 'connectado');
}

function* connectMqtt() {
  console.info('reload');

  MqttService.resetInstance();
  MqttService.connectClient(mqttSuccessHandler, mqttConnectionLostHandler);
}

export default function* saga() {
  yield takeLatest(Types.CHANGE_CONNECTION_STATUS, mqttConnected);
  yield takeEvery(Types.CHANGE_CONNECTION_DATAS, connectMqtt);
  yield takeEvery(Types.RELOAD_MQTT, connectMqtt);
}

const mqttSuccessHandler = () => {
  console.info('connected to mqtt');
  MqttService.subscribe('maia/alerta', message => console.info(message));
};

const mqttConnectionLostHandler = () => {
  console.info('disconnected to mqtt');
};
