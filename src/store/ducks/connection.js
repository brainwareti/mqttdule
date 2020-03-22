export const Types = {
  CHANGE_CONNECTION_STATUS: 'CHANGE_CONNECTION_STATUS',
  CHANGE_CONNECTION_DATAS: 'CHANGE_CONNECTION_DATAS',
  CHANGE_CONNECTION_DATAS_CONCLUDED: 'CHANGE_CONNECTION_DATAS_CONCLUDED',
  RELOAD_MQTT: 'RELOAD_MQTT',
};

const INITIAL_STATE = {
  connectionDatas: {
    address: '',
    port: 8080,
    password: '',
    username: '',
  },
  instance: null,
  connectionStatus: false,
  isConnectionDatasChanged: false,
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
