import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import DetailScreen from "../screen/DetailScreen";
import ServiceActionScreen from "../screen/ServiceActionScreen";
import { SPACING } from "../config/spacing";
import { colors } from "../config/color";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingHorizontal: SPACING * 2,
          flex: 1,
          backgroundColor: colors.black,
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen
        name="ServiceActionScreen"
        component={ServiceActionScreen}
      />
    </Stack.Navigator>
  );
};
