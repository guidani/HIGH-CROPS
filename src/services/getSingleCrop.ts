import { DocumentData, DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { CropType } from "../types/CropType";

export default async function GetSingleCrop(cropId:string) {
  try {
    const docRef = doc(db, "Crops", cropId);
    const docSnap: DocumentSnapshot<CropType, DocumentData> = await getDoc(docRef);

    if(docSnap.exists()){
      return docSnap.data();
    } else {
      return;
    }
  } catch (error) {
    return;
  }
}