import React, { Component } from 'react';
import About from '../components/About';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default class AboutScreen extends Component {
    render() {
        return (
            <View style={styles.about}>
                <MaterialCommunityIcons name='information-outline' size={35} color={'#fff'} />
                <Text>Tänne tulee tiedot sekä applikaatiosta että tekijöistä sekä datasta.</Text>
            </View>
            // <View>
            //     <About />
            // </View>
        )
    }
}
const styles = StyleSheet.create({
    about: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
