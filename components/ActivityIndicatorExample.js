import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class ActivityIndicatorExample extends Component {
state = { animating: true }
   
closeActivityIndicator = () => setTimeout(() => this.setState({
animating: false }), 4000)
   
componentDidMount = () => this.closeActivityIndicator()
render() {
    const animating = this.state.animating
    return (
        <View style = {styles.container}>
            <ActivityIndicator
            animating = {animating}
            color = 'rgba(26, 35, 126, 0.8)'
            size = "large"
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
    marginTop: 5
},
activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
}
})