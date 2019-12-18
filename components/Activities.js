import React from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from 'lodash';

const baseurl = "http://open-api.myhelsinki.fi/v1";

//muuttuja sille, kun scrollataan sivun loppuun ja halutaan ladata lisää aktiviteetteja
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 40;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

//Yksittäinen itemi aktiviteettilistassa
class FlatListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let randomNr = Math.floor(Math.random() * this.props.image.length);

    return (
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
        <Image style={styles.images}
            source={this.props.image[randomNr]}>
          </Image>
        </View>
        <View>
          <Text style={styles.header}>{this.props.item.name.fi}</Text>
          <Text style={styles.timeplace}>{this.props.item.where_when_duration.where_and_when}</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={() => {
          this.props.navigation.navigate('Activity', { id: this.props.item.id })
        }}><Text style={styles.Text}>Lue lisää...</Text></TouchableOpacity>
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
      isLoading: true,
      page: 0,
      data: [],
      search: '',
      allData: [],
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
        require('../assets/images/helsinki10.jpg'),
        require('../assets/images/helsinki11.jpg'),
        require('../assets/images/helsinki12.jpg'),
        require('../assets/images/helsinki13.jpg'),
        require('../assets/images/helsinki14.jpg'),
        require('../assets/images/helsinki15.jpg'),
        require('../assets/images/helsinki16.jpg'),
       ]
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
      .then(data => this.setState({
        // isLoading: false,
        // page: 0,
        data: data.data,
        allData: data.data
      },
      ))
      .catch(error => {
        console.error(error);
      });
  };

  SearchFilterFunction = text => {
    const newData = this.state.allData.filter(function(item) {
      const whenWhere = item.where_when_duration.where_and_when ? item.where_when_duration.where_and_when : ''
      const name = item.name.fi ? item.name.fi : ''
      const itemData = `${name.toUpperCase()} ${whenWhere.toUpperCase()}`
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
    //Listan sorttaus
      const data = this.state.data.sort(function compare(a, b) {
      var dateA = new Date(a.where_when_duration.where_and_when);
      var dateB = new Date(b.where_when_duration.where_and_when);
      return dateA - dateB;
    });
    
    return (
      <ScrollView>
      
        <TextInput
        style={styles.textInputStyle}
        onChangeText={this.SearchFilterFunction}
        value={this.state.text}
        placeholder="Etsi" />

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <FlatListItem item={item} image={this.state.images} {...this.props}></FlatListItem>
            )
        }
        }
          keyExtractor={({ id }, index) => 'key'+index}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: 'rgba(63, 81, 181, 0.8)',
    marginBottom: 20,
    marginHorizontal: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(63, 81, 181, 0.8)',
    borderRadius: 20,
  },
  images: {
    flex: 1,
    height: 140,
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
    borderRadius: 20,
},
Text: {
  fontSize: 16,
  padding: 5,
  color: 'white',
}
});