import React, { Component } from 'react';
import { Link, Text, StyleSheet, Button, ScrollView, Alert, FlatList } from 'react-native';
import moment from 'moment';
import HTML from 'react-native-render-html'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { whileStatement } from '@babel/types';

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
    const startday = moment(startday_var).format('DD.MM.YYYY HH:mm')
    let endday_var = this.state.data.event_dates.ending_day
    const endday = moment(endday_var).format('DD.MM.YYYY HH:mm')
   
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.name}>{name_var}</Text>
        <Text style={styles.description}>{text}</Text>
        <Text style={styles.address}>{address_var}, {postcode_var}, {city}</Text>
        <Text style={styles.date}>Tapahtuma alkaa: {startday}</Text>
        <Text style={styles.date}>Tapahtuma loppuu: {endday === 'Invalid date' ? 'Lue lisää tapahtuman omilta sivulta.' : endday}</Text>
        <TouchableOpacity style={styles.Button} title="Vie omaan kalenteriin" onPress={() => Alert.alert('Tästä joskus vie omaan kalenteriin ehkä')}>
          <Text style={styles.buttontext}>Palaa listaan</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  name: {
    fontWeight: 'bold',
    margin: 10,
    fontSize: 20,
    color: 'rgb(228, 167, 0);',
  },
  description: {
    margin: 10,
    flex: 1
  },
  address: {
    margin: 10,
    fontWeight: 'bold',
    flex: 1
  },
  date: {
    margin: 5,
    fontStyle: "italic",
    paddingLeft: 5,
    paddingRight: 5,
  },
  Button: {
    alignItems: 'center',
    backgroundColor: 'rgba(26, 35, 126, 0.8)',
    marginTop: 10,
    marginHorizontal: 50,
    marginBottom: 10,
    padding: 5,
    borderRadius: 20,
    fontWeight: 'bold'
  },
  buttontext: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    color: 'white',
  },
  Text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  }
});
