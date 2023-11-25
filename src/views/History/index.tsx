import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Divider,
  List,
  MD2Colors,
  Text,
  useTheme,
} from "react-native-paper";
import useGetHistory from "../../hooks/useGetHistory";
export default function History() {
  const theme = useTheme;
  const navigation = useNavigation;
  const { history, loading } = useGetHistory();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator animating={true} color={MD2Colors.green400} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
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
        <Text variant="bodyLarge">Histórico de irrigações</Text>
      </View>
      <Divider />
      <FlatList
        data={history}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <Text variant="bodyLarge" style={{ paddingHorizontal: 10 }}>
            Nada encontrado. Adicione uma horta pressionando o botão abaixo.
          </Text>
        )}
        renderItem={({ item }) => {
          return (
            <List.Item
              key={item.id}
              title={`Hortaliça: ${item.cropName
                ?.charAt(0)
                .toUpperCase()}${item.cropName?.slice(1)}`}
              description={() => (
                <View>
                  <Text>
                    Data da irrigação:{" "}
                    {item.DateTime?.toDate().toLocaleString("pt-br", {
                      timeZone: "GMT",
                    })}
                  </Text>
                  <Text>Umidade do solo: {item.umidadeSolo}</Text>
                </View>
              )}
            />
          );
        }}
      />
    </View>
  );
}
