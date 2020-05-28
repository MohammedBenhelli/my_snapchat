'use strict';
import React, {PureComponent} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Camera} from 'expo-camera';
import Messages from "./Messages";
import UserList from "./UserList";
import Swiper from "react-native-swiper";

export default class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            camera: Camera.Constants.Type.back,
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

    async componentDidMount(): void {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasPermission: status === "granted"})
    }

    render() {
        if (this.state.hasPermission === null)
            return <View/>;
        else if (this.state.hasPermission === false)
            return <Text>No access to camera</Text>;
        else return (
                <Swiper>
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
                                    onPress={this.changeCamera}>
                                    <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}> Flip </Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                    <View>
                        <Messages token={this.state.token}/>
                    </View>
                    <View>
                        <UserList token={this.state.token}/>
                    </View>
                </Swiper>
            );
    }
}