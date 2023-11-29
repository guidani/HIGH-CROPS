import {
  DocumentData,
  DocumentReference,
  doc,
  updateDoc,
} from "firebase/firestore";
import { CropType } from "../types/CropType";
import { db } from "./firebaseConfig";

export default async function UpdateCrop(
  crop: CropType,
  itemId: string,
  userId: string
) {
  try {
    const cropRef: DocumentReference<DocumentData, CropType> = doc(
      db,
      "Crops",
      `${userId}`,
      "sensores",
      itemId
    );
    await updateDoc(cropRef, {
      nome: crop.nome,
      umidadeMin: crop.umidadeMin,
    });
    return true;
  } catch (error) {
    return false;
  }
}
