import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function Configurations() {
  return (
    <View>
      <FontAwesome name="gear" size={24} color="black" />
      <Text>Configurations</Text>
    </View>
  );
}
