import React from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  Text,
  TextInput,
} from "react-native";
import moment from 'moment';
import { ExpoLinksView } from "@expo/samples";
import { NavigationEvents } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';


const baseurl = "http://open-api.myhelsinki.fi/v1";

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
      fullData: [],  //kaikki data (ei vain ikkunassa näkyvä)
      error: null,
    };
  };
  componentDidMount() {
    this.getEvents();
  };

  getEvents = () => {
    return fetch(baseurl + /events/, {
      headers: { Accept: "application/json" }
    })
      .then(res => res.json())
      .then(data => this.setState({
        isLoading: false,
        page: 0,
        data: data.data.slice(0, 10)
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
      page: this.state.page + 1
    }, () => {
      this.addRecords(this.state.page);
    });
  }

SearchFilterFunction(text) {
  const newData = this.state.data.filter(function(item) {
    const itemData = item.name.fi ? item.name.fi.toUpperCase(): ''.toUpperCase();
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
      <ScrollView>
        <TextInput
        style={styles.textInputStyle}
        onChangeText={text => this.SearchFilterFunction(text)}
        value={this.state.text}
        placeholder="Etsi" />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Text onPress={() => { this.props.navigation.navigate('Info', { id: item.id }) }} style={styles.events}> {item.name.fi}, {item.location.address.street_address}, {item.event_dates.starting_day === null ? 'Aikaa ei ole määritelty' : item.event_dates.starting_day}</Text>} /* keyExtractor={({ id }, index) => id} */
          onEndReached={this.onScrollHandler}
          onEndThreshold={0} />
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
});
