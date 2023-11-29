import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
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
import useGetSensors from "../../hooks/useGetSensors";

interface Props {
  navigation: any;
}

export default function CropStartPage({ navigation }: Props) {
  const theme = useTheme();
  const { sensors, loading } = useGetSensors();

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
