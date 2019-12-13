import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class About extends Component {
    static navigationOptions = {
        title: "Links"
    };
    render() {
        return (
            <View style={styles.about}>
                <MaterialCommunityIcons name='information-outline' size={48} color={'#fff'} />
                {/* <Text>Tänne tulee tiedot sekä applikaatiosta että tekijöistä sekä datasta.</Text> */}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    about: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})