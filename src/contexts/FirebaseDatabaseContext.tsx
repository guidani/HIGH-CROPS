import { useAuth } from "@clerk/clerk-expo";
import { child, get, onValue, ref, set } from "firebase/database";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db, rtdb } from "../services/firebaseConfig";

interface IFirebaseDatabaseContextProvider {
  children: React.ReactNode;
}

interface IFirebaseDatabaseContext {
  umidadeAr: number | null;
  temperatura: number | null;
}

export const FirebaseDatabaseContext = createContext<IFirebaseDatabaseContext>({
  umidadeAr: null,
  temperatura: null,
});

export default function FirebaseDatabaseContextProvider({
  children,
}: IFirebaseDatabaseContextProvider) {
  const [umidadeAr, setUmidadeAr] = useState<number | null>(null);
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const { userId } = useAuth();

  async function setRealTimeDatabase() {
    await get(child(ref(rtdb), `users/${userId}`))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          set(ref(rtdb, "users/" + userId + "/sensores"), {
            sensorA: {
              irrigation: { v: true },
              ativado: { v: false },
              irrigationStarted: { v: false },
              umidadeSolo: 0,
              umidadeMin: { v: 0 },
            },
            sensorB: {
              irrigation: { v: true },
              ativado: { v: false },
              irrigationStarted: { v: false },
              umidadeSolo: 0,
              umidadeMin: { v: 0 },
            },
          });
        }
      })
      .catch((error) => console.error(error));
  }

  async function setFiresotreInitalData() {
    const docRef = doc(db, "Crops", `${userId}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, "Crops", `${userId}`), {
        userId: userId,
      });
      await setDoc(doc(db, "Crops", `${userId}`, "sensores", "sensorA"), {
        nome: "sensorA",
        umidade: 0,
      });
      await setDoc(doc(db, "Crops", `${userId}`, "sensores", "sensorB"), {
        nome: "sensorB",
        umidade: 0,
      });
    }
  }

  if (userId) {
    setRealTimeDatabase();
    setFiresotreInitalData();
  }

  useEffect(() => {

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
      unsubscribeUmidadeAr();
      unsubscribeTemperatura();
    };
  }, []);

  return (
    <FirebaseDatabaseContext.Provider value={{ umidadeAr, temperatura }}>
      {children}
    </FirebaseDatabaseContext.Provider>
  );
}
