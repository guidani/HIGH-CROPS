import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../services/firebaseConfig";

export default function useGetUmidadeAr() {
  const [umidadeAr, setUmidadeAr] = useState<string | number | null>(null);
  useEffect(() => {
    const unsubscribe = onValue(ref(rtdb, "umidadear"), (snapshot) => {
      const val = snapshot.val();
      setUmidadeAr(val);
    });
    return () => unsubscribe();
  }, []);
  return { umidadeAr };
}
