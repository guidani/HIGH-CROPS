import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { CropType } from "../types/CropType";
import { db } from "./firebaseConfig";

export default async function GetSingleCrop(userId: string, cropId: string) {
  try {
    const docRef = doc(db, "Crops", `${userId}`, "sensores", cropId);
    const docSnap: DocumentSnapshot<CropType, DocumentData> = await getDoc(
      docRef
    );

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Nada encontrado!");
      return;
    }
  } catch (error) {
    return;
  }
}
