import clsx from "clsx";
import { twMerge, ClassNameValue } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return clsx(twMerge(classes));
}
