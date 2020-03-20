import MqttService from '../services/mqtt';
import {connected} from '../store/ducks/connection';
import store from '../store';
import {getDatasFromAsync} from '../utils/asyncDatas';

export default function initializate() {
  //Iniciar conexão com o broker
  // se inscrever em alguns tópicos, como o de alerta
  // capturar os dados do redux e assim iniciar conexão
  // inscrever-se no maia/alerta
  getDatasFromAsync();
}
