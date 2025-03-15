import queryString from "query-string";
import { Filter } from "../types";

export const getHome = async <T>(filter?: Partial<Filter>): Promise<T> => {
  const query = queryString.stringify(filter || {}, {
    skipEmptyString: true,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/tim-kiem?${query}`
  );
  const data = await response.json();
  return data.data as T;
};
