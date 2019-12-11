import Events from '../components/Events'
//alla Router-importteja:
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const EventScreen = () => {
    const goToHomeScreen = () => {
        Actions.home()
    }
    return (
        <TouchableOpacity style={{ margin: 128 }} onPress={goToHomeScreen}>
            <Text>This is Events</Text>
        </TouchableOpacity>
    )
}

// export default function EventScreen() {
//     return (
//         <View>
//             <Events />
//         </View>
//     )
// }

export default EventScreen