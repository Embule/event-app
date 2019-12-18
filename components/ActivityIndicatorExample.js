import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class ActivityIndicatorExample extends Component {
state = { animating: true, isVisible: true }
   
closeActivityIndicator = () => setTimeout(() => this.setState({
animating: false, isVisible: false }), 5000)
   
componentDidMount = () => this.closeActivityIndicator()
render() {
    const animating = this.state.animating
    return (
        <View style = {styles.container}>
            <ActivityIndicator
            animating = {animating}
            color = '#FFB300'
            size = "small"
            style = {styles.activityIndicator}/>
        </View>
    )
}
}
export default ActivityIndicatorExample

const styles = StyleSheet.create ({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5
},
activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
}
})