import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../screens/HomeScreen'
// import About from './About.js'
//import Events from './Events'
//import Activities from './Activities'
import EventScreen from '../screens/EventScreen'
import HomeScreen from '../screens/HomeScreen'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="home" component={HomeScreen} title="Home" initial={true} />
            <Scene key="info" component={InfoScreen} title="Info" />
            <Scene key="settings" component={SettingsScreen} title="Settings" />
            <Scene key="events" component={EventScreen} title="Events" />
            {/* <Scene key="events" component={Activities} title="Activities" /> */}
            {/* <Scene key="events" component={ActivitiesScreen} title="Activities" /> */}
        </Scene>
    </Router>
)
export default Routes