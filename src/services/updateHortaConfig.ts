import {
  DocumentData,
  DocumentReference,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Resp {
  ownerId?: string;
  temperaturaMax?: number;
  temperaturaMin?: number;
  umidadeMax?: number;
  umidadeMin?: number;
}

export default async function UpdateHortaConfig(item: Resp) {
  try {
    console.log(
      "🚀 ~ file: updateHortaConfig.ts:18 ~ UpdateHortaConfig ~ item:",
      item
    );

    const hortaRef: DocumentReference<DocumentData, Resp> = doc(
      db,
      "horta",
      "alNvIaa4ITI8TswA06cH"
    );

    await updateDoc(hortaRef, {
      temperaturaMax: item.temperaturaMax,
      temperaturaMin: item.temperaturaMin,
      umidadeMax: item.umidadeMax,
      umidadeMin: item.umidadeMin,
    });
  } catch (error) {}
}
