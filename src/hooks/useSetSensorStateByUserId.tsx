import { useAuth } from "@clerk/clerk-expo";
import { ref, update } from "firebase/database";
import { rtdb } from "../services/firebaseConfig";
import UseGetSensorStateByUserId from "./useGetSensorStateByUserId";

export default function UseSetSensorStateByUserId(sensorId: string) {
  const { ativado } = UseGetSensorStateByUserId(sensorId);
  console.log(
    "🚀 ~ file: useSetSensorStateByUserId.tsx:8 ~ UseSetSensorStateByUserId ~ ativado:",
    ativado
  );
  const { userId } = useAuth();
  const v = !ativado;
  console.log(
    "🚀 ~ file: useSetSensorStateByUserId.tsx:11 ~ UseSetSensorStateByUserId ~ v:",
    v
  );

  async function setRealTimeDatabase() {
    const valueRef = ref(rtdb, `users/${userId}/sensores/${sensorId}/ativado`);
    await update(valueRef, {
      v,
    });
  }

  return { setRealTimeDatabase };
}
