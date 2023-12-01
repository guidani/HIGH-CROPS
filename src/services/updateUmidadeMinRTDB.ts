import { ref, update } from "firebase/database";
import { rtdb } from "./firebaseConfig";

export default async function UpdateUmidadeMinRTDB(userId: string, itemId: string, v: number) {
  const valueRef = ref(rtdb, `users/${userId}/sensores/${itemId}/umidadeMin`)
  return await update(valueRef, {
    v: v
  })
}