import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import HomeScreen from '../screens/HomeScreen'
import EventScreen from '../screens/EventScreen'
import ActivitiesScreen from '../screens/ActivitiesScreen'
import InfoScreen from '../screens/InfoScreen'
import ActivityScreen from '../screens/ActivityScreen'
import AboutScreen from '../screens/AboutScreen'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="home" component={HomeScreen} title="Home" initial={true} />
            <Scene key="events" component={EventScreen} title="Events" />
            <Scene key="activities" component={ActivitiesScreen} title="Activities" />
            <Scene key="info" component={InfoScreen} title="Info" />
            <Scene key="activity" component={ActivityScreen} title="Activity" />
            <Scene key="about" component={AboutScreen} title="About" />
        </Scene>
    </Router>
)
export default Routes