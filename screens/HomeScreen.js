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
import { StackNavigator } from 'react-navigation';
import Weather from '../components/Weather';

export default class HomeScreen extends React.Component {
    state = {
        isLoading: false,
    }
    render() {
        const { isLoading } = this.state;
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
                        title="Go to the Activities"
                        onPress={() => { this.props.navigation.navigate('Activities') }}
                    />
                    <Button
                        title="Go to the Events"
                        onPress={() => { this.props.navigation.navigate('Events') }}
                    />
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
