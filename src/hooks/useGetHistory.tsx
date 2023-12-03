import { useAuth } from "@clerk/clerk-expo";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../services/firebaseConfig";

export default function useGetHistory(sensorId: string) {
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useAuth();

  useEffect(() => {
    const valueRef = ref(
      rtdb,
      `users/${userId}/sensores/${sensorId}/irrigationStarted`
    );
    const unsubscribe = onValue(valueRef, (snapshot) => {
      setLoading(true);
      if (snapshot.exists()) {
        snapshot.forEach((doc) => {
          //@ts-ignore
          setHistory(Object.values(doc.val()));
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [sensorId]);

  return { history, loading };
}
