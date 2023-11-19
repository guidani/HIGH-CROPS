import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Configurations() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesome name="gear" size={24} color="black" />
      <Text>Configurações</Text>
    </View>
  );
}
