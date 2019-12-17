import React, { Component } from 'react';
import { Link, Image, View, Text, StyleSheet, Button, ScrollView, Alert, FlatList, Linking } from 'react-native';
import moment from 'moment';
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
        event_dates: { starting_day: '', ending_day: '' },
        info_url: ''
      }
    };
  }

  componentDidMount() {
    this.getEvent();
    Linking.getInitialURL(this.state.data.info_url).then((url) => {
      if (url) {
        console.log('Initial url is:' + this.state.data.info_url)
      }
    })
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
    let city = this.state.data.location.address.locality
    let startday_var = this.state.data.event_dates.starting_day
    const startday = moment(startday_var).format('DD.MM.YYYY HH:mm')
    let endday_var = this.state.data.event_dates.ending_day
    const endday = moment(endday_var).format('DD.MM.YYYY HH:mm')
    let url = this.state.data.info_url;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerImg}>
          <Image style={styles.image} source={require('../assets/images/Meininki.png')}></Image>
        </View>
        <Text style={styles.name}>{name_var}</Text>
        <Text style={styles.description}>{text}</Text>

        <View style={styles.locationView}>
          <Image style={styles.locationImage} source={require('../assets/images/location.png')} />
          <Text style={styles.address}>{address_var}, {city}</Text>
        </View>

        <View style={styles.locationView}>
        <Image style={styles.locationImage} source= {require('../assets/images/calendar.png')}/>
        <Text style={styles.date}>{startday === 'Invalid date' ? 'Lue lisää tapahtuman omilta sivuilta' : startday}</Text>
        </View>

        <Text style={styles.enddate}>Päättymisajankohta: {endday === 'Invalid date' ? 'Lue lisää tapahtuman omilta sivulta.' : endday}</Text>
        <Text style={styles.date}>{url}</Text>
        <TouchableOpacity style={styles.Button} title="Tapahtumalinkki">
          <Text style={{ color: 'white', fontSize:16, padding: 5 }}
            onPress={() => Linking.openURL( url )}>Tapahtuman sivulle</Text>
        </TouchableOpacity>
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
    fontSize: 16,
    flex: 6,
  },
  locationImage: {
    flex: 1,
    height: 30,
    resizeMode: 'contain'
  },
  date: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 16,
    flex: 6,
  },
  enddate: {
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
  },
  locationView: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: 'rgba(26, 35, 126, 0.8)',
  },
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
