import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../services/firebaseConfig";
import { useAuth } from "@clerk/clerk-expo";

export default function useGetUmidadeSoloBySensorId(sensorId: string) {
  const [umidadeSolo, setUmidadeSolo] = useState<number>(0);
  const { userId } = useAuth();
  useEffect(() => {
    const valueRef = ref(rtdb, `users/${userId}/sensores/${sensorId}/umidadeSolo`);
    const unsubscribe = onValue(valueRef, (snapshot) => {
      if(snapshot.exists()){
        const val = snapshot.val();
        setUmidadeSolo(val);
      }
    });
    return () => unsubscribe();
  }, []);
  return { umidadeSolo };
}
