import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../utils/WeatherIcons';
import { API_KEY } from '../utils/WeatherAPI';

export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            temp: '',
            weather: [],
        };
    }

    componentDidMount() {
        this.fetchWeather();
    }

    fetchWeather = () => {
        return fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=60.1674&lon=24.9426&APPID=${API_KEY}&units=metric`, { headers: { Accept: "application/json" } })
            .then(res => res.json())
            .then(data => this.setState({ temp: data.main.temp, weather: data.weather.main }))
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        const temperature = Math.round(this.state.temp);
        return (
            <View style={styles.container} >
                <View style={styles.weather}>
                    {/* Pitäisi hakea oikea sääikoni (this.state.weather) eikä kovakoodattu 'Clouds' */}
                    <MaterialCommunityIcons size={48} name={weatherConditions['Clouds'].icon} color={'#fff'} /> 
                    <Text style={styles.tempText}>{temperature}˚</Text>
                    <Text>Testi, tuleeko oikea data? {this.state.weather}</Text>
                </View>
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