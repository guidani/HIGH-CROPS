import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Crops from "../views/Crops";
import Home from "../views/Home";
import Configurations from "../views/configurations";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="home" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Crops"
        component={Crops}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome5 name="leaf" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Configurações"
        component={Configurations}
        options={{
          tabBarIcon: () => <FontAwesome name="gear" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}
