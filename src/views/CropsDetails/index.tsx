import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Chip,
  Divider,
  FAB,
  Portal,
  Snackbar,
  Switch,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import useGetIrrigationStateByUserId from "../../hooks/useGetIrrigationStateByUserId";
import UseGetSensorStateByUserId from "../../hooks/useGetSensorStateByUserId";
import useSetIrrigationStateByUserId from "../../hooks/useSetIrrigationStateByUserId";
import UseSetSensorStateByUserId from "../../hooks/useSetSensorStateByUserId";
import GetSingleCrop from "../../services/getSingleCrop";
import UpdateCrop from "../../services/updateCrop";
import UpdateUmidadeMinRTDB from "../../services/updateUmidadeMinRTDB";
import { CropType } from "../../types/CropType";
import { IconProps } from "../../types/IconProps";

interface Props {
  navigation: any;
  route: any;
}

export default function CropsDetails({ route }: Props) {
  const navigat = useNavigation();
  const { itemId } = route.params;
  const { userId } = useAuth();

  const { ativado } = UseGetSensorStateByUserId(itemId);
  const { setRealTimeDatabase } = UseSetSensorStateByUserId(itemId);

  const irrigationState = useGetIrrigationStateByUserId(itemId);
  const { setRealTimeDatabaseIrrigationState } =
    useSetIrrigationStateByUserId(itemId);

  const theme = useTheme();
  const [name, setName] = useState<string>("");
  const [umidadeMin, setUmidadeMin] = useState<number>(0);

  const [switchSensorState, setSwitchSensorState] = useState(false);
  const [switchIrrigationState, setSwitchIrrigationState] = useState(false);

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false);
  const [noNameError, setNoNameError] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [successOnSave, setSuccessOnSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorOnLoad, setErrorOnLoad] = useState(false);

  async function changeSwitchSensorValue() {
    return await setRealTimeDatabase();
  }

  async function changeSwitchIrrigationValue() {
    return await setRealTimeDatabaseIrrigationState();
  }

  async function updateCropToDataBase() {
    try {
      setIsLoading(true);
      const crop: CropType = {
        nome: name,
        umidadeMin: umidadeMin,
      };

      await UpdateUmidadeMinRTDB(userId!, itemId, umidadeMin);

      const resp = await UpdateCrop(crop, itemId, userId!);
      if (resp) {
        setSuccessOnSave(true);
      }

      setSwitchSensorState(ativado!);
      setSwitchIrrigationState(irrigationState.ativado!);
    } catch (error) {
      setErrorOnSave(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadInitialData() {
    try {
      setIsLoading(true);
      const resp = await GetSingleCrop(userId!, itemId);
      //@ts-ignore
      setName(resp["nome"]);
      //@ts-ignore
      setUmidadeMin(resp["umidadeMin"]);
      setSwitchSensorState(ativado!);
    } catch (error) {
      setIsLoading(false);
      setErrorOnLoad(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadInitialData();
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
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        <Divider style={{ marginVertical: 4 }} />
        <Text>Umidade do solo Mínima %</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Slider
            style={{ width: "80%" }}
            step={1}
            maximumValue={100}
            minimumValue={0}
            onValueChange={(v) => setUmidadeMin(v)}
            value={umidadeMin}
            thumbTintColor="#000000"
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor="red"
          />
          <Chip mode="outlined">
            <Text>{umidadeMin}</Text>
          </Chip>
        </View>
        <Divider style={{ marginVertical: 4 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Ativar / Desativar sensor</Text>
          <Switch value={ativado!} onValueChange={changeSwitchSensorValue} />
        </View>
        <Divider style={{ marginVertical: 4 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Ativar / Desativar Irrigação automática</Text>
          <Switch
            value={irrigationState.ativado!}
            onValueChange={changeSwitchIrrigationValue}
          />
        </View>
      </ScrollView>

      <FAB
        animated={false}
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
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyMedium" style={{ color: "#FFFFFF" }}>
            {noNameError && "Pelo menos uma nome deve ser fornecido!"}
          </Text>
          <Text variant="bodyMedium" style={{ color: "#FFFFFF" }}>
            {errorOnSave && "Houve um problema ao salvar, tente novamente."}
          </Text>
          <Text variant="bodyMedium" style={{ color: "#FFFFFF" }}>
            {successOnSave && "Salvo com sucesso."}
          </Text>
        </Snackbar>
      </Portal>
    </View>
  );
}
