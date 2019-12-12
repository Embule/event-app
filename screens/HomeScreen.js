import React from 'react';
import {
    AppRegistry,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Weather from '../components/Weather';


export default class HomeScreen extends React.Component {
    state = {
        isLoading: false,
    }
    render() {
        const { isLoading } = this.state;
        return (
                <ImageBackground 
                style={{flex: 1}} source={require('./tori.jpg')} >
                <ScrollView>
                <View style={styles.weather}>
                    {isLoading ? null : (
                        <View>
                            <Weather />
                        </View>
                    )}
                </View>
                <View style={styles.Button}>
                    <Button
                        title="Go to the Activities"
                        onPress={() => { this.props.navigation.navigate('Activities') }}
                    />
                    <Button
                        title="Go to the Events"
                        onPress={() => { this.props.navigation.navigate('Events') }}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
        );
    }
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
    },
    weather: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 50,
        paddingRight: 25,
    },
    Button: {
        flex: 1,
        margin: 100,
        color: 'green',
    }
});
