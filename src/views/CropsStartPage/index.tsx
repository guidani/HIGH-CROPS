import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Divider,
  FAB,
  IconButton,
  List,
  MD2Colors,
  Text,
  useTheme,
} from "react-native-paper";
import useGetCrops from "../../hooks/useGetCrops";
import { CropType } from "../../types/CropType";

const data: CropType[] = [
  {
    ownerId: "a",
    name: "Arroz",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "b",
    name: "Feijão",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "c",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "e",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "f",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "g",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "h",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "i",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "j",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "k",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    ownerId: "cl",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
];

interface Props {
  navigation: any;
}

export default function CropStartPage({ navigation }: Props) {
  const theme = useTheme();
  const { crops, loading } = useGetCrops();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
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
        backgroundColor: theme.colors.background,
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <FlatList
        data={crops}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <Text variant="bodyLarge" style={{ paddingHorizontal: 10 }}>
            Nada encontrado. Adicione uma horta pressionando o botão abaixo.
          </Text>
        )}
        renderItem={({ item }) => {
          return (
            <List.Item
              key={item.ownerId}
              title={item.name}
              right={() => (
                <IconButton
                  icon={(props) => (
                    <FontAwesome
                      {...props}
                      name="gear"
                      size={24}
                      color="black"
                    />
                  )}
                  size={20}
                  onPress={() =>
                    navigation.navigate("CropsDetails", {
                      itemId: item.id,
                    })
                  }
                />
              )}
            />
          );
        }}
      />

      <FAB
        icon={"plus"}
        onPress={() => navigation.navigate("CropsNewCrop")}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
      />
    </View>
  );
}
