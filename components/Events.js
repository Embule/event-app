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
        <View>
          <Text style={styles.header}>{this.props.item.name.fi}</Text>
          <Text style={styles.timeplace}>{this.props.item.location.address.street_address}</Text>
          <Text style={{padding: 5}}>{time}</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={() => {
          this.props.navigation.navigate('Info', { id: this.props.item.id })
        }}><Text style={styles.Text}>Lue lisää...</Text></TouchableOpacity>
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

SearchDateFunction = text => {
  const newData = this.state.allData.filter(function(item) {
    const date = item.event_dates.starting_day ? item.event_dates.starting_day : ''
    const itemDate = moment(date).format('DD.MM.YYYY')
    return itemDate.indexOf(text) > -1;
  });
  this.setState({
    data: newData,
    text: text
  })
}

  render() {
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.SearchFilterFunction}
          value={this.state.text}
          placeholder="Hae tapahtumaa..." />
        <DatePicker
          date={this.state.date}
          mode="date"
          format="DD.MM.YYYY"
          placeholder="Valitse päivä"
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
    color: 'rgba(63, 81, 181, 0.8)',
    marginVertical: 5,
    marginHorizontal: 50,
    borderWidth: 1,
    borderColor: 'rgba(63, 81, 181, 0.8)',
    borderRadius: 30,
    textAlign: 'center',
  },
  searchContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
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
  },
  timeplace: {
    fontStyle: "italic",
    paddingLeft: 5,
    paddingRight: 5,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 35, 126, 0.8)',
    marginVertical: 10,
    width: 250,
    height: 50,
    marginHorizontal: 50,
    borderRadius: 30,
},
Text: {
  fontSize: 16,
  color: 'white',
  textAlign: 'center',
}
});
