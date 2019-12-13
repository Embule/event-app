import React from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const baseurl = "http://open-api.myhelsinki.fi/v1";

class FlatListItem extends React.Component {
  render() {
/*     let image = this.props.item.description.images[0].url;
    console.log(image); */
    return (
      <View  
      style={styles.container}>
        <Text style={styles.header}>{this.props.item.name.fi}</Text>
        <Text style={styles.timeplace}>{this.props.item.where_when_duration.where_and_when}</Text>
      </View>
    )
  }
}
export default class Activities extends React.Component {
  static navigationOptions = {
    title: "Activities"
  };
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.getActivities();
  };

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
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Activity', { id: item.id })
            }}>
            <FlatListItem item={item}></FlatListItem>
            </TouchableOpacity>
            )}
          }
        keyExtractor={({ id }, index) => id}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      marginBottom: 10,
      backgroundColor: 'lightblue'
  },
  header: {
      flex: 1,
      padding: 5,
      fontSize: 20
  },
  timeplace: {
    fontStyle: "italic"
  }
});