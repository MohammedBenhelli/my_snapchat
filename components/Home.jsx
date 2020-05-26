import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {Text, View, AsyncStorage} from "react-native";
import Register from "./Register";

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
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
                <Text style={{fontSize: 40}} onPress={this.getToken}>
                    {`token: ${this.state.token}`}
                </Text>
            </View>
        );
    }
}