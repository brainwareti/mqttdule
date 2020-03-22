import {combineReducers} from 'redux';
import connection from './connection';
import communication from './communication';

export default combineReducers({connection, communication});
