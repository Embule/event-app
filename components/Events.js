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
  Dimensions,
  Image
} from "react-native";
import moment from 'moment';
import { ExpoLinksView } from "@expo/samples";
import { NavigationEvents } from "react-navigation";
// import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import throttle from 'lodash.throttle'
import { TouchableOpacity } from "react-native-gesture-handler";

const baseurl = "http://open-api.myhelsinki.fi/v1";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 40;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

//Yksittäinen itemi eventtilistassa
class FlatListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    let image= this.state.images[Math.floor(Math.random() * this.state.images.length)];
    const time = moment(this.props.item.event_dates.starting_day).format('DD.MM.YYYY HH:mm')

    return (
      <View style={styles.itemcontainer}>
        <View style={styles.imagecontainer}>
          <Image style={styles.images}
            source={image}>
          </Image>
        </View>
        <View>
          <Text style={styles.header}>{this.props.item.name.fi}</Text>
          <Text style={styles.timeplace}>{this.props.item.location.address.street_address}</Text>
          <Text>{time}</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={() => {
          this.props.navigation.navigate('Info', { id: this.props.item.id })
        }}><Text style={styles.Text}>Lue lisää...</Text></TouchableOpacity>
      </View>
    )
  }
}
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
      allData: []
    };
    this.addRecordsThrottled = throttle(this.addRecords, 3000);
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
  }

  componentDidMount() {
    this.getEvents();
    this.makeRemoteRequest();
    // this.addRecords()
  };

  componentWillUnmount() {
    this.getMoreDataThrottled.cancel();
  }

  getEvents = () => {
    return fetch(baseurl + /events/, {
      headers: { Accept: "application/json" }
    })
      .then(res => res.json())
      .then(data => this.setState({
        isLoading: false,
        page: 0,
        data: data.data.slice(0, 12),
        allData: data.data
      }, function () {
        this.addRecords(0);
      }))
      .catch(error => {
        console.error(error);
      });
  };

 //lisää 12 tapahtumaa lisää uudelle sivulle
  addRecords = () => {
    console.log("start addRecords");
    const newRecords = []
    for (var i = 0; i < 12; i++) {
      newRecords.push(this.state.data[i]);
      this.page +=1;
    }
    this.setState(prevState => ({
     data: prevState.data.concat(newRecords)
    })
      // data: [...this.state.data, ...newRecords]
    );
  }

//lisää uuden sivun kun ollaan sivun alareunassa
  onScrollHandler = () => {
    this.setState({
      page: this.state.page + 1, momentumScrollBegun: false
    }, () => {
      this.addRecords(this.state.page);
    });
  }

// Hakutoiminto: vertailee tekstisyötettä dataan ja palauttaa tuloksen / data saa arvon newData
SearchFilterFunction = text => {
  const newData = this.state.allData.filter(function(item) {
    const location = item.location.address.street_address ? item.location.address.street_address : ''
    const name = item.name.fi ? item.name.fi.toUpperCase() : ''
    const itemData = `${name} ${location.toUpperCase()}`
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
  console.log(this.state.data.length);

    return (
      <ScrollView onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          this.onScrollHandler();
        }
      }}
        scrollEventThrottle={400}>

        <TextInput
        style={styles.textInputStyle}
        onChangeText={this.SearchFilterFunction}
        value={this.state.text}
        placeholder="Etsi" />

        <FlatList
          data={this.state.data}
          // newRecords={this.state.newRecords}
          renderItem={({ item }) =>
            <FlatListItem item={item} {...this.props}></FlatListItem>
          } /* keyExtractor={({ id }, index) => id} */
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
    marginBottom: 20,
    marginHorizontal: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(63, 81, 181, 0.8)',
    borderRadius: 20,
  },
  tempText: {
    fontSize: 28,
    color: '#fff'
  },
  itemcontainer: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  fontWeight: 'bold',
  color: 'white',
}
});

{/* <Text onPress={() => { this.props.navigation.navigate('Info', { id: item.id }) }} style={styles.events}> {item.name.fi}, {item.location.address.street_address}, {item.event_dates.starting_day === null ? 'Aikaa ei ole määritelty.' : item.event_dates.starting_day}</Text> */}