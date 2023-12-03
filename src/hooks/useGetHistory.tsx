import { useEffect, useState } from "react";
import { IHistory } from "../types/IHistory";
import { useAuth } from "@clerk/clerk-expo";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../services/firebaseConfig";

export default function useGetHistory() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useAuth();

  useEffect(() => {
    const valueRef = ref(rtdb, `users/${userId}/sensores/sensorA/irrigationState`);
    const unsubscribe = onValue(valueRef, (snapshot) => {
      if(snapshot.exists()){
        snapshot.forEach( doc => {
          console.log(doc.val())
        })
      }
      
    });
    return () => unsubscribe();
  }, []);

  return { history, loading };
}
