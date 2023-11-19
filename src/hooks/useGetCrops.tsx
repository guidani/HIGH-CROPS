import React, { useEffect, useState } from 'react'
import { CropType } from '../types/CropType';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

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
          name: doc.data()?.name,
          ownerId: doc.data()?.ownerId,
          temperaturaMax: doc.data()?.temperaturaMax,
          temperaturaMin: doc.data()?.temperaturaMin,
          umidadeMax: doc.data()?.umidadeMax,
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
  return {crops, loading}
}
