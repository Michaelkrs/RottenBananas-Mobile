import { createStackNavigator } from "@react-navigation/stack";
import MoviesScreen from "./MoviesScreen";
import DetailScreen from "./DetailScreen";

const Stack = createStackNavigator();

function MoviesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default MoviesStack;
