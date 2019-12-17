import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
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
            <ScrollView style={styles.container}>
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
                    Sovelluksen taustakuva: {"\n"}
                    "Helsinki Christmas Market" {"\n"}
                    Valokuvaaja: Jussi Hellsten {"\n"}
                    Valokuvan lähde: {"\n"}
                    http://materialbank.myhelsinki.fi/media/915</Text>
                <Text style={styles.body}>Tapahtumat- ja aktiviteetit-osioissa näkyvien valokuvien tiedot löytyvät pudotusvalikosta. {"\n"}
                    Sovelluksessa käytety kuvat ovat Helsingin materiaalipankista materialbank.myhelsinki.fi, jonka kuvat ovat vapaasti käytettävissä ei-kaupalliseen käyttöön.</Text>

                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={styles.title}>Kuvatiedot</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={35} color={'white'} />
                </TouchableOpacity>
                <View style={styles.accordion} />
                {
                    this.state.expanded &&
                    <View>
                        <Text style={styles.body}>
                            Kuva: "Oodi - central library's main entrance", {"\n"}
                            Kuvaaja: Tuomas Uusheimo, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/2883 {"\n"}
                            {"\n"}
                            Kuva: "Teurastamo Abattoir", {"\n"}
                            Kuvaaja: Jussi Hellsten, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/536 {"\n"}
                            {"\n"}
                            Kuva: "Kallio Block Party"
                            Kuvaaja: Jussi Hellsten
                            Lähde: http://materialbank.myhelsinki.fi/media/895 {"\n"}
                            {"\n"}
                            Kuva: "Allas Sea Pool, Skywheel in the background", {"\n"}
                            Kuvaaja: Dorit Salutskij, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/1342 {"\n"}
                            {"\n"}
                            Kuva: "Enjoying coffee and doughnut at the Hakaniemi Market Square", {"\n"}
                            Kuvaajat: Yiping Feng and Ling Ouyang, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/2372 {"\n"}
                            {"\n"}
                            Kuva: "Hakaniemi Market Square", {"\n"}
                            Kuvaajat: Yiping Feng and Ling Ouyang, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/2374 {"\n"}
                            {"\n"}
                            Kuva: "Food yard at the Christmas Market in Senate Square", {"\n"}
                            Kuvaaja: Jussi Hellsten, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/914 {"\n"}
                            {"\n"}
                            Kuva: "Baltic Herring Market is held by the sea", {"\n"}
                            Kuvaaja: Eetu Ahanen, {"\n"}
                            http://materialbank.myhelsinki.fi/media/1149 {"\n"}
                            {"\n"}
                            Kuva: "Christmas lights in Helsinki (3)", {"\n"}
                            Kuvaaja: Jussi Hellsten, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/3602 {"\n"}
                            {"\n"}
                            Kuva: "Tennis Palace", {"\n"}
                            Kuvaaja: Riku Pihlanto, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/1080 {"\n"}
                            {"\n"}
                            Kuva: "Helsinki Christmas Market", {"\n"}
                            Kuvaaja: Jussi Hellsten, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/3284 {"\n"}
                            {"\n"}
                            Kuva: "Central library Oodi - third floor reading room", {"\n"}
                            Kuvaaja: Tuomas Uusheimo, {"\n"}
                            http://materialbank.myhelsinki.fi/media/2663 {"\n"}
                            {"\n"}
                            Kuva: "OODI - hide-away spots", {"\n"}
                            Kuvaaja: Tuomas Uusheimo, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/2645 {"\n"}
                            {"\n"}
                            Kuva: "Amos Rex lobby", {"\n"}
                            Kuvaajat: Yinping Feng and Ling Ouyang, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/2222 {"\n"}
                            {"\n"}
                            Kuva: "Old Market Hall", {"\n"}
                            Kuvaaja: Robert Lindström, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/1086 {"\n"}
                            {"\n"}
                            Kuva: "Summer Day in Töölönlahti event", {"\n"}
                            Kuvaaja: Vesa Laitinen, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/3407 {"\n"}
                            {"\n"}
                            Kuva: "Saving New Year’s Eve celebration memories", {"\n"}
                            Kuvaaja: Samuli Vienola, {"\n"}
                            Lähde: http://materialbank.myhelsinki.fi/media/2767 {"\n"}
                        </Text>
                    </View>
                }
            </ScrollView>
        );
    }
    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
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
        paddingRight: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        backgroundColor: '#00000000',
    },
    accordion: {
        height: 1,
        color: 'white',
        width: '100%',
        fontSize: 16,
    }
});