import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "react-native-paper";
import Configurations from "../views/Configurations";
import CropsStackRoutes from "./cropStack.routes";
import HomeStackRoutes from "./homeStack.routes";
import History from "../views/History";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const theme = useTheme();
  return (
    <Tab.Navigator
    
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.primary,
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
          tabBarLabel: "Início",
        }}
      />
      <Tab.Screen
        name="Crops"
        component={CropsStackRoutes}
        options={{
          headerShown: false,
          tabBarLabel: "Hortas",
          tabBarIcon: () => (
            <FontAwesome5 name="leaf" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarIcon: () => <FontAwesome name=""/>
      }}
      />
      <Tab.Screen
        name="Configs"
        component={Configurations}
        options={{
          tabBarIcon: () => <FontAwesome name="list" size={24} color="black" />,
          tabBarLabel: "Histórico",
          headerTitle: "Histórico",
        }}
      />
    </Tab.Navigator>
  );
}
