import { useAuth } from "@clerk/clerk-expo";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { ISensors } from "../types/ISensors";

export default function useGetSensors() {
  const { userId } = useAuth();
  const [sensors, setSensors] = useState<ISensors[] | null>(null);
  const [loading, setLoading] = useState(false);

  function getListOfSensors() {
    setLoading(true);
    const collRef = collection(db, "Crops", `${userId}`, "sensores");
    const q = query(collRef);
    return onSnapshot(q, (querySnapshot) => {
      const items: ISensors[] = [];
      querySnapshot.forEach((doc) => {
        items?.push({
          sensorId: doc.id,
          nome: doc.data()?.nome,
          umidadeMin: doc.data()?.umidadeMin,
        });
        setSensors(items);
      });
      setLoading(false);
    });
  }

  useEffect(() => {
    const unsub = getListOfSensors();
    return () => unsub();
  }, []);
  return { sensors, loading };
}
