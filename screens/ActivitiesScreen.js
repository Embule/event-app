import React, { Component } from 'react';
import Activities from '../components/Activities';
import { TouchableOpacity, Text, View } from 'react-native';

export default class ActivitiesScreen extends Component {
    render() {
        return (
            <View>
                <Activities {...this.props} />
            </View>
        )
    }
}
