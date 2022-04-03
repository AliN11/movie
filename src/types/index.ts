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

export type DatesRange = [Date, Date];

export type MovieInList = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
  overview: string;
  vote_average: number;
  vote_count: number;
};

export type Movie = MovieInList & {
  genres: Genre[];
  imdb_id: string;
  homepage: string;
  credits: {
    cast: CastMember[];
  };
  tagline: string;
  budget: number;
  revenue: number;
  runtime: number;
};
