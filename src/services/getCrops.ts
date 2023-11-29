import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { CropType } from "../types/CropType";
import { db } from "./firebaseConfig";

export default async function getCrops(): Promise<CropType[]> {
  let crops: CropType[] = [];
  const cropsRef = collection(db, "Crops");
  const q = query(cropsRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(
    (doc: QueryDocumentSnapshot<CropType | DocumentData>) => {
      const item: CropType = {
        id: doc.id,
        nome: doc.data().nome,
        umidadeMin: doc.data().umidadeMin,
      };
      crops.push(item);
    }
  );
  return crops;
}
