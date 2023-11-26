import { useAuth } from "@clerk/clerk-expo";
import { onValue, ref, set } from "firebase/database";
import { createContext, useEffect, useState } from "react";
import { rtdb } from "../services/firebaseConfig";

interface IFirebaseDatabaseContextProvider {
  children: React.ReactNode;
}

interface IFirebaseDatabaseContext {
  umidade: number | null;
  umidadeAr: number | null;
  temperatura: number | null;
}

export const FirebaseDatabaseContext = createContext<IFirebaseDatabaseContext>({
  umidade: null,
  umidadeAr: null,
  temperatura: null,
});

export default function FirebaseDatabaseContextProvider({
  children,
}: IFirebaseDatabaseContextProvider) {
  const [umidade, setUmidade] = useState<number | null>(null);
  const [umidadeAr, setUmidadeAr] = useState<number | null>(null);
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const { userId } = useAuth();

  if (userId) {
    set(ref(rtdb, "users/" + userId + "/sensores"), {
      sensorA: {
        umidadeSolo: 0,
      },
      sensorB: {
        umidadeSolo: 0,
      },
    });
  }

  useEffect(() => {
    const unsubscribeUmidade = onValue(ref(rtdb, "umidade"), (snapshot) => {
      const val = snapshot.val();
      setUmidade(val);
    });

    const unsubscribeUmidadeAr = onValue(ref(rtdb, "umidadear"), (snapshot) => {
      const val = snapshot.val();
      setUmidadeAr(val);
    });

    const unsubscribeTemperatura = onValue(
      ref(rtdb, "temperatura"),
      (snapshot) => {
        const val = snapshot.val();
        setTemperatura(val);
      }
    );

    return () => {
      unsubscribeUmidade();
      unsubscribeUmidadeAr();
      unsubscribeTemperatura();
    };
  }, []);

  return (
    <FirebaseDatabaseContext.Provider
      value={{ umidade, umidadeAr, temperatura }}
    >
      {children}
    </FirebaseDatabaseContext.Provider>
  );
}
