import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class About extends Component {
    static navigationOptions = {
        title: "Links"
    };
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         information: [
    //             {
    //                 title: 'Tietoja applikaatiosta',
    //                 data: 'Tämä applikaatio on Academyn loppuprojekti.'
    //             },
    //             {
    //                 title: 'Tietoja OpenHelsinkiAPI:sta',
    //                 data: 'Tämä applikaatio hyödyntää...'
    //             },
    //         ]
    //     }
    // }
    render() {
        return (
            <View>
                <View style={styles.about}>
                    <MaterialCommunityIcons name='information-outline' size={48} color={'#fff'} />
                </View>
                {/* <View style={styles.container}>
                    {this.renderAccordians()}
                </View> */}
            </View>
        );
    }
}
//     renderAccordians = () => {
//         const items = [];
//         for (item of this.state.menu) {
//             items.push(
//                 <AboutScreen
//                     title={item.title}
//                     data={item.data}
//                 />
//             );
//         }
//         return items;
//     }
// }

const styles = StyleSheet.create({
    about: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})