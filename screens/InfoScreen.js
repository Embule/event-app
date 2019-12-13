import React, { Component } from 'react';
import { Link, Text, StyleSheet, Button, ScrollView, Alert, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';

const baseurl = "http://open-api.myhelsinki.fi/v1";

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        description: { intro: null },
        name: '',
        location: { address: '' },
        event_dates: { starting_day: '', ending_day: '' }
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
    let nimi = this.state.data.name.fi
    let osoite = this.state.data.location.address.street_address
    let posti = this.state.data.location.address.postal_code
    let kaupunki = this.state.data.location.address.locality
    let alkupaiva = this.state.data.event_dates.starting_day
    const startday = moment(alkupaiva).format('DD.MM.YYYY')
    let loppupaiva = this.state.data.event_dates.ending_day
    const endday = moment(loppupaiva).format('DD.MM.YYYY')
   
    if (!text) text = "Haetaan"
    return (
      <ScrollView>
        <Text>{nimi}</Text>
        <Text>{text}</Text>
        <Text>{osoite}, {posti}, {kaupunki}</Text>
        <Text>Tapahtuma alkaa: {startday}</Text>
        <Text>Tapahtuma loppuu: {endday}</Text>
        {/* <Text>{addressi}</Text> */}
        <Button title="Vie omaan kalenteriin" onPress={() => Alert.alert('Tästä joskus vie omaan kalenteriin ehkä')} />
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
