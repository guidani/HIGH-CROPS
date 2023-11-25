import { Timestamp } from "firebase/firestore";

export interface IHistory {
  id?: string;
  cropName?: string;
  DateTime?: Timestamp;
  umidadeSolo?: number | string;
}
