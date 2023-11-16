import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import CropDetails from "../views/CropDetails";
import StartPage from "../views/startPage";

const Stack = createStackNavigator();

export default function HomeStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StartPage" component={StartPage} />
      <Stack.Screen name="CropDetails" component={CropDetails} />
    </Stack.Navigator>
  );
}
