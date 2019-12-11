import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, Alert, TouchableOpacity } from 'react-native';
import Actions from 'react-native-router-flux';

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Tapahtuma",
      bodyText: 'Description text'
    };
  }

  render() {

    return (
      <View>
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.titleText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}{"\n"}
        </Text>
        <Text>Aika</Text>{"\n"}
        <Text>Paikka</Text>
      </Text>
      <Button title="Vie omaan kalenteriin" onPress={() => Alert.alert('Tästä joskus vie omaan kalenteriin ehkä')}/>
      <Button title="Palaa listaan" onPress={() => {this.props.navigation.navigate('Events')}}/>
      {/* <Button title="Palaa listaan" onPress={Actions.reset('EventScreen')}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
