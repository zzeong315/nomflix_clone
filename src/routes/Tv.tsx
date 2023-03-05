import { useQuery } from "@tanstack/react-query";
import { PathMatch, useMatch } from "react-router-dom";
import {
  getAiringTodayTv,
  getLatestTv,
  getPopularTv,
  getTopRatedTv,
} from "../api";
import TvDetail from "../components/TvDetail";
import TvSlider from "../components/TvSlider";
import {
  Banner,
  Loader,
  Overview,
  Slide,
  SlideBox,
  SubTitle,
  Title,
  Wrapper,
} from "../styles/styles";
import { IGetTvSearchResult } from "../types";
import { makeImagePath } from "../utils";

const Tv = () => {
  const bigTVMatch:PathMatch<string> | null= useMatch("/tv/:id");
  const useMultipleQuery = () => {
    const todayAiring = useQuery<IGetTvSearchResult>(["tv", "nowPlaying"], getAiringTodayTv);
    const latest = useQuery(["tv", "latestTv"], getLatestTv);
    const topRated = useQuery<IGetTvSearchResult>(["tv", "topRatedTv"], getTopRatedTv);
    const popular = useQuery<IGetTvSearchResult>(["tv", "popularTv"], getPopularTv);

    return [todayAiring, latest, topRated, popular];
  };
  const [
    { isLoading: loadingTodayAiring, data: todayAiringData },
    { isLoading: loadingLatest, data: latestData },
    { isLoading: loadingTopRated, data: topRatedData },
    { isLoading: loadingPopular, data: popularData },
  ] = useMultipleQuery();

  return (
    <Wrapper>
      {loadingTodayAiring ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              todayAiringData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{todayAiringData?.results[0].name}</Title>
            <Overview>{todayAiringData?.results[0].overview}</Overview>
          </Banner>
          {bigTVMatch && <TvDetail />}
          <SlideBox>
            {loadingTodayAiring ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Today Airing TV Show ▶︎</SubTitle>
                <TvSlider {...todayAiringData} />
              </Slide>
            )}
            {loadingTopRated ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Top Rated TV Show ▶︎</SubTitle>
                <TvSlider {...topRatedData} />
              </Slide>
            )}
            {loadingPopular ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Popular TV Show ▶︎</SubTitle>
                <TvSlider {...popularData} />
              </Slide>
            )}
            {loadingLatest ? (
              <Loader>Loading...</Loader>
            ) : (
              <Slide>
                <SubTitle>Latest TV SHOW ▶︎</SubTitle>
                <TvSlider {...latestData} />
              </Slide>
            )}
          </SlideBox>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
