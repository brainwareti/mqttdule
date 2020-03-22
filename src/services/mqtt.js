import {Alert} from 'react-native';

import init from '../core/libraries/mqtt';
import store from '../store';
import {
  changeConnectionStatus,
  reloadConnectionDatas,
  receiveAlert,
} from '../store/ducks/connection';

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

    this.isConnected = false;
    //store.dispatch(reloadConnectionDatas());
  };

  onMessageArrived = message => {
    const {payloadString, topic} = message;

    this.callbacks[topic](payloadString);
  };

  publishMessage = (topic, message) => {
    if (!this.isConnected) {
      console.info('not connected');
      this.onFailure();
      return;
    }

    this.client.publish(topic, message);
  };

  subscribe = (topic, callback) => {
    if (!this.isConnected) {
      console.info('not connected');

      return;
    }

    this.callbacks[topic] = callback;

    this.client.subscribe(topic);
  };

  unsubscribe = topic => {
    if (!this.isConnected) {
      console.info('not connected');

      return;
    }

    delete this.callbacks[topic];

    this.client.unsubscribe(topic);
  };

  mqttSuccessHandler = () => {
    console.info('connected to mqtt');
    this.subscribe('maia/alerta', message =>
      store.dispatch(receiveAlert(JSON.parse(message), 'maia/alerta')),
    );
    this.publishMessage('maia/status', 'test');
  };

  mqttConnectionLostHandler = () => {
    console.info('disconnected to mqtt');
  };
}

export default MqttService;
