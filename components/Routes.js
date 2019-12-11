import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../screens/HomeScreen'
//import Events from './Events'
//import Activities from './Activities'
import EventScreen from '../screens/EventScreen'
import HomeScreen from '../screens/HomeScreen'
import InfoScreen from '../screens/InfoScreen'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="home" component={HomeScreen} title="Home" initial={true} />
            {/* <Scene key="home" component={Home} title="Home" initial={true} /> */}
            <Scene key="events" component={EventScreen} title="Events" />
            <Scene key="info" component={InfoScreen} title="Info" />
            {/* <Scene key="events" component={ActivitiesScreen} title="Activities" /> */}
        </Scene>
    </Router>
)
export default Routes