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
  Dimensions
} from "react-native";
import moment from 'moment';
import { ExpoLinksView } from "@expo/samples";
import { NavigationEvents } from "react-navigation";
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';

const baseurl = "http://open-api.myhelsinki.fi/v1";
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 40;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
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
        data: data.data.slice(0, 12)
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
  this.setState({
    value: text,
  })
  const newData = this.state.data.filter(function(item) {
    const itemData = `${item.name.fi.toUpperCase()} ${item.location.address.street_address.toUpperCase()}`
    const textData = text.toUpperCase();

    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    data: newData,
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
        onChangeText={text => this.SearchFilterFunction(text)}
        value={this.state.text}
        placeholder="Etsi" />

        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <Text onPress={() => { this.props.navigation.navigate('Info', { id: item.id }) }} style={styles.events}> {item.name.fi}, {item.location.address.street_address}, {item.event_dates.starting_day === null ? 'Aikaa ei ole määritelty.' : item.event_dates.starting_day} </Text>}
           /* keyExtractor={({ id }, index) => id} */
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
});