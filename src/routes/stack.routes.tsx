import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import StartPage from "../views/HomeStartPage";

const Stack = createStackNavigator();

export default function HomeStackRoutes() {
  return (
    <Stack.Navigator>
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
