import React, { Component } from 'react';
import Events from '../components/Events';
import NewPicker from '../components/SearchbyDate';
import { TouchableOpacity, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class EventScreen extends Component {

    render() {
        return (
            <View>
                {/* <SearchbyDate /> */}
                <Events {...this.props} />
            </View>
        )
    }
}
