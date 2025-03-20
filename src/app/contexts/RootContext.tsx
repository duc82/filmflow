import { createContext } from "react";
import { Category } from "../types/category";
import { National } from "../types/national";

interface IRootContext {
  categories: Category[];
  nationals: National[];
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const RootContext = createContext<IRootContext>({
  categories: [],
  nationals: [],
  isSearchFocus: false,
  setIsSearchFocus: () => {},
});

export default RootContext;
