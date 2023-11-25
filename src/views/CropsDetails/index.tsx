import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  FAB,
  Portal,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import DeleteCropFromDatabase from "../../services/deleteCrop";
import GetSingleCrop from "../../services/getSingleCrop";
import UpdateCrop from "../../services/updateCrop";
import { IconProps } from "../../types/IconProps";

interface Props {
  navigation: any;
  route: any;
}
// TODO - finalizar a página
export default function CropsDetails({ route, navigation }: Props) {
  const navigat = useNavigation();
  const { itemId } = route.params;
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
  const [errorOnLoad, setErrorOnLoad] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  async function updateCropToDataBase() {
    if (!name) {
      setNoNameError(true);
      setPortalSnackbarVisible(true);
      return;
    }
    setIsLoading(true);
    const resp = await UpdateCrop(
      {
        name: name,
        temperaturaMax: temperaturaMax,
        temperaturaMin: temperaturaMin,
        umidadeMax: umidadeMax,
        umidadeMin: umidadeMin,
      },
      itemId
    );
    setIsLoading(false);
    if (resp) {
      setSuccessOnSave(true);
      setPortalSnackbarVisible(true);
    } else {
      setErrorOnSave(true);
      setPortalSnackbarVisible(true);
    }
  }

  async function getData() {
    try {
      setIsLoading(true);
      const resp = await GetSingleCrop(itemId);
      if (!resp) {
        setErrorOnLoad(true);
      }

      setName(resp?.name || "");
      setUmidadeMax(resp?.umidadeMax || 0);
      setUmidadeMin(resp?.umidadeMin || 0);
      setTemperaturaMax(resp?.temperaturaMax || 0);
      setTemperaturaMin(resp?.temperaturaMin || 0);
    } catch (error) {
      setIsLoading(false);
      setErrorOnLoad(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleExlcuirCrop = useCallback(async () => {
    setIsLoading(true);
    const resp = await DeleteCropFromDatabase(itemId);
    setIsLoading(false);
    if (resp) {
      setIsDeleted(true);
      setPortalSnackbarVisible(true);
      navigat.goBack();
    } else {
      setIsDeleted(false);
      setPortalSnackbarVisible(true);
    }
  }, [navigat]);

  async function deleteCropFromDatabase() {
    setIsLoading(true);
    const resp = await DeleteCropFromDatabase(itemId);
    setIsLoading(false);
    if (resp) {
      setIsDeleted(true);
      setPortalSnackbarVisible(true);
      return () => navigation.goBack();
    } else {
      setIsDeleted(false);
      setPortalSnackbarVisible(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (errorOnLoad) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Ocorreu um erro!</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "flex-start",
        justifyContent: "flex-start",
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
        <View style={{ flexDirection: "row", gap: 4, padding: 12 }}>
          <FontAwesome5 name="eye" size={24} color="black" />
          <Text variant="bodyLarge">
            Veja e configure os parâmetros da hortaliça.
          </Text>
        </View>
        <TextInput
          label={"Nome"}
          value={name}
          onChangeText={(name) => setName(name)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Umidade do solo mínima"}
          value={umidadeMin?.toString()}
          keyboardType="numeric"
          onChangeText={(umidadeMin) => setUmidadeMin(umidadeMin)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Umidade do solo máxima"}
          value={umidadeMax?.toString()}
          keyboardType="numeric"
          onChangeText={(umidadeMax) => setUmidadeMax(umidadeMax)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Temperatura Máxima"}
          value={temperaturaMax?.toString()}
          keyboardType="numeric"
          onChangeText={(temperaturaMax) => setTemperaturaMax(temperaturaMax)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
        <TextInput
          label={"Temperatura Mínima"}
          value={temperaturaMin?.toString()}
          keyboardType="numeric"
          onChangeText={(temperaturaMin) => setTemperaturaMin(temperaturaMin)}
          mode="outlined"
          style={{ marginBottom: 4 }}
        />
      </ScrollView>
      <FAB
        icon={(props: IconProps & { color: string }) => (
          <FontAwesome name="trash" size={24} color="white" />
        )}
        onPress={() => handleExlcuirCrop()}
        loading={isLoading ? true : false}
        style={{
          position: "absolute",
          margin: 16,
          left: 0,
          bottom: 0,
          backgroundColor: theme.colors.error,
        }}
      />
      <FAB
        icon={(props: IconProps & { color: string }) => (
          <FontAwesome name="save" size={24} color="black" />
        )}
        onPress={() => updateCropToDataBase()}
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
          <Text variant="bodyMedium" style={{ color: "#FFFFFF" }}>
            {isDeleted ? "Deletado com sucesso." : ""}
          </Text>
        </Snackbar>
      </Portal>
    </View>
  );
}
