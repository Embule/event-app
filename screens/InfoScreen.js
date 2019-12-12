import React, { Component } from 'react';
import { Text, StyleSheet, Button, ScrollView, Alert, TouchableOpacity, FlatList } from 'react-native';
// import Actions from 'react-native-router-flux';

const baseurl = "http://open-api.myhelsinki.fi/v1";

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        description: { intro: null }
      }
    };
  }

  componentDidMount() {
    this.getEvent();
  }

  getEvent = () => {
    const id = this.props.navigation.getParam('id');
    return fetch(baseurl + `/event/${encodeURIComponent(id)}`,
      { headers: { Accept: "application/json" } })
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    let text = this.state.data.description.intro
    if (!text) text = "Haetaan"
    return (
      <ScrollView>
        <Text>{text}</Text>
        <Button title="Vie omaan kalenteriin" onPress={() => Alert.alert('Tästä joskus vie omaan kalenteriin ehkä')} />
        <Button title="Palaa listaan" onPress={() => { this.props.navigation.navigate('Events') }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
