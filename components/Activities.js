import React from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const baseurl = "http://open-api.myhelsinki.fi/v1";

//Yksittäinen itemi aktiviteettilistassa
class FlatListItem extends React.Component {
  render() {
    //let image = this.props.item.description.images[0].url;
    //console.log(image);
    return (
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image style={styles.images}
            source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}>
          </Image>
        </View>
        <View>
          <Text style={styles.header}>{this.props.item.name.fi}</Text>
          <Text style={styles.timeplace}>{this.props.item.where_when_duration.where_and_when}</Text>
        </View>
      </View>
    )
  }
}

//Koko aktiviteettilista ja aktiviteettidatan haku
export default class Activities extends React.Component {
  static navigationOptions = {
    title: "Activities"
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      testimage: ''
    };
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
    //Listan sorttaus
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
            )
          }
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
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: 100,
    height: 100,
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
  }
});