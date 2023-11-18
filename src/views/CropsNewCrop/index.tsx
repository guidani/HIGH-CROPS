import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";

interface Props {
  navigation: any;
}

export default function CropsNewCrop({ navigation }: Props) {
  const [name, setName] = useState<string | undefined>();
  const [temperaturaMax, setTemperaturaMax] = useState<string | undefined>();
  const [temperaturaMin, setTemperaturaMin] = useState<string | undefined>();
  const [umidadeMax, setUmidadeMax] = useState<string | undefined>();
  const [umidadeMin, setUmidadeMin] = useState<string | undefined>();

  // TODO: criar função para salvar no banco
  function saveCropToDataBase() {
    return;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "start",
        justifyContent: "start",
        gap: 4,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <TextInput
          label={"Nome"}
          value={name}
          onChangeText={() => setName(name)}
        />
        <TextInput
          label={"Umidade Máxima"}
          value={umidadeMax}
          keyboardType="numeric"
          onChangeText={() => setUmidadeMax(umidadeMax)}
        />
        <TextInput
          label={"Umidade Mínima"}
          value={umidadeMin}
          keyboardType="numeric"
          onChangeText={() => setUmidadeMin(umidadeMin)}
        />
        <TextInput
          label={"Temperatura Máxima"}
          value={temperaturaMax}
          keyboardType="numeric"
          onChangeText={() => setTemperaturaMax(temperaturaMax)}
        />
        <TextInput
          label={"Temperatura Mínima"}
          value={temperaturaMin}
          keyboardType="numeric"
          onChangeText={() => setTemperaturaMin(temperaturaMin)}
        />
      </ScrollView>
      <FAB
        icon={"plus"}
        onPress={() => saveCropToDataBase}
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
