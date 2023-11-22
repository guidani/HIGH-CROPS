import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { PaperTheme } from "../providers/reactNativePaper/themeConfig";
import TabRoutes from "./tab.routes";

export default function Routes() {
  return (
    <PaperProvider theme={PaperTheme}>
      <NavigationContainer>
        <TabRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}