import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SPACING } from "../config/spacing";
import { colors } from "../config/color";

const screenHeight = Dimensions.get("screen").height;

export default function DetailScreen() {
  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: screenHeight * 0.7,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  imageBorder: {
    flex: 1,
    overflow: "hidden",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  image: {
    flex: 1,
  },

  title: {
    color: colors.light,
    fontSize: SPACING * 2,
    fontWeight: "bold",
  },

  subtitle: {
    color: colors.light,
  },

  backButton: {
    position: "absolute",
    top: 30,
    left: 5,
  },

  buttonsContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignposts: "center",
  },

  buttonRadius: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
