import React from 'react';
import {
    AppRegistry,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';

import Events from '../components/Events';
import Activities from '../components/Activities'
import { StackNavigator } from 'react-navigation';
import Weather from '../components/Weather';


export default class HomeScreen extends React.Component {
    state = {
        isLoading: false,
    }
    render() {
        const { isLoading } = this.state;
        //const { navigate} = this.state;
        // handleOnPress = () => {
        //     this.props.navigation.navigate()
            return (
                <ScrollView style={styles.container}>

                    {/* Helsingin sää */}

                    <View style={styles.weather}>
                        {isLoading ? null : (
                            <View>
                                <Weather />
                            </View>
                        )}
                    </View>

                    {/* Buttonit eteenpäin */}
                    <View>
                        <Text style={styles.getStartedText}>
                            Meininki-app
                    </Text>
                        <Button
                            title="Press me"
                            onPress={() => Alert.alert('Button pressed')}
                        />
                        <Button
                            title="Go to the Events"
                            onPress={() => {this.props.navigation.navigate('Events')}}
                        />
                        <Events />
                        <Activities />
                    </View>
                </ScrollView>
            );
        }
    }

    HomeScreen.navigationOptions = {
        header: null,
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#0f802e',
        },
        weather: {
            flex: 1,
            alignItems: 'flex-end',
            paddingTop: 50,
            paddingRight: 25,
        },
        button: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            marginTop: 80,
            marginLeft: 30,
            marginRight: 30,
        }
    });
