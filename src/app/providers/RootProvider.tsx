"use client";
import React, { useState } from "react";
import RootContext from "../contexts/RootContext";
import { Category } from "../types/category";
import { National } from "../types/national";

interface RootProviderProps {
  children: React.ReactNode;
  categories: Category[];
  nationals: National[];
}

export default function RootProvider({
  children,
  categories,
  nationals,
}: RootProviderProps) {
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  return (
    <RootContext.Provider
      value={{
        categories,
        nationals,
        isSearchFocus,
        setIsSearchFocus,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
