import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Home() {
  const theme = useTheme();
  return (
    <View>
      <FontAwesome5 name="home" size={24} color="black" />
      <Text> Home</Text>
    </View>
  );
}
