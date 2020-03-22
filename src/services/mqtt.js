import {} from 'react-native';

import init from '../core/libraries/mqtt';
import store from '../store';
import {
  changeConnectionStatus,
  concludChangeConnectionDatas,
} from '../store/ducks/connection';
import {receiveAlert} from '../store/ducks/communication';

init();

class MqttService {
  constructor() {
    const clientId = 'SomeId';

    const state = store.getState();
    const {
      connection: {
        connectionDatas: {address, port},
      },
    } = state;

    // eslint-disable-next-line no-undef
    this.client = new Paho.MQTT.Client(address, port, clientId);

    this.client.onMessageArrived = this.onMessageArrived;
    this.callbacks = {};
    this.onSuccessHandler = undefined;
    this.onConnectionLostHandler = undefined;
    this.isConnected = false;

    this.connectClient(this.mqttSuccessHandler, this.mqttConnectionLostHandler);
  }

  connectClient = (onSuccessHandler, onConnectionLostHandler) => {
    this.onSuccessHandler = onSuccessHandler;

    this.onConnectionLostHandler = onConnectionLostHandler;

    const state = store.getState();
    const {
      connection: {
        connectionDatas: {username = '', password = ''},
      },
    } = state;

    this.client.onConnectionLost = () => {
      this.isConnected = false;
      store.dispatch(changeConnectionStatus(false));
      onConnectionLostHandler();
    };

    const connectDatas = {
      timeout: 10,
      onSuccess: () => {
        this.isConnected = true;
        store.dispatch(changeConnectionStatus(true));
        onSuccessHandler();
      },
      useSSL: false,
      onFailure: this.onFailure,
      reconnect: true,
      keepAliveInterval: 20,
      cleanSession: true,
    };

    if (username && username.length > 0) {
      connectDatas.userName = username;
      connectDatas.password = password;
    }

    this.client.connect(connectDatas);
  };

  onFailure = ({errorMessage}) => {
    console.info(errorMessage, this.client.host);
    store.dispatch(changeConnectionStatus(false));
    this.isConnected = false;
  };

  onMessageArrived = message => {
    const {payloadString, topic} = message;

    this.callbacks[topic](payloadString);
  };

  publishMessage = (topic, message) => {
    if (!this.isConnected) {
      this.onFailure();
      return;
    }

    this.client.publish(topic, message);
  };

  subscribe = (topic, callback) => {
    if (!this.isConnected) {
      return;
    }

    this.callbacks[topic] = callback;
    this.client.subscribe(topic);
  };

  unsubscribe = topic => {
    if (!this.isConnected) {
      return;
    }

    delete this.callbacks[topic];
    this.client.unsubscribe(topic);
  };

  mqttSuccessHandler = () => {
    console.info('connected to mqtt');

    store.dispatch(concludChangeConnectionDatas());

    const state = store.getState();
    const {
      communication: {
        topics: {alerta, respostas},
      },
    } = state;

    console.info(respostas, alerta);

    this.subscribe(respostas, message =>
      store.dispatch(receiveAlert(JSON.parse(message))),
    );

    this.subscribe(alerta, message =>
      store.dispatch(receiveAlert(JSON.parse(message))),
    );
  };

  mqttConnectionLostHandler = () => {
    console.info('disconnected to mqtt');
  };
}

export default MqttService;
