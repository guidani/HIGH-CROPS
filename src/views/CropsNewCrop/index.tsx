import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  FAB,
  Portal,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { setNewCrop } from "../../services/setNewCrop";
import { CropType } from "../../types/CropType";

interface Props {
  navigation: any;
}

export default function CropsNewCrop({ navigation }: Props) {
  const theme = useTheme();
  const [name, setName] = useState<string | undefined>("");
  const [temperaturaMax, setTemperaturaMax] = useState<
    number | string | undefined
  >(0);
  const [temperaturaMin, setTemperaturaMin] = useState<
    number | string | undefined
  >(0);
  const [umidadeMax, setUmidadeMax] = useState<number | string | undefined>(0);
  const [umidadeMin, setUmidadeMin] = useState<number | string | undefined>(0);

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false);
  const [noNameError, setNoNameError] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [successOnSave, setSuccessOnSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function saveCropToDataBase() {
    if (!name) {
      setNoNameError(true);
      setPortalSnackbarVisible(true);
      return;
    }

    const item: CropType = {
      ownerId: "Guilherme",
      name,
      temperaturaMax,
      temperaturaMin,
      umidadeMax,
      umidadeMin,
    };
    setIsLoading(true);
    const id = await setNewCrop(item);
    setIsLoading(false);
    if (id) {
      setSuccessOnSave(true);
      setPortalSnackbarVisible(true);
    } else {
      setErrorOnSave(true);
      setPortalSnackbarVisible(true);
    }
    return;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "start",
        justifyContent: "start",
        gap: 4,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          gap: 4,
          padding: 12,
          
        }}
      >
        <TextInput
          label={"Nome"}
          value={name}
          onChangeText={(name) => setName(name)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Umidade do solo máxima"}
          value={umidadeMax}
          keyboardType="numeric"
          onChangeText={(umidadeMax) => setUmidadeMax(umidadeMax)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Umidade do solo mínima"}
          value={umidadeMin}
          keyboardType="numeric"
          onChangeText={(umidadeMin) => setUmidadeMin(umidadeMin)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Temperatura Máxima"}
          value={temperaturaMax}
          keyboardType="numeric"
          onChangeText={(temperaturaMax) => setTemperaturaMax(temperaturaMax)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Temperatura Mínima"}
          value={temperaturaMin}
          keyboardType="numeric"
          onChangeText={(temperaturaMin) => setTemperaturaMin(temperaturaMin)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
      </ScrollView>
      <FAB
        icon={"plus"}
        onPress={() => saveCropToDataBase()}
        loading={isLoading ? true : false}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
      />
      <Portal>
        <Snackbar
          visible={portalSnackbarVisible}
          onDismiss={() => {
            setNoNameError(false);
            setErrorOnSave(false);
            setSuccessOnSave(false);
            setPortalSnackbarVisible(false);
          }}
          action={{
            label: "X",
          }}
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyMedium" style={{ color: "#FFFFFF" }}>
            {noNameError ? "Pelo menos uma nome deve ser fornecido!" : ""}
          </Text>
          <Text variant="bodyMedium" style={{ color: "#FFFFFF" }}>
            {errorOnSave ? "Houve um problema ao salvar, tente novamente." : ""}
          </Text>
          <Text variant="bodyMedium" style={{ color: "#FFFFFF" }}>
            {successOnSave ? "Salvo com sucesso." : ""}
          </Text>
        </Snackbar>
      </Portal>
    </View>
  );
}
