import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import StartPage from "../views/HomeStartPage";

const Stack = createStackNavigator();

export default function HomeStackRoutes() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="StartPage"
        component={StartPage}
        options={{
          title: "Início",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
