import React from "react";
import { View, StyleSheet } from "react-native";

const CustomCard = props => {
  return <View style={styles.сardWrapper}>{props.children}</View>;
};

const styles = StyleSheet.create({
  сardWrapper: {
    backgroundColor: "white",
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
    shadowColor: 'black',
    shadowOffset:{ width:2,height:1 },
    shadowOpacity:0.3,
    shadowRadius:1,
    borderRadius: 5,

  }
});

export default CustomCard;
