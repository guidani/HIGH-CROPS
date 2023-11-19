import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CropsDetails from "../views/CropsDetails";
import CropsNewCrop from "../views/CropsNewCrop";
import CropStartPage from "../views/CropsStartPage";
const Stack = createStackNavigator();
export default function CropsStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#7CD8A4",
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
