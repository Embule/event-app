import React, { Component } from 'react';
import { Text, Stylesheet, Button, ScrollView, Alert } from 'react-native';

const baseurl = "http://open-api.myhelsinki.fi/v1";
export default class ActivityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                description: { intro: null }
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
        let text = this.state.data.description.intro
        if (!text) text = "Haetaan"
        return (
            <ScrollView>
                <Text>{text}</Text>
                <Button title="Vie omaan kalenteriin" onPress={() => Alert.alert('Vie omaan kalenteriin')} />
                <Button title="Palaa listaan" onPress={() => {
                    this.props.navigation.navigate('Activities')
                }} />
            </ScrollView>
        );
    }
}
