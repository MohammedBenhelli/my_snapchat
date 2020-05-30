'use strict';
import React, {PureComponent} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity, StyleSheet, Image} from "react-native";

export default class Snap extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            snapId: this.props.snapId,
            from: this.props.from,
            duration: this.props.duration,
            token: this.props.token,
            photo: "../assets/icon.png"
        };
    }

    showSnap = async (e) => {
        const snap = await fetch(`http://snapi.epitech.eu/snap/${this.state.snapId}`, {
            method: "GET",
            headers: {
                "token": this.state.token
            }
        });
        console.log(snap);
    }

    render() {
        return (
            <View>
                <Text onPress={this.showSnap} style={{fontSize: 25, color: "blue"}}>
                    {this.state.from}
                </Text>
                <Image style={{height: 100, width: 100}} source={this.state.photo}/>
            </View>
        )
    }
}