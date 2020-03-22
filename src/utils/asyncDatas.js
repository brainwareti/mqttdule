import AsyncStorage from '@react-native-community/async-storage';
import store from '../store';
import {changeConnectionDatas} from '../store/ducks/connection';
import {changeTopics} from '../store/ducks/communication';

export const getDatasFromAsync = async () => {
  AsyncStorage.getItem('done').then(async value => {
    if (!value) {
      const connectionDatas = {
        address: 'mqtt.eclipse.org',
        port: 8080,
        password: 'maia-test',
        username: 'maia-test',
      };

      const topics = {
        respostas: 'maia/respostas',
        chamadas: 'maia/chamadas',
        alerta: 'maia/alerta',
        materiais: 'maia/materiais',
        qos: 1,
      };

      await saveConnectionDatasOnAsync(connectionDatas);
      await saveTopicsOnAsync(topics);
      await saveDatasOnRedux();
      await AsyncStorage.setItem('done', 'done');
    } else {
      await saveDatasOnRedux();
    }
  });
};

export const saveConnectionDatasOnAsync = async connectionDatas => {
  await AsyncStorage.setItem(
    'connectionDatas',
    JSON.stringify(connectionDatas),
  );
};

export const saveTopicsOnAsync = async topics => {
  await AsyncStorage.setItem('topics', JSON.stringify(topics));
};

export const saveDatasOnRedux = async () => {
  const connectionDatasStr = await AsyncStorage.getItem('connectionDatas');
  const connectionDatas = JSON.parse(connectionDatasStr);

  const topicsStr = await AsyncStorage.getItem('topics');
  const topics = JSON.parse(topicsStr);

  store.dispatch(changeConnectionDatas(connectionDatas));
  store.dispatch(changeTopics(topics));
};
