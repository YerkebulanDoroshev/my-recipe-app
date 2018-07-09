import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { TextInput, Button } from "react-native-paper";

import CustomCard from "../CustomCard";

const SIGN_UP = gql`
  mutation addUser(
    $authProvider: AuthProviderSignupData = {
      email: { email: "", password: "" }
    }
  ) {
    createUser(authProvider: $authProvider) {
      email
      password
    }
  }
`;

class CreateAccountScreen extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <Mutation mutation={SIGN_UP}>
        {(createUser, { loading }) => (
          <React.Fragment>
            <CustomCard>
              <TextInput
                label="Username"
                textContentType="username"
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
              />
            </CustomCard>
            <CustomCard>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Button
                  
                  disabled={
                    this.state.username.length === 0 ||
                    this.state.password.length === 0
                  }
                  onPress={() => {
                    createUser({
                      variables: {
                        authProvider: {
                          email: {
                            email: this.state.username,
                            password: this.state.password
                          }
                        }
                      }
                    })
                      .then(() => this.props.navigation.goBack())
                      .then(() => this.setState({ username: "", password: "" }))
                      .catch(error => alert(error));
                  }}
                >
                  Create
                </Button>
              )}
            </CustomCard>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}
export default CreateAccountScreen;
