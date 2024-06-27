import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SPACING } from "../config/spacing";
import { colors } from "../config/color";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("screen").height;

export default function DetailScreen({ route }) {
  const id = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  const [service, setService] = useState({});

  const getService = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/service/${id}`);
      setService(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("Error in getService", error.message);
    }
  };

  useEffect(() => {
    isFocused && getService();
  }, [isFocused]);

  const deleteService = async () => {
    try {
      setIsRemoving(true);
      const { data } = await axios.delete(`/service/${service._id}`);

      setIsRemoving(false);
      navigation.navigate("HomeScreen");
    } catch (error) {
      setIsRemoving(false);
      console.log("Error in deleteService", error.message);
    }
  };

  if (isLoading || isRemoving) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="grey" size={80} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[styles.imageContainer, { marginTop: 50, marginBottom: 50 }]}
        >
          <View style={styles.imageBorder}>
            <Image source={{ uri: service.imgUrl }} style={styles.image} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 20,
          }}
        >
          <View style={{ width: "50%", paddingRight: 10 }}>
            <Text style={styles.title}>Nombre:</Text>
            <Text style={styles.subtitle}>{service.name}</Text>
          </View>
          <View style={{ width: "50%", paddingRight: 10 }}>
            <Text style={styles.title}>Dirección IP:</Text>
            <Text style={styles.subtitle}>{service.ip}</Text>
          </View>
          <View style={{ width: "100%", marginTop: 20 }}>
            <Text style={styles.title}>Estado:</Text>
            <Text style={styles.title}>
              {service.statusService ? "Activo" : "Inactivo"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => navigation.navigate("ServiceActionScreen", service)}
        >
          <LinearGradient
            colors={[colors["dark-gray"], colors.black]}
            style={styles.gradient}
          >
            <Ionicons name="create-outline" color={colors.light} size={30} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => deleteService()}
        >
          <LinearGradient
            colors={[colors["dark-gray"], colors.black]}
            style={styles.gradient}
          >
            <Ionicons name="trash-outline" color={colors.red} size={30} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: screenHeight * 0.4,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    overflow: "hidden",
  },
  imageBorder: {
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },

  title: {
    color: colors.light,
    fontSize: 25,
    fontWeight: "bold",
  },

  subtitle: {
    color: colors.light,
    fontSize: 15,
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
