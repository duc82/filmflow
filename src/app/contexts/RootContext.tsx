import { createContext } from "react";
import { Category } from "../types/category";
import { National } from "../types/national";

interface IRootContext {
  categories: Category[];
  nationals: National[];
}

const RootContext = createContext<IRootContext>({
  categories: [],
  nationals: [],
});

export default RootContext;
