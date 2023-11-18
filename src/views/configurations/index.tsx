import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function Configurations() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesome name="gear" size={24} color="black" />
      <Text>Configurações</Text>
    </View>
  );
}
