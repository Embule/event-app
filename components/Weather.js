import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { weatherConditions } from '../utils/WeatherIcons';
import { API_KEY } from '../utils/WeatherAPI';
import { FlatList } from 'react-native-gesture-handler';


export default class Weather extends React.Component {

/*     constructor(props) {
        super(props);
        this.state = { data: [] };
    } */

/*     componentDidMount() {
        this.fetchWeather();
    } */

/*     fetchWeather = () => {
        return fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=60.1674&lon=24.9426&APPID=${API_KEY}&units=metric`, { headers: { Accept: "application/json" } })
            .then(res => res.json())
            .then(data => this.setState({ data: data }))
            .catch(error => {
                console.error(error);
            });
    } */
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.weather}>
                    <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
                    {/* <FlatList
                        data={this.state.data}
                        renderItem={({ item }) =>  */}<Text style={styles.tempText}>{/* {item.main.temp} */}Temp˚</Text>{/* } /> */}
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