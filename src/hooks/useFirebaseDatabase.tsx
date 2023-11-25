import { useContext } from "react";
import { FirebaseDatabaseContext } from "../contexts/FirebaseDatabaseContext";

export default function UseFirebaseDatabase() {
  return useContext(FirebaseDatabaseContext);
}
