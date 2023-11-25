import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Chip,
  Divider,
  FAB,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import GetInitialHortaConfig from "../../services/getInitialHortaConfig";
import { setNewHorta } from "../../services/setNewHorta";
import UpdateHortaConfig from "../../services/updateHortaConfig";
import { IconProps } from "../../types/IconProps";

export default function Configurations() {
  const [sliderUmidadeMax, setSliderUmidadeMax] = useState<number | undefined>(
    0
  );
  const [sliderUmidadeMin, setSliderUmidadeMin] = useState<number | undefined>(
    0
  );
  const [sliderTemperaturaMax, setSliderTemperaturaMax] = useState<
    number | undefined
  >(0);
  const [sliderTemperaturaMin, setSliderTemperaturaMin] = useState<
    number | undefined
  >(0);

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [successOnSave, setSuccessOnSave] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingInitialData, setIsLoadingInitialData] =
    useState<boolean>(false);
  const [isNewItem, setIsNewItem] = useState<boolean>(false);
  const theme = useTheme();

  async function getConfig() {
    try {
      setIsLoadingInitialData(true);
      const resp = await GetInitialHortaConfig();

      if (!resp) {
        //console.log("Nada");
        setIsNewItem(true);
        return;
      }

      setSliderTemperaturaMax(resp?.umidadeMax);
      setSliderTemperaturaMin(resp?.temperaturaMin);
      setSliderUmidadeMax(resp?.umidadeMax);
      setSliderUmidadeMin(resp?.umidadeMin);
    } catch (error) {
      setIsLoadingInitialData(false);
    } finally {
      setIsLoadingInitialData(false);
    }
  }

  useEffect(() => {
    getConfig();
  }, []);

  async function updateHortaToDataBase() {
    return await UpdateHortaConfig({
      temperaturaMax: sliderTemperaturaMax,
      temperaturaMin: sliderTemperaturaMin,
      umidadeMax: sliderUmidadeMax,
      umidadeMin: sliderUmidadeMin,
    });
  }

  async function saveHortaToDataBase() {
    const item: HortaType = {
      ownerId: "Guilherme",
      temperaturaMax: sliderTemperaturaMax,
      temperaturaMin: sliderTemperaturaMin,
      umidadeMax: sliderUmidadeMax,
      umidadeMin: sliderUmidadeMin,
    };

    setIsLoading(true);
    const id = await setNewHorta(item);
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

  if (isLoadingInitialData) {
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,

        gap: 4,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          gap: 4,
          padding: 4,
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
          <FontAwesome name="gear" size={24} color="black" />
          <Text variant="bodyLarge">Configure os parâmetros da sua horta.</Text>
        </View>

        <Divider />
        <View style={{ gap: 4, padding: 12 }}>
          <Text>Umidade do solo Máxima %</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Slider
              style={{ width: "80%" }}
              step={1}
              maximumValue={100}
              minimumValue={0}
              onValueChange={(v) => setSliderUmidadeMax(v)}
              value={sliderUmidadeMax}
              thumbTintColor="#000000"
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="red"
            />
            {/* <Text>{sliderUmidadeMax}</Text> */}
            <Chip mode="outlined">
              <Text>{sliderUmidadeMax}</Text>
            </Chip>
          </View>
          <Divider />
          <Text>Umidade do solo Mínima %</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Slider
              style={{ width: "80%" }}
              step={1}
              maximumValue={100}
              minimumValue={0}
              onValueChange={(v) => setSliderUmidadeMin(v)}
              value={sliderUmidadeMin}
              thumbTintColor="#000000"
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="red"
            />
            <Chip mode="outlined">
              <Text>{sliderUmidadeMin}</Text>
            </Chip>
          </View>
          <Divider />
          <Text>Temperatura Máxima °C</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Slider
              style={{ width: "80%" }}
              step={1}
              maximumValue={100}
              minimumValue={0}
              onValueChange={(v) => setSliderTemperaturaMax(v)}
              value={sliderTemperaturaMax}
              thumbTintColor="#000000"
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="red"
            />
            <Chip mode="outlined">
              <Text>{sliderTemperaturaMax}</Text>
            </Chip>
          </View>
          <Divider />
          <Text>Temperatura Mínima °C</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Slider
              style={{ width: "80%" }}
              step={1}
              maximumValue={100}
              minimumValue={0}
              onValueChange={(v) => setSliderTemperaturaMin(v)}
              value={sliderTemperaturaMin}
              thumbTintColor="#000000"
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="red"
            />
            <Chip mode="outlined">
              <Text>{sliderTemperaturaMin}</Text>
            </Chip>
          </View>
        </View>
      </ScrollView>
      <FAB
        icon={
          isNewItem
            ? "plus"
            : (props: IconProps & { color: string }) => (
                <FontAwesome name="save" size={24} color="black" />
              )
        }
        onPress={
          isNewItem
            ? () => saveHortaToDataBase()
            : () => updateHortaToDataBase()
        }
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
