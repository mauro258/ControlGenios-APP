import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Navigation } from "./src/navigation/Navigation";
import axios from "axios";


axios.defaults.baseURL = "http://162.213.249.201:4000";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Navigation />
    </NavigationContainer>
  );
}
