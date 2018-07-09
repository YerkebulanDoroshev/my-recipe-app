import {
  ActivityIndicator,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import React from "react";
import { Title, TextInput, Button } from "react-native-paper";
import { Mutation } from "react-apollo";
import { ImagePicker, Permissions } from "expo";
import gql from "graphql-tag";
import CustomCard from "../CustomCard";

const FILE_UPLOAD_URL =
  "https://api.graph.cool/file/v1/cjj6owtsh3quj0110bh9in815";

const CREATE_RECIPE = gql`
  mutation addRecipe(
    $title: String!
    $description: String!
    $image: String!
    $ingredients: [String!]!
    $instructions: [String!]!
  ) {
    createRecipe(
      title: $title
      description: $description
      instructions: $instructions
      image: $image
      ingredients: $ingredients
    ) {
      id
      title
      description
      image
      ingredients
      instructions
    }
  }
`;

class CreateRecipeScreen extends React.Component {
  state = {
    title: "",
    description: "",
    ingredient: "",
    instruction: "",
    ingredientsArray: [],
    instructionsArray: [],
    image: "",

    uploading: false
  };

  static navigationOptions = {
    title: "Add new recipe"
  };

  handleAddingIngredient = () => {
    if (this.state.ingredient !== "") {
      this.setState(prevState => ({
        ingredientsArray: [...prevState.ingredientsArray, prevState.ingredient],
        ingredient: ""
      }));
    }
  };

  handleAddingInstruction = () => {
    if (this.state.instruction !== "") {
      this.setState(prevState => ({
        instructionsArray: [
          ...prevState.instructionsArray,
          prevState.instruction
        ],
        instruction: ""
      }));
    }
  };

  handleAddingPhotoOfRecipe = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const photo = await ImagePicker.launchImageLibraryAsync();

    console.log("photo", photo);

    let formData = new FormData();
    formData.append("data", {
      uri: photo.uri,
      name: "image.jpg",
      type: "multipart/form-data"
    });

    try {
      const res = await fetch(FILE_UPLOAD_URL, {
        method: "POST",
        body: formData
      });

      const resJson = await res.json();
      this.setState({
        image: resJson.url
      });
    } catch (error) {
      console.log("err", error);
    }
  };

  render() {
    return (
      <Mutation mutation={CREATE_RECIPE}>
        {(createRecipe, { data, loading, error }) => (
          <ScrollView>
            <React.Fragment>
              <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: "space-between" }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={64}
              >
                <CustomCard>
                  <TextInput
                    label="Title"
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                  />

                  <TextInput
                    label="Description"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                  />
                </CustomCard>

                <CustomCard>
                  <TextInput
                    label="Ingredients"
                    value={this.state.ingredient}
                    onChangeText={ingredient => this.setState({ ingredient })}
                  />
                  <Button
                    primary
                    onPress={this.handleAddingIngredient}
                    icon="add"
                  >
                    Add
                  </Button>
                  <Text>Ingredients:</Text>
                  {this.state.ingredientsArray.map(item => (
                    <Text>+ {item}</Text>
                  ))}
                </CustomCard>

                <CustomCard>
                  <TextInput
                    label="Instructions"
                    value={this.state.instruction}
                    onChangeText={instruction => this.setState({ instruction })}
                  />
                  <Button
                    primary
                    onPress={this.handleAddingInstruction}
                    icon="add"
                  >
                    Add
                  </Button>
                  <Text>Instructions:</Text>
                  {this.state.instructionsArray.map(item => (
                    <Text>+ {item}</Text>
                  ))}
                </CustomCard>

                <CustomCard>
                  {this.state.image ? (
                    <Image
                      source={{
                        uri: this.state.image
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <Button
                      primary
                      onPress={this.handleAddingPhotoOfRecipe}
                      icon="image"
                    >
                      Add photo
                    </Button>
                  )}
                </CustomCard>

                <TouchableOpacity
                  disabled={
                    this.state.instructionsArray === [] ||
                    this.state.ingredientsArray === [] ||
                    this.state.description === "" ||
                    this.state.title === "" ||
                    this.state.image === ""
                  }
                  onPress={() => {
                    createRecipe({
                      variables: {
                        title: this.state.title,
                        description: this.state.description,
                        ingredients: this.state.ingredientsArray,
                        instructions: this.state.instructionsArray,
                        image: this.state.image
                      }
                    });
                    this.setState({
                      title: "",
                      description: "",
                      ingredientsArray: [],
                      instructionsArray: [],
                      image: ""
                    });
                    this.props.navigation.goBack();
                  }}
                  style={styles.submitButton}
                >
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.submitText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </React.Fragment>
          </ScrollView>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    borderColor: "#2c9df4",
    borderWidth: 1,
    width: 120,
    height: 40,
    alignSelf: "center",
    borderRadius: 10,
    padding: 8,
    margin: 10
  },
  submitText: {
    color: "#2c9df4",
    textAlign: "center",
    margin: 2
  }
});

export default CreateRecipeScreen;
