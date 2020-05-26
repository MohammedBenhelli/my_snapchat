import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {Text, View} from "react-native";
import Login from "./Login";

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConf: "",
            error: "",
            showLogin: false
        };
    }

    sendRegister = async () => {
        if (this.state.password !== this.state.passwordConf)
            this.setState({error: "The password confirmation is wrong!"});
        else {
            this.setState({error: ""});
            const response = await fetch("http://snapi.epitech.eu/inscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": this.state.email, "password": this.state.password
                })
            }).then(response => response.json());
            if (response.data.email !== this.state.email)
                this.setState({error: "Something went wrong please retry later!"});
        }
    };

    render() {
        if (!this.state.showLogin)
            return (
                <View>
                    <Text style={{marginTop: 30, fontSize: 25, color: "purple"}}>
                        Register
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
                    <Input
                        placeholder="Password confirmation" secureTextEntry={true}
                        leftIcon={{type: 'font-awesome', name: 'lock'}}
                        onChangeText={val => this.setState({passwordConf: val})}
                    />
                    <Button
                        title="Register"
                        onPress={this.sendRegister}
                    />
                    <Button
                        title="Login"
                        onPress={() => this.setState({showLogin: true})}
                        style={{height: "40%"}}
                    />
                </View>
            );
        else return (
            <Login/>
        )
    }
}