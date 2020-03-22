export const Types = {
  RECEIVE_ALERT: 'RECEIVE_ALERT',
  CHANGE_CONNECTION_STATUS: 'CHANGE_CONNECTION_STATUS',
  CHANGE_CONNECTION_DATAS: 'CHANGE_CONNECTION_DATAS',
  CLEAN_ALERT: 'CLEAN_ALERT',
  CHANGE_CONNECTION_DATAS_CONCLUDED: 'CHANGE_CONNECTION_DATAS_CONCLUDED',
  RELOAD_MQTT: 'RELOAD_MQTT',
  SEND_MESSAGE: 'SEND_MESSAGE',
  MESSAGE_SENDED: 'MESSAGE_SENDED',
};

const INITIAL_STATE = {
  alert: null,
  topic: null,
  connectionDatas: {
    address: '',
    port: 8080,
    password: '',
    username: '',
  },
  instance: null,
  connectionStatus: false,
  isConnectionDatasChanged: false,
  receivedAlert: false,
  message: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case Types.CHANGE_CONNECTION_DATAS:
      return {
        ...state,
        connectionDatas: payload.connectionDatas,
        isConnectionDatasChanged: true,
      };
    case Types.RECEIVE_ALERT:
      return {
        ...state,
        alert: payload.alert,
        topic: payload.topic,
      };
    case Types.CLEAN_ALERT:
      return {
        ...state,
        alert: null,
        topic: null,
      };
    case Types.CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: payload.status,
      };
    case Types.CHANGE_CONNECTION_DATAS_CONCLUDED:
      return {
        ...state,
        isConnectionDatasChanged: false,
        instance: payload.instance,
      };
    case Types.SEND_MESSAGE:
      return {
        ...state,
        message: payload.message,
      };
    case Types.MESSAGE_SENDED:
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
}

export const changeConnectionDatas = connectionDatas => ({
  type: Types.CHANGE_CONNECTION_DATAS,
  payload: {
    connectionDatas,
  },
});

export const receiveAlert = (alert, topic) => ({
  type: Types.RECEIVE_ALERT,
  payload: {
    alert,
    topic,
  },
});

export const clearAlert = () => ({
  type: Types.CLEAN_ALERT,
});

export const changeConnectionStatus = status => ({
  type: Types.CHANGE_CONNECTION_STATUS,
  payload: {
    status,
  },
});

export const concludChangeConnectionDatas = () => ({
  type: Types.CHANGE_CONNECTION_DATAS_CONCLUDED,
});

export const reloadConnectionDatas = () => ({
  type: Types.RELOAD_MQTT,
});

export const sendMessage = message => ({
  type: Types.SEND_MESSAGE,
  payload: {
    message,
  },
});
