import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Share
} from "react-native";
import React from "react";
import { Title } from "react-native-paper";

import CustomCard from "../CustomCard";

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: "Detail"
  };

  shareMyRecipe = async (title, description, image) => {
    await Share.share({
      message: `Do you know how to cook ${title} ${description}? ${image}`,
      title: "Recipe"
    });
  };

  render() {
    const { navigation } = this.props;
    const recipe = navigation.getParam("info");

    console.log("rec", recipe);
    return (
      <View style={styles.container}>
      
        {recipe.image !== "" ? (
          <CustomCard>
            <Image
              source={{ uri: recipe.image }}
              style={{ width: 200, height: 200 }}
            />
          </CustomCard>
        ) : (
          <CustomCard>
            <Text>hi</Text>
          </CustomCard>
        )}

        <CustomCard>
          <Title style={styles.title}>{recipe.title}</Title>
          <Text style={styles.description}>{recipe.description}</Text>
        </CustomCard>

        <CustomCard>
          {recipe.ingredients.map((item, index) => (
            <Text style={styles.listItems} key={index}>
              • {item}
            </Text>
          ))}
        </CustomCard>

        <CustomCard>
          {recipe.instructions.map((item, index) => (
            <Text style={styles.listItems} key={index}>
              {index + 1}.{item}
            </Text>
          ))}
        </CustomCard>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            this.shareMyRecipe(recipe.title, recipe.description, recipe.image);
          }}
        >
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shareButton: {
    borderColor: "#2c9df4",
    borderWidth: 1,
    width: 120,
    height: 40,
    alignSelf: "center",
    borderRadius: 10,
    padding: 8,
    margin: 10
  },
  shareText: {
    color: "#2c9df4",
    textAlign: "center",
    margin: 2
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5
  },
  listItems: {
    fontSize: 16
  },
  container: {
    flex: 1
  }
});

export default DetailScreen;
