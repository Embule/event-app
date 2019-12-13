import React, { Component } from 'react';
import About from '../components/About';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
export default class AboutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            information: [
                {
                    data: props.data,
                    expanded: false,
                },
            ]
        }
    }
    render() {
        return (
            <View style={styles.about}>
                <MaterialCommunityIcons name='information-outline' size={35} color={'#fff'} />
                <Text>Tänne tulee tiedot sekä applikaatiosta että tekijöistä sekä datasta.</Text>
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} />
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <Text>{this.props.data}</Text>
                    </View>
                }
            </View>
        )
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }
}

const styles = StyleSheet.create({
    about: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    parentHr: {
        height: 1,
        color: 'green',
        width: '100%'
    },
    child: {
        padding: 16,
    }
})
