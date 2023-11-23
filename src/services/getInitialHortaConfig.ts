import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Resp {
  ownerId?: string;
  temperaturaMax?: number;
  temperaturaMin?: number;
  umidadeMax?: number;
  umidadeMin?: number;
}

export default async function GetInitialHortaConfig() {
  const docRef = doc(db, "horta", "alNvIaa4ITI8TswA06cH");
  const docSnap: DocumentSnapshot<Resp, DocumentData> = await getDoc(docRef);

  if (docSnap.exists()) {
    // TODO - atualizar o estado
    return docSnap.data();
  } else {
    const dummy: Resp = {
      ownerId: "",
      temperaturaMax: 0,
      temperaturaMin: 0,
      umidadeMax: 0,
      umidadeMin: 0,
    };
    return;
  }
}
