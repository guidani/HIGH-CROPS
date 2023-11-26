import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import SignOutButton from "../components/SignOutButton";
import StartPage from "../views/HomeStartPage";

const Stack = createStackNavigator();

export default function HomeStackRoutes() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <SignOutButton />,
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
