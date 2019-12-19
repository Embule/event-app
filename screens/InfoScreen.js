import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    let name_var = this.state.data.name.fi
    if (!name_var) name_var = "Haetaan..."
    let address_var = this.state.data.location.address.street_address
    let city = this.state.data.location.address.locality
    let startday_var = this.state.data.event_dates.starting_day
    const startday = moment(startday_var).format('DD.MM.YYYY HH:mm')
    let endday_var = this.state.data.event_dates.ending_day
    const endday = moment(endday_var).format('DD.MM.YYYY HH:mm')
    
    let url;
    if (this.state.data.info_url === null) url = "https://www.myhelsinki.fi/"
    else url = this.state.data.info_url

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerImg}>
          <Image style={styles.logo} source={require('../assets/images/Meininki_blue.png')}></Image>
        </View>

        <View style={styles.namecontainer}>
        <Text style={styles.name}>{name_var}</Text>
        </View>

        <Text style={styles.description}>{text}</Text>

        <View style={styles.locationView}>
          <Image style={styles.locationImage} source={require('../assets/images/location.png')} />
          <Text style={styles.address}>{address_var}, {city}</Text>
        </View>

        <View style={styles.locationView}>
          <Image style={styles.locationImage} source={require('../assets/images/calendar.png')} />
          <Text style={styles.date}>{startday === 'Invalid date' ? 'Lue lisää tapahtuman omilta sivuilta' : startday}</Text>
        </View>

        <Text style={styles.enddate}>Päättymisajankohta: {endday === 'Invalid date' ? 'Lue lisää tapahtuman omilta sivulta.' : endday}</Text>

        <TouchableOpacity style={styles.Button} title="Tapahtumalinkki">
          <Text style={styles.link}
            onPress={() => Linking.openURL(url)}>Siirry tapahtuman sivuille</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    padding: 10
  },
  namecontainer: {
    borderTopWidth: 1,
    paddingTop: 10,
  },
  name: {
    fontWeight: 'bold',
    margin: 10,
    fontSize: 20,
    color: '#FFB300',
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
    backgroundColor: '#1A237E',
    marginTop: 20,
    marginHorizontal: 50,
    marginBottom: 20,
    padding: 5,
    borderRadius: 30,
    fontWeight: 'bold'
  },
  buttontext: {
    flex: 1,
    paddingHorizontal: 5,
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
  logo: {
    resizeMode: 'contain',
    height: 50,
    width: 120,
    marginBottom: 15
  },
  link: {
    color: 'white',
    fontSize: 16,
    padding: 10
  },
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});