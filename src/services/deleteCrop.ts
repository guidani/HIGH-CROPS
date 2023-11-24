import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default async function DeleteCropFromDatabase(itemId: string) {
  return await deleteDoc(doc(db, "Crops", itemId))
    .then(() => true)
    .catch(() => false);
}
