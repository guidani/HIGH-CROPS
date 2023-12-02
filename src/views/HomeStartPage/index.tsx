import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Divider, List, Text, useTheme } from "react-native-paper";
import UseFirebaseDatabase from "../../hooks/useFirebaseDatabase";

export default function StartPage() {
  const { umidadeAr, temperatura } = UseFirebaseDatabase();
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
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
        <Text variant="bodyLarge">Visão Geral</Text>
      </View>
      <Divider />
      {/* <List.Item
        title="Umidade do Solo"
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
      /> */}
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
        right={(props) => <Text>{temperatura}</Text>}
      />
      <List.Item
        title="Umidade do Ar"
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
        right={(props) => <Text>{umidadeAr}</Text>}
      />
    </View>
  );
}
