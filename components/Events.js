import React from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  Text,
  Dimensions,
  View
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
      query: '',
      fullData: [] //kaikki data (ei vain ikkunassa näkyvä)
    };
  }

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
        data: data.data.slice(0, 40)
      },
      ))
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
    Alert.alert('Testi' + this.state.data.length)
  }

  onScrollHandler = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.addRecords(this.state.page);
    });
  }

  handleSearch = (text) => {
    this.setState({ query: text });
  }

  render() {
    // const data = this.state.data
    //   .sort(function compare(a, b) {
    //     var dateA = new Date(a.event_dates.starting_day);
    //     let momentDateA = moment(dateA).format('DD.MM.YYYY')
    //     var dateB = new Date(b.event_dates.starting_day);
    //     let momentDateB = moment(dateB).format('DD.MM.YYYY')
    //     return dateA - dateB
    //   });

    const { height } = Dimensions.get('window');

    return (
      <View style={{ flex: 1, height: height }}>
        {/* <SearchBar placeholder="Etsi..." lightTheme onChangeText={this.handleSearch} /> */}
        <FlatList style={{height: 50, width: '100%', flexGrow: 1, flex: 1, backgroundColor: 'green', border: '2px solid blue'}}
          data={this.state.data}
          renderItem={({ item }) => <Text onPress={() => { this.props.navigation.navigate('Info', { id: item.id }) }} style={styles.events}> {item.name.fi}, {item.location.address.street_address}, {item.event_dates.starting_day}</Text>} //keyExtractor={({ id }, index) => id} 
          onEndReached={this.onScrollHandler}
          onEndThreshold={0} ></FlatList>
      </View>
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
  tempText: {
    fontSize: 28,
    color: '#fff'
  },
});
