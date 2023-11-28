import { useAuth } from "@clerk/clerk-expo";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";

export default function useGetSensores() {
  const [sensores, setSensores] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { userId } = useAuth();

  async function getData() {
    try {
      setLoading(true);
      const docRef = doc(db, "Crops", `${userId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(
          "🚀 ~ file: useGetSensores.tsx:17 ~ getData ~ docSnap.exists():",
          docSnap.data()
        );
        console.log(typeof docSnap.data());
        setSensores(docSnap.data());
        console.log(docSnap.data()["sensorA"].nome);
        console.log(docSnap.data()[0]);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { sensores, loading };
}
