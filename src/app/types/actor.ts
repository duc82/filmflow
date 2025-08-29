export interface People {
  adult: boolean;
  also_known_as: string[];
  character?: string;
  gender: number;
  gender_name: string;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string;
  tmdb_people_id: string;
}

interface ProfileSize {
  h632: string;
  original: string;
  w45: string;
  w185: string;
}

export interface ActorResponse {
  imdb_id: string;
  ophim_id: string;
  peoples: People[];
  profile_sizes: ProfileSize;
  slug: string;
  tmdb_id: number;
  tmdb_type: string;
}
