'use strict';
import React, {PureComponent} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity, StyleSheet} from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class Messages extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showMessages: false,
            token: ""
        };
        const getToken = async () => {
            this.setState({token: await AsyncStorage.getItem("token")})
        }
        getToken()
    }

    render() {
        return (
            <View>
                <Text>
                    {`Your token is ${this.state.token}`}
                </Text>
            </View>
        )
    }
}