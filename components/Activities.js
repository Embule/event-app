import React from "react";
import {
ScrollView,
StyleSheet,
Button,
Alert,
FlatList,
Text
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
const baseurl = "http://open-api.myhelsinki.fi/v1";

export default class Activities extends React.Component {
static navigationOptions = {
    title: "Links"
};
constructor(props) {
    super(props);
    this.state = { data: [] };
}
getActivities = () => {
    return fetch(baseurl + /activities/, { headers: { Accept: "application/json" } })
    .then(res => res.json())
    .then(data => this.setState({ data: data.data }))
    .catch(error => {
        console.error(error);
    });
};

render() {
    return (
    <ScrollView>
        <Button
        onPress={() => {
            this.getActivities();
        }}
        title="ACTIVITIES"
        />
        <FlatList
        data={this.state.data}
        renderItem={({ item }) => <Text>{item.name.fi}, {item.where_when_duration.where_and_when}</Text>} keyExtractor={({id}, index) => id}
        />
    </ScrollView>
    );
}
}