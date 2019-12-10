import React from 'react';
import { ScrollView, StyleSheet, Button, View, Text } from 'react-native';
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
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            //Reitti
                        }}
                        title="Tapahtumat"
                    />
                    <Button
                        onPress={() => {
                            //Reitti
                        }}
                        title="Aktiviteetit"
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
