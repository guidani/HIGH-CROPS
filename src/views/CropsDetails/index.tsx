import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
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
  TextInput,
  useTheme,
} from "react-native-paper";
import ViewCenter from "../../components/ViewCenter";
import { db } from "../../services/firebaseConfig";
import { IconProps } from "../../types/IconProps";

interface Props {
  navigation: any;
  route: any;
}
// TODO - finalizar a página
export default function CropsDetails({ route }: Props) {
  const navigat = useNavigation();
  const { itemId, sensores } = route.params;
  const { userId } = useAuth();

  const theme = useTheme();
  const [name, setName] = useState<string>("");
  const [umidadeMin, setUmidadeMin] = useState<number | undefined>(0);

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false);
  const [noNameError, setNoNameError] = useState(false);
  const [errorOnSave, setErrorOnSave] = useState(false);
  const [successOnSave, setSuccessOnSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorOnLoad, setErrorOnLoad] = useState(false);

  async function updateCropToDataBase() {
    try {
      if (!name) {
        setNoNameError(true);
        setPortalSnackbarVisible(true);
        return;
      }
      setIsLoading(true);
      if (itemId === "sensorA") {
        await setDoc(doc(db, "Crops", `${userId}`), {
          sensorA: {
            nome: name.toString(),
            umidade: umidadeMin,
          },
          sensorB: {
            nome: sensores["sensorB"]["nome"]!,
            umidade: sensores["sensorB"]["umidade"]!,
          },
        });
      } else {
        await setDoc(doc(db, "Crops", `${userId}`), {
          sensorA: {
            nome: sensores["sensorA"]["nome"]!,
            umidade: sensores["sensorA"]["umidade"]!,
          },
          sensorB: {
            nome: name,
            umidade: Number(umidadeMin),
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  function loadInitialData() {
    const nome =
      sensores[`${itemId}`]["nome"]! === ""
        ? `${itemId}`
        : sensores[`${itemId}`]["nome"]!;
    const umidade =
      sensores[`${itemId}`]["umidade"]! === ""
        ? `${itemId}`
        : sensores[`${itemId}`]["umidade"]!;
    setName(nome);
    setUmidadeMin(umidade);
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  if (
    Object.keys(sensores).length === 0 ||
    Object.keys(sensores).length === undefined
  ) {
    setErrorOnLoad(true);
    return (
      <ViewCenter>
        <Text>Nada encontrado!</Text>
      </ViewCenter>
    );
  }

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
