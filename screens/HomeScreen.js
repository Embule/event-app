import React from 'react';
import {
  AppRegistry,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Events from '../components/Events';
import Activities from '../components/Activities'
import EventScreen from '../screens/EventScreen';
import { StackNavigator } from 'react-navigation';

export default function HomeScreen() {
  // const { navigate } = this.props.navigation;
  // handleOnPress = () => {
  //   this.props.navigation.navigate('EventScreen')
  // }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>
            Meininki-app
          </Text>
          <Button
            title="Press me"
            onPress={() => Alert.alert('Button pressed')}
          />
          <Button
            title="Go to the Events"
            onPress={() => navigate('EventScreen')}
          />
          <Events />
          <Activities />
          {/* <Routes /> */}
        </View>
      </ScrollView>
    </View>
  );
}

import { ScrollView, StyleSheet, Button, View, Text } from 'react-native';
import Weather from '../components/Weather';


export default class HomeScreen extends React.Component {
    state = {
        isLoading: false,
    }
    render() {
        const { isLoading } = this.state;
        return (
            <ScrollView style={styles.container}>

                {/* Helsingin sää */}

                <View style={styles.weather}>
                    {isLoading ? null : (
                        <View>
                            <Weather />
                        </View>
                    )}
                </View>

                {/* Buttonit eteenpäin */}
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            //Reitti
                        }}
                        title="Tapahtumat"
                    />
                    <Button
                        onPress={() => {
                            //Reitti
                        }}
                        title="Aktiviteetit"
                    />
                </View>
            </ScrollView>
        );
    }
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0f802e',
    },
    weather: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 50,
        paddingRight: 25,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginTop: 80,
        marginLeft: 30,
        marginRight: 30,
    }
});
