export type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;

export type Params<T> = Promise<T>;

export interface Filter {
  sort_field: string;
  sort_type: string;
  category: string;
  page: string;
  year: string;
  country: string;
}
