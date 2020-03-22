import AsyncStorage from '@react-native-community/async-storage';
import store from '../store';
import {changeConnectionDatas} from '../store/ducks/connection';

export const getDatasFromAsync = async () => {
  AsyncStorage.getItem('done').then(async value => {
    if (!value) {
      const connectionDatas = {
        address: 'mqtt.eclipse.org',
        port: 8080,
        password: 'maia-test',
        username: 'maia-test',
      };

      await saveOnAsync(JSON.stringify(connectionDatas));
      await saveDatasOnRedux();
      await AsyncStorage.setItem('done', 'done');
    } else {
      await saveDatasOnRedux();
    }
  });
};

export const saveOnAsync = async connectionDatas => {
  await AsyncStorage.setItem('connectionDatas', connectionDatas);
};

export const saveDatasOnRedux = async () => {
  const connectionDatasStr = await AsyncStorage.getItem('connectionDatas');
  const connectionDatas = JSON.parse(connectionDatasStr);

  store.dispatch(changeConnectionDatas(connectionDatas));
};
