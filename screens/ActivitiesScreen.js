import React, { Component } from 'react';
import Activities from '../components/Activities';
import { View } from 'react-native';

export default class ActivitiesScreen extends Component {
    render() {
        return (
            <View>
                <Activities {...this.props} />
            </View>
        )
    }
}
