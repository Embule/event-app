import React from 'react';
import { View, Text, StyleSheet, Linking, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../utils/WeatherIcons';
import {API_KEY} from 'react-native-dotenv';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temp: '2',
            weather: 'Clouds',
        };
    }

    componentDidMount() {
        this.fetchWeather();
    }

    fetchWeather = () => {
        return fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=60.1674&lon=24.9426&APPID=${API_KEY}&units=metric`, { headers: { Accept: "application/json" } })
            .then(res => res.json())
            .then(data => this.setState({ temp: data.main.temp, weather: data.weather[0].main }))
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        const temperature = Math.round(this.state.temp);
        let weatherCond;
        const todaysWeather = `${this.state.weather}`;
        let condition = weatherConditions[todaysWeather]

        if (!condition) weatherCond = weatherConditions['Clouds']
        else weatherCond = condition

        url = "https://ilmatieteenlaitos.fi/saa/helsinki";
        
        return (
            <View style={styles.container} >
                <TouchableOpacity style={styles.weather} onPress={()=> Linking.openURL(url)}>
                    <MaterialCommunityIcons size={48} name={weatherCond.icon} color={'#fff'} />
                    <Text style={styles.tempText}>{temperature}˚</Text>
                </TouchableOpacity>
            </View>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000000',
    },
    weather: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tempText: {
        fontSize: 28,
        color: '#fff'
    },
});