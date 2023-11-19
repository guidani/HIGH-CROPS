import { FontAwesome } from "@expo/vector-icons";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Divider,
  FAB,
  IconButton,
  List,
  MD2Colors,
  Text,
} from "react-native-paper";
import { db } from "../../services/firebaseConfig";
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
  const [crops, setCrops] = useState<CropType[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  // async function fetchData() {
  //   setLoading(true);
  //   const resp = await getCrops();
  //   setCrops([...resp]);
  //   setLoading(false);
  // }

  function getData() {
    const items: CropType[] = [];
    const cropsRef = collection(db, "Crops");
    const q = query(cropsRef);
    return onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items?.push({
          id: doc.id,
          name: doc.data()?.name,
          ownerId: doc.data()?.ownerId,
          temperaturaMax: doc.data()?.temperaturaMax,
          temperaturaMin: doc.data()?.temperaturaMin,
          umidadeMax: doc.data()?.umidadeMax,
          umidadeMin: doc.data()?.umidadeMin,
        });
        setCrops(items);
      });
    });
  }

  useEffect(() => {
    // fetchData();
    const unsub = getData();
    return () => unsub();
  }, []);

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
        backgroundColor: "#ffffff",
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
          backgroundColor: "green",
        }}
      />
    </View>
  );
}
