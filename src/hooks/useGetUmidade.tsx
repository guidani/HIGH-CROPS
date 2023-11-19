import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../services/firebaseConfig";

export default function useGetUmidade() {
  const [umidade, setUmidade] = useState<string | number | null>(null);
  useEffect(() => {
    const unsubscribe = onValue(ref(rtdb, "umidade"), (snapshot) => {
      const val = snapshot.val();
      setUmidade(val);
    });
    return () => unsubscribe();
  }, []);
  return { umidade };
}
