export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ISearchMovie {
  poster_path: string | undefined;
  adult: boolean | undefined;
  overview: string | undefined;
  release_date: string | undefined;
  id: number | undefined;
  original_language: string | undefined;
  title: string;
  backdrop_path: string | undefined;
  popularity: number | undefined;
}

export interface ISearchTv {
  poster_path: string | undefined;
  overview: string | undefined;
  release_date: string | undefined;
  id: number | undefined;
  original_language: string | undefined;
  backdrop_path: string | undefined;
  popularity: number | undefined;
  first_air_date: string | undefined;
  name: string;
}

export interface IGetMovieSearchResult {
  results: ISearchMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IGetTvSearchResult {
  results: ISearchTv[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IGetMovieDetail {
  adult: boolean;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string
    }
  ];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
}

export interface IGetTvDetail {
  backdrop_path: string;
  episode_run_time: [
    number
  ];
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  status: string;
  vote_average: number;
}

