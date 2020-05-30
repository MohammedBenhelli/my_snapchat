'use strict';
import React, {PureComponent} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image} from "react-native";
import {Camera} from 'expo-camera';
import Messages from "./Messages";
import UserList from "./UserList";
import Swiper from "react-native-swiper";
import * as ImagePicker from 'expo-image-picker';
import {Button} from "react-native-elements";
import Login from "./Login";

export default class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            disconnect: false,
            hasPermission: null,
            camera: Camera.Constants.Type.back,
            token: "",
            photo: null
        };
        const getToken = async () => {
            this.setState({token: await AsyncStorage.getItem("token")})
        }
        getToken()
    }

    pickImage = async () => {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        };
        const image = await ImagePicker.launchImageLibraryAsync(options);
        if (image.uri)
            this.setState({photo: image})
        console.log(image)
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

    disconnect = async () => {
        console.log(this.state.disconnect)
        AsyncStorage.setItem("token", null);
        this.setState({disconnect: true})
        console.log(this.state.disconnect)
    }

    async componentDidMount(): void {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasPermission: status === "granted"})
    }

    render() {
        if(!this.state.disconnect) {
            const photo = this.state.photo;
            console.log("ici", photo)
            if (this.state.hasPermission === null)
                return <View/>;
            else if (this.state.hasPermission === false)
                return <Text>No access to camera</Text>;
            else return (
                    <Swiper>
                        <View style={{flex: 1}}>
                            <Button title={"Log out"} style={{backgroundColor: "red"}} onPress={this.disconnect}/>
                            {/*<Camera style={{flex: 1}} type={this.state.camera}>*/}
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'black',
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
                                <TouchableOpacity
                                    style={{
                                        flex: 0.2,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={this.pickImage}>
                                    <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}> Open </Text>
                                </TouchableOpacity>
                                {
                                    photo && <Button
                                        style={{
                                            flex: 0.2,
                                            alignSelf: 'flex-end',
                                            alignItems: 'center',
                                        }}
                                        title={"Send"}
                                    />
                                }
                            </View>
                            {/*</Camera>*/}
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
        else return (
            <Login/>
        )
    }
}