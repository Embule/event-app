import React, { Component } from 'react';
import { Text, StyleSheet, Button, ScrollView, Alert, View, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html'

const baseurl = "http://open-api.myhelsinki.fi/v1";
export default class ActivityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                description: { intro: null },
                name: '',
                location: { address: '' },
                where_when_duration: { where_and_when: '', duration: '' },
                info_url: ''
            }
        };
    }

    componentDidMount() {
        this.getActivity();
    }

    getActivity = () => {
        const id = this.props.navigation.getParam('id');
        return fetch(baseurl + `/activity/${encodeURIComponent(id)}`,
            { headers: { Accept: 'application/json' } })
            .then(res => res.json())
            .then(data => this.setState({ data: data }))
            .catch(error => {
                console.error(error);
            });
    };
    render() {
        if (!text) text = "Haetaan..."
        let text = this.state.data.description.body
        let name_var = this.state.data.name.fi
        let address_var = this.state.data.location.address.street_address
        let city = this.state.data.location.address.locality
        let where_and_when = this.state.data.where_when_duration.where_and_when
        let duration = this.state.data.where_when_duration.duration
        let url = this.state.data.info_url


        return (
            <ScrollView style={styles.container}>
                <Text style={styles.name}>{name_var}</Text>
                <View style={styles.containerHTML}><HTML html={text}></HTML></View>
                <Text style={styles.address}>{address_var}, {city}</Text>
                <Text style={styles.date}>Tapahtuma paikka ja aika: {where_and_when}</Text>
                <Text style={styles.date}>Tapahtuman kesto: {duration === null ? 'Lue lisää tapahtuman omilta sivulta.': duration}</Text>
                <Text style={styles.date}>{url}</Text>
                <TouchableOpacity style={styles.Button} title="Tapahtumalinkki" onPress={() => Alert.alert('Tapahtuman sivulle')}>
                    <Text style={{ color: 'blue' }}
                        onPress={(url) => Linking.openURL({ url })}>Tapahtuman sivulle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} title="Vie omaan kalenteriin" onPress={() => Alert.alert('Tästä joskus vie omaan kalenteriin ehkä')}>
                    <Text style={styles.buttontext}>Palaa listaan</Text></TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerHTML: {
        margin: 10,
    },
    container: {
        marginBottom: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    name: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 20,
        color: 'rgb(228, 167, 0);',
    },
    description: {
        margin: 10,
        flex: 1
    },
    address: {
        margin: 10,
        fontWeight: 'bold',
        flex: 1
    },
    date: {
        margin: 5,
        fontStyle: "italic",
        paddingLeft: 5,
        paddingRight: 5,
    },
    Button: {
        alignItems: 'center',
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
        marginTop: 10,
        marginHorizontal: 50,
        marginBottom: 10,
        padding: 3,
        borderRadius: 20,
        fontWeight: 'bold'
    },
    buttontext: {
        flex: 1,
        padding: 5,
        fontSize: 16,
        color: 'white',
    },
    Text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
});
