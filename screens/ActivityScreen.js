import React, { Component } from 'react';
import { Text, Stylesheet, Button, ScrollView, Alert } from 'react-native';
import moment from 'moment';
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
                where_when_duration: { where_and_when: '', duration: '' }
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
        let postcode_var = this.state.data.location.address.postal_code
        let city = this.state.data.location.address.locality
        let where_and_when = this.state.data.where_when_duration.where_and_when
        let duration = this.state.data.where_when_duration.duration
       

        return (
            <ScrollView>
                <Text>{name_var}</Text>
                <HTML html={text}></HTML>
                <Text>{address_var}, {city}</Text>
                <Text>Tapahtuma paikka ja aika: {where_and_when}</Text>
                <Text>Tapahtuman kesto: {duration === null ? 'Lue lisää tapahtuman sivulta.' : duration}</Text>
                <Button title="Vie omaan kalenteriin" onPress={() => Alert.alert('Vie omaan kalenteriin')} />
            </ScrollView>
        );
    }

    
}
