import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Title } from "react-native-paper";

import CustomCard from "../CustomCard";

const GET_ALL_RECIPES = gql`
  {
    allRecipes {
      id
      title
      description
      image
      instructions
      ingredients
    }
  }
`;

class HomeScreen extends React.Component {
  state = {
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateRecipe")}
          style={{ marginRight: 20 }}
        >
          <Text style={{ fontSize: 16, color: "#2c9df4" }}>Add</Text>
        </TouchableOpacity>
      )
    };
  };

  keyExtractor = item => item.id;

  renderItem = ({ item: recipe }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("Detail", {
          info: recipe
        });
      }}
    >
      <CustomCard>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </CustomCard>
    </TouchableOpacity>
  );

  render() {
    return (
      <Query query={GET_ALL_RECIPES}>
        {({ loading, data, refetch, error }) =>
          loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={data ? data.allRecipes : []}
              renderItem={this.renderItem}
              refreshing={this.state.refreshing}
              onRefresh={() => refetch()}
            />
          )
        }
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  recipeWrapper: {
    backgroundColor: "white",
    margin: 8,
    padding: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5
  }
});

export default HomeScreen;
