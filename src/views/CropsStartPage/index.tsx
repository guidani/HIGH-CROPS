import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Divider,
  IconButton,
  List,
  MD2Colors,
  Text,
  useTheme,
} from "react-native-paper";
import { db } from "../../services/firebaseConfig";

interface Props {
  navigation: any;
}

interface ISensors {
  sensorId?: string;
  nome?: string;
  umidadeMin?: number;
}

export default function CropStartPage({ navigation }: Props) {
  const theme = useTheme();
  // const { loading, sensores } = useGetSensores();
  const { userId } = useAuth();
  const [sensors, setSensors] = useState<ISensors[] | null>(null);

  function getListOfSensors() {
    const collRef = collection(db, "Crops", `${userId}`, "sensores");
    const q = query(collRef);
    return onSnapshot(q, (querySnapshot) => {
      const items: ISensors[] = [];
      querySnapshot.forEach((doc) => {
        items?.push({
          sensorId: doc.id,
          nome: doc.data()?.nome,
          umidadeMin: doc.data()?.umidadeMin,
        });
        setSensors(items);
      });
    });
  }

  useEffect(() => {
    const unsub = getListOfSensors();
    return () => unsub();
  }, []);

  if (sensors?.length === 0) {
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
        <FontAwesome5 name="leaf" size={24} color="green" />
        <Text variant="bodyLarge">Estas são suas hortaliças.</Text>
        <FontAwesome5 name="leaf" size={24} color="green" />
      </View>
      <Divider />
      {/*  */}
      <FlatList
        data={sensors}
        renderItem={({ item, index }) => (
          <List.Item
            key={item?.sensorId || index}
            title={item?.nome || ""}
            description={"Umidade mínima: " + item.umidadeMin?.toString()}
            right={() => (
              <IconButton
                icon={(props) => (
                  <FontAwesome {...props} name="gear" size={24} color="black" />
                )}
                size={20}
                onPress={() =>
                  navigation.navigate("CropsDetails", {
                    itemId: item.sensorId,
                  })
                }
              />
            )}
          />
        )}
      />
      {/*  */}
    </View>
  );
}
