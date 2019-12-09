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
/* import {haeLista} from '../serviceClient'; */
const baseurl = "http://open-api.myhelsinki.fi/v1/events/";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Links"
  };
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  getData = () => {
    return fetch(baseurl, { headers: { Accept: "application/json" } })
      .then(res => res.json())
      .then(data => this.setState({ data: data.data }))
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <ScrollView>
        {/*<ExpoLinksView />*/}
        <Button
          onPress={() => {
            this.getData();
          }}
          title="Press Me"
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Text>{item.name.fi}</Text>} keyExtractor={({id}, index) => id}
        />
      </ScrollView>
    );
  }
}

// import React from "react";
// import {
//   View,
//   StyleSheet,
//   Button,
//   Alert,
//   FlatList,
//   Text
// } from "react-native";
// import { ExpoLinksView } from "@expo/samples";
// /* import { haeLista } from "../serviceClient"; */

// const baseurl = "https://www.helmet.fi/download/noname/{B19F54E5-F124-47D7-9091-18C58CC69815}/70008";
// export default class LinksScreen extends React.Component {
//   static navigationOptions = {
//     title: "Links"
//   };
//   constructor(props) {
//     super(props);
//     this.state = { data: [] };
//   }
//   getData = () => {
//     return fetch(baseurl, { headers: { Accept: "application/json" } })
//       .then(res => res.json())
//       .then(data => this.setState({ data: data.results }))
//       .then(console.log(data.results))
//       .catch(error => {
//         console.error(error);
//       });
//   };
//   render() {
//     return (
//       <View>
//       <Text>Toimiiko tämä</Text>
//         <FlatList
//           data={this.state.data}
//           renderItem={({ item }) => <Text>{item.name.fi}</Text>}
//         />
//       </View>
//     );
//   }
// }
