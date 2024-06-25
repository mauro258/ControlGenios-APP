import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SPACING } from "../config/spacing";
import { colors } from "../config/color";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Service from "../components/Service";
import headerImage from "../imgs/GeniosLogo.png";

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { top } = useSafeAreaInsets();
  const [services, setServices] = useState();
  const [ isRefreshing, setIsRefreshing ] = useState(false);

  const getServices = async () => {
    try {
      const { data } = await axios.get("/service");

      setServices(data.data);
    } catch (error) {
      console.log("Error in getServices", error.message);
    }
  };

  useEffect(() => {
    isFocused&& getServices();
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getServices();
    setIsRefreshing(false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerImageContainer}>
        <Image source={headerImage} style={styles.headerImage} />
      </View>

      <View style={{ ...styles.container, top: top + 120 }}>
        <Text style={styles.title}>Servidores</Text>

        <TouchableOpacity
          style={{ ...styles.button, top }}
          onPress={() => navigation.navigate("ServiceActionScreen")}
        >
          <Ionicons name="add-circle-outline" color={colors.light} size={30} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={services}
        renderItem={({ item }) => <Service service={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 250 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.light]}
            progressBackgroundColor={colors["dark-gray"]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    position: "absolute",
    top: 35,
    left: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 1, // Asegura que la imagen esté encima de otros elementos
  },

  headerImage: {
    width: 300, // Ajusta según el tamaño que desees
    height: 100, // Ajusta según el tamaño que desees
    resizeMode: "cover",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING,
    position: "absolute",
    width: "100%",
    zIndex: 2, // Asegura que el contenedor esté encima de la imagen
  },

  title: {
    color: colors.white,
    fontSize: SPACING * 3.5,
    fontWeight: "700",
    top: 20,
  },

  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },

  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: SPACING,
    top: 0,
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
