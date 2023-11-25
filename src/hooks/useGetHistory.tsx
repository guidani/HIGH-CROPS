import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { IHistory } from "../types/IHistory";



export default function useGetHistory() {
  const [history, setHistory] = useState<IHistory[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  function getHistory() {
    const historyRef = collection(db, "History");
    const q = query(historyRef);
    return onSnapshot(q, (querySnapshot) => {
      setLoading(true);
      const items: IHistory[] = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id, 
          cropName: doc.data().CropName,
          dataIrrigacao: doc.data().DataIrrigacao,
          umidadeSolo: doc.data().UmidadeSolo
        });
        setHistory(items);
      });
      setLoading(false);
    });
  }

  useEffect(() => {
    const unsubscribeHistory = getHistory();
    return () => unsubscribeHistory();
  }, [])
  

  return {history, loading};
}
