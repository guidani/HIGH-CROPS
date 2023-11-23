import {
  DocumentData,
  DocumentReference,
  doc,
  updateDoc,
} from "firebase/firestore";
import { CropType } from "../types/CropType";
import { db } from "./firebaseConfig";

export default async function UpdateCrop(crop: CropType, id: string) {
  try {
    const cropRef: DocumentReference<DocumentData, CropType> = doc(
      db,
      "Crops",
      id
    );
    await updateDoc(cropRef, {
      name: crop.name,
      temperaturaMax: crop.temperaturaMax,
      temperaturaMin: crop.temperaturaMin,
      umidadeMax: crop.umidadeMax,
      umidadeMin: crop.umidadeMin,
    });
  } catch (error) {}
}
