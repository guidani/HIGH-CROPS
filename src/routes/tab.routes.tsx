import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Configurations from "../views/Configurations";
import CropsStackRoutes from "./cropStack.routes";
import HomeStackRoutes from "./homeStack.routes";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#7CD8A4",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackRoutes}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="home" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Crops"
        component={CropsStackRoutes}
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
