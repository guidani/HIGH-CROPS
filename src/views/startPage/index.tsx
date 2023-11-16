import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { rtdb } from "../../services/firebaseService";
interface Props {
  navigation: any;
}

export default function StartPage({ navigation }: Props) {
  const [umidade, setUmidade] = useState<string | number | null>(null);
  useEffect(() => {
    const unsubscribe = onValue(ref(rtdb, "umidade"), (snapshot) => {
      const val = snapshot.val();
      setUmidade(val);
    });
    return () => unsubscribe();
  }, [umidade]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>StartPage</Text>
      <Text>{umidade}</Text>
      <Button onPress={() => navigation.navigate("CropDetails")}>
        Go to details
      </Button>
    </View>
  );
}
