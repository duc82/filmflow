import { Category } from "./category";

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface EpisodeData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Episode {
  server_name: string;
  server_data: EpisodeData[];
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
  episode_total: string;
  name: string;
  origin_name: string;
  poster_url: string;
  quality: string;
  slug: string;
  sub_docquyen: string;
  thumb_url: string;
  trailer_url: string;
  time: string;
  type: string;
  year: number;
  category: Category[];
  country: Country[];
  modified: { time: string };
  tmdb: Tmdb;
  imdb: { id: string };
  notify: string;
  showtimes: string;
  view: number;
  actor: string[];
  director: string[];
  content: string;
  episodes: Episode[];
}

interface Breadcrumb {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
}

interface Params {
  filterCategory: string[];
  filterCountry: string[];
  filterType: string;
  filterYear: string;
  pagination: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    pageRange: number;
  };
  sortField: string;
  sortType: string;
  type_slug: string;
}

interface SEOSchema {
  "@context": string;
  "@type": string;
  name: string;
  dateModified: string;
  dateCreated: string;
  url: string;
  datePublished: string;
  image: string;
  description: string;
}

interface SEO {
  descriptionHead: string;
  og_image: string[];
  og_type: string;
  og_url: string;
  titleHead: string;
  seoSchema: SEOSchema;
  updated_time?: number;
}

export interface MovieResponse {
  APP_DOMAIN_CDN_IMAGE: string;
  APP_DOMAIN_FRONTEND: string;
  breadCrumb: Breadcrumb[];
  items: Movie[];
  params: Params;
  seoOnPage: SEO;
  titlePage: string;
  type_list: string;
}

export interface MovieDetailResponse {
  breadCrumb: Breadcrumb[];
  item: Movie;
  params: {
    slug: string;
  };
  seoOnPage: SEO;
}
