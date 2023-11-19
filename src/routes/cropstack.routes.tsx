import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "react-native-paper";
import CropsDetails from "../views/CropsDetails";
import CropsNewCrop from "../views/CropsNewCrop";
import CropStartPage from "../views/CropsStartPage";
const Stack = createStackNavigator();
export default function CropsStackRoutes() {
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
        name="CropsStartPage"
        component={CropStartPage}
        options={{
          title: "Crops",
        }}
      />
      <Stack.Screen
        name="CropsNewCrop"
        component={CropsNewCrop}
        options={{
          title: "Nova hortaliça",
        }}
      />
      <Stack.Screen
        name="CropsDetails"
        component={CropsDetails}
        options={{
          title: "Detalhes da hortaliça",
        }}
      />
    </Stack.Navigator>
  );
}
