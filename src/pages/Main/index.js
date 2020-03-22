import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendMessage, changeConnectionDatas} from '../../store/ducks/connection';

import OfflineNotification from '../../components/OfflineNotifications';
import AlertModal from '../../components/AlertModal';

class Main extends Component {
  state = {
    isConnected: false,
  };

  constructor(props) {
    super(props);

    this.count = 1;
  }

  handleSubmitMessage = () => {
    this.props.sendMessage('testeeeeeee');
  };

  handleChangeDatas = () => {
    // const connectionDatas = {
    //   address: 'test.mosquitto.org',
    //   port: 8080,
    //   username: '',
    //   password: '',
    // };

    const connectionDatas = {
      address: 'mqtt.teserakt.io',
      port: 15675,
      username: '',
      password: '',
    };

    this.props.changeConnectionDatas(connectionDatas);
  };

  handleChangeDatas2 = () => {
    // const connectionDatas = {
    //   address: 'test.mosquitto.org',
    //   port: 8080,
    //   username: '',
    //   password: '',
    // };

    const connectionDatas = {
      address: 'test.mosquitto.org',
      port: 8080,
      username: '',
      password: '',
    };

    this.props.changeConnectionDatas(connectionDatas);
  };

  render() {
    const {connectionStatus, alert} = this.props;

    return (
      <View style={styles.container}>
        {!connectionStatus && <OfflineNotification />}
        <TouchableOpacity
          style={styles.sendMessageButton}
          onPress={() => this.handleSubmitMessage()}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendMessageButton}
          onPress={() => this.handleChangeDatas()}>
          <Text style={{color: 'white'}}>Change Datas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendMessageButton}
          onPress={() => this.handleChangeDatas2()}>
          <Text style={{color: 'white'}}>Change Datas 2</Text>
        </TouchableOpacity>

        {alert && <AlertModal />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#F5FCFF',
  },

  sendMessageButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'red',
    marginBottom: 10,
  },
});

const mapStateToProps = state => ({
  connectionStatus: state.connection.connectionStatus,
  alert: state.connection.alert,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: bindActionCreators(sendMessage, dispatch),
  changeConnectionDatas: bindActionCreators(changeConnectionDatas, dispatch),
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Main);
