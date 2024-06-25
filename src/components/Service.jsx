import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SPACING } from "../config/spacing";
import { colors } from "../config/color";
import { LinearGradient } from "expo-linear-gradient";

export default function Service({service}) {
  return (
    <LinearGradient colors={[colors["dark-gray"],colors.black]}
    style={styles.gradient}>
      <Text style={styles.title}>{service.name}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonRadius}>

        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 250,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
  },

  image: {
    width: "100%",
    height: 160,
  },

  title: {
    color: colors.light,
    fontSize: SPACING * 1.7,
    fontWeight: "700",
    marginBottom: SPACING,
  },

  buttonContainer: { alignItems: "center" },

  buttonRadius: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
  },

  gradientTwo: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
