import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import MqttService from '../../services/mqtt';

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
    MqttService.publishMessage('maia/status', `${this.count} vezes`);
  };

  render() {
    const {connectionStatus} = this.props;

    return (
      <View style={styles.container}>
        {!connectionStatus && <OfflineNotification />}

        <TouchableOpacity
          style={styles.sendMessageButton}
          onPress={() => this.handleSubmitMessage()}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
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
  },
});

const mapStateToProps = state => ({
  connectionStatus: state.connection.connectionStatus,
  alert: state.connection.alert,
});

export default connect(mapStateToProps)(Main);
