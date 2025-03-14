"use client";
import React from "react";
import RootContext from "../contexts/RootContext";
import { Category } from "../types/category";
import { National } from "../types/national";

export default function RootProvider({
  children,
  categories,
  nationals,
}: {
  children: React.ReactNode;
  categories: Category[];
  nationals: National[];
}) {
  return (
    <RootContext.Provider
      value={{
        categories,
        nationals,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
