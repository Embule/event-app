import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DatePicker extends Component {
    constructor() {
        super()
        this.state = {
            isVisible: false
        }
    }

handlePicker = () => {
    this.setState({
        isVisible: false
    })
}

showPicker = () => {
    this.setState({
        isVisible: true
    })
}

hidePicker = () => {
    this.setState({ 
        isVisible: false 
    })
}

render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={this.showPicker}>
                <Text style={styles.text}>Kalenteri</Text>
            </TouchableOpacity>

            <DateTimePicker
                isVisible={this.state.isVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                
            />
            </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
})