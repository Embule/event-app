import React, { Component } from 'react';
import About from '../components/About';
import { TouchableOpacity, Text, View, Button } from 'react-native';

export default class AboutScreen extends Component {
    render() {
        return (
            <View>
                <About />
            </View>
        )
    }
}
