export const Types = {
  RECEIVE_ALERT: 'RECEIVE_ALERT',
  CLEAN_ALERT: 'CLEAN_ALERT',
  SEND_MESSAGE: 'SEND_MESSAGE',
  MESSAGE_SENDED: 'MESSAGE_SENDED',
  CHANGE_TOPICS: 'CHANGE_TOPICS',
  SEND_MATERIAL_MESSAGE: 'SEND_MATERIAL_MESSAGE',
  SEND_CHAMADA_MESSAGE: 'SEND_CHAMADA_MESSAGE',
};

const INITIAL_STATE = {
  alert: null,
  topics: {
    respostas: 'maia/respostas',
    chamadas: 'maia/chamadas',
    alerta: 'maia/alerta',
    materiais: 'maia/materiais',
    qos: 1,
  },
  receivedAlert: false,
  message: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  const {payload, type} = action;

  switch (type) {
    case Types.RECEIVE_ALERT:
      return {
        ...state,
        alert: payload.alert,
      };
    case Types.CLEAN_ALERT:
      return {
        ...state,
        alert: null,
      };
    case Types.SEND_MATERIAL_MESSAGE:
    case Types.SEND_CHAMADA_MESSAGE:
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
    case Types.CHANGE_TOPICS:
      return {
        ...state,
        topics: payload.topics,
      };
    default:
      return state;
  }
}

export const receiveAlert = alert => ({
  type: Types.RECEIVE_ALERT,
  payload: {
    alert,
  },
});

export const clearAlert = () => ({
  type: Types.CLEAN_ALERT,
});

export const sendMessage = message => ({
  type: Types.SEND_MESSAGE,
  payload: {
    message,
  },
});

export const changeTopics = topics => ({
  type: Types.CHANGE_TOPICS,
  payload: {
    topics,
  },
});

export const sendMaterialMessage = message => ({
  type: Types.SEND_MATERIAL_MESSAGE,
  payload: {
    message,
  },
});

export const sendCommunicationMessage = message => ({
  type: Types.SEND_CHAMADA_MESSAGE,
  payload: {
    message,
  },
});
