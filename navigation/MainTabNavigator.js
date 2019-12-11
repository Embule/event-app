import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
//Hanna testausta button, jolla siirrytään HomeScreenistä EventScreeniin:
// import { createBottomTabNavigator } from 'react-navigation';
// import { Button, View, Text } from 'react-native';
// import EventScreen from '../screens/EventScreen';
//import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//Alkuperäinen:
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

//Hanna: kokeilu  siirtää Eventscreeniin buttonilla
// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Events: EventScreen,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

//Hanna: kokeilu 1 siirtää Eventscreeniin buttonilla
// const HomeStack = createStackNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Events: { screen: EventScreen },
//   },
//   config
// );

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
