import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import {
  Divider,
  SegmentedButtons,
  Text
} from "react-native-paper";
import ShowFlatListHistoryBySensor from "../../components/ShowFlatListHistoryBySensor";
export default function History() {
  const [segmentedButtonvalue, setSegmentedButtonvalue] = useState("sensorA");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
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
        <FontAwesome name="list" size={24} color="black" />
        <Text variant="bodyLarge">Histórico de irrigações</Text>
      </View>
      <Divider />
      <SegmentedButtons
        value={segmentedButtonvalue}
        onValueChange={setSegmentedButtonvalue}
        buttons={[
          {
            value: "sensorA",
            label: "Sensor A",
          },
          { value: "sensorB", label: "Sensor B" },
        ]}
      />
      {<ShowFlatListHistoryBySensor valor={segmentedButtonvalue} />}
    </View>
  );
}
