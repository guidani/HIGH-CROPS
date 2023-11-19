import { MaterialCommunityIcons } from "@expo/vector-icons";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";
import { rtdb } from "../../services/firebaseConfig";
import useGetUmidade from "../../hooks/useGetUmidade";

interface Props {
  navigation: any;
}

export default function StartPage({ navigation }: Props) {
  const {umidade} = useGetUmidade()
  // const [umidade, setUmidade] = useState<string | number | null>(null);

  // useEffect(() => {
  //   const unsubscribe = onValue(ref(rtdb, "umidade"), (snapshot) => {
  //     const val = snapshot.val();
  //     setUmidade(val);
  //   });
  //   return () => unsubscribe();
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
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
