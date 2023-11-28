import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Divider,
  IconButton,
  List,
  MD2Colors,
  Text,
  useTheme,
} from "react-native-paper";
import ViewCenter from "../../components/ViewCenter";
import useGetSensores from "../../hooks/useGetSensores";

interface Props {
  navigation: any;
}

export default function CropStartPage({ navigation }: Props) {
  const theme = useTheme();
  const { loading, sensores } = useGetSensores();

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

  if (
    Object.keys(sensores).length === 0 ||
    Object.keys(sensores).length === undefined
  ) {
    return (
      <ViewCenter>
        <Text>Nada encontrado!</Text>
      </ViewCenter>
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
      <List.Item
        title={
          sensores["sensorA"]["nome"]! === ""
            ? "sensorA"
            : sensores["sensorA"]["nome"]!
        }
        right={() => (
          <IconButton
            icon={(props) => (
              <FontAwesome {...props} name="gear" size={24} color="black" />
            )}
            size={20}
            onPress={() =>
              navigation.navigate("CropsDetails", {
                itemId: "sensorA",
                sensores,
              })
            }
          />
        )}
      />
      <Divider />
      <List.Item
        title={
          sensores["sensorB"]["nome"]! === ""
            ? "sensorB"
            : sensores["sensorB"]["nome"]!
        }
        right={() => (
          <IconButton
            icon={(props) => (
              <FontAwesome {...props} name="gear" size={24} color="black" />
            )}
            size={20}
            onPress={() =>
              navigation.navigate("CropsDetails", {
                itemId: "sensorB",
                sensores,
              })
            }
          />
        )}
      />

      {/* <FAB
        icon={"plus"}
        onPress={() => navigation.navigate("CropsNewCrop")}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
      /> */}
    </View>
  );
}
