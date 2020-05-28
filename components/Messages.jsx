'use strict';
import React, {PureComponent} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity, StyleSheet} from "react-native";
import {Button} from 'react-native-elements';

export default class Messages extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showMessages: false,
            token: this.props.token,
            error: "",
            snaps: []
        };
    }

    componentDidMount() {
        this.getSnaps();
    }

    getSnaps = async () => {
        const messages = await fetch("http://snapi.epitech.eu/snaps", {
            method: "GET",
            headers: {
                "token": this.state.token
            }
        }).then(response => response.json());
        if (messages.data !== "error message")
            this.setState({snaps: messages.data})
        else this.setState({error: "Try refresh your snaps!"})
        console.log(messages);
    }

    render() {
        return (
                <View>
                    <Text>
                        {`Your token is ${this.state.token}`}
                    </Text>
                    <Button
                        title="Refresh"
                        onPress={this.getSnaps}
                        style={{height: "40%"}}
                    />
                    <Text style={{fontSize: 25, color: "red"}}>
                        {this.state.error}
                    </Text>
                </View>
        )
    }
}