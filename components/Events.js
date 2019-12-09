import React from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  FlatList,
  Text
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
const baseurl = "http://open-api.myhelsinki.fi/v1";

export default class Events extends React.Component {
  static navigationOptions = {
    title: "Links"
  };
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  getEvents = () => {
    return fetch(baseurl + /events/, { headers: { Accept: "application/json" } })
      .then(res => res.json())
      .then(data => this.setState({ data: data.data }))
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <ScrollView>
         <Button
          onPress={() => {
            this.getEvents();
          }}
          title="EVENTS"
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Text>{item.name.fi}, {item.location.address.street_address}, {item.event_dates.starting_day}</Text>} keyExtractor={({id}, index) => id}
        /> 
      </ScrollView>
    );
  }
}
