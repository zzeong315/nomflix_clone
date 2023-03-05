import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../utils";
import {
  getLatestMovies,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";
import { Banner, Loader, Overview, Slide, SlideBox, SubTitle, Title, Wrapper } from "../styles/styles";
import MovieSlider from "../components/MovieSlider";
import { IGetMoviesResult } from "../types";
import MovieDetail from "../components/MovieDetail";
import { PathMatch, useMatch } from "react-router-dom";

const Home = () => {
  const bigMovieMatch:PathMatch<string> | null= useMatch("/movies/:id");
  const useMultipleQuery = () => {
    const nowPlaying = useQuery<IGetMoviesResult>(
      ["movies", "nowPlaying"],
      getMovies
    );
    const latest = useQuery(
      ["movies", "latestMovie"],
      getLatestMovies
    );
    const topRated = useQuery<IGetMoviesResult>(
      ["movies", "topRatedMovie"],
      getTopRatedMovies
    );
    const upcomming = useQuery<IGetMoviesResult>(
      ["movies", "upCommingMovie"],
      getUpcomingMovies
    );

    return [nowPlaying, latest, topRated, upcomming];
  };
  const [
    { isLoading: loadingNowPlaying, data: nowPlayingData },
    { isLoading: loadingLatest, data: latestData },
    { isLoading: loadingTopRated, data: topRatedData },
    { isLoading: loadingUpcomming, data: upcommingData },
  ] = useMultipleQuery();

  return (
    <Wrapper>
      {loadingNowPlaying ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          {bigMovieMatch && <MovieDetail />}
          <SlideBox>
            {loadingNowPlaying ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Now Playing ▶︎</SubTitle>
                <MovieSlider {...nowPlayingData} />
              </Slide>
            )}
            {loadingTopRated ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Top Rated Movies ▶︎</SubTitle>
                <MovieSlider {...topRatedData} />
              </Slide>
            )}
            {loadingUpcomming ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Upcomming Movies ▶︎</SubTitle>
                <MovieSlider {...upcommingData} />
              </Slide>
            )}
            {loadingLatest ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Latest Movies ▶︎</SubTitle>
                <MovieSlider {...latestData} />
              </Slide>
            )}
          </SlideBox>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
