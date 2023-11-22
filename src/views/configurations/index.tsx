import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";

export default function Configurations() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "start",
        justifyContent: "start",
        gap: 4,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          gap: 4,
          paddingHorizontal: 4,
          paddingVertical: 4,
        }}
      >
        <View style={{ flexDirection: "row", gap: 4, padding: 12 }}>
          <FontAwesome name="gear" size={24} color="black" />
          <Text>Configure os parâmetros da sua horta.</Text>
        </View>

        <Divider />
        <View style={{ gap: 4, padding: 12 }}>
          <Text>Umidade do solo Máxima</Text>
          <Text>Umidade do solo Mínima</Text>
          <Text>Temperatura Máxima</Text>
          <Text>Temperatura Máxima</Text>
          <Text>Umidade Máxima</Text>
        </View>
      </ScrollView>
    </View>
  );
}
