import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function setNewHorta(horta: HortaType) {
  const docRef = await addDoc(collection(db, "horta"), horta);
  return docRef.id;
}
