import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CropStartPage from "../views/CropsStartPage";
import Configurations from "../views/configurations";
import Home from "../views/Home";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Início"
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
        component={CropStartPage}
        options={{
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
