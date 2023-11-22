import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function setNewHorta(horta: HortaType) {
  const docRef = await addDoc(collection(db, "Crops"), horta);
  return docRef.id;
}
