import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
export default class AboutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: "Tietoja sovelluksesta",
            bodyText: 'Sovellus on kehitetty osana Academyn syksyn 2019 JavaScriptiin keskittyvää intensiivikoulutusta. Sovelluksen ovat kehittäneet Jennifer Finnilä, Heidi Hennessy, Hanna-Elina Koivisto ja Emily Koskinen. Sovellus on tekijöidensä kurssin loppuprojekti.',
            apiText: 'Sovellus hyödyntää dataa, joka saadaan Helsinki Marketingin ylläpitämästä MyHelsinki Open API rajapinnasta. Kaikki API:n kautta kulkeva data on avointa lisenssillä Creative Commons BY 4.0 kuvatiedostoja lukuun ottamatta. MyHelsinki Open API: (linkki) http://open-api.myhelsinki.fi/ Ylläpitäjän verkkosivusto (linkki) https://www.myhelsinki.fi/ ',
            photoText: 'Sovelluksen taustakuva: "Helsinki Christmas Market" Valokuvaaja: Jussi Hellsten Valokuvan lähde: http://materialbank.myhelsinki.fi/media/915'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Tietoja sovelluksesta
                </Text>
                <Text style={styles.body}>
                    Sovellus on kehitetty osana Academyn syksyn 2019 JavaScriptiin keskittyvää intensiivikoulutusta. Sovelluksen ovat kehittäneet Jennifer Finnilä, Heidi Hennessy, Hanna-Elina Koivisto ja Emily Koskinen. Sovellus on tekijöidensä koulutuksen loppuprojekti.
                </Text>
                <Text style={styles.body}>
                    Sovellus hyödyntää dataa, joka saadaan Helsinki Marketingin ylläpitämästä MyHelsinki Open API rajapinnasta. Kaikki API:n kautta kulkeva data on avointa lisenssillä Creative Commons BY 4.0 kuvatiedostoja lukuun ottamatta.
                </Text>
                <Text style={styles.body}>MyHelsinki Open API: linkki http://open-api.myhelsinki.fi/ {"\n"}
                    Ylläpitäjän verkkosivusto: linkki https://www.myhelsinki.fi/</Text>
                <Text style={styles.body}>
                    Sovelluksen taustakuva: "Helsinki Christmas Market" {"\n"}
                    Valokuvaaja: Jussi Hellsten {"\n"}
                    Valokuvan lähde: http://materialbank.myhelsinki.fi/media/915
                </Text>
                <Text style={styles.body}>Tapahtumat- ja aktiviteetit-osioissa näkyvien valokuvien tiedot:</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        paddingLeft: 15,
    },
    body: {
        fontSize: 16,
        color: 'white',
        paddingTop: 15,
        paddingLeft: 15,
    }
});