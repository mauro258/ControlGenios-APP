import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function FormContainer() {
  return (
    <View>
      <Text>FormContainer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
  },
});
