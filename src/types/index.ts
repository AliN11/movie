export type MovieFilter = {
  page?: number;
  dates?: { start: Date; end: Date };
};

export type CastMember = {
  name: string;
  popularity: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  credits: {
    cast: CastMember[];
  };
  tagline: string;
  budget: number;
  revenue: number;
  runtime: number;
  genres: Genre[];
  overview: string;
  imdb_id: string;
  homepage: string;
  vote_average: number;
  vote_count: number;
};
