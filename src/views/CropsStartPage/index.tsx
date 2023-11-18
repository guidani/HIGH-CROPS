import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FAB, IconButton, List, Text } from "react-native-paper";
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
];

interface Props {
  navigation: any;
}

export default function CropStartPage({ navigation }: Props) {
  const [crops, setCrops] = useState<CropType[] | null>(null);

  useEffect(() => {
    setCrops(data);
  }, [crops]);

  if (crops?.length == 0 || crops == null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Text variant="bodyLarge" style={{ paddingHorizontal: 10 }}>
          Nada encontrado. Adicione uma horta pressionando o botão abaixo.
        </Text>
        {/* TODO - adicionar rota */}
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      {crops.map((c) => {
        return (
          <List.Item
            key={c.id}
            title={c.name}
            right={() => (
              <IconButton
                icon={(props) => (
                  <FontAwesome {...props} name="gear" size={24} color="black" />
                )}
                size={20}
                onPress={() =>
                  navigation.navigate("CropsDetails", {
                    itemId: c.id,
                  })
                }
              />
            )}
          />
        );
      })}

      {/* TODO - adicionar rota */}
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
