import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../services/firebaseConfig";

export default function useGetTemperatura() {
  const [temperatura, setTemperatura] = useState<string | number | null>(null);
  useEffect(() => {
    const unsubscribe = onValue(ref(rtdb, "temperatura"), (snapshot) => {
      const val = snapshot.val();
      setTemperatura(val);
    });
    return () => unsubscribe();
  }, []);
  return { temperatura };
}
