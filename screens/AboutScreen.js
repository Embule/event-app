import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class AboutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }
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
                <Text style={styles.body}>
                    <Text>Linkki ylläpitäjän verkkosivustoon: {"\n"}</Text>
                    <Text onPress={() => Linking.openURL('https://www.myhelsinki.fi/')}>
                        https://www.myhelsinki.fi/</Text>
                </Text>
                <Text style={styles.body}>
                    Sovelluksen taustakuva: "Helsinki Christmas Market" {"\n"}
                    Valokuvaaja: Jussi Hellsten {"\n"}
                    Valokuvan lähde: http://materialbank.myhelsinki.fi/media/915</Text>
                <Text style={styles.body}>Tapahtumat- ja aktiviteetit-osioissa näkyvien valokuvien tiedot:</Text>
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                    {/* <Text style={[styles.title, styles.font]}>{this.props.title}</Text> */}
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} />
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        {/* <Text>{this.props.data}ENTÄ JOS KIRJOITAN TÄNNE</Text> */}
                        <Text>
                            http://materialbank.myhelsinki.fi/media/2883 (Tuomas Uusheimo) {"\n"}
                            http://materialbank.myhelsinki.fi/media/536 (Jussi Hellsten) {"\n"}
                            http://materialbank.myhelsinki.fi/media/895 (Jussi Hellsten) {"\n"}
                            http://materialbank.myhelsinki.fi/media/1342 (Dorit Salutskij) {"\n"}
                            http://materialbank.myhelsinki.fi/media/2372 (Yiping Feng and Ling Ouyang) {"\n"}
                            http://materialbank.myhelsinki.fi/media/2374 (Yiping Feng and Ling Ouyang) {"\n"}
                            http://materialbank.myhelsinki.fi/media/914 (Jussi Hellsten) {"\n"}
                            http://materialbank.myhelsinki.fi/media/1149 (Eetu Ahanen) {"\n"}
                            http://materialbank.myhelsinki.fi/media/3602 (Jussi Hellsten) {"\n"}
                            http://materialbank.myhelsinki.fi/media/1080 (Riku Pihlanto) {"\n"}
                            http://materialbank.myhelsinki.fi/media/3284 (Jussi Hellsten) {"\n"}
                            http://materialbank.myhelsinki.fi/media/2663 (Tuomas Uusheimo) {"\n"}
                            http://materialbank.myhelsinki.fi/media/2645 (Tuomas Uusheimo) {"\n"}
                            http://materialbank.myhelsinki.fi/media/2222 (Yinping Feng and Ling Ouyang) {"\n"}
                            http://materialbank.myhelsinki.fi/media/1086 (Robert Lindström) {"\n"}
                            http://materialbank.myhelsinki.fi/media/3407 (Vesa Laitinen) {"\n"}
                            http://materialbank.myhelsinki.fi/media/2767 (Samuli Vienola) {"\n"}
                        </Text>
                    </View>
                }
            </View>
        );
    }
    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }
}
// https://medium.com/@KPS250/creating-an-accordion-in-react-native-f313748b7b46
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
        paddingRight: 15,
    },
    row: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    parentHr: {
        height: 1,
        color: 'green',
        width: '100%'
    },
    child: {
        padding: 16,
    }
});