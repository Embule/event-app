import React from 'react';
import {
    AppRegistry,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
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
                style={{flex: 1}} source={require('../assets/images/tori.jpg')} >
                <ScrollView>
                <View style={styles.weather}>
                    {isLoading ? null : (
                        <View>
                            <Weather />
                        </View>
                    )}
                </View>
                <View style={styles.container}>
                    <TouchableOpacity 
                    style={styles.Button}
                    onPress={() => { this.props.navigation.navigate('Activities') }}
                    ><Text style={styles.Text}>AKTIVITEETIT</Text></TouchableOpacity>
                    <TouchableOpacity
                    style={styles.Button}
                    onPress={() => { this.props.navigation.navigate('Events') }}
                    ><Text style={styles.Text}>TAPAHTUMAT</Text></TouchableOpacity>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    weather: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 50,
        paddingRight: 25,
    },
    Button: {
        alignItems: 'center',
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
        marginTop: 400,
        position: 'relative',
        marginHorizontal: 10,
        paddingVertical: 50,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    Text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
});
