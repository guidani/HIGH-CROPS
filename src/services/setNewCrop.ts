import { addDoc, collection, doc } from "firebase/firestore";
import { CropType } from "../types/CropType";
import { db } from "./firebaseConfig";

export async function setNewCrop(crop:CropType) {
  const docRef = await addDoc(collection(db, "Crops"), crop)
  return docRef.id;
}