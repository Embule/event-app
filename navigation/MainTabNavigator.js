import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
//Hanna testausta button, jolla siirrytään HomeScreenistä EventScreeniin:
// import { createBottomTabNavigator } from 'react-navigation';
// import { Button, View, Text } from 'react-native';
//import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen';
//import LinksScreen from '../screens/LinksScreen';
import ExHomeScreen from '../screens/ExHomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import EventScreen from '../screens/EventScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Events: EventScreen,
    Info: InfoScreen,
  },
  config
);

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

const EventStack = createStackNavigator(
  {
    Events: EventScreen,
  },
  config
);

EventStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

EventStack.path = '';

// const LinksStack = createStackNavigator(
//   {
//     Links: ExHomeScreen,
//   },
//   config
// );

// LinksStack.navigationOptions = {
//   tabBarLabel: 'ExHomeScreen',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
//   ),
// };

// LinksStack.path = '';

// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen,
//   },
//   config
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };

// SettingsStack.path = '';

const InfoStack = createStackNavigator(
  {
    Info: InfoScreen,
  },
  config
);

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

InfoStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  EventStack,
  // LinksStack,
  // SettingsStack,
  InfoStack
});

tabNavigator.path = '';

export default tabNavigator;
