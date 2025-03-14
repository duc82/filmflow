import { useContext } from "react";
import RootContext from "../contexts/RootContext";

export default function useRootContext() {
  return useContext(RootContext);
}
