'use strict';
import React, {PureComponent} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity, StyleSheet} from "react-native";
import {Camera} from 'expo-camera';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Messages from "./Messages";

export default class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            camera: Camera.Constants.Type.back,
            showMessages: false,
            token: ""
        };
        const getToken = async () => {
            this.setState({token: await AsyncStorage.getItem("token")})
        }
        getToken()
    }

    takePicture = async function (camera) {
        const options = {quality: 0.5, base64: true};
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
    };

    changeCamera = () => {
        if (this.state.camera === Camera.Constants.Type.back)
            this.setState({camera: Camera.Constants.Type.front});
        else this.setState({camera: Camera.Constants.Type.back})
    };

    showMessages = () => {
        this.setState({showMessages: true})
    };

    render() {
        if (!this.state.showMessages)
            return (
                <View style={{flex: 1}}>
                        <Camera style={{flex: 1}} type={this.state.camera}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 0.1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={this.showMessages}>
                                    <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}> Messages </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 0.1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={this.changeCamera}>
                                    <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}> Flip </Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                </View>
            );
        else return (
            <Messages/>
        )
    }
}