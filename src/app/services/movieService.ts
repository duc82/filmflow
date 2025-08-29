import queryString from "query-string";
import { Filter } from "../types";

export const getHome = async <T>(filter?: Partial<Filter>): Promise<T> => {
  const query = queryString.stringify(filter || {}, {
    skipEmptyString: true,
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/home?${query}`);
  const data = await response.json();
  return data.data as T;
};

export const getMovies = async <T>(
  slug: string,
  filter?: Partial<Filter>
): Promise<T> => {
  const query = queryString.stringify(filter || {}, {
    skipEmptyString: true,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/danh-sach/${slug}?${query}`
  );
  const data = await response.json();
  return data.data as T;
};

export const getMoviesByCategory = async <T>(
  category: string,
  filter?: Partial<Filter>
): Promise<T> => {
  const query = queryString.stringify(filter || {}, {
    skipEmptyString: true,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/the-loai/${category}?${query}`
  );
  const data = await response.json();
  return data.data as T;
};

export const getMoviesByCountry = async <T>(
  country: string,
  filter?: Partial<Filter>
): Promise<T> => {
  const query = queryString.stringify(filter || {}, {
    skipEmptyString: true,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/quoc-gia/${country}?${query}`
  );
  const data = await response.json();
  return data.data as T;
};

export const searchMovies = async <T>(
  filter?: Partial<Filter & { keyword: string }>
): Promise<T> => {
  const query = queryString.stringify(filter || {}, {
    skipEmptyString: true,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/tim-kiem?${query}`
  );
  const data = await response.json();
  return data.data as T;
};

export const getMovie = async <T>(slug: string): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/phim/${slug}`);
  const data = await response.json();
  return data.data as T;
};
