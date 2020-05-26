import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {Text, View} from "react-native";
import Register from "./Register";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            showRegister: false
        };
    }

    sendLogin = async (e) => {
        if (this.state.password.length === 0 || this.state.email === 0)
            this.setState({error: "Enter your information!"});
        else {
            this.setState({error: ""});
            const response = await fetch("http://snapi.epitech.eu/connection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": this.state.email, "password": this.state.password
                })
            }).then(response => response.json());
            if (response.data.token !== undefined)
                this.setState({error: `Your token is ${response.data.token}`});
        }
    };

    render() {
        if (!this.state.showRegister)
            return (
                <View>
                    <Text style={{marginTop: 30, fontSize: 25, color: "purple"}}>
                        Login
                    </Text>
                    <Text style={{fontSize: 25, color: "red"}}>
                        {this.state.error}
                    </Text>
                    <Input
                        placeholder='Enter your email'
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        onChangeText={val => this.setState({email: val})}
                    />
                    <Input
                        placeholder="Password" secureTextEntry={true}
                        leftIcon={{type: 'font-awesome', name: 'lock'}}
                        onChangeText={val => this.setState({password: val})}
                    />
                    <Button
                        title="Login"
                        onPress={this.sendLogin}
                    />
                    <Button
                        title="Register"
                        onPress={() => this.setState({showRegister: true})}
                    />
                </View>
            );
        else return (
            <Register/>
        )
    }
}