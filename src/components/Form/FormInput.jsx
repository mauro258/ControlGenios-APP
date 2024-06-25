import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../config/color";

export default function FormInput() {
  return (
    <View>
      <Text>FormInput</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  textLabel: {
    fontWeight: "bold",
    color: colors.light,
  },

  textError: {
    fontSize: 12,
    color: "red",
  },

  input: {
    borderWidth: 1,
    borderColor: colors.light,
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: colors.light,
  },
});
