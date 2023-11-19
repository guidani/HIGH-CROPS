import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import StartPage from "../views/HomeStartPage";

const Stack = createStackNavigator();

export default function HomeStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#7CD8A4",
        },
      }}
    >
      <Stack.Screen
        name="StartPage"
        component={StartPage}
        options={{
          title: "Início",
        }}
      />
    </Stack.Navigator>
  );
}
