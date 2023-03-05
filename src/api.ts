const API_KEY = "74a8f7df1f312de347ba8d0ec7b5565f";
const BASE_PATH = "https://api.themoviedb.org/3";

//Movie
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getLatestMovies() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
//Tv Show
export function getLatestTv() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getAiringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

//Detail
export function getMovieDetail(movieId:string | null) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then((response) => response.json()
  );
}

export function getTvDetail(tvId:string | null) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((response) => response.json()
  );
}

//Search
export function getMovieSearch(keyword:string | null) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`).then((response) => response.json()
  );
}

export function getTvSearch(keyword:string | null) {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`).then((response) => response.json()
  );
}