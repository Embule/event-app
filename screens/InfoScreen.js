import React, { Component } from 'react';
import { Link, Text, StyleSheet, Button, ScrollView, Alert, FlatList } from 'react-native';
import moment from 'moment';
import HTML from 'react-native-render-html'

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
    if (!text) text = "Haetaan..."
    
    let text = this.state.data.description.intro
    let name_var = this.state.data.name.fi
    let address_var = this.state.data.location.address.street_address
    let postcode_var = this.state.data.location.address.postal_code
    let city = this.state.data.location.address.locality
    let startday_var = this.state.data.event_dates.starting_day
    const startday = moment(startday_var).format('DD.MM.YYYY')
    let endday_var = this.state.data.event_dates.ending_day
    const endday = moment(endday_var).format('DD.MM.YYYY')
   
    return (
      <ScrollView>
        <Text>{name_var}</Text>
        <Text>{text}</Text>
        <Text>{address_var}, {postcode_var}, {city}</Text>
        <Text>Tapahtuma alkaa: {startday}</Text>
        <Text>Tapahtuma loppuu: {endday}</Text>
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
