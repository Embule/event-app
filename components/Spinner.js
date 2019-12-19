import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

class Spinner extends Component {
    state = { animating: true }

    closeActivityIndicator = () => setTimeout(() => this.setState({
        animating: false
    }), 7000)

    componentDidMount = () => this.closeActivityIndicator()
    render() {
        const animating = this.state.animating
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={animating}
                    color='#FFB300'
                    size="small"
                    style={styles.activityIndicator} />
            </View>
        )
    }
}
export default Spinner

const styles = StyleSheet.create({
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