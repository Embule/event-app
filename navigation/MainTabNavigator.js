import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
// import LinksScreen from '../screens/LinksScreen';
//import ExHomeScreen from '../screens/ExHomeScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import ActivityScreen from '../screens/ActivityScreen';
import AboutScreen from '../screens/AboutScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Events: EventScreen,
    Activities: ActivitiesScreen,
    Info: InfoScreen,
    Activity: ActivityScreen,
    About: AboutScreen,
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
    Info: InfoScreen,
    Home: HomeScreen
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

const ActivitiesStack = createStackNavigator(
  {
    Activities: ActivitiesScreen,
    Activity: ActivityScreen,
    Home: HomeScreen
  },
  config
);

ActivitiesStack.navigationOptions = {
  tabBarLabel: 'Activities',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  )
};

ActivitiesStack.path = '';

const ActivityStack = createStackNavigator(
  {
    Activity: ActivityScreen,
    Activities: ActivitiesScreen,
    Home: HomeScreen
  },
  config
);

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  )
};

ActivityStack.path = '';

const InfoStack = createStackNavigator(
  {
    Info: InfoScreen,
    Event: EventScreen,
    Home: HomeScreen
  },
  config
);

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-link'} />
  ),
};

InfoStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
    Home: HomeScreen
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

AboutStack.path = '';

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

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  // EventStack,
  // ActivitiesStack,
  // AboutStack,
  // LinksStack,
  // SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
