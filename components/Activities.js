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
import Spinner from './Spinner'

const baseurl = "http://open-api.myhelsinki.fi/v1";

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

        <Text style={styles.header} onPress={() => { this.props.navigation.navigate('Activity', { id: this.props.item.id }) }}>{this.props.item.name.fi}</Text>
        <View style={styles.locationView}>
          <Image style={styles.locationImage} source={require('../assets/images/location.png')} />
          <Text style={styles.timeplace}>
            {this.props.item.where_when_duration.where_and_when}
          </Text>

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.Button} onPress={() => {
            this.props.navigation.navigate('Activity', { id: this.props.item.id })
          }}><Text style={styles.Text}>Lue lisää...</Text></TouchableOpacity>
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
      isLoading: true,
      page: 0,
      data: [],
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
        data: data.data,
        allData: data.data
      },
      ))
      .catch(error => {
        console.error(error);
      });
  };

  SearchFilterFunction = text => {
    const newData = this.state.allData.filter(function (item) {
      const name = item.name.fi ? item.name.fi : ''
      const itemData = `${name.toUpperCase()}`
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      text: text
    });
  }

  render() {

    return (
      <ScrollView>
        <View style={styles.logoContainer}><Image style={styles.logo} source={require('../assets/images/Meininki_blue.png')} /></View>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.SearchFilterFunction}
          value={this.state.text}
          placeholder="Hae aktiviteettia..." />
        <Spinner />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <FlatListItem item={item} image={this.state.images} {...this.props}></FlatListItem>
            )
          }
          }
          keyExtractor={({ id }, index) => 'key' + index}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#1A237E',
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
  locationView: {
    flex: 1,
    flexDirection: 'row',
  },
  locationImage: {
    flex: 1,
    resizeMode: 'contain',
    height: 30,
    width: 20,
  },
  images: {
    flex: 1,
    height: 140,
  },
  header: {
    flex: 1,
    padding: 5,
    paddingBottom: 10,
    fontSize: 20,
    color: '#1A237E',
    fontWeight: 'bold',
  },
  timeplace: {
    flex: 8,
    fontSize: 16,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 10,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A237E',
    marginVertical: 10,
    width: 150,
    height: 50,
    borderRadius: 30,
  },
  Text: {
    fontSize: 16,
    padding: 5,
    color: 'white',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 70,
    width: 150,
  },
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 20,
  },
});