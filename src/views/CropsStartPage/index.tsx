import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Divider, FAB, IconButton, List, Text } from "react-native-paper";
import { CropType } from "../../types/CropType";

const data: CropType[] = [
  {
    id: "a",
    name: "Arroz",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "b",
    name: "Feijão",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "c",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "e",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "f",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "g",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "h",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "i",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "j",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "k",
    name: "Batata",
    temperaturaMax: 99,
    temperaturaMin: 0,
    umidadeMax: 100,
    umidadeMin: 0,
  },
  {
    id: "cl",
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
  const [crops, setCrops] = useState<CropType[] | null>(null);

  useEffect(() => {
    setCrops(data);
  }, [crops]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <FlatList
        data={data}
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
          backgroundColor: "green",
        }}
      />
    </View>
  );
}
