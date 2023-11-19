import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import useGetUmidade from "../../hooks/useGetUmidade";

interface Props {
  navigation: any;
}

export default function StartPage({ navigation }: Props) {
  const { umidade } = useGetUmidade();
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <Text
        variant="titleMedium"
        style={{
          paddingHorizontal: 10,
        }}
      >
        Visão geral
      </Text>
      <List.Item
        title="Umidade"
        style={{
          paddingHorizontal: 10,
        }}
        left={(props) => (
          <MaterialCommunityIcons
            name="water-percent"
            size={24}
            color="black"
          />
        )}
        right={(props) => <Text>{umidade}</Text>}
      />
      <List.Item
        title="Temperatura"
        style={{
          paddingHorizontal: 10,
        }}
        left={(props) => (
          <MaterialCommunityIcons
            name="temperature-celsius"
            size={24}
            color="black"
          />
        )}
        right={(props) => <Text>{umidade}</Text>}
      />
      {/* <Button onPress={() => navigation.navigate("CropDetails")}>
        Go to details
      </Button> */}
    </View>
  );
}
