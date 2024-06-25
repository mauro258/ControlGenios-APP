import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SPACING } from "../config/spacing";
import { colors } from "../config/color";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Service from "../components/Service";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const { data } = await axios.get("/service");

      setServices(data.data);
    } catch (error) {
      console.log("Error in getServices", error.message);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <View style={{ ...styles.container, top: top + 20 }}>
        <Text style={styles.title}>Servidores</Text>

        <TouchableOpacity
          style={{ ...styles.button, top }}
          onPress={() => navigation.navigate("DetailScreen")}
        >
          <Ionicons name="add-circle-outline" color={colors.light} size={30} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => <Service service={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },

  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },

  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
