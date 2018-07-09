import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";

import { TextInput, Button } from "react-native-paper";
import { NavigationActions, StackActions } from "react-navigation";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import CustomCard from "../CustomCard";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6owtsh3quj0110bh9in815"
});

class AuthScreen extends Component {
  static navigationOptions = {
    title: "Recipe app"
  };

  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <CustomCard>
        <TextInput
          label="Email"
          textContentType="emailAddress"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />

        <TextInput
          label="Password"
          secureTextEntry={true}
          textContentType="password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <Button
          raised
          onPress={() => {
            client
              .mutate({
                variables: {
                  email: {
                    email: this.state.username,
                    password: this.state.password
                  }
                },
                mutation: gql`
                  mutation signIn(
                    $email: AUTH_PROVIDER_EMAIL = { email: "", password: "" }
                  ) {
                    signinUser(email: $email) {
                      token
                      user {
                        id
                      }
                    }
                  }
                `
              })
              .then(response => {
                this.props.navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: "Home",
                        params: { userId: response.data.signinUser.user.id }
                      })
                    ]
                  })
                );
              })
              .catch(error => alert(error));
          }}
        >
          Log in
        </Button>
        <Button
          raised
          onPress={() => this.props.navigation.navigate("CreateAccount")}
        >
          Sign up
        </Button>
      </CustomCard>
    );
  }
}
export default AuthScreen;
