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
import { NavigationEvents } from "react-navigation";

const baseurl = "http://open-api.myhelsinki.fi/v1";

export default class Events extends React.Component {
  static navigationOptions = {
    title: "Links"
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    return fetch(baseurl + /events/, {
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
      var dateA = new Date(a.event_dates.starting_day);
      var dateB = new Date(b.event_dates.starting_day);
      return dateA - dateB;
    });

  // let time;
  // const event = this.state.data.event_dates.starting_day;
  // if (event === null ) time = "Aikaa ei määritelty"
  // else time = event.toLocalString('fi-FI')
  // console.log(time)

  // const tiedot = this.state.data;
  // let time;
  // if (tiedot.event_dates.starting_day != null ) time = tiedot.event_dates.starting_day.toLocalString('fi-FI')
  // else time = "Aikaa ei määritelty."
  // console.log(time);

    return (
      <ScrollView>
        <FlatList
          const
          data={this.state.data}
          renderItem={({ item }) => (
            <Text
              onPress={() => {
                this.props.navigation.navigate("Info", { id: item.id });
              }}
              style={styles.events}
            >
              {item.name.fi}, {item.location.address.street_address}, {item.event_dates.starting_day}
            </Text>
          )} /* keyExtractor={({ id }, index) => id} */
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000000"
  },
  events: {
    flex: 1,
    color: "black"
  },
  tempText: {
    fontSize: 28,
    color: "#fff"
  }
});
