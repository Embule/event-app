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
  Image
} from "react-native";
import moment from 'moment';
import { ExpoLinksView } from "@expo/samples";
import { NavigationEvents } from "react-navigation";
// import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { TouchableOpacity } from "react-native-gesture-handler";

const baseurl = "http://open-api.myhelsinki.fi/v1";
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 40;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

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
      require('../assets/images/helsinki10.jpg')
     ]
    };
  }
  render() {
    let image= this.state.images[Math.floor(Math.random() * this.state.images.length)];

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
          <Text style={styles.timeplace}>{this.props.item.event_dates.starting_day === null ? 'Aikaa ei ole määritelty.' : this.props.item.event_dates.starting_day}</Text>
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
      isLoading: true,
      page: 0,
      data: [],
      search: '',
      allData: []
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
        isLoading: false,
        page: 0,
        data: data.data.slice(0, 12),
        allData: data.data
      }, function () {
        this.addRecords(0);
      }))
      .catch(error => {
        console.error(error);
      });
  };

  addRecords = (page) => {
    const newRecords = []
    for (var i = page * 12, il = i + 12; i < il && i <
      this.state.data.length; i++) {
      newRecords.push(this.state.data[i]);
    }
    this.setState({
      data: [...this.state.data, ...newRecords]
    });
  }

  onScrollHandler = () => {
    this.setState({
      page: this.state.page + 1, momentumScrollBegun: false
    }, () => {
      this.addRecords(this.state.page);
    });
  }

SearchFilterFunction = text => {
  const newData = this.state.allData.filter(function(item) {
    const location = item.location.address.street_address ? item.location.address.street_address : ''
    const name = item.name.fi ? item.name.fi.toUpperCase() : ''
    const itemData = `${name} ${location.toUpperCase()}`
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    data: newData,
    text: text
  });
}

  render() {
  const { search } = this.state.search;

    return (
      <ScrollView onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          this.onScrollHandler();
        }
      }}
        scrollEventThrottle={400}>

        <TextInput
        style={styles.textInputStyle}
        onChangeText={this.SearchFilterFunction}
        value={this.state.text}
        placeholder="Etsi" />

        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <FlatListItem item={item} {...this.props}></FlatListItem>
          } /* keyExtractor={({ id }, index) => id} */
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
    height: 40,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: 'rgba(63, 81, 181, 0.8)',
    margin: 30,
    borderWidth: 1,
    borderColor: 'rgba(63, 81, 181, 0.8)',
    borderRadius: 10,
  },
  tempText: {
    fontSize: 28,
    color: '#fff'
  },
  itemcontainer: {
    marginBottom: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    flex: 1,
    height: 120,
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
    backgroundColor: 'rgba(26, 35, 126, 0.8)',
    marginTop: 10,
    marginHorizontal: 50,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
},
Text: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
}
});

{/* <Text onPress={() => { this.props.navigation.navigate('Info', { id: item.id }) }} style={styles.events}> {item.name.fi}, {item.location.address.street_address}, {item.event_dates.starting_day === null ? 'Aikaa ei ole määritelty.' : item.event_dates.starting_day}</Text> */}