import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../config/color";
import { SPACING } from "../config/spacing";

const Service = ({ service }) => {
  const navigation = useNavigation();

  const status = service && service.statusService;

  const iconColor = status ? colors.green : colors.red;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailScreen", service._id)}
      style={{ width: "100%" }}
    >
      <LinearGradient
        key={service._id}
        colors={[colors["dark-gray"], colors.black]}
        style={styles.gradient}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{service.name}</Text>
          <Ionicons name="cellular-outline" color={iconColor} size={24} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: SPACING * 2,
    padding: SPACING,
    marginBottom: SPACING * 2,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors.light,
    fontSize: SPACING * 1.7,
    fontWeight: "700",
    marginRight: SPACING,
  },
});

export default Service;
