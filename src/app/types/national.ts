export interface National {
  _id: string;
  name: string;
  slug: string;
}

export interface NationalReponse {
  items: National[];
}
