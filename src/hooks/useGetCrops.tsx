import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { CropType } from "../types/CropType";

export default function useGetCrops() {
  const [crops, setCrops] = useState<CropType[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  function getCropsRealTime() {
    const cropsRef = collection(db, "Crops");
    const q = query(cropsRef);
    return onSnapshot(q, (querySnapshot) => {
      setLoading(true);
      const items: CropType[] = [];
      querySnapshot.forEach((doc) => {
        items?.push({
          id: doc.id,
          nome: doc.data()?.nome,
          umidadeMin: doc.data()?.umidadeMin,
        });
        setCrops(items);
      });
      setLoading(false);
    });
  }

  useEffect(() => {
    // fetchData();
    const unsub = getCropsRealTime();
    return () => unsub();
  }, []);
  return { crops, loading };
}
