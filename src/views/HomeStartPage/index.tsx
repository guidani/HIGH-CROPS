import React from "react";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import CustomListItemWithIconAndRight from "../../components/CustomListItemWithIconAndRight";
import UseFirebaseDatabase from "../../hooks/useFirebaseDatabase";
import useGetUmidadeSoloBySensorId from "../../hooks/useGetUmidadeSoloBySensorId";

export default function StartPage() {
  const { umidadeAr, temperatura } = UseFirebaseDatabase();
  const umidadeSensorA = useGetUmidadeSoloBySensorId('sensorA');
  const umidadeSensorB = useGetUmidadeSoloBySensorId('sensorB');
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
      <CustomListItemWithIconAndRight title="Temperatura" iconName={"temperature-celsius"} rightValue={temperatura} />
      <CustomListItemWithIconAndRight title="Umidade do Ar" iconName={"water-percent"} rightValue={umidadeAr} />
      <CustomListItemWithIconAndRight title="Umidade do solor (sensor A)" iconName={"water-percent"} rightValue={umidadeSensorA.umidadeSolo} />
      <CustomListItemWithIconAndRight title="Umidade do solor (sensor B)" iconName={"water-percent"} rightValue={umidadeSensorB.umidadeSolo} />
    </View>
  );
}
