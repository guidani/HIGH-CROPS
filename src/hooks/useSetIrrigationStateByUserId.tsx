import { useAuth } from "@clerk/clerk-expo";
import { ref, update } from "firebase/database";
import { rtdb } from "../services/firebaseConfig";
import useGetIrrigationStateByUserId from "./useGetIrrigationStateByUserId";

export default function useSetIrrigationStateByUserId(sensorId: string) {
  const { ativado } = useGetIrrigationStateByUserId(sensorId);
  const { userId } = useAuth();
  const v = !ativado;

  async function setRealTimeDatabaseIrrigationState() {
    const valueRef = ref(
      rtdb,
      `users/${userId}/sensores/${sensorId}/irrigation`
    );
    await update(valueRef, {
      v,
    });
  }

  return { setRealTimeDatabaseIrrigationState };
}
