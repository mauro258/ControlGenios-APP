import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../config/color";
import { SPACING } from "../config/spacing";

export default function () {
  return (
    <View>
      <Text> </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
  },

  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 60,
    borderColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 10,
    // marginLeft: 100,
  },

  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    color: colors.light,
  },

  backButton: {
    position: "absolute",
    top: 30,
    left: 5,
  },
});
