import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class About extends Component {
    static navigationOptions = {
        title: "Links"
    };

    render() {
        return (
            <View>
                <View style={styles.about}>
                    <MaterialCommunityIcons name='information-outline' size={40} color={'#fff'} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    about: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})