import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  navigation: any;
}

export default function CropDetails({ navigation }: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>CropDetails</Text>
      <Button onPress={() => navigation.navigate("StartPage")}>Go back</Button>
    </View>
  );
}
