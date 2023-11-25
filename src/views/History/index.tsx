import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
export default function History() {
  const theme = useTheme;
  const navigation = useNavigation;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          padding: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome name="list" size={24} color="black" />
        <Text variant="bodyLarge">Visão Geral</Text>
      </View>
      <Divider />
      <Text variant="bodyLarge">Histórico de irrigações</Text>
    </View>
  );
}
