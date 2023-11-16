import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Configurations from "../views/configurations";
import Home from "../views/home";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Configurations" component={Configurations} />
    </Tab.Navigator>
  );
}
