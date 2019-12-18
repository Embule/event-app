import React from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
} from "react-native";
import moment from 'moment';
import { ExpoLinksView } from "@expo/samples";
import { NavigationEvents } from "react-navigation";
import _ from 'lodash';
import throttle from 'lodash.throttle'
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker'
import ActivityIndicatorExample from './ActivityIndicatorExample';

const baseurl = "http://open-api.myhelsinki.fi/v1";

//Yksittäinen itemi eventtilistassa
class FlatListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     images: [
      require('../assets/images/helsinki0.jpg'),
      require('../assets/images/helsinki1.jpg'),
      require('../assets/images/helsinki2.jpg'),
      require('../assets/images/helsinki3.jpg'),
      require('../assets/images/helsinki4.jpg'),
      require('../assets/images/helsinki5.jpg'),
      require('../assets/images/helsinki6.jpg'),
      require('../assets/images/helsinki7.jpg'),
      require('../assets/images/helsinki8.jpg'),
      require('../assets/images/helsinki9.jpg'),
      require('../assets/images/helsinki10.jpg'),
      require('../assets/images/helsinki11.jpg'),
      require('../assets/images/helsinki12.jpg'),
      require('../assets/images/helsinki13.jpg'),
      require('../assets/images/helsinki14.jpg'),
      require('../assets/images/helsinki15.jpg'),
      require('../assets/images/helsinki16.jpg'),
     ]
    };
  }
  render() {
    let image= this.state.images[Math.floor(Math.random() * this.state.images.length)];
    const time = moment(this.props.item.event_dates.starting_day).format('DD.MM.YYYY')

    return (
      <View style={styles.itemcontainer}>
        <View style={styles.imagecontainer}>
          <Image style={styles.images}
            source={image}>
          </Image>
        </View>
          <Text style={styles.header}>{this.props.item.name.fi}</Text>
          <View style={styles.locationView}>
          <Image style={styles.locationImage} source={require('../assets/images/location.png')} />
          <Text style={styles.timeplace}>{this.props.item.location.address.street_address}</Text>
          </View>

          <View style={styles.locationView}>
          <Image style={styles.locationImage} source={require('../assets/images/calendar.png')} />
          <Text style={styles.timeplace}>{time}</Text>
          </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Button} onPress={() => {
          this.props.navigation.navigate('Info', { id: this.props.item.id })
        }}><Text style={styles.Text}>Lue lisää...</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default class Events extends React.Component {
  static navigationOptions = {
    title: "Links"
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allData: [],
      isVisible: false,
      formatDate: ''
    };
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
  }

  componentDidMount() {
    this.getEvents();
    this.makeRemoteRequest();
  };

  getEvents = () => {
    return fetch(baseurl + /events/, {
      headers: { Accept: "application/json" }
    })
      .then(res => res.json())
      .then(data => this.setState({
        data: data.data,
        allData: data.data
      },))
      .catch(error => {
        console.error(error);
      });
  };

// Hakutoiminto: vertailee tekstisyötettä dataan ja palauttaa tuloksen / data saa arvon newData
SearchFilterFunction = text => {
  const newData = this.state.allData.filter(function(item) {
    const name = item.name.fi ? item.name.fi.toUpperCase() : ''
    const itemData = `${name}`
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    data: newData,
    text: text
  });
}
// Hakutoiminto: poimii syötetyn päivämäärän tekstikenttään ja vertailee sitä datasta tulevaan päivämäärään
SearchDateFunction = text => {
  const newData = this.state.allData.filter(function(item) {
    const date = item.event_dates.starting_day ? item.event_dates.starting_day : ''
    const itemDate = moment(date).format('DD.MM.YYYY')
    return itemDate.indexOf(text) > -1;
  });
  this.setState({
    data: newData,
    text: text,
  })
}

  render() {
    return (
      <ScrollView>
        <View style={styles.logoContainer}><Image style={styles.logo} source={require('../assets/images/Meininki_blue.png')} /></View>
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.SearchFilterFunction}
          value={this.state.text}
          placeholder="Hae tapahtumaa..." />
        
        <DatePicker
          style={styles.datePicker}
          date={this.state.date}
          mode="date"
          format="DD.MM.YYYY"
          placeholder=" "
          customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          }
          }}
          onDateChange={this.SearchDateFunction}
        />
        </View>
        <ActivityIndicatorExample />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <FlatListItem item={item} {...this.props}></FlatListItem>
          } keyExtractor={({ id }, index) => 'key'+index}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000000',
  },
  events: {
    flex: 1,
    color: 'black',
  },
  textInputStyle: {
    width: 250,
    height: 50,
    backgroundColor: 'white',
    color: '#1A237E',
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#1A237E',
    borderRadius: 30,
    textAlign: 'center',
    flex: 1
  },
  datePicker: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  tempText: {
    fontSize: 28,
    color: '#fff'
  },
  itemcontainer: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    flex: 1,
    height: 140,
  },
  header: {
    flex: 1,
    padding: 5,
    fontSize: 18,
    color: '#1A237E',
    fontWeight: 'bold',
  },
  timeplace: {
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 6,
    marginTop: 15
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A237E',
    marginVertical: 10,
    width: 150,
    height: 50,
    borderRadius: 30,
},
  Text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
},
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  logo: {
    resizeMode: 'contain',
    height: 50,
    width: 120,
},
  locationView: {
  flex: 1,
  flexDirection: 'row',
  margin: 1,
},
  locationImage: {
    flex: 1,
    height: 30,
    width: 20,
    margin: 5,
    resizeMode: 'contain'
  },
  buttonContainer: {
    alignItems: 'center',
  }
});
