import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PokedexListScreen } from "../screens/PokedexListScreen";
import { PokemonDetailScreen } from "../screens/PokemonDetailScreen";
import { ProfileScreen } from "../screens/ProfileScreen.js";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokedexList" component={PokedexListScreen} options={{ title: "Pokédex" }} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: "Detail" }} />
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
