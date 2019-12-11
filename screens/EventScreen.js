import React from 'react';
import Events from '../components/Events'
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const EventScreen = () => {
    const goToHomeScreen = () => {
        Actions.home()
    }
    return (
        <TouchableOpacity style={{ margin: 128 }} onPress={goToHomeScreen}>
            <Text>This is Events</Text>
            <Events />
        </TouchableOpacity>
    )
}

export default EventScreen