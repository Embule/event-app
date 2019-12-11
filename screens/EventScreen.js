import React, {Component} from 'react';
import Events from '../components/Events'
import { TouchableOpacity, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class EventScreen extends Component {
//     const goToHomeScreen = () => {
//         Actions.home()
//     }

render() {
    return (
        <View>
        <TouchableOpacity style={{ margin: 128 }} onPress={()=> {this.props.navigation.navigate('Info')}}>
            <Text>This is Events</Text>
            <Events />
        </TouchableOpacity>  
        <Button title="Go to the Info" onPress={() => {this.props.navigation.navigate('Info')}}
    />      
</View>
    )
}
}
