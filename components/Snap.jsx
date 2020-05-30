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
            photo: "data:image/gif;base64,"
        };
    }

    showSnap = async (e) => {
         const snap = await fetch(`http://snapi.epitech.eu/snap/${this.state.snapId}`, {
             method: "GET",
             headers: {
                 "token": this.state.token
             }
         }).then(res => res.blob())
        .then(blob => {
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                let base64data = `data:image/gif;base64,${reader.result.split(",")[1]}`;
                console.log(base64data);
                this.setState({photo: base64data})
                setTimeout(async () => {
                    this.setState({photo: "data:image/gif;base64,"});
                    const sup = await fetch(`http://snapi.epitech.eu/seen`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "token": this.state.token
                        },
                        body: JSON.stringify({
                            "id": this.state.snapId
                        })
                    }).then(res => res.json());
                    console.log(sup)
                }, this.state.duration * 1000);
            }
        });
    }

    render() {
        return (
            <View>
                <Text onPress={this.showSnap} style={{fontSize: 25, color: "blue"}}>
                    {this.state.from}
                </Text>
                <Image style={{height: 500, width: 500}} source={{uri: this.state.photo}}/>
            </View>
        )
    }
}