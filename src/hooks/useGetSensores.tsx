import { useAuth } from "@clerk/clerk-expo";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";

export default function useGetSensores() {
  const [sensores, setSensores] = useState<DocumentData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useAuth();

  function getData() {
    setLoading(true);
    const docRef = doc(db, "Crops", `${userId}`);
    let items = {};
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        items = doc.data();
        setSensores(items);
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    const unsubscribe = getData();
    return () => unsubscribe();
  }, []);

  return { sensores, loading };
}
