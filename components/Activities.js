import React from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
//import Images from './HelsinkiImages';

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
      require('../assets/images/helsinki10.jpg')
     ]
    };
  }
  render() {
    // require('../assets/images/helsinki1.jpg') -->toimii testikuvana
    let image= this.state.images[Math.floor(Math.random() * this.state.images.length)];

    return (
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image style={styles.images}
            source={image}>
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
        isLoading: false,
        page: 0,
        data: data.data.slice(0, 12)
      }, function () {
        this.addRecords(0);
      }
      ))
      .catch(error => {
        console.error(error);
      });
  };

  //lisää 12kpl aktiviteetteja
  addRecords = (page) => {
    const newRecords = []
    for (var i = page * 12, il = i + 12; i < il && i <
      this.state.data.length; i++) {
      newRecords.push(this.state.data[i]);
    }
    this.setState({
      data: [...this.state.data, ...newRecords]
    });
  }

  //scrollauksen säätelijä, lisää uuden sivun kun ollaan alareunassa
  onScrollHandler = () => {
    this.setState({
      page: this.state.page + 1, momentumScrullBegun: false
    }, () => {
      this.addRecords(this.state.page);
    });
  }

  handleSearch = (text) => {
    this.setState({ query: text });
  }

  render() {
    //Listan sorttaus
    const data = this.state.data.sort(function compare(a, b) {
      var dateA = new Date(a.where_when_duration.where_and_when);
      var dateB = new Date(b.where_when_duration.where_and_when);
      return dateA - dateB;
    });

    return (

      <ScrollView onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          this.onScrollHandler();
        }
      }}
        scrollEventThrottle={400}>
        <SearchBar placeholder="Etsi..." lightTheme onChangeText={this.handleSearch} />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <FlatListItem item={item} {...this.props}></FlatListItem>
            )
        }
        }
          /* keyExtractor={({ id }, index) => id} */
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
    flex: 1,
    height: 120,
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
    borderRadius: 10,
},
Text: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
}
});