import React from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import Register from "./components/Register";
import Home from "./components/Home";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connected: false
        };
        const getToken = async () => {
            let token = await AsyncStorage.getItem("token");
            if (token !== undefined)
                this.setState({connected: true})
        };
        getToken()
    }

    render() {
        if (!this.state.connected)
            return (
                <View>
                    <Register/>
                </View>
            );
        else return (
            <Home/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
