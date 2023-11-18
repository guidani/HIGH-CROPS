import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  navigation: any;
  route: any;
}

export default function CropsDetails({ route, navigation }: Props) {
  const { itemId } = route.params;
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
      <Text>ID: {JSON.stringify(itemId)}</Text>
      <Button onPress={() => navigation.navigate("StartPage")}>Go back</Button>
    </View>
  );
}
