import { Category } from "./category";

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface Tmdb {
  id: string;
  type: string;
  season: number;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  _id: string;
  chieurap: boolean;
  lang: string;
  episode_current: string;
  name: string;
  origin_name: string;
  poster_url: string;
  quality: string;
  slug: string;
  sub_docquyen: string;
  thumb_url: string;
  time: string;
  type: string;
  year: number;
  category: Category[];
  country: Country[];
  imdb: { id: string };
  modified: { time: string };
  tmdb: Tmdb;
}
