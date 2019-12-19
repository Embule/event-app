import React, { Component } from 'react';
import { Text, StyleSheet, Button, ScrollView, Alert, View, Linking, Image } from 'react-native';
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
        let where_and_when = this.state.data.where_when_duration.where_and_when
        let duration = this.state.data.where_when_duration.duration

        let url;
        if (this.state.data.info_url === null) url = "https://www.myhelsinki.fi/"
        else url = this.state.data.info_url

        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerImg}>
                    <Image style={styles.logo} source={require('../assets/images/Meininki_blue.png')}></Image>
                </View>

                <View style={styles.namecontainer}>
                    <Text style={styles.name}>{name_var}</Text>
                </View>

                <View style={styles.locationView}>
                    <Image style={styles.locationImage} source={require('../assets/images/calendar.png')} />
                    <Text style={styles.date}>{where_and_when}</Text>
                </View>

                <View style={styles.containerHTML}><HTML html={text}></HTML></View>
                <Text style={styles.duration}>Tapahtuman kesto: {duration === null ? 'Lue lisää tapahtuman omilta sivulta.' : duration}</Text>

                <TouchableOpacity style={styles.Button} title="Tapahtumalinkki">
                    <Text style={{ color: 'white', fontSize: 16, padding: 5 }}
                        onPress={() => Linking.openURL(url)}>Siirry aktiviteetin sivuille</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        padding: 20
      },
    containerHTML: {
        padding: 10
    },
    namecontainer: {
        borderTopWidth: 1,
        paddingTop: 10,
    },
    name: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 20,
        color: '#FFB300',
    },
    description: {
        margin: 5,
        flex: 1
    },
    address: {
        margin: 10,
        fontWeight: 'bold',
        flex: 6,
        fontSize: 16,
    },
    duration: {
        margin: 10,
        flex: 1,
        fontStyle: 'italic'
    },
    date: {
        margin: 10,
        fontWeight: 'bold',
        flex: 6,
        fontSize: 16,
    },
    Button: {
        alignItems: 'center',
        backgroundColor: '#1A237E',
        marginTop: 20,
        marginHorizontal: 50,
        marginBottom: 30,
        padding: 5,
        borderRadius: 30,
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
    },
    locationView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    locationImage: {
        flex: 1,
        height: 30,
        resizeMode: 'contain',
        marginTop: 10
    },
    logo: {
        resizeMode: 'contain',
        height: 50,
        width: 120,
        marginBottom: 15
      },
    containerImg: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
