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

export default class Activities extends React.Component {
  static navigationOptions = {
    title: "Links"
  };
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  getActivities = () => {
    return fetch(baseurl + /activities/, {
      headers: { Accept: "application/json" }
    })
      .then(res => res.json())
      .then(data => this.setState({ data: data.data }))
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const data = this.state.data.sort(function compare(a, b) {
      var dateA = new Date(a.where_when_duration.where_and_when);
      var dateB = new Date(b.where_when_duration.where_and_when);
      return dateA - dateB;
    });
    return (
      <ScrollView>
        <Button
          onPress={() => {
            this.getActivities();
          }}
          title="ACTIVITIES"
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Text>
              {item.name.fi}, {time}
            </Text>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </ScrollView>
    );
  }
}
