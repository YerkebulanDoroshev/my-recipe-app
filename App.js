import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "react-navigation";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import CreateRecipeScreen from "./src/screens/CreateRecipeScreen";
import AuthScreen from "./src/screens/AuthScreen";
import CreateAccountScreen from "./src/screens/CreateAccountScreen";


console.disableYellowBox = true;

const RootStack = createStackNavigator({
  Login: { screen: AuthScreen },
  CreateAccount: {screen: CreateAccountScreen},
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
  CreateRecipe: { screen: CreateRecipeScreen },
});

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6owtsh3quj0110bh9in815"
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    );
  }
}

export default App;
