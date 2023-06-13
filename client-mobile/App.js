import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ApolloProvider } from "@apollo/client";

import MoviesScreen from "./screens/MoviesScreen";
import GenresScreen from "./screens/GenresScreen";
import SearchScreen from "./screens/SearchScreen";
import MoviesStack from "./screens/MoviesStack";
import client from "./config/config";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Movies") {
            iconName = focused ? "videocam" : "videocam-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Genres") {
            iconName = focused ? "layers" : "layers-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Movies" component={MoviesStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Genres" component={GenresScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "orange",
  },
});
