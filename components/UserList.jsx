'use strict';
import React, {PureComponent} from 'react';
import {Dimensions, ScrollView, Text, View} from "react-native";
import {Button} from 'react-native-elements';

const {height} = Dimensions.get("window");

export default class UserList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            error: "",
            users: [],
            screenHeight: 0
        };
    }

    onScroll = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight});
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const messages = await fetch("http://snapi.epitech.eu/all", {
            method: "GET",
            headers: {
                "token": this.state.token
            }
        }).then(response => response.json());
        if (messages.data !== "error message")
            this.setState({users: messages.data})
        else this.setState({error: "Try refresh your snaps!"})
        console.log(messages);
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <ScrollView scrollEnabled={scrollEnabled} onContentSizeChange={this.onScroll}>
                <View>
                    <Text>
                        {`Your token is ${this.state.token}`}
                    </Text>
                    <Button
                        title="Refresh"
                        onPress={this.getUsers}
                        style={{height: "40%"}}
                    />
                    <Text style={{fontSize: 25, color: "red"}}>
                        {this.state.error}
                    </Text>
                    {
                        this.state.users.map((x, i) => (
                            <Text key={i}>{x.email}</Text>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}